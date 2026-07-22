const { app } = require('@azure/functions');

app.http('getSecretData', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // QUESTA VARIABILE VIENE LETTA SUL SERVER, L'UTENTE NON PUÒ VEDERLA!
        const secretKey = process.env.CHIAVE_SEGRETA_PROD; 

        return { 
            jsonBody: { 
                messaggio: "Dati recuperati in modo sicuro dal server!",
                configurazioneUsata: secretKey || "Nessuna chiave trovata"
            } 
        };
    }
});