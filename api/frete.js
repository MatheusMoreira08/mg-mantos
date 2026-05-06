export default async function handler(request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ erro: 'Método não permitido.' }), { status: 405 });
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
            return new Response(JSON.stringify({ erro: 'Falha ao cotar no Melhor Envio.' }), { status: response.status });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error("Erro interno na Vercel Function:", error);
        return new Response(JSON.stringify({ erro: 'Erro interno no servidor ao calcular o frete.' }), { status: 500 });
    }
}
