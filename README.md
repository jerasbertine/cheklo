# Checklo

Un gestionnaire d'abonnements qui ne se contente pas de lister vos dépenses récurrentes : chaque mois, vous répondez en un clic à une question simple — *« as-tu utilisé cet abonnement ? »* (oui / non / bof). L'application construit un historique et calcule un **score d'utilité** par abonnement, pour vous aider à identifier concrètement ce qu'il faut résilier, plutôt que de vous laisser face à un simple dashboard passif.

## Pourquoi ce projet

La plupart des trackers d'abonnements se limitent à additionner des prix. Checklo part d'un vrai pain point : on sait rarement, sur le moment, si un abonnement est encore utile — on ne s'en rend compte qu'après coup, quand la carte est déjà débitée. En capturant un feedback léger et régulier, l'app transforme une intuition floue ("je paie peut-être pour rien") en donnée exploitable.

## Architecture

Projet en deux parties strictement séparées, dans un monorepo simple :

- [`backend/`](backend/) — API REST Node.js / Express / TypeScript, authentification maison (JWT + bcrypt), PostgreSQL (Neon) via Drizzle ORM.
- [`frontend/`](frontend/) — Next.js 15 (App Router), TypeScript, Tailwind CSS + shadcn/ui, consomme exclusivement l'API du backend (aucun accès direct à la base de données).

## Stack technique

| | |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express, TypeScript |
| Base de données | PostgreSQL (Neon) + Drizzle ORM |
| Authentification | JWT + bcrypt (implémentation maison, sans dépendance type Clerk/Auth0) |
| Validation | Zod |

## Fonctionnalités

- Authentification complète (inscription, connexion, routes protégées)
- CRUD des abonnements (nom, prix, fréquence, catégorie, prochaine échéance)
- Check-ins mensuels par abonnement et calcul d'un score d'utilité
- Simulateur de résiliation virtuelle avec économie annuelle projetée
- Vue calendrier des prochains prélèvements

## Démo

*À venir.*

## Lancer le projet en local

*À venir — instructions détaillées une fois le setup des deux projets finalisé.*
