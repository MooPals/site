// Sélectionnez les éléments du DOM
const navLinks = document.querySelector('.nav-links');
const termsButton = document.getElementById('terms-button');
const termsModal = document.getElementById('terms-modal');
const discordModal = document.getElementById('discord-modal');


// Ajoutez un gestionnaire d'événements pour ouvrir la modale des Termes et Conditions
termsButton.addEventListener('click', () => {
    termsModal.style.display = 'block';
});

// Ajoutez un gestionnaire d'événements pour fermer la modale des Termes et Conditions
termsModal.addEventListener('click', (event) => {
    if (event.target === termsModal) {
        termsModal.style.display = 'none';
    }
});

// Ajoutez un gestionnaire d'événements pour fermer la modale Discord
discordModal.addEventListener('click', (event) => {
    if (event.target === discordModal) {
        discordModal.style.display = 'none';
    }
});

// Fermez la modale des Termes et Conditions lorsque l'utilisateur appuie sur la touche "Escape"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        termsModal.style.display = 'none';
    }
});


// Ajout de la classe active à la page actuellement consultée
// Récupérez l'URL de la page actuelle
const currentPage = location.href;

// Sélectionnez toutes les balises <a> dans la liste de navigation
const allAs = document.querySelectorAll('a');
const allAsLength = allAs.length;

// Parcourez toutes les balises <a> pour trouver celle correspondant à la page actuelle
for (let i = 0; i < allAsLength; i++) {
    // Vérifiez si l'attribut href de la balise <a> correspond à la page actuelle
    if (allAs[i].href === currentPage) {
        // Ajoutez la classe "active" à la balise <li> parente de la balise <a>
        const listItem = allAs[i].parentNode; // Sélectionnez le parent <li>
        if (listItem && listItem.tagName === 'LI') {
            listItem.classList.add('active');
        }
    }
}


//Gestion du fade-in
// Fonction pour vérifier si un élément est au moins partiellement dans la fenêtre visible
function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Fonction pour activer l'effet de fondu sur les éléments visibles
function activateFadeIn() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach((el) => {
        if (isElementPartiallyInViewport(el)) {
            el.classList.add('active');
        }
    });
}

// Déclenchez l'animation pour tous les éléments visibles au chargement de la page
window.addEventListener('DOMContentLoaded', activateFadeIn);

// Ajoutez un gestionnaire d'événements pour le défilement de la page
window.addEventListener('scroll', activateFadeIn);

// FAQ

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.nextElementSibling;
  const icon = item.querySelector('i');

  item.addEventListener('click', () => {
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        const otherAnswer = otherItem.nextElementSibling;
        const otherIcon = otherItem.querySelector('i');

        otherAnswer.classList.remove('active');
        otherIcon.classList.remove('active');
        otherAnswer.style.maxHeight = "0";
      }
    });

    answer.classList.toggle('active');
    icon.classList.toggle('active');
    if (answer.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = "0";
    }
  });
});

function showDiscordMessage() {
    // Contenu du message
    const message = "🚧 Our Discord is in restricted access! Follow us on X and activate notifications to be sure not to miss the next opportunity to be part of our Discord!";
  
    // Affichage du message
    alert(message);
  }

  function showDiscordPopup() {
    // Affichage de la fenêtre modale
    document.getElementById('discord-modal').style.display = 'block';
  }
  
  function closeDiscordPopup() {
    // Fermeture de la fenêtre modale
    document.getElementById('discord-modal').style.display = 'none';
  }

