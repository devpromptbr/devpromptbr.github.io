// ===============================================
// FUNÇÕES DE CONTROLE DO DRAWER
// ===============================================
function openPixDrawer() {
    document.getElementById("pix-drawer").classList.add("is-open");
    setTimeout(() => {
        document.getElementById("pix-amount-input").focus();
    }, 300);
}

function closePixDrawer() {
    document.getElementById("pix-drawer").classList.remove("is-open");
    document.getElementById("pix-amount-input").blur();
}

// ===============================================
// LÓGICA MONETÁRIA DE ALTA PRECISÃO (Centavos)
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("pix-amount-input");
    const continueButton = document.getElementById("continue-button");
    const pixButton = document.querySelector(".commerce-actions-bar .action-button:last-child");

    // Ativa o drawer
    if (pixButton) {
        pixButton.addEventListener("click", (event) => {
            event.preventDefault();
            openPixDrawer();
        });
    }

    // Lógica de formatação principal
    function formatMonetaryInput(e) {
        // Obtém apenas os dígitos do valor atual (ex: '12345')
        let value = amountInput.value.replace(/\D/g, "");

        // 1. Garante que o valor mínimo seja 000 (0,00)
        if (value.length === 0) {
            value = "0";
        }

        // 2. Transforma o valor de centavos em Real formatado
        // Ex: '12345' vira 123.45 (123 reais e 45 centavos)
        let numericValue = parseInt(value, 10) / 100;

        // Formata para o padrão monetário brasileiro (vírgula e ponto)
        const formattedValue = numericValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        // Se o valor for "NaN" (erro) ou muito alto, reseta para 0,00
        if (formattedValue === "NaN" || value.length > 15) {
            amountInput.value = "0,00";
        } else {
            amountInput.value = formattedValue;
        }

        // 3. Validação: Ativa/Desativa o botão
        const realNumericValue = parseFloat(amountInput.value.replace(".", "").replace(",", "."));
        if (realNumericValue > 0) {
            continueButton.classList.remove("disabled");
            continueButton.disabled = false;
        } else {
            continueButton.classList.add("disabled");
            continueButton.disabled = true;
        }
    }

    // Implementação do formato em tempo real (onkeyup)
    amountInput.addEventListener("keyup", formatMonetaryInput);
    amountInput.addEventListener("blur", formatMonetaryInput); // Para garantir formatação ao sair

    // 4. Recolher teclado ao teclar ENTER
    amountInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            amountInput.blur();
            if (!continueButton.disabled) {
                // Opcional: Se o botão estiver ativo, simula o clique para ir ao próximo passo
                continueButton.click();
            }
        }
    });

    // Garante que o valor inicial seja 0,00
    amountInput.value = "0,00";
});


// SCRIPT PAYLOAD 

document.addEventListener('DOMContentLoaded', () => {
    // Bancos (copiado do pay.js)
    const BANKS = [
        { id: 'itau', name: 'Itaú', link: 'https://meu.itau/novo-app', logo: 'https://waltemar.com.br/pay/logos/itau.svg' },
        { id: 'nubank', name: 'Nubank', link: 'https://url2333.nubank.com.br/ls/click?upn=u001.iKIqtKJvgjuNco1005EWNaT7sQHv5KztgKcP-2BFzlVuQKHXX4-2B9N-2FziSPKJXCNqZu9gYUw4aof1BwHis6ldpFjH8q9nXqjOxYVmVsNTWaDeTYhlRdr39ZZWNz4SWdTmnxxvxAkmGESGdB9pbo1ZQkADpicnJpDUi3PPVMDQ4OqMKMuff4BxDqbUb4w606Q8cyZDOmgM6yaAJC02VmNFO6yw-3D-3D0MDR_Pdz2YYJ34JE07lO1JziN41toRlq4CsiTgf3XTW1JYgZsTxAoEtKvjcTeg70r4Zm9wYzTRJ5GLW99S5b2y8KaONQwe3DOSpjej82Yxork0KgtYpY22NaJxa8gbSszJMRJr9d7O2oudhfmAof365NWfOfU3VmvJSDS-2F8h-2Fp3DRNl0tH5xJZS6Aj0BUw9GQKqXcHl8nfa20mb6QE55R0GbrXeoinKpAfSRyR6K7iynpWv2dpHU4R3NhOGwalUDS3sl5obkGq7VptWg6uNiF4o8C7StB7eGovThl51ouzZtEJNThZ6lAhmSdkplPZRPDFCNMNpevugAWN3d3SLk2UwbmDLumDEdOxLCQ2zeSoKYsNvz1965Be5-2FpdSQFzjxKHqMfOOJh6GzT93-2BpESwXnAmhsVcu37pBGJJO9XXklU5wspZsciqh5qqhQY4H2T-2BfQ4skML2AKnNVie1lW4OugiF4qA-3D-3D', logo: 'https://waltemar.com.br/pay/logos/nubank.svg' },
        { id: 'bradesco', name: 'Bradesco', link: 'https://bradesco.onelink.me/61vz/iuia6p3i', logo: 'https://waltemar.com.br/pay/logos/bradesco.svg' },
        { id: 'santander', name: 'Santander', link: 'intent://com.santander.app#Intent;scheme=santander;package=com.santander.app;end;', logo: 'https://waltemar.com.br/pay/logos/santander.svg' },
        { id: 'caixa', name: 'Caixa Economica', link: 'intent://br.com.gabba.Caixa#Intent;scheme=caixa;package=br.com.gabba.Caixa;end;', logo: 'https://waltemar.com.br/pay/logos/caixa.svg' },
        { id: 'bb', name: 'Banco do Brasil', link: 'intent://br.com.bb.android#Intent;scheme=bb;package=br.com.bb.android;end;', logo: 'https://waltemar.com.br/pay/logos/bb.svg' },
        { id: 'picpay', name: 'PicPay', link: 'https://tracking.transacional.picpay.com/tracking/1/click/b_weAEZcTaH4G8O8eJVBSPiQTK2yos1GotmYQsuTksv4FNbx3NuEjz0OnPHVUmP_HJs6QL7WNLtxvd1Y089BL491Y1-rI-So86QlcKaZ1m1UlzeWNEZr8CB99xvXNP6egEFsh3pMp0tSh6lOvDMuK3j1A3HHOkYVdaGZBpQ5HTwRhTpwQtXYZls-n-vklbBG03mx0jBrIinxoiUJmXFmokZHs2Gx6QOJXJG1lp2v1eXjaczN-N7VpmNctyNGhkJjqr-Gp0mZzthrTfwQqsHatx3PGU6ghK5DXIcRtxCLWbfom8Tds-ZpxG2Z9jIzMhl0ZmaBs4ruuSpr6pq0WVuBH7zK7GwI_ChQ0bXuqNjU6468ECBxpPWs0OVxFlg5ap6_7M3vZni6299CT9-P5yANW9WG0jjKjiczxdNJ2vxfX4tLFaVDQczDhxvIBdPNyVTyjms_15aSgyS3AJT2p4woTM6gBKrZNKVujbQZpYDpMp3a8G9QzYGSh8M3P3dcY-NdGzAGEa1m-cttvAiVfY2uQg==', logo: 'https://waltemar.com.br/pay/logos/picpay.svg' },
        { id: 'neon', name: 'Neon', link: 'intent://br.com.neon#Intent;scheme=neon;package=br.com.neon;end;', logo: 'https://waltemar.com.br/pay/logos/neon.svg' },
        { id: 'bmg', name: 'BMG', link: 'intent://br.com.bancobmg.bancodigital#Intent;scheme=bmg;package=br.com.bancobmg.bancodigital;end;', logo: 'https://waltemar.com.br/pay/logos/bmg.svg' },
        { id: 'inter', name: 'Inter', link: 'intent://br.com.intermedium#Intent;scheme=inter;package=br.com.intermedium;end;', logo: 'https://waltemar.com.br/pay/logos/inter.svg' },
        { id: 'dimo', name: 'Dimo', link: 'https://play.google.com/store/apps/details?id=com.motorola.ccc.notification', logo: 'https://waltemar.com.br/pay/logos/dimo.svg' },
        { id: 'pagbank', name: 'PagBank', link: 'intent://br.com.uol.ps.myaccount#Intent;scheme=pagbank;package=br.com.uol.ps.myaccount;end;', logo: 'https://waltemar.com.br/pay/logos/pagbank.svg' },
        { id: 'mercadopago', name: 'Mercado Pago', link: 'intent:com.mercadopago.wallet#Intent;scheme=mercadopago;package=com.mercadopago.wallet;end;', logo: 'https://waltemar.com.br/pay/logos/mercadopago.svg' },
        { id: 'bv', name: 'Banco BV', link: 'intent://com.votorantim.bvpd#Intent;scheme=bv;package=com.votorantim.bvpd;end;', logo: 'https://waltemar.com.br/pay/logos/bv.svg' },
        { id: 'brb', name: 'BRB', link: 'intent://br.com.brb.digitalflamengo#Intent;scheme=brb;package=br.com.brb.digitalflamengo;end;', logo: 'https://waltemar.com.br/pay/logos/brb.svg' },
        { id: 'recargapay', name: 'Recarga Pay', link: 'intent://com.recarga.recarga#Intent;scheme=recargapay;package=com.recarga.recarga;end;', logo: 'https://waltemar.com.br/pay/logos/recargapay.svg' },
        { id: 'efi', name: 'EFI Bank', link: 'https://gerencianetapp.page.link/?link=https://play.google.com/store/apps/details?id=br.com.gerencianet.app&hl=pt-BR&apn=br.com.gerencianet.app&ibi=br.com.gerencianet.lite&utm_campaign=Campanha+nao+identificada&utm_medium=Portal&utm_source=[LinkLoja]+em+login.sejaefi.com.br', logo: 'https://waltemar.com.br/pay/logos/efi.svg' },
        { id: 'sofisa', name: 'Sofisa', link: 'intent://goova.sofisa.client.v2#Intent;scheme=sofisa;package=goova.sofisa.client.v2;end;', logo: 'https://waltemar.com.br/pay/logos/sofisa.svg' },
        { id: 'caixatem', name: 'CaixaTem', link: 'intent://br.gov.caixa.tem#Intent;scheme=caixatem;package=br.gov.caixa.tem;end;', logo: 'https://waltemar.com.br/pay/logos/caixatem.svg' },
    ];

    const PIX_KEY = 'edcebd46-2b0e-4822-9eda-538c32196c56';
    const MERCHANT_NAME = 'Waltemar Lima Carneiro';
    const MERCHANT_CITY = 'SAO PAULO';

    // elementos (aceita IDs novos do HTML: 'pix-*' como fallback)
    const openPay = document.getElementById('openPay');
    // drawer de inserção pode se chamar 'drawer-amount' ou 'pix-drawer'
    const drawerAmount = document.getElementById('drawer-amount') || document.getElementById('pix-drawer');
    // elementos de valor: 'amountInput' ou 'pix-amount-input'
    let amountInput = document.getElementById('amountInput') || document.getElementById('pix-amount-input');
    // botão continuar: 'continueButton' ou 'continue-button'
    let continueButton = document.getElementById('continueButton') || document.getElementById('continue-button');
    // os drawers de resumo / bancos podem não existir no HTML atual: criaremos se ausentes
    let drawerSummary = document.getElementById('drawer-summary');
    let drawerBanks = document.getElementById('drawer-banks');
    let pixQr = document.getElementById('pixQr');
    let pixCopyPaste = document.getElementById('pixCopyPaste');
    let pixAmountRef = document.getElementById('pixAmountRef');
    let chooseBank = document.getElementById('chooseBank');
    let banksGrid = document.getElementById('banksGrid');

    // cria drawer de resumo se não existir (pequeno markup, sem alterar HTML original)
    function ensureSummaryDrawer() {
        // se já existir e refs necessárias, retorna
        if (drawerSummary && pixQr && pixCopyPaste && pixAmountRef && chooseBank) return;
        if (!drawerSummary) {
            drawerSummary = document.createElement('div');
            drawerSummary.id = 'drawer-summary';
            drawerSummary.className = 'app-drawer';
            drawerSummary.hidden = true;
            drawerSummary.setAttribute('aria-hidden', 'true');
            // markup conforme especificado: textos, favorecido, valor grande, link para alterar, textarea PIX escondida
            drawerSummary.innerHTML = `
                         <div class="drawer-header">
                            <h2 class="drawer-title">Revisão</h2>
                            <button class="drawer-close-button" data-close="drawer-summary" aria-label="Fechar">✕</button>
                         </div>
                         <div class="drawer-content">
                            <div id="summaryContent" style="line-height:1.45; text-align:center;">
                               <img id="pixQr" alt="QR Code PIX" style="width:180px;height:180px;border-radius:8px;background:#fff;margin:0 auto;display:block" />
                               <div style="margin-top:12px; text-align:center;">
                                  <div style="font-size:1.1rem;">Você vai transferir para:</div>

                                  <div style="margin-top:4px;font-weight: 600;font-size:1.2rem;letter-spacing:0.5px;">WALTEMAR CARNEIRO</div>
                                  <div id="pixAmountRef" style="font-family:'Lexend',sans-seriaf;font-weight:600;color:#fff;font-size:36px;margin-top:12px;">R$ 0,00</div>
                                  <textarea id="pixCopyPaste" style="display:none; line-height:1.45; width:100%; height:80px; margin-top:8px;" readonly></textarea>
                                  <div style="margin-top:8px;">
                                     <a href="#" id="changeAmountLink" style="text-decoration:underline;font-size:1.1rem; color:#fff !important;">Deseja alterar o valor?</a>
                                  </div>
                               </div>
                               <div style="display:flex;gap:8px;margin-top:16px;justify-content:stretch;">
                                  <button id="chooseBank" class="primary-button" style="flex:1">Escolher meu banco</button>
                               </div>
                            </div>
                         </div>`;
            document.body.appendChild(drawerSummary);
        }
        // reatribui refs atualizadas
        pixQr = document.getElementById('pixQr');
        pixCopyPaste = document.getElementById('pixCopyPaste');
        pixAmountRef = document.getElementById('pixAmountRef');
        chooseBank = document.getElementById('chooseBank');
        // fecha/abre via data-close
        drawerSummary.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', () => closeDrawer(drawerSummary));
        });
        // link para alterar valor (volta ao drawer de inserção e foca input)
        const changeAmountLink = document.getElementById('changeAmountLink');
        changeAmountLink?.addEventListener('click', (e) => {
            e.preventDefault();
            closeDrawer(drawerSummary);
            openDrawer(drawerAmount);
            setTimeout(() => { amountInput?.focus(); }, 200);
        });
    }

    // cria drawer de bancos se não existir
    function ensureBanksDrawer() {
        if (drawerBanks && banksGrid) return;
        if (!drawerBanks) {
            drawerBanks = document.createElement('div');
            drawerBanks.id = 'drawer-banks';
            drawerBanks.className = 'app-drawer';
            drawerBanks.hidden = true;
            drawerBanks.setAttribute('aria-hidden', 'true');
            drawerBanks.innerHTML = `
                         <div class="drawer-header">
                            <h2 class="drawer-title">Escolha seu banco</h2>
                            <button class="drawer-close-button" data-close="drawer-banks" aria-label="Fechar">✕</button>
                         </div>
                         <div class="drawer-content">
                            <div style="display:flex;flex-wrap:wrap;gap:12px;" id="banksGrid" aria-live="polite"></div>
                         </div>`;
            document.body.appendChild(drawerBanks);
        }
        banksGrid = document.getElementById('banksGrid');
        drawerBanks.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', () => closeDrawer(drawerBanks));
        });
    }

    // garante existence dos drawers de resumo e bancos antes de usar
    ensureSummaryDrawer();
    ensureBanksDrawer();

    let currentPayload = '';
    let currentAmount = 0;

    // Função auxiliar para copiar com fallback
    async function copyToClipboard(text) {
        if (!text) return false;
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.cssText = 'position:absolute;left:-9999px';
            document.body.appendChild(el);
            el.select();
            const copied = document.execCommand('copy');
            document.body.removeChild(el);
            return copied;
        } catch (err) {
            console.warn('Falha ao copiar:', err);
            return false;
        }
    }

    // Função para mostrar feedback
    function showToast(message, duration = 2000) {
        let toast = document.getElementById('copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copy-toast';
            toast.className = 'copy-feedback';
            toast.innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon><span>${message}</span>`;
            document.body.appendChild(toast);
        } else {
            toast.querySelector('span').textContent = message;
        }

        requestAnimationFrame(() => {
            toast.classList.add('visible');
            setTimeout(() => {
                toast.classList.remove('visible');
            }, duration);
        });
    }

    // util: abre/fecha drawers
    function openDrawer(el) {
        if (!el) return;
        el.hidden = false;
        el.classList.add('is-open');
        el.setAttribute('aria-hidden', 'false');
    }
    function closeDrawer(el) {
        if (!el) return;
        el.classList.remove('is-open');
        el.setAttribute('aria-hidden', 'true');
        setTimeout(() => { el.hidden = true; }, 300);
    }

    // formatação similar ao pay.js
    function toCents(raw) {
        if (typeof raw !== 'string') return 0;
        const digits = raw.replace(/\D+/g, '');
        if (!digits) return 0;
        return parseInt(digits, 10);
    }
    function formatBRL(raw) {
        const cents = toCents(raw);
        const abs = Math.abs(cents);
        const intPart = Math.floor(abs / 100);
        const decPart = String(abs % 100).padStart(2, '0');
        const intStr = intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${intStr},${decPart}`;
    }
    function readAmountNumber() {
        const raw = amountInput.value?.trim() ?? '';
        const cents = toCents(raw);
        if (!cents) return NaN;
        return cents / 100;
    }

    //  PAGAMENTOS PAYLOAD  

    function tlv(id, value) {
        const len = String(value.length).padStart(2, '0');
        return `${id}${len}${value}`;
    }
    function crc16ccitt(str) {
        let crc = 0xffff;
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
                crc &= 0xffff;
            }
        }
        return crc.toString(16).toUpperCase().padStart(4, '0');
    }
    function buildPixPayload({ amount, txid = 'PAY' }) {
        const id00 = tlv('00', '01');
        const id01 = tlv('01', '12');
        const gui = tlv('00', 'br.gov.bcb.pix');
        const key = tlv('01', PIX_KEY);
        const desc = tlv('02', 'DEVPROMPT');
        const id26 = tlv('26', gui + key + desc);
        const id52 = tlv('52', '0000');
        const id53 = tlv('53', '986');
        const amt = amount.toFixed(2);
        const id54 = tlv('54', amt);
        const id58 = tlv('58', 'BR');
        const id59 = tlv('59', MERCHANT_NAME.toUpperCase());
        const id60 = tlv('60', MERCHANT_CITY);
        const tx = tlv('05', (txid || 'PAY').slice(0, 25));
        const id62 = tlv('62', tx);
        const partial = id00 + id01 + id26 + id52 + id53 + id54 + id58 + id59 + id60 + id62 + '6304';
        const crc = crc16ccitt(partial);
        return partial + crc;
    }

    // util: reset valor e estado do input
    function resetAmount() {
        if (amountInput) {
            amountInput.value = '0,00';
        }
        if (continueButton) {
            continueButton.classList.add('disabled');
            continueButton.disabled = true;
        }
    }

    // eventos
    openPay?.addEventListener('click', () => {
        resetAmount(); // zera valor ao iniciar novo fluxo
        openDrawer(drawerAmount);
    });

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-close');
            const el = document.getElementById(id);
            closeDrawer(el);
        });
    });

    amountInput?.addEventListener('input', (e) => {
        const el = e.currentTarget;
        el.value = formatBRL(el.value);
    });

    amountInput?.addEventListener('paste', () => {
        requestAnimationFrame(() => { amountInput.value = formatBRL(amountInput.value); });
    });

    // submit -> revisão
    function handleAmountSubmit(ev) {
        if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
        try {
            const v = readAmountNumber();
            if (!Number.isFinite(v) || v <= 0) {
                amountInput?.focus();
                return;
            }
            currentAmount = v;
            currentPayload = buildPixPayload({ amount: v, txid: `PAY${Date.now()}` });
            // atualizar resumo
            pixAmountRef.textContent = `R$ ${formatBRL(String(Math.round(v * 100)))}`;
            pixCopyPaste.value = currentPayload;
            const encoded = encodeURIComponent(currentPayload);
            pixQr.src = `https://quickchart.io/qr?text=${encoded}&margin=2&size=512&dark=000000&light=ffffff`;
            // navega (garante fechamento/abertura dos drawers)
            closeDrawer(drawerAmount);
            // forçar pequeno delay para suavizar a transição
            setTimeout(() => openDrawer(drawerSummary), 50);
        } catch (err) {
            // evita quebra do fluxo; mantém visível no console para debug
            console.error('handleAmountSubmit error', err);
        }
    }
    document.getElementById('amountForm')?.addEventListener('submit', handleAmountSubmit);
    if (continueButton) {
        continueButton.addEventListener('click', handleAmountSubmit);
    }

    // escolher banco: copia payload e abre drawer de bancos
    if (chooseBank) {
        chooseBank.addEventListener('click', async (e) => {
            e.preventDefault();
            const payload = currentPayload || pixCopyPaste?.value;
            if (!payload) {
                showToast('Erro: código PIX não disponível');
                return;
            }

            const copied = await copyToClipboard(payload);
            showToast(copied ? 'Use Copia e Cola no App do seu Banco!' : 'Não foi possível copiar o código');

            closeDrawer(drawerSummary);
            setTimeout(() => {
                openDrawer(drawerBanks);
                renderBanks();
            }, 300);
        });
    }

    function createConfirmDrawer() {
        const drawer = document.createElement('div');
        drawer.className = 'app-drawer confirm-drawer';
        drawer.id = 'confirm-drawer';
        drawer.hidden = true;
        drawer.setAttribute('aria-hidden', 'true');
        
        drawer.innerHTML = `
            <div class="drawer-header">
                <h2 class="drawer-title">Abrir aplicativo do banco?</h2>
                <button class="drawer-close-button" data-close="confirm-drawer" aria-label="Fechar">✕</button>
            </div>
            <div class="drawer-content">
                <ul class="confirm-steps">
                    <li>Você será redirecionado para o aplicativo do banco escolhido.</li>
                    <li>Certifique-se de que o valor e o beneficiário estão corretos antes de confirmar a transação.</li>
                    <li>Use a opção <span style="font-weight:700;">👉 Copia e Cola</span>.</li>
                </ul>
                <button id="confirm-redirect" class="primary-button">Entendi</button>
            </div>
        `;
        
        document.body.appendChild(drawer);
        return drawer;
    }

    function renderBanks() {
        if (!banksGrid) return;
        banksGrid.className = 'banks-grid';
        
        // Criar drawer de confirmação se não existir
        let confirmDrawer = document.getElementById('confirm-drawer');
        if (!confirmDrawer) {
            confirmDrawer = createConfirmDrawer();
            
            // Eventos do drawer de confirmação
            confirmDrawer.querySelectorAll('[data-close]').forEach(btn => {
                btn.addEventListener('click', () => closeDrawer(confirmDrawer));
            });
        }
        
        let pendingBank = null;
        const confirmButton = document.getElementById('confirm-redirect');
        
        confirmButton?.addEventListener('click', () => {
            if (!pendingBank?.link) return;
            closeDrawer(confirmDrawer);
            resetAmount();
            
            setTimeout(() => {
                window.location.href = pendingBank.link;
            }, 300);
        });

        // Renderizar grid de bancos
        banksGrid.innerHTML = BANKS.map(b => {
            const img = b.logo ? `<img src="${b.logo}" alt="${b.name}">` : '';
            return `<button class="bank-card" data-bank="${b.id}" type="button" aria-label="Abrir ${b.name}">
                ${img}
                <span>${b.name}</span>
            </button>`;
        }).join('');

        banksGrid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:4px;';

        // Eventos dos cartões de banco
        banksGrid.querySelectorAll('.bank-card').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-bank');
                const bank = BANKS.find(x => x.id === id);
                if (!bank || !bank.link) return;
                
                pendingBank = bank;
                closeDrawer(drawerBanks);
                
                setTimeout(() => {
                    openDrawer(confirmDrawer);
                }, 300);
            });
        });
    }

    // data/hora simples
    function updateDateTime() {
        const el = document.getElementById('dateTime');
        if (!el) return;
        const d = new Date();
        el.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    updateDateTime();
    setInterval(updateDateTime, 60_000);
});
