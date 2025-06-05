# Projet ABGYhuDJ - Vente de place pour une tournée live


## ATTENTION : Ce site est une maquette pédagogique. Aucune information saisie n'est collectée ou transmise.


Auteur : Louis Cavril

Ce projet a été réalisé dans le cadre de ma formation Developpeur Web et Web Mobile (DWWM). Ce site vitrine est un espace de vente de billets pour un concert du groupe fictif ABGYhuDJ, musiciens Youtubeurs se produisant en live.
Ce projet est à l'heure actuelle exclusivement Front-End.


## Objectifs

- Réalisation de la maquette respectant la charte graphique
- Réalisation des interfaces utilisateurs
- Gestion des exigences de sécurité, d'accessibilité et de responsive design
- Intégration d'interfaces dynamiques
- Implémentation de formulaire simulant une réservation et un paiement sécurisé


## Outils et technologies

- VSCode (outil de développement)
- Figma (maquette)
- HTML5
- CSS3
- JavaScript
- Lighthouse (tests d'accessibilité et de performance)
- Clip Studio Paint (réalisation du logo original)

Aucun framework utilisé ni en CSS ni en JS car leur utilité aurait été trop faible dans les interfaces que j'ai pensé et designé. J'ai donc préféré utiliser les versions natives afin d'alléger le poids des fichiers.


## Présentation du site

Le site se compose de trois pages :

- `/accueil.html` : Présentation du groupe fictif et de leur événement.
- `/billetterie.html` : Présentation des dates et lieux des concerts, avec possibilité de réserver des billets au moyen d'un système de panier.
- `/formulaire.html` : Page de finalisation des achats. Récapitulatif de la commande, formulaire de saisie d'informations personnelles pour la facturation, et interface dynamique avec un formulaire de paiement.


## Tests du projet

### 1. Audits Lighthouse

Audits réalisés sur les trois pages du site. Les résultats sont dans l'ensemble très corrects.
Les comptes rendus se trouvent joints au format PDF dans le dossier Documentation du projet.

### 2. Tests manuels

Toutes les fonctionnalités du site ont été testées à la main. Aucun incident n'a été remarqué sur les différents interfaces dynamiques.
De plus, la console ne remonte aucun rapport d'erreur.

### 3. Compatibilité

Le site a été testé sur les navigateurs suivants :
- Firefox (Gecko)
- Brave (Chromium)

Le site se comporte parfaitement sur les deux navigateurs sans anomalie à relever.

### 4. Sécurité

- Aucun envoi de données réelles
- Alertes de sécurité à l'entrée sur la page de confirmation des achats, et rappels de sécurité sur la page d'accueil (anti-pishing)
- Vérification des champs coté JavaScript


## Justifications

Certains scores Lighthouse n'atteignent pas les 100% pour des raisons explicables :
- L’absence de compression ou de cache serveur n’est pas pertinente ici car le projet est statique et local.
- Le site ne collecte aucune donnée réelle, les formulaires sont purement illustratifs.


## Supports

Etant un développeur débutant (environ 45 jours d'apprentissage), j'ai naturellement du recourir à différentes ressources de soutien. Par soucis de transparence, en voici une liste :

- Support de cours de l'école LiveCampus
- MDN Web Docs
- Mémo-web.fr
- W3Schools
- Ionos Digital Guide
- YouTube
- Wikipedia


## Pour la suite

Objectifs suivants : 

- Dépôt Github des projets
- Apprentissage du Back-end et des bases de données
