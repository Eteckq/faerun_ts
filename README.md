# Faerun

## Typescript au lieu de Java

J'ai développé ce projet en Typescript à la place du Java, car je n'ai actuellement aucun droit sur mon pc, et aucun IDE Java n'est installé (il n'y a pas non plus de SDK). Ce PC est temporairement prêté par ma boite, il sera très bientôt changé.

J'avais déjà entièrement développé Faerun en Java en fin d'année dernière, mais je n'ai plus le projet à cause du reset des sessions.

## Fonctionnalités

Ce projet contient les fonctionnalités principales attendues par l'énoncé, avec quelques modifications et ajouts:

 - Une interface web pour avoir un visuel du jeu
 - Un mode multijoueur
 - Des fonctionnalités de jeu supplémentaires (coups critiques, destruction de chateau, l'entrainement de guerriers pendant la partie)

## Déroulement d'une partie

 - Les deux joueurs choisissent un pseudo ainsi qu'une couleur
 - Avant que la partie débute, les joueurs choisissent 5 guerriers à mettre en file d'attente
 - Une fois les files d'attentes pleines, le 1er tour se lance
 - À chaque tour, les guerriers en file d'attente sont envoyés sur le terrain si le chateau possède le nombre de ressources necessaires.
 
 Les tours se passent automatiquement, toutes les 2 secondes.
 
 Les joueurs peuvent ajouter des guerriers à entrainer pendant la partie

 Pour gagner, un joueur doit détruire le chateau adverse

## Installation

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