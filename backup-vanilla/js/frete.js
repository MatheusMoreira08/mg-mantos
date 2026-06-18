document.addEventListener('DOMContentLoaded', () => {
    const inputCep = document.getElementById('inputCep');
    const btnCalcularFrete = document.getElementById('btnCalcularFrete');
    const divResultado = document.getElementById('resultadoFrete');

    const endpoints = [
        '/api/frete',
        'https://mg-mantos.vercel.app/api/frete'
    ];

    if (inputCep && btnCalcularFrete && divResultado) {

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
                if (data.getDay() !== 0 && data.getDay() !== 6) {
                    diasAdicionados++;
                }
            }

            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }

        async function consultarFrete(cep) {
            let ultimoErro = null;

            for (const endpoint of endpoints) {
                try {
                    const resposta = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cepDestino: cep })
                    });

                    if (!resposta.ok) {
                        throw new Error(`HTTP ${resposta.status}`);
                    }

                    return await resposta.json();
                } catch (erro) {
                    ultimoErro = erro;
                }
            }

            throw ultimoErro || new Error('Falha ao consultar frete');
        }

        btnCalcularFrete.addEventListener('click', async () => {
            const cep = inputCep.value;

            if (cep.length < 9) {
                divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px;'>Por favor, digite um CEP válido.</span>";
                return;
            }

            divResultado.innerHTML = "<span style='font-size: 13px; color: inherit; opacity: 0.7;'>Calculando prazos e preços...</span>";

            try {
                const transportadoras = await consultarFrete(cep);
                divResultado.innerHTML = '';

                if (!transportadoras || transportadoras.error || transportadoras.length === 0) {
                    divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px;'>Não conseguimos cotar para este CEP.</span>";
                    return;
                }

const transportadorasDesejadas = ["PAC", "SEDEX", "JADLOG", "JADLOG PACKAGE", "JADLOG COM", ".Package", ".Com", "Total Express", "Buslog"];
                const transportadorasVistas = new Set();
                let htmlOpcoes = `<div style="margin-top: 20px; border-top: 1px solid var(--border-color, #444); padding-top: 15px;">`;

                transportadoras.forEach(opcao => {
                    if (!opcao.error && transportadorasDesejadas.some(nome => opcao.name.toLowerCase().includes(nome.toLowerCase()))) {

                        let nomeExibicao = opcao.name.toUpperCase();
                        if (nomeExibicao.includes('.PACKAGE')) nomeExibicao = "JADLOG PACKAGE";
                        if (nomeExibicao.includes('.COM')) nomeExibicao = "JADLOG COM";
                        if (nomeExibicao.includes('TOTAL EXPRESS')) nomeExibicao = "TOTAL EXPRESS";
                        if (nomeExibicao.includes('BUSLOG')) nomeExibicao = "BUSLOG";
                        if (transportadorasVistas.has(nomeExibicao)) return;

                        transportadorasVistas.add(nomeExibicao);

                        const previsaoData = calcularDataPrevisao(opcao.delivery_time);

                        htmlOpcoes += `
                            <div style="padding: 12px 0; border-bottom: 1px solid var(--border-color, #444); font-family: 'Inter', sans-serif;">
                                <span style="font-weight: 600; font-size: 14px; color: inherit;">${nomeExibicao}</span>
                                <span style="font-weight: 600; font-size: 14px; color: inherit;"> - R$ ${opcao.price}</span>
                                <span style="font-size: 13px; color: inherit; opacity: 0.7;"> - até ${opcao.delivery_time} dias úteis - Previsão ${previsaoData}</span>
                            </div>
                        `;
                    }
                });

                htmlOpcoes += `</div>`;
                divResultado.innerHTML = htmlOpcoes;

            } catch (erro) {
                divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px;'>Não foi possível consultar o frete agora. Tente novamente em instantes.</span>";
            }
        });
    }
});