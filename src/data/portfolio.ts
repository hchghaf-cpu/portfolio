/**
 * ===================================================================
 * DONNÉES DU PORTFOLIO — Hiba Chghaf
 * ===================================================================
 * Ce fichier centralise toutes les informations personnelles.
 * Pour mettre à jour le portfolio, modifiez uniquement ce fichier.
 * ===================================================================
 */

export interface PersonalInfo {
  fullName: string;
  firstName: string;
  title: string;
  email: string;
  city: string;
  country: string;
  school: string;
  bio: string;
  linkedin: string;
  github: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

/* ─── Informations personnelles ─── */
export const personalInfo: PersonalInfo = {
  fullName: "Hiba Chghaf",
  firstName: "Hiba",
  title: "Étudiante Ingénieure",
  email: "h.chghaf@esisa.ac.ma",
  city: "Fès",
  country: "Maroc",
  school: "ESISA — École Supérieure d'Ingénierie en Sciences Appliquées",
  bio: "Étudiante ingénieure passionnée par le développement logiciel et la technologie. Actuellement en formation à l'ESISA de Fès, je développe des compétences solides en ingénierie logicielle tout en m'engageant activement dans des activités sportives et associatives.",
  linkedin: "https://www.linkedin.com/in/hiba-chghaf",
  github: "https://github.com/hiba-chghaf",
};

/* ─── Formation ─── */
export const education: Education[] = [
  {
    degree: "Diplôme d'Ingénieur en Sciences Appliquées",
    school: "ESISA — École Supérieure d'Ingénierie en Sciences Appliquées",
    location: "Fès, Maroc",
    period: "2024 — Présent",
    description:
      "Formation en ingénierie logicielle couvrant le développement web, les bases de données, les algorithmes et la gestion de projets informatiques.",
  },
];

/* ─── Expériences ─── */
export const experiences: Experience[] = [
  {
    role: "Stage en pharmacie",
    company: "Pharmacie familiale",
    location: "Maroc",
    period: "Été 2025 — 2 mois",
    description: [
      "Accueil et conseil des clients au comptoir",
      "Gestion des stocks et réapprovisionnement des produits",
      "Organisation et rangement des produits pharmaceutiques",
      "Développement de compétences en relation client et communication",
    ],
  },
];

/* ─── Projets ─── */
export const projects: Project[] = [
  {
    title: "MindBattle",
    description:
      "Jeu de quiz interactif où les joueurs créent un profil et s'affrontent dans des défis de culture générale. Interface ludique avec système de profils personnalisables.",
    technologies: ["React", "TypeScript", "CSS", "Vercel"],
    github: "https://github.com/hiba-chghaf/MindBattle",
    demo: "https://mindbattle-wheat.vercel.app/",
  },
  {
    title: "Student Management App",
    description:
      "Application de gestion d'étudiants permettant l'ajout, la modification, la suppression et la recherche d'étudiants. Interface intuitive avec fonctionnalités CRUD complètes.",
    technologies: ["Java", "SQL", "JDBC", "JavaFX"],
    github: "https://github.com/hiba-chghaf/student-management",
  },
  {
    title: "Portfolio Personnel",
    description:
      "Site web portfolio responsive construit avec Astro, déployé sur Vercel. Design moderne et minimaliste présentant mes projets et compétences.",
    technologies: ["Astro", "HTML", "CSS", "TypeScript"],
    github: "https://github.com/hiba-chghaf/portfolio",
  },
];

/* ─── Compétences ─── */
export const skills: Skill[] = [
  {
    category: "Développement Web",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Astro"],
  },
  {
    category: "Programmation",
    items: ["Java", "Python", "C"],
  },
  {
    category: "Bases de données",
    items: ["SQL", "MySQL"],
  },
  {
    category: "Outils & Méthodes",
    items: ["Git", "GitHub", "VS Code", "Méthodes Agiles"],
  },
  {
    category: "Soft Skills",
    items: ["Travail d'équipe", "Communication", "Organisation d'événements", "Leadership"],
  },
];

/* ─── Certifications & Attestations ─── */
export const certifications: Certification[] = [
  {
    title: "Attestation — Tournoi de Basketball",
    issuer: "Organisation sportive",
    year: "2024",
  },
  {
    title: "Attestation — Créatrice d'Événements",
    issuer: "Association étudiante",
    year: "2024",
  },
];

/* ─── Navigation ─── */
export const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#parcours" },
  { label: "Contact", href: "#contact" },
];
