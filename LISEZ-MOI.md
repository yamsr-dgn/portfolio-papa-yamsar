# Portfolio de Papa Yamsar DIAGNE

Portfolio **HTML + CSS + JavaScript**, sur une page, responsive, livré avec l'image de votre maquette.

## Ouvrir le site

1. Décompressez l'archive `Portfolio_Papa_Yamsar_DIAGNE.zip`.
2. Ouvrez le fichier `index.html` dans Chrome, Edge, Firefox ou Safari.
3. Aucune installation et aucun abonnement ne sont nécessaires.

## Modifications importantes avant publication

| Élément | Où modifier ? | Modification |
| --- | --- | --- |
| **Numéro de téléphone** | `script.js` (tout en haut) | Remplacer `phone: ""` par `phone: "+33 6 12 34 56 78"` avec **votre vrai numéro**. Le numéro s'affichera après un clic, et « Appeler maintenant » composera le numéro sur un appareil compatible. |
| **Photo** | `index.html` | Remplacer `src="assets/portrait.png"` par le lien de votre nouvelle image ou par le chemin d'un fichier local. L'image actuelle est extraite, sans retouche, de votre maquette. |
| **E-mail** | `script.js` | Modifier `email: "pa.yamsar.diagne@gmail.com"`. L'option Mail et l'option Outlook reprendront la nouvelle adresse. Adapter aussi les textes statiques du fichier HTML si besoin. |
| **Textes** | `index.html` | Personnaliser les six sections, les expériences, les compétences et les formations. |
| **Mentions légales** | `index.html` | Rechercher `(à remplir)` et renseigner les champs nécessaires à la mise en ligne. |
| **Couleurs** | `styles.css` | Modifier les variables `:root` et `body[data-theme="light"]`. |

**Important :** aucun numéro n'a été fourni. Le bouton « Me joindre par téléphone » dévoile donc `(à remplir)` tant que vous n'avez pas renseigné le vôtre. Nous n'avons pas inventé de numéro.

## Les effets inclus

- Point « Disponible » animé en permanence.
- Onglets accessibles au clavier (flèches gauche/droite, Home, End).
- Écriture progressive des paragraphes, accompagnée d'une petite main animée.
- Apparition en fondu des compétences, logos stylisés et autres cartes.
- Fond bleu marine lumineux avec cartes à transparence floutée (« glassmorphism »).
- Pluie discrète en arrière-plan, premier éclair doux après **30 secondes**, puis toutes les 45 secondes.
- Boutons pour désactiver la pluie et passer du thème sombre au thème clair.
- Respect du réglage système « Réduire les animations » : la pluie, les éclairs et l'effet d'écriture sont évités.
- Appel téléphonique via le protocole `tel:` dès qu'un vrai numéro est renseigné.
- Choix d'envoi par l'application e-mail du visiteur (`mailto:`) ou par Outlook Web.
- Mentions légales personnalisables dans une fenêtre.

Les icônes d'outils sont des **monogrammes stylisés**, afin que tout fonctionne sans connexion Internet. Vous pouvez les remplacer par les logos officiels autorisés de chaque marque.

## Publier sur Hostinger

1. Allez dans le gestionnaire de fichiers de votre hébergement.
2. Ouvrez le dossier `public_html` du domaine ciblé.
3. Envoyez **le contenu du dossier décompressé** (`index.html`, `styles.css`, `script.js`, `assets/`) dans `public_html`.
4. Vérifiez votre domaine et testez les boutons sur téléphone et ordinateur.

**Conseil :** remplissez toutes les mentions légales et vos coordonnées avant de rendre le portfolio public.

## Arborescence

```text
portfolio-papa-yamsar/
├── index.html
├── styles.css
├── script.js
├── LISEZ-MOI.md
└── assets/
    ├── portrait.png
    └── favicon.svg
```
