// JavaScript pour dynamiquement définir la progression
let progress = 0;
const maxSupply = 2222;
const progression = document.getElementById('progression');

// Appeler la fonction fetchProgress au chargement de la page pour récupérer la valeur initiale
fetchProgress();

// Fonction pour effectuer la requête API et mettre à jour la barre de progression
function fetchProgress() {
    console.log("call api")
    axios.get('https://api.routescan.io/v2/network/mainnet/evm/43114/erc721/0x779480Fe133354fcb0536ce30Ae51E63106FDca1/tokens?count=true&limit=1')
        .then(function(response) {
            // Récupérer la valeur actuelle de la progression de mint depuis la réponse de l'API
            const mintedNFTs = response.data.count;
            progress = (mintedNFTs / maxSupply) * 100;

            // Mettre à jour la propriété CSS
            document.documentElement.style.setProperty('--progress', `-${110 + progress}%`);

            // Mettre à jour l'affichage de la progression en pourcentage
            progression.textContent = `${Math.round(progress)}%`;
            
            // Mettre à jour l'affichage du nombre de NFTs mintés
            const mintedInfo = document.getElementById('minted');
            mintedInfo.innerHTML = `<i class="fa-solid fa-bars-progress"></i> ${mintedNFTs} NFTs • <i class="fa-solid fa-flag-checkered"></i> ${maxSupply} NFTs`;
        })
        .catch(function(error) {
            console.error('Erreur lors de la récupération de la progression de mint:', error);
        });
}
