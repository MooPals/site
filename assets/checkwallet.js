function checkEligibility() {
    // Masquer tous les résultats par défaut
    document.getElementById("og-result").classList.add("hidden");
    document.getElementById("wl-result").classList.add("hidden");
    document.getElementById("none-result").classList.add("hidden");
    document.getElementById("OGNotEligible").classList.add("hidden");
    document.getElementById("OGEligible").classList.add("hidden");
    document.getElementById("WLNotEligible").classList.add("hidden");
    document.getElementById("WLEligible").classList.add("hidden");
    document.getElementById("PublicEligible").classList.add("hidden");
    document.getElementById("WLStep").classList.remove("checkgreen");
    document.getElementById("WLStep").classList.remove("checkred");
    document.getElementById("OGStep").classList.remove("checkgreen");
    document.getElementById("OGStep").classList.remove("checkred");
    document.getElementById("PublicStep").classList.remove("checkgreen");

    

    const walletAddress = document.getElementById('walletAddress').value.toLowerCase(); // Convertir en minuscules
    const spreadsheetId = '1h-aQ8jzjIaB5VqaWwJhTmpoCkgsS8_WDH6nk20xFqEw';
    const rangeWL = 'Wallets!A:A';
    const rangeOG = 'OG!A:A';
    const apiKey = "AIzaSyB0yfQGJoAFY0YU89LHp16X5Ki8UBPoXcE";

    // Vérification de la longueur et du préfixe de l'adresse du portefeuille
    if (walletAddress.length !== 42 || !walletAddress.startsWith('0x')) {
        alert("The wallet has not a valid wallet address");
        return; // Arrête l'exécution de la fonction si l'adresse n'est pas valide
    }

    // Requête pour vérifier si le portefeuille est dans la liste OG
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangeOG}`, {
        params: { key: apiKey }
    })
    .then(function(response) {
        const wallets = response.data.values.flat().map(wallet => wallet.toLowerCase()); // Convertir chaque portefeuille en minuscules
        if (wallets.includes(walletAddress)) {
            // Afficher le résultat pour OG
            document.getElementById("og-result").classList.remove("hidden");
            document.getElementById("WLEligible").classList.remove("hidden");
            document.getElementById("OGEligible").classList.remove("hidden");
            document.getElementById("PublicEligible").classList.remove("hidden");
            document.getElementById("OGStep").classList.add("checkgreen");
            document.getElementById("WLStep").classList.add("checkgreen");
            document.getElementById("PublicStep").classList.add("checkgreen");
        } else {
            // Requête pour vérifier si le portefeuille est dans la liste WL
            axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangeWL}`, {
                params: { key: apiKey }
            })
            .then(function(response) {
                const wallets = response.data.values.flat().map(wallet => wallet.toLowerCase()); // Convertir chaque portefeuille en minuscules
                if (wallets.includes(walletAddress)) {
                    // Afficher le résultat pour WL
                    document.getElementById("wl-result").classList.remove("hidden");
                    document.getElementById("OGNotEligible").classList.remove("hidden");
                    document.getElementById("WLEligible").classList.remove("hidden");
                    document.getElementById("PublicEligible").classList.remove("hidden");
                    document.getElementById("OGStep").classList.add("checkred");
                    document.getElementById("WLStep").classList.add("checkgreen");
                    document.getElementById("PublicStep").classList.add("checkgreen");
                    
                } else {
                    // Afficher le résultat pour aucun
                    document.getElementById("none-result").classList.remove("hidden");
                    document.getElementById("OGNotEligible").classList.remove("hidden");
                    document.getElementById("WLNotEligible").classList.remove("hidden");
                    document.getElementById("PublicEligible").classList.remove("hidden");
                    document.getElementById("OGStep").classList.add("checkred");
                    document.getElementById("WLStep").classList.add("checkred");
                    document.getElementById("PublicStep").classList.add("checkgreen");
                }
            })
            .catch(function(error) {
                console.error('Erreur lors de la récupération des données WL:', error);
            });
        }
    })
    .catch(function(error) {
        console.error('Erreur lors de la récupération des données OG:', error);
    });
}
