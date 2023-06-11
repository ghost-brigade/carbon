import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (skills: any[]): Promise<any[]> => {
  const angularSkill = skills.find((skill) => skill.name === "Angular");
  const vuejsSkill = skills.find((skill) => skill.name === "Vue.js");
  const symfonySkill = skills.find((skill) => skill.name === "Symfony");
  const symfonySkill = skills.find((skill) => skill.name === "Laravel");
  const symfonySkill = skills.find((skill) => skill.name === "Node.js");
  const symfonySkill = skills.find((skill) => skill.name === "ASP.NET Core");
  const symfonySkill = skills.find((skill) => skill.name === "Symfony");
  const symfonySkill = skills.find((skill) => skill.name === "Symfony");

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
