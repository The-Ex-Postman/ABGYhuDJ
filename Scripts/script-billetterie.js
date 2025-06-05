// Ouverture du panier

const boutonPanier = document.querySelector('.panier');
const popupPanier = document.getElementById('popup-panier');
let panierOuvert = false;

boutonPanier.addEventListener('click', () => {
    panierOuvert = !panierOuvert;
    popupPanier.classList.toggle('hidden-panier');
    popupPanier.setAttribute('tabindex', '-1');

    if (panierOuvert) {
        popupPanier.focus();
        boutonPanier.setAttribute('aria-expanded', 'true');
    } else {
        boutonPanier.setAttribute('aria-expanded', 'false');
    }
});


document.addEventListener('click', (e) => {
    if (panierOuvert) {
        const isInside = e.target.closest('#popup-panier') || e.target.closest('.panier');
        if (!isInside) {
            popupPanier.classList.add('hidden-panier');
            panierOuvert = false;
            boutonPanier.setAttribute('aria-expanded', 'false');
        }
    }
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panierOuvert) {
        popupPanier.classList.add('hidden-panier');
        panierOuvert = false;
        boutonPanier.setAttribute('aria-expanded', 'false');
        boutonPanier.focus();
    }
});

// Déroulants

const boutons = document.querySelectorAll('.deroulant');

boutons.forEach(bouton => {
  bouton.addEventListener('click', () => {
    const id = bouton.getAttribute('aria-controls');
    const bloc = document.getElementById(id);
    bloc.classList.toggle('visible');
  });
});

// Gestion dynamique du panier

const boutonAjout = document.querySelectorAll('.ajout-panier');
const contenuPanier = document.querySelector('.nombre-places');
const prixUnitaire = document.querySelector('.prix-place');
const totalFinal = document.querySelector('.total');

let panier = JSON.parse(localStorage.getItem('panierABGY')) || [];
mettreAJourPanier();

boutonAjout.forEach(btn => {
    btn.addEventListener('click', () => {
        const vignette = btn.closest('.vignette');
        const ville = vignette.querySelector('h3').textContent;

        const inputDebout = vignette.querySelector(`input[id^="quantite-debout"]`);
        const inputAssis = vignette.querySelector(`input[id^="quantite-assis"]`);

        const qteDebout = parseInt(inputDebout.value) || 0;
        const qteAssis = parseInt(inputAssis.value) || 0;

        const messageErreur = vignette.querySelector('.message-erreur');
        console.log(messageErreur);

        inputDebout.classList.remove('erreur');
        inputAssis.classList.remove('erreur');
        messageErreur.style.display = 'none';
        messageErreur.textContent = '';

        if ((qteDebout < 0 || qteAssis < 0) || (qteDebout === 0 && qteAssis === 0)) {
            messageErreur.textContent = "Veuillez sélectionner au moins un billet valide.";
            messageErreur.style.display = 'block';
            if (qteDebout <= 0) inputDebout.classList.add('erreur');
            if (qteAssis <= 0) inputAssis.classList.add('erreur');
            return;
        }
        const index = panier.findIndex(item => item.ville === ville);
        if (index !== -1) {
            panier[index].debout += qteDebout;
            panier[index].assis += qteAssis;
        } else {
            panier.push({ ville, debout: qteDebout, assis: qteAssis });
        }

        inputDebout.value = '';
        inputAssis.value = '';

        mettreAJourPanier();

        const blocDeroulant = vignette.querySelector('.toogle-deroulant');
        const boutonToggle = vignette.querySelector('.deroulant');
        blocDeroulant.classList.remove('visible');
        boutonToggle.setAttribute('aria-expanded', 'false');
    });
});

function mettreAJourPanier() {

    const boutonPanier = document.querySelector('.panier');

    if (panier.length === 0) {
        boutonPanier.textContent = "Panier";
        contenuPanier.textContent = "Aucun billet sélectionné";
        prixUnitaire.textContent = "Prix unitaire : 0€";
        totalFinal.textContent = "Total à payer : 0€";
        return;
    }

    let contenuHTML = '';
    let total = 0;
    let detailsPrix = [];
    let totalDebout = 0;
    let totalAssis = 0;

    panier.forEach(item => {
        let lignes = [];
        if (item.debout > 0) {
        lignes.push(`debout : ${item.debout} ${item.debout === 1 ? "Billet" : "Billets"}`);
        totalDebout += item.debout;
        total += item.debout * 40;
        }
        if (item.assis > 0) {
        lignes.push(`assis : ${item.assis} ${item.assis === 1 ? "Billet" : "Billets"}`);
        totalAssis += item.assis;
        total += item.assis * 50;
        }
        contenuHTML += `<p><strong>${item.ville}</strong> – ${lignes.join(', ')}</p>`;
    });
    
    let lignePrix = [];
    if (totalDebout > 0) lignePrix.push(`40€ (${totalDebout})`);
    if (totalAssis > 0) lignePrix.push(`50€ (${totalAssis})`);
    contenuPanier.innerHTML = contenuHTML;
    prixUnitaire.textContent = `Prix unitaire : ${lignePrix.join(', ')}`;
    totalFinal.textContent = `Total à payer : ${total}€`;

    boutonPanier.textContent = `Panier (${panier.length})`;
    localStorage.setItem('panierABGY', JSON.stringify(panier));
}

// Vider le panier

const boutonVider = document.querySelector('.vider-panier');

if (boutonVider) {
    boutonVider.addEventListener('click', () => {
        panier = [];
        localStorage.removeItem('panierABGY');
        mettreAJourPanier();
        popupPanier.classList.add('hidden-panier');
        panierOuvert = false;
        boutonPanier.setAttribute('aria-expanded', 'false');
    });
}

// Stocker les infos du panier pour les réutiliser dans la page Formulaire

const boutonsFinaliser = document.querySelectorAll('.mini-bouton-achat, .bouton-achat');

boutonsFinaliser.forEach(bouton => {
    bouton.addEventListener('click', () => {
        localStorage.setItem('panierABGY', JSON.stringify(panier));
    });
});