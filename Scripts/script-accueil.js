// Menu déroulant

const menuButton = document.querySelector('.open-menu');
  const menu = document.querySelector('.menu-deroulant');

  menuButton.addEventListener('click', () => {
    if (menu.classList.contains('visible')) {
        document.querySelectorAll('.popup').forEach(p => p.classList.add('hidden'));

        menu.classList.remove('visible');
        menu.classList.add('hiding');

        setTimeout(() => {
            menu.classList.remove('hiding');
            menu.classList.add('hidden');
        }, 500);
    } else {
        menu.classList.remove('hidden');
        menu.classList.add('visible');
    }
});

// Panier accueil

document.addEventListener('DOMContentLoaded', () => {
    const boutonPanierAccueil = document.querySelector('.bouton-panier-accueil');
    const panier = JSON.parse(localStorage.getItem('panierABGY'));

    if (boutonPanierAccueil && panier && panier.length > 0) {
        boutonPanierAccueil.classList.remove('hidden');
    }
});

// Popups Footer

let lastFocusedLink = null;

document.querySelectorAll('.down-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const popupClass = link.getAttribute('data-popup');
        const popup = document.querySelector(`.popup.${popupClass}`);

        if (!popup) return;

        const isVisible = !popup.classList.contains('hidden');

        document.querySelectorAll('.popup').forEach(p => p.classList.add('hidden'));

        if (!isVisible) {
            popup.classList.remove('hidden');
            popup.classList.add('visible');
            popup.setAttribute('tabindex', '-1');
            popup.focus();
        }
    });
});

//fermeture des popups intuitive

document.addEventListener('click', (e) => {
    const isPopup = e.target.closest('.popup');
    const isLink = e.target.closest('.down-link');

    if (!isPopup && !isLink) {
        document.querySelectorAll('.popup').forEach(p => p.classList.add('hidden'));
        if (lastFocusedLink) {
            lastFocusedLink.focus();
        }
    }
});

// Accessibilité

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        const popups = document.querySelectorAll(".popup");
        popups.forEach(popup => popup.classList.add("hidden"));

        if (lastFocusedLink) {
            lastFocusedLink.focus();
        }
    }
});