// Arquivo: api/frete.js
export default async function handler(req, res) {
    // Essa rota só pode receber requisições do tipo POST (que enviam dados)
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

    // Pega o CEP que o front-end (frete.js) enviou
    const { cepDestino } = req.body;

    if (!cepDestino) {
        return res.status(400).json({ erro: 'CEP de destino não informado.' });
    }

    const cepLimpo = cepDestino.replace(/\D/g, '');
    const tokenMelhorEnvio = process.env.MELHOR_ENVIO_TOKEN;
    const cepOrigem = "87600000";

    const urlApiMelhorEnvio = "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate";

    const payload = {
        from: {
            postal_code: cepOrigem
        },
        to: {
            postal_code: cepLimpo
        },
        products: [
            {
                id: "x",
                width: 20,
                height: 5,
                length: 25,
                weight: 0.3,
                insurance_value: 129.90,
                quantity: 1
            }
        ]
    };

    try {
        const response = await fetch(urlApiMelhorEnvio, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenMelhorEnvio}`,
                'User-Agent': 'MGMantos'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Erro retornado pelo Melhor Envio:", response.status);
            return res.status(response.status).json({ erro: 'Falha ao cotar no Melhor Envio.' });
        }

        const data = await response.json();

        return res.status(200).json(data);

    } catch (error) {
        console.error("Erro interno na Vercel Function:", error);
        return res.status(500).json({ erro: 'Erro interno no servidor ao calcular o frete.' });
    }
}