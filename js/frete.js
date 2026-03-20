
document.addEventListener('DOMContentLoaded', () => {
    const inputCep = document.getElementById('inputCep');
    const btnCalcularFrete = document.getElementById('btnCalcularFrete');
    const divResultado = document.getElementById('resultadoFrete');

    if (inputCep && btnCalcularFrete && divResultado) {

        inputCep.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });

        btnCalcularFrete.addEventListener('click', async () => {
            const cep = inputCep.value;

            if (cep.length < 9) {
                divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px; font-weight: 500;'>Por favor, digite um CEP válido com 8 números.</span>";
                return;
            }

            divResultado.innerHTML = "<span style='color: #666; font-size: 13px;'>Calculando as melhores opções... 🚚</span>";

            try {
                const resposta = await fetch('/api/frete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cepDestino: cep })
                });

                if (!resposta.ok) {
                    throw new Error('Erro na comunicação com a API de frete.');
                }

                const transportadoras = await resposta.json();

                divResultado.innerHTML = '';

                if (!transportadoras || transportadoras.error || transportadoras.length === 0) {
                    divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px; font-weight: 500;'>Não conseguimos cotar para este CEP no momento. Verifique se o CEP está correto.</span>";
                    return;
                }

                transportadoras.forEach(opcao => {
                    if (!opcao.error) {
                        const htmlOpcao = `
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 10px 0; font-size: 14px;">
                                <div>
                                    <span style="font-weight: 600; display: block;">${opcao.name}</span>
                                    <span style="color: #666; font-size: 12px;">Chega em até ${opcao.delivery_time} dias úteis</span>
                                </div>
                                <span style="color: #00a650; font-weight: 700; font-size: 15px;">R$ ${opcao.price}</span>
                            </div>
                        `;
                        divResultado.innerHTML += htmlOpcao;
                    }
                });

            } catch (erro) {
                console.error("Erro no cálculo de frete:", erro);
                divResultado.innerHTML = "<span style='color: #d32f2f; font-size: 13px; font-weight: 500;'>Ocorreu um erro ao conectar com as transportadoras. Tente novamente mais tarde.</span>";
            }
        });
    }
});