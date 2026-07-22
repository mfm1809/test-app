const { app } = require('@azure/functions');

app.http('getDatiAziendali', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            // Azure legge l'URL e il Token dal suo pannello interno protetto
            const baseUrl = process.env.MIDDLEWARE_BASE_URL;
            const tokenSegreto = process.env.MIDDLEWARE_API_TOKEN;

            // Simuliamo il blocco di sicurezza se le variabili su Azure non sono settate
            if (!baseUrl || !tokenSegreto) {
                return { status: 500, jsonBody: { errore: "Configurazione di Azure mancante!" } };
            }

            // Il server di Azure fa la chiamata al finto middleware inserendo il token nell'Header
            const rispostaMiddleware = await fetch(`${baseUrl}/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenSegreto}`,
                    'Content-Type': 'application/json'
                }
            });

            const utentiGrezzi = await rispostaMiddleware.json();

            // Mappiamo i dati per restituire a React solo informazioni pulite
            const utentiPuliti = utentiGrezzi.map(utente => ({
                id: utente.id,
                nomeAzienda: utente.company.name,
                citta: utente.address.city
            }));

            return { jsonBody: utentiPuliti };

        } catch (errore) {
            return { status: 500, jsonBody: { errore: "Errore durante la triangolazione dei dati" } };
        }
    }
});