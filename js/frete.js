// Arquivo: js/frete.js

document.addEventListener('DOMContentLoaded', () => {
    const inputCep = document.getElementById('inputCep');
    const btnCalcularFrete = document.getElementById('btnCalcularFrete');
    const divResultado = document.getElementById('resultadoFrete');

    if (inputCep && btnCalcularFrete && divResultado) {

        // Máscara do CEP
        inputCep.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });

        function calcularDataPrevisao(diasUteis) {
            let data = new Date();
            let diasAdicionados = 0;

            while (diasAdicionados < diasUteis) {
                data.setDate(data.getDate() + 1);
                // Pula Sábado (6) e Domingo (0)
                if (data.getDay() !== 0 && data.getDay() !== 6) {
                    diasAdicionados++;
                }
            }

            // Formata a data para DD/MM/AAAA
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }

        btnCalcularFrete.addEventListener('click', async () => {
            const cep = inputCep.value;

            if (cep.length < 9) {
                divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px;'>Por favor, digite um CEP válido.</span>";
                return;
            }

            divResultado.innerHTML = "<span style='color: #666; font-size: 13px;'>Calculando prazos e preços...</span>";

            try {
                const resposta = await fetch('/api/frete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cepDestino: cep })
                });

                if (!resposta.ok) throw new Error('Erro na API');

                const transportadoras = await resposta.json();
                divResultado.innerHTML = '';

                if (!transportadoras || transportadoras.error || transportadoras.length === 0) {
                    divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px;'>Não conseguimos cotar para este CEP.</span>";
                    return;
                }

                const transportadorasDesejadas = ["PAC", "SEDEX", ".Package", ".Com"];

                let htmlOpcoes = `<div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">`;

                transportadoras.forEach(opcao => {
                    if (!opcao.error && transportadorasDesejadas.some(nome => opcao.name.includes(nome))) {

                        let nomeExibicao = opcao.name.toUpperCase();
                        if (nomeExibicao.includes('.PACKAGE')) nomeExibicao = "JADLOG PACKAGE";
                        if (nomeExibicao.includes('.COM')) nomeExibicao = "JADLOG COM";

                        const previsaoData = calcularDataPrevisao(opcao.delivery_time);

                        htmlOpcoes += `
                            <div style="padding: 12px 0; border-bottom: 1px solid #eee; font-family: 'Inter', sans-serif;">
                                <span style="font-weight: 600; font-size: 14px; color: #333;">${nomeExibicao}</span>
                                <span style="font-weight: 600; font-size: 14px; color: #333;"> - R$ ${opcao.price}</span>
                                <span style="font-size: 13px; color: #555;"> - até ${opcao.delivery_time} dias úteis - Previsão ${previsaoData}</span>
                            </div>
                        `;
                    }
                });

                htmlOpcoes += `
                    <div style="padding: 12px 0; border-bottom: 1px solid #eee; font-family: 'Inter', sans-serif;">
                        <span style="font-weight: 600; font-size: 14px; color: #333;">FRETE A COMBINAR - EXCURSÕES</span>
                        <span style="font-size: 13px; color: #555; display: block; margin-top: 4px;">Você poderá combinar com o vendedor antes ou após a compra.</span>
                        <span style="font-size: 11px; color: #666; display: block; margin-top: 4px; text-transform: uppercase;">Para envios de excursões (Ônibus). Informar ao vendedor antes finalizar a compra.</span>
                    </div>
                `;

                htmlOpcoes += `</div>`;
                divResultado.innerHTML = htmlOpcoes;

            } catch (erro) {
                divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px;'>Erro ao conectar com as transportadoras.</span>";
            }
        });
    }
});