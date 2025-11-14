import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAM5RnrAU8M6oRhJ7mz8XGhKsnT1dBOfvM",
  authDomain: "devprompt-sheep.firebaseapp.com",
  projectId: "devprompt-sheep",
  storageBucket: "devprompt-sheep.firebasestorage.app",
  messagingSenderId: "910636729627",
  appId: "1:910636729627:web:0e68c5d203b4329fbfbfbe",
  measurementId: "G-DDCXDRHRXJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let currentUser = null;
let isChecking = true;

// Estado global da autenticação
export const authState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Listeners para mudanças de estado
const authListeners = [];

export function onAuthChange(callback) {
  authListeners.push(callback);
}

function notifyListeners() {
  authListeners.forEach(cb => cb(authState));
}

// Verificação inicial + contínua
export const initAuth = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    authState.user = user;
    authState.isAuthenticated = !!user;
    authState.isLoading = false;
    
    if (user) {
      authState.error = null;
      console.log('✅ Usuário autenticado:', user.displayName || user.email);
    } else {
      console.log('⚠️ Nenhum usuário autenticado');
    }
    
    notifyListeners();
    resolve(authState);
  }, (error) => {
    authState.isLoading = false;
    authState.error = error.message;
    authState.isAuthenticated = false;
    notifyListeners();
    resolve(authState);
  });
});

// Login com Google
export async function signInWithGoogle() {
  try {
    authState.isLoading = true;
    notifyListeners();
    
    const result = await signInWithPopup(auth, googleProvider);
    currentUser = result.user;
    authState.user = currentUser;
    authState.isAuthenticated = true;
    authState.error = null;
    
    console.log('✅ Login Google bem-sucedido:', currentUser.displayName);
    notifyListeners();
    return currentUser;
  } catch (error) {
    authState.error = error.message;
    authState.isLoading = false;
    console.error('❌ Erro no login:', error.message);
    notifyListeners();
    throw error;
  }
}

// Logout
export async function logout() {
  try {
    authState.isLoading = true;
    notifyListeners();
    
    await signOut(auth);
    currentUser = null;
    authState.user = null;
    authState.isAuthenticated = false;
    authState.error = null;
    
    console.log('✅ Logout realizado');
    notifyListeners();
    return true;
  } catch (error) {
    authState.error = error.message;
    console.error('❌ Erro no logout:', error.message);
    notifyListeners();
    throw error;
  }
}

// Obter usuário atual
export function getCurrentUser() {
  return currentUser;
}

// Obter token ID (para verificação no backend)
export async function getIdToken() {
  if (currentUser) {
    return await currentUser.getIdToken();
  }
  return null;
}

// Obter avatar do usuário (com fallback)
export function getUserAvatar() {
  if (currentUser?.photoURL) {
    return currentUser.photoURL;
  }
  // Fallback: gera avatar padrão com iniciais
  const initial = currentUser?.displayName?.[0]?.toUpperCase() || 'U';
  return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff`;
}

// Guard para rotas protegidas
export function requireAuth() {
  return initAuth.then(state => {
    if (!state.isAuthenticated) {
      // Redireciona para login.html se não autenticado
      if (!window.location.pathname.includes('login.html')) {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
      }
    }
    return state;
  });
}
