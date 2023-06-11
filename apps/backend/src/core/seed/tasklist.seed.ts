import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (skills: any[]): Promise<any[]> => {
  const angularSkill = skills.find((skill) => skill.name === "Angular");
  const vuejsSkill = skills.find((skill) => skill.name === "Vue.js");
  const symfonySkill = skills.find((skill) => skill.name === "Symfony");
  const laravelSkill = skills.find((skill) => skill.name === "Laravel");
  const nodejsSkill = skills.find((skill) => skill.name === "Node.js");
  const aspnetSkill = skills.find((skill) => skill.name === "ASP.NET Core");
  const nextjsSkill = skills.find((skill) => skill.name === "Next.js");

  const taskLists = [
    // TÂCHES ANGULAR
    // Tâches de niveau 1
    {
      name: "Configuration de l'environnement de développement Angular",
      level: 1,
      description:
        "Configurez votre environnement de développement pour Angular en installant Node.js, Angular CLI et un éditeur de code. Créez un nouveau projet Angular et exécutez-le localement.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Création de composants",
      level: 1,
      description:
        "Créez un composant Angular de base qui affiche un message ou un contenu simple. Utilisez Angular CLI pour générer les fichiers de composant et ajoutez-le à votre projet Angular.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 2
    {
      name: "Mise en œuvre de la liaison de données",
      level: 2,
      description:
        "Apprenez et mettez en œuvre la liaison de données dans Angular. Créez un composant qui démontre la liaison de données unidirectionnelle et un autre composant qui démontre la liaison de données bidirectionnelle.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Routing et navigation",
      level: 2,
      description:
        "Implémentez le routage et la navigation dans votre application Angular. Configurez plusieurs routes et créez des liens de navigation entre différents composants/pages de votre application.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 3
    {
      name: "Travail avec les formulaires",
      level: 3,
      description:
        "Créez un formulaire en utilisant les fonctionnalités de formulaire d'Angular. Implémentez la validation du formulaire, gérez la soumission du formulaire et affichez les erreurs de validation pour les champs du formulaire.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Services et injection de dépendances",
      level: 3,
      description:
        "Créez et utilisez des services dans Angular pour partager des données et des fonctionnalités entre plusieurs composants. Implémentez l'injection de dépendances pour fournir des services aux composants.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 4
    {
      name: "Effectuer des requêtes HTTP",
      level: 4,
      description:
        "Utilisez le module HttpClient d'Angular pour effectuer des requêtes HTTP vers une API RESTful. Récupérez des données à partir d'un point de terminaison d'API et affichez-les dans votre application Angular.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Mise en œuvre de l'authentification",
      level: 4,
      description:
        "Ajoutez la fonctionnalité d'authentification à votre application Angular. Configurez l'inscription, la connexion et la déconnexion des utilisateurs en utilisant des services d'authentification et des appels API.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 5
    {
      name: "Construction d'une application CRUD",
      level: 5,
      description:
        "Construisez une application CRUD (Create, Read, Update, Delete) complète en utilisant Angular. Créez des composants pour la liste, l'ajout, la modification et la suppression d'éléments avec une gestion appropriée des données.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Optimisation des performances",
      level: 5,
      description:
        "Optimisez les performances de votre application Angular en mettant en œuvre le chargement différé (lazy loading), la division du code (code splitting) et des stratégies de mise en cache. Appliquez les bonnes pratiques pour améliorer la vitesse de rendu et réduire la taille des bundles.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // TÂCHES VUE.JS
    // Tâches de niveau 1
    {
      name: "Configuration de l'environnement de développement Vue.js",
      level: 1,
      description:
        "Configurez votre environnement de développement pour Vue.js en installant Node.js et un éditeur de code. Créez un nouveau projet Vue.js et exécutez-le localement.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Création de composants Vue",
      level: 1,
      description:
        "Créez un composant Vue de base qui affiche un message ou un contenu simple. Utilisez Vue CLI pour générer les fichiers de composant et ajoutez-le à votre projet Vue.js.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 2
    {
      name: "Travail avec les directives Vue",
      level: 2,
      description:
        "Apprenez et utilisez les directives Vue telles que v-if, v-for et v-bind. Implémentez ces directives dans vos composants Vue.js pour manipuler le DOM et gérer le rendu dynamique.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Configuration du routeur Vue",
      level: 2,
      description:
        "Implémentez le routage et la navigation dans votre application Vue.js. Configurez plusieurs routes et créez des liens de navigation entre différents composants/pages de votre application en utilisant Vue Router.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 3
    {
      name: "Travail avec les formulaires Vue",
      level: 3,
      description:
        "Créez un formulaire en utilisant les fonctionnalités de formulaire de Vue.js. Implémentez la validation du formulaire, gérez la soumission du formulaire et affichez les erreurs de validation pour les champs du formulaire en utilisant des bibliothèques de formulaire Vue ou des fonctionnalités intégrées.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Communication entre les composants Vue",
      level: 3,
      description:
        "Apprenez et mettez en œuvre différentes façons de communiquer entre les composants Vue, telles que les props, les événements et Vuex pour la gestion de l'état. Transmettez les données entre les composants parent et enfant de manière efficace.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 4
    {
      name: "Travail avec les plugins Vue CLI",
      level: 4,
      description:
        "Explorez et utilisez divers plugins Vue CLI pour améliorer votre expérience de développement avec Vue.js. Installez et configurez des plugins pour des tâches telles que les tests unitaires, le linting et l'internationalisation.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Gestion de l'état Vue.js avec Vuex",
      level: 4,
      description:
        "Implémentez la gestion de l'état dans votre application Vue.js en utilisant Vuex. Configurez un store centralisé, définissez l'état, les mutations, les actions et les getters pour gérer les données à l'échelle de l'application.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 5
    {
      name: "Intégration de Vue.js avec une API RESTful",
      level: 5,
      description:
        "Intégrez votre application Vue.js avec une API RESTful. Effectuez des requêtes HTTP, gérez les réponses et mettez à jour l'interface utilisateur en fonction des données reçues. Utilisez des bibliothèques comme Axios ou Vue Resource.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Tests unitaires Vue.js",
      level: 5,
      description:
        "Écrivez des tests unitaires pour vos composants et fonctionnalités Vue.js. Utilisez des frameworks de test comme Jest ou Vue Test Utils pour créer et exécuter des tests pour votre application Vue.js.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // TÂCHES SYMFONY
    // Tâches de niveau 1
    {
      name: "Configuration de l'environnement de développement Symfony",
      level: 1,
      description:
        "Configurez votre environnement de développement pour Symfony en installant PHP, Composer et un éditeur de code. Créez un nouveau projet Symfony et exécutez-le localement.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Création de routes et de contrôleurs",
      level: 1,
      description:
        "Créez des routes et des contrôleurs dans Symfony pour gérer les requêtes HTTP. Définissez des routes en YAML ou en annotations et implémentez les actions de contrôleur correspondantes pour gérer les requêtes.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // Tâches de niveau 2
    {
      name: "Travail avec Doctrine ORM",
      level: 2,
      description:
        "Apprenez et utilisez Doctrine ORM dans Symfony pour interagir avec la base de données. Définissez des entités, créez des migrations et effectuez des opérations CRUD (Create, Read, Update, Delete) de base sur la base de données.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Formulaires et validation Symfony",
      level: 2,
      description:
        "Créez des formulaires dans Symfony en utilisant le composant Form. Créez des classes de formulaire, gérez les soumissions de formulaire et effectuez la validation du formulaire en utilisant des validateurs intégrés ou des contraintes personnalisées.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // Tâches de niveau 3
    {
      name: "Travail avec le moteur de template Twig",
      level: 3,
      description:
        "Créez et utilisez des templates Twig dans Symfony pour rendre du contenu dynamique. Apprenez et utilisez la syntaxe Twig, créez des templates réutilisables et transmettez des données des contrôleurs aux templates.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Sécurité et authentification des utilisateurs Symfony",
      level: 3,
      description:
        "Implémentez l'authentification et l'autorisation des utilisateurs dans Symfony en utilisant le composant Symfony Security. Configurez l'inscription des utilisateurs, la connexion et la déconnexion avec les mesures de sécurité appropriées.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // Tâches de niveau 4
    {
      name: "Développement d'API avec Symfony",
      level: 4,
      description:
        "Créez une API en utilisant Symfony. Implémentez des points de terminaison API, gérez la sérialisation des requêtes/réponses et assurez la validation des données et la gestion des erreurs pour les réponses API.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Mise en cache et optimisation des performances Symfony",
      level: 4,
      description:
        "Apprenez et mettez en œuvre des techniques de mise en cache dans Symfony pour améliorer les performances. Configurez des couches de cache, utilisez des adaptateurs de cache et optimisez les parties critiques de votre application.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // Tâches de niveau 5
    {
      name: "Tests et développement piloté par les tests avec Symfony",
      level: 5,
      description:
        "Écrivez des tests pour votre application Symfony en utilisant PHPUnit ou d'autres frameworks de test. Pratiquez le développement piloté par les tests (TDD) en écrivant les tests avant d'implémenter les fonctionnalités correspondantes.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Déploiement et configuration de production Symfony",
      level: 5,
      description:
        "Préparez votre application Symfony pour le déploiement en production. Configurez les variables d'environnement, optimisez l'application pour la production et configurez les exigences du serveur pour l'hébergement de Symfony.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 1
    {
      name: "Installation de Laravel",
      level: 1,
      description:
        "Installez Laravel en utilisant Composer et configurez votre environnement de développement. Créez un nouveau projet Laravel et exécutez-le localement.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Création de routes",
      level: 1,
      description:
        "Définissez des routes pour votre application Laravel. Créez des routes pour différents endpoints et associez-les à des contrôleurs.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 2
    {
      name: "Travail avec les vues",
      level: 2,
      description:
        "Créez des vues en utilisant le moteur de templates Blade de Laravel. Intégrez des données dynamiques dans vos vues et affichez-les.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Utilisation de l'Eloquent ORM",
      level: 2,
      description:
        "Apprenez à utiliser l'Eloquent ORM de Laravel pour interagir avec la base de données. Créez des modèles, effectuez des opérations de lecture, écriture, mise à jour et suppression des données.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 3
    {
      name: "Validation des données",
      level: 3,
      description:
        "Mettez en place des règles de validation pour vos formulaires et vos données. Utilisez les fonctionnalités de validation fournies par Laravel pour garantir l'intégrité des données.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Gestion des sessions et des authentifications",
      level: 3,
      description:
        "Implémentez la gestion des sessions et des authentifications dans votre application Laravel. Configurez l'inscription, la connexion et la déconnexion des utilisateurs.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 4
    {
      name: "Création d'API RESTful",
      level: 4,
      description:
        "Créez des API RESTful en utilisant Laravel. Définissez des routes et des contrôleurs pour gérer les opérations CRUD (Create, Read, Update, Delete) sur vos ressources.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Travail avec des migrations de base de données",
      level: 4,
      description:
        "Utilisez les migrations de base de données pour gérer l'évolution de votre schéma de base de données. Créez et exécutez des migrations pour créer, modifier et supprimer des tables.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 5
    {
      name: "Utilisation de paquets (packages) tiers",
      level: 5,
      description:
        "Intégrez des paquets tiers dans votre application Laravel en utilisant Composer. Apprenez à utiliser des paquets populaires pour ajouter des fonctionnalités supplémentaires à votre projet.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Déploiement de l'application",
      level: 5,
      description:
        "Déployez votre application Laravel sur un serveur en production. Configurez l'environnement de production, gérez les dépendances et mettez en place un processus de déploiement efficace.",
      skillId: laravelSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 1
    {
      name: "Installation de Node.js",
      level: 1,
      description:
        "Installez Node.js sur votre machine et configurez votre environnement de développement. Vérifiez l'installation en exécutant une application Node.js simple.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Création d'un serveur HTTP",
      level: 1,
      description:
        "Créez un serveur HTTP de base en utilisant le module intégré 'http' de Node.js. Gérez les requêtes entrantes et envoyez des réponses appropriées.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 2
    {
      name: "Utilisation de modules (packages) npm",
      level: 2,
      description:
        "Utilisez des modules npm (Node.js packages) pour ajouter des fonctionnalités supplémentaires à votre application Node.js. Installez et importez des modules tiers dans votre projet.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Travail avec des bases de données",
      level: 2,
      description:
        "Connectez-vous à une base de données à l'aide de Node.js. Utilisez un module d'accès aux données (par exemple, 'mysql' ou 'mongodb') pour exécuter des opérations CRUD (Create, Read, Update, Delete) sur la base de données.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 3
    {
      name: "Gestion des routes avec Express.js",
      level: 3,
      description:
        "Utilisez Express.js, un framework Node.js, pour gérer les routes de votre application. Définissez des endpoints et associez-les à des fonctions de gestion des requêtes.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Authentification avec Passport.js",
      level: 3,
      description:
        "Implémentez l'authentification dans votre application Node.js en utilisant Passport.js. Configurez les stratégies d'authentification (par exemple, local, JWT) et protégez vos routes.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 4
    {
      name: "Création d'une API RESTful",
      level: 4,
      description:
        "Construisez une API RESTful en utilisant Node.js et Express.js. Définissez des endpoints pour les opérations CRUD (Create, Read, Update, Delete) sur vos ressources et implémentez-les.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Utilisation de WebSockets",
      level: 4,
      description:
        "Intégrez des WebSockets dans votre application Node.js en utilisant un module tel que 'socket.io'. Établissez des connexions en temps réel entre le serveur et les clients et envoyez des messages bidirectionnels.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 5
    {
      name: "Tests unitaires et tests d'intégration",
      level: 5,
      description:
        "Écrivez des tests unitaires et des tests d'intégration pour votre application Node.js. Utilisez des frameworks de test tels que 'Mocha' ou 'Jest' pour garantir la qualité et la fiabilité de votre code.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Déploiement de l'application",
      level: 5,
      description:
        "Déployez votre application Node.js sur un serveur en production. Configurez l'environnement de production, gérez les dépendances et mettez en place un processus de déploiement continu.",
      skillId: nodejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 1
    {
      name: "Installation d'ASP.NET Core",
      level: 1,
      description:
        "Installez ASP.NET Core sur votre machine et configurez votre environnement de développement. Créez un nouveau projet ASP.NET Core et exécutez-le localement.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Création de routes",
      level: 1,
      description:
        "Définissez des routes pour votre application ASP.NET Core. Créez des endpoints pour différentes actions et associez-les à des contrôleurs.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 2
    {
      name: "Utilisation des vues Razor",
      level: 2,
      description:
        "Créez des vues en utilisant le moteur de templates Razor d'ASP.NET Core. Intégrez des données dynamiques dans vos vues et affichez-les.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Utilisation de l'Entity Framework Core",
      level: 2,
      description:
        "Apprenez à utiliser l'Entity Framework Core pour interagir avec la base de données. Créez des modèles, effectuez des opérations de lecture, écriture, mise à jour et suppression des données.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 3
    {
      name: "Validation des données",
      level: 3,
      description:
        "Mettez en place des règles de validation pour vos formulaires et vos données. Utilisez les fonctionnalités de validation fournies par ASP.NET Core pour garantir l'intégrité des données.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Authentification et autorisation",
      level: 3,
      description:
        "Implémentez l'authentification et l'autorisation dans votre application ASP.NET Core. Configurez l'inscription, la connexion et la déconnexion des utilisateurs, ainsi que les rôles et les politiques d'accès.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 4
    {
      name: "Création d'une API RESTful",
      level: 4,
      description:
        "Construisez une API RESTful en utilisant ASP.NET Core. Définissez des endpoints pour les opérations CRUD (Create, Read, Update, Delete) sur vos ressources et implémentez-les.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Utilisation de SignalR",
      level: 4,
      description:
        "Intégrez SignalR dans votre application ASP.NET Core pour prendre en charge les fonctionnalités temps réel. Établissez des connexions en temps réel entre le serveur et les clients et envoyez des messages bidirectionnels.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 5
    {
      name: "Tests unitaires et tests d'intégration",
      level: 5,
      description:
        "Écrivez des tests unitaires et des tests d'intégration pour votre application ASP.NET Core. Utilisez des frameworks de test tels que 'xUnit' ou 'NUnit' pour garantir la qualité et la fiabilité de votre code.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Déploiement de l'application",
      level: 5,
      description:
        "Déployez votre application ASP.NET Core sur un serveur en production. Configurez l'environnement de production, gérez les dépendances et mettez en place un processus de déploiement continu.",
      skillId: aspnetSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 1
    {
      name: "Installation de Next.js",
      level: 1,
      description:
        "Installez Next.js sur votre machine et configurez votre environnement de développement. Créez un nouveau projet Next.js et exécutez-le localement.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Création de pages",
      level: 1,
      description:
        "Créez des pages en utilisant le système de routage intégré de Next.js. Créez des fichiers dans le répertoire 'pages' et associez-les à des URL spécifiques.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 2
    {
      name: "Utilisation des composants",
      level: 2,
      description:
        "Créez des composants réutilisables en utilisant React.js avec Next.js. Divisez votre interface utilisateur en composants et utilisez-les dans vos pages.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Récupération de données statiques",
      level: 2,
      description:
        "Récupérez des données statiques dans vos pages Next.js en utilisant le système de récupération de données intégré. Utilisez des fichiers JSON ou Markdown pour fournir des données à vos composants.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 3
    {
      name: "Récupération de données côté serveur (Server-side Rendering)",
      level: 3,
      description:
        "Récupérez des données côté serveur dans vos pages Next.js en utilisant les fonctions 'getServerSideProps'. Obtenez des données à partir d'une API ou d'une base de données et pré-rendez les pages avec ces données.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Création d'une API RESTful avec Next.js",
      level: 3,
      description:
        "Construisez une API RESTful en utilisant Next.js. Définissez des routes API et des gestionnaires pour les opérations CRUD (Create, Read, Update, Delete) sur vos ressources.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 4
    {
      name: "Récupération de données côté client (Client-side Rendering)",
      level: 4,
      description:
        "Récupérez des données côté client dans vos pages Next.js en utilisant les fonctions 'useEffect' et 'fetch'. Effectuez des requêtes AJAX pour obtenir des données et mettez à jour votre interface utilisateur de manière réactive.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Utilisation de l'authentification",
      level: 4,
      description:
        "Implémentez l'authentification dans votre application Next.js. Gérez l'inscription, la connexion et la déconnexion des utilisateurs en utilisant des services d'authentification et des cookies sécurisés.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Tâches de niveau 5
    {
      name: "Optimisation des performances",
      level: 5,
      description:
        "Optimisez les performances de votre application Next.js en utilisant les fonctionnalités telles que le rendu statique (Static Generation), la génération de pages à la volée (Server-side Rendering) et la mise en cache. Améliorez le temps de chargement et l'expérience utilisateur.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Déploiement de l'application",
      level: 5,
      description:
        "Déployez votre application Next.js sur un serveur en production. Configurez l'environnement de production, gérez les dépendances et mettez en place un processus de déploiement continu.",
      skillId: nextjsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
  ];

  const createdTaskLists = [];

  for (const taskList of taskLists) {
    const createdTaskList = await prisma.taskList.create({
      data: {
        name: taskList.name,
        level: taskList.level,
        description: taskList.description,
        skill: {
          connect: { id: taskList.skillId },
        },
        required: taskList.required,
      },
    });

    createdTaskLists.push(createdTaskList);
  }

  return createdTaskLists;
};
