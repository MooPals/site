document.addEventListener('DOMContentLoaded', function () {
  // Récupérer les liens
  var link = document.getElementById('tothehome');

  // Récupérer l'élément audio
  var mooSound = document.getElementById('mooSound');

  // Récupérer le bouton de skip
  var skipButton = document.querySelector('.skip-button');

  // Fonction pour jouer le bruit de vache
  function playMooSound() {
    // Vérifier si l'audio est pris en charge et prêt à être joué
    if (mooSound && typeof mooSound.play === 'function') {
      // Rejouer le son depuis le début à chaque clic
      mooSound.currentTime = 0;
      mooSound.play();

      // Retarder la redirection de 3 secondes après le son
      setTimeout(function () {
        // Effectuer la redirection après le délai
        window.location.href = "home.html";
      }, 2000);
    }
  }

  // Fonction pour passer l'introduction
  function skipIntro() {
    // Effectuer la redirection immédiatement
    window.location.href = "home.html";
  }

  // Ajouter l'événement de clic pour le bouton de skip
  skipButton.addEventListener('click', skipIntro);

  // Automatiquement déclencher la fonction skip après 12 secondes
  setTimeout(skipIntro, 8000);

  // Ajouter l'événement de clic pour le lien
  link.addEventListener('click', playMooSound);
});