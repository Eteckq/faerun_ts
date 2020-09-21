# Faerun

## Typescript au lieu de Java

J'ai développé ce projet en Typescript à la place du Java, car je n'ai actuellement aucun droit sur mon pc, et aucun IDE Java n'est installé (il n'y a pas non plus de SDK). Ce PC est temporairement prêté par ma boite, il sera très bientôt changé.

J'avais déjà entièrement développé Faerun en Java en fin d'année dernière, mais je n'ai plus le projet à cause du reset des sessions.

## Fonctionnalités

Ce projet contient les fonctionnalités principales attendues par l'énoncé, avec quelques modifications et ajouts:

 - Une interface web pour avoir un visuel du jeu
 - Un mode multijoueur
 - Des fonctionnalités de jeu supplémentaires (coups critiques, destruction de chateau, l'entrainement de guerriers pendant la partie)

Les troupes ont été équilibré selon mon système de combat

Système de combat de l'énoncé:

Les guerriers sont sous forme de file d'attente sur les cases (uen file d'attente par équipe), et les combats se font en 1v1 (le 1er de la file d'attente attaque le 1er de l'autre file d'attente).

Système modifié:

Tous les guerriers présents sur une case attaquent UN guerrier ennemi aléatoire.

L'ordre des attaques est aléatoire

Cela permet d'avoir des tours plus rapides, et une stratégie moins aléatoire.

## Déroulement d'une partie

 - Les deux joueurs choisissent un pseudo ainsi qu'une couleur
 - Avant que la partie débute, les joueurs choisissent au moins 3 guerriers à mettre en file d'attente
 - Une fois les guerriers choisi, le 1er tour se lance
 - À chaque tour, les guerriers en file d'attente sont envoyés sur le terrain si le chateau possède le nombre de ressources necessaires.
 
 Les tours se passent automatiquement, toutes les 2 secondes.
 
 Les joueurs peuvent ajouter des guerriers à entrainer pendant la partie

 Pour gagner, un joueur doit détruire le chateau adverse

## Installation

Une version est disponible sur ce site : https://faerun.herokuapp.com/

Le projet utilise NodeJS, il faut donc avoir npm d'installé

```bash
npm install
npm run dev
```

Il faut ensuite ouvrir un navigateur, à l'adresse http://localhost:3000/

Pour pouvoir lancer une partie, il faut deux onglets. 

### Technologies employées

#### Backend

Le jeu est developpé en Typescript

Les principes de la POO ont été appliqué, afin de se rapprocher au plus de Java

Le serveur utilise Express, pour le serveur HTTP, ainsi que des sockets pour communiquer avec le client

#### Frontend

Le client est en html/css/js basique (avec un modèle MVC)

Le framework css UIkit a été utilisé afin de simplier le design