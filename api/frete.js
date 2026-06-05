// Arquivo: api/frete.js
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // Essa rota só pode receber requisições do tipo POST (que enviam dados)
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ erro: 'Corpo inválido.' }), { status: 400 });
    }

    const { cepDestino } = body;

    if (!cepDestino) {
        return new Response(JSON.stringify({ erro: 'CEP de destino não informado.' }), { status: 400 });
    }

    const cepLimpo = cepDestino.replace(/\D/g, '');
    const tokenMelhorEnvio = process.env.MELHOR_ENVIO_TOKEN;
    const cepOrigem = "87030201";

    const gerarFreteEstimado = () => ([
        { name: 'PAC', price: '14,90', delivery_time: 8, estimated: true },
        { name: 'SEDEX', price: '24,90', delivery_time: 4, estimated: true },
        { name: 'JADLOG PACKAGE', price: '19,90', delivery_time: 6, estimated: true },
        { name: 'JADLOG COM', price: '22,90', delivery_time: 5, estimated: true },
        { name: 'TOTAL EXPRESS', price: '21,90', delivery_time: 5, estimated: true },
        { name: 'BUSLOG', price: '18,90', delivery_time: 7, estimated: true }
    ]);

    if (!tokenMelhorEnvio) {
        return res.status(200).json(gerarFreteEstimado());
    }

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
            return res.status(200).json(gerarFreteEstimado());
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            return res.status(200).json(gerarFreteEstimado());
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Erro interno na Vercel Function:", error);
        return res.status(200).json(gerarFreteEstimado());
    }
}
