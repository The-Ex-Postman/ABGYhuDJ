// Récupérer les infos du panier de la Billetterie

const recapContenu = document.querySelector('.nombre-places');
const recapUnitaire = document.querySelector('.prix-place');
const recapTotal = document.querySelector('.total');

const panier = JSON.parse(localStorage.getItem('panierABGY'));

if (panier && panier.length > 0) {
    let contenuHTML = '';
    let total = 0;
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

    const lignePrix = [];
    if (totalDebout > 0) lignePrix.push(`40€ (${totalDebout})`);
    if (totalAssis > 0) lignePrix.push(`50€ (${totalAssis})`);

    recapContenu.innerHTML = contenuHTML;
    recapUnitaire.textContent = `Prix unitaire : ${lignePrix.join(', ')}`;
    recapTotal.textContent = `Total à payer : ${total}€`;
} else {
    recapContenu.textContent = "Aucun billet sélectionné";
    recapUnitaire.textContent = "Prix unitaire : 0€";
    recapTotal.textContent = "Total à payer : 0€";
}

//Alerte à l'ouverture de la page

window.addEventListener('DOMContentLoaded', () => {
    const alerte = document.querySelector('.alerte');
    if (alerte) {
        alerte.classList.remove('hidden');
        alerte.classList.add('show');

        setTimeout(() => {
            alerte.classList.add('fade-out');
            setTimeout(() => {
                alerte.classList.add('hidden');
                alerte.classList.remove('fade-out', 'show');
            }, 500);
        }, 10000);
    }
});

// Valider le formulaire de Facturation et ouvrir le popup de paiement

const champNom = document.getElementById('nom-famille');
const champPrenom = document.getElementById('prenom');
const champEmail = document.getElementById('email');
const champAdresse = document.getElementById('adress');
const champVille = document.getElementById('city');
const boutonValider = document.querySelector('.valider');
const messageErreur = document.querySelector('.message-erreur');

const regexNom = /^[a-zA-ZÀ-ÿ\-]{2,}$/;
const regexEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const regexAdresse = /^[0-9]+\s+.+$/;
const regexVilleCP = /^[a-zA-ZÀ-ÿ\s\-']+\s[0-9]{5}$/;

const popup = document.getElementById('popup-paiement');
const overlay = document.querySelector('.overlay-flou');

boutonValider.addEventListener('click', () => {
    const nom = champNom.value.trim();
    const prenom = champPrenom.value.trim();
    const email = champEmail.value.trim();
    const adresse = champAdresse.value.trim();
    const villeCp = champVille.value.trim();

    let erreurs = [];

    if (!regexNom.test(nom)) {
        erreurs.push("Le nom doit contenir au moins 2 lettres et uniquement des lettres ou des tirets.");
    }
    if (!regexNom.test(prenom)) {
        erreurs.push("Le prénom doit contenir au moins 2 lettres et uniquement des lettres ou des tirets.");
    }
    if (!regexEmail.test(email)) {
        erreurs.push("L'adresse e-mail n'est pas valide.");
    }
    if (!regexAdresse.test(adresse)) {
        erreurs.push("L'adresse doit commencer par un numéro suivi du nom de rue.");
    }
    if (!regexVilleCP.test(villeCp)) {
        erreurs.push("La ville et le code postal doivent suivre le format : Ville 75000.");
    }

    if (erreurs.length > 0) {
        messageErreur.textContent = erreurs.join(" ");
        messageErreur.style.display = 'block';
    } else {
        messageErreur.textContent = '';
        messageErreur.style.display = 'none';
        popup.classList.remove('hidden');
        overlay.classList.remove('hidden');
        popupPaiement.focus();
    }
        const boutonFermer = document.querySelector('.fermer-popup');

        boutonFermer.addEventListener('click', () => {
            popup.classList.add('hidden');
            overlay.classList.add('hidden');
        });

});

//Valider les informations bancaire et envoyer le formulaire pour paiement

const formulairePaiement = document.querySelector('.saisie-cb form');
const popupPaiement = document.getElementById('popup-paiement');

const regexCarte = /^[0-9]{16}$/;
const regexDate = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
const regexCVV = /^[0-9]{3}$/;

const boutonSubmit = formulairePaiement.querySelector('button[type="submit"]');

formulairePaiement.addEventListener('submit', (e) => {
    e.preventDefault();

    const numeroCarte = document.getElementById('numero-carte').value.trim();
    const dateExp = document.getElementById('date-exp').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!regexCarte.test(numeroCarte) || !regexDate.test(dateExp) || !regexCVV.test(cvv)) {
        alert("Veuillez remplir correctement les informations bancaires.");
        return;
    }

    boutonSubmit.disabled = true;
    boutonSubmit.textContent = "Traitement en cours...";

    setTimeout(() => {
    
        popup.classList.add('hidden');
        overlay.classList.add('hidden');
        localStorage.removeItem('panierABGY');

        const container = document.querySelector('.main-container');
        container.innerHTML = `
            <h2 class="second-title"> Paiement confirmé !</h2>
            <p style="font-size: 1.5rem; text-align: center; margin: 2rem;">Merci pour votre achat ! Vos billets ont été enregistrés.</p>
            <a href="../accueil.html" class="back-button" style="margin-top: 3rem;">Retour à l'accueil</a>
        `;
    }, 1000);
});

//Empêcher le copier/coller

const champsSensibles = document.querySelectorAll('#numero-carte, #date-exp, #cvv');

champsSensibles.forEach(champ => {
    champ.addEventListener('paste', (e) => {
        e.preventDefault();
    });
    champ.addEventListener('copy', (e) => {
        e.preventDefault();
    });
    champ.addEventListener('cut', (e) => {
        e.preventDefault();
    });
});
