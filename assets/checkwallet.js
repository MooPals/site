// Fonction pour vérifier l'éligibilité du portefeuille
function checkEligibility() {
    // Masquer tous les résultats
    document.getElementById('wl-result').style.display = 'none';
    document.getElementById('og-result').style.display = 'none';
    document.getElementById('none-result').style.display = 'none';

    const walletAddress = document.getElementById('walletAddress').value;
    const spreadsheetId = '1h-aQ8jzjIaB5VqaWwJhTmpoCkgsS8_WDH6nk20xFqEw';
    const rangeWL = 'Wallets!A:A';
    const rangeOG = 'OG!A:A';
    const apiKey = "AIzaSyB0yfQGJoAFY0YU89LHp16X5Ki8UBPoXcE";

    // Requête pour vérifier si le portefeuille est dans la liste OG
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangeOG}`, {
        params: {
            key: apiKey
        }
    })
    .then(function(response) {
        const wallets = response.data.values.flat();
        if (wallets.includes(walletAddress)) {
            // Afficher le résultat pour OG
            document.getElementById('og-result').style.display = 'block';
        } else {
            // Requête pour vérifier si le portefeuille est dans la liste WL
            axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangeWL}`, {
                params: {
                    key: apiKey
                }
            })
            .then(function(response) {
                const wallets = response.data.values.flat();
                if (wallets.includes(walletAddress)) {
                    // Afficher le résultat pour WL
                    document.getElementById('wl-result').style.display = 'block';
                } else {
                    // Afficher le résultat pour aucun
                    document.getElementById('none-result').style.display = 'block';
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