# Portfolio — Hiba Chghaf

Portfolio personnel construit avec [Astro](https://astro.build) et déployé sur [Vercel](https://vercel.com).

## Structure du projet

```text
src/
├── components/        # Composants Astro réutilisables
│   ├── Header.astro   # Navigation responsive
│   ├── Footer.astro   # Pied de page avec liens sociaux
│   ├── Hero.astro     # Section d'accueil
│   ├── About.astro    # Compétences et certifications
│   ├── Projects.astro # Projets réalisés
│   ├── Timeline.astro # Parcours (formation + expérience)
│   └── Contact.astro  # Formulaire de contact
├── data/
│   └── portfolio.ts   # ✏️ TOUTES les données du portfolio
├── layouts/
│   └── Layout.astro   # Layout HTML principal
└── pages/
    └── index.astro    # Page d'accueil
```

## Mettre à jour le contenu

Toutes les informations sont centralisées dans **`src/data/portfolio.ts`**.

Pour modifier vos données :

1. Ouvrez `src/data/portfolio.ts`
2. Modifiez les objets : `personalInfo`, `education`, `experiences`, `projects`, `skills`, `certifications`
3. Sauvegardez — le site se met à jour automatiquement

## Commandes

- `npm install` : Installer les dépendances
- `npm run dev` : Lancer le serveur de developpement (`:4321`)
- `npm run build` : Construire le site pour la production
- `npm run preview` : Previsualiser le build localement

## Déploiement sur Vercel

1. Connectez votre dépôt GitHub à [Vercel](https://vercel.com)
2. Sélectionnez le framework **Astro**
3. Déployez — chaque push sur `main` déclenche un déploiement automatique

## Variables d'environnement (Vercel)

Ajoutez ces variables dans le projet Vercel:

- `RESEND_API_KEY` : cle API Resend (obligatoire)
- `CONTACT_TO_EMAIL` : email recepteur (optionnel, defaut `h.chghaf@esisa.ac.ma`)
- `CONTACT_FROM_EMAIL` : expediteur Resend (optionnel, defaut `Portfolio <onboarding@resend.dev>`)

Note:

- Avec `onboarding@resend.dev`, Resend est limite en mode test.
- Pour un usage production, configurez votre propre domaine d'envoi dans Resend.

## Technologies

- **Astro** — Framework web statique performant
- **TypeScript** — Typage des données
- **CSS** — Styles personnalisés (pas de framework CSS)
- **Resend API** — Réception des formulaires par email (backend)
- **Vercel** — Hébergement et déploiement continu
