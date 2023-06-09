import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (skills: any[]): Promise<any[]> => {
  const angularSkill = skills.find((skill) => skill.name === "Angular");
  const vuejsSkill = skills.find((skill) => skill.name === "Vue.js");
  const symfonySkill = skills.find((skill) => skill.name === "Symfony");

  const taskLists = [
    // ANGULAR TASKS
    // Level 1 tasks
    {
      name: "Setting Up Angular Development Environment",
      level: 1,
      description:
        "Set up your development environment for Angular by installing Node.js, Angular CLI, and a code editor. Create a new Angular project and run it locally.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Creating Components",
      level: 1,
      description:
        "Create a basic Angular component that displays a simple message or content. Use the Angular CLI to generate the component files and add it to your Angular project.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Level 2 tasks
    {
      name: "Implementing Data Binding",
      level: 2,
      description:
        "Learn and implement data binding in Angular. Create a component that demonstrates one-way data binding and another component that demonstrates two-way data binding.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Routing and Navigation",
      level: 2,
      description:
        "Implement routing and navigation in your Angular application. Set up multiple routes and create navigation links between different components/pages of your application.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Level 3 tasks
    {
      name: "Working with Forms",
      level: 3,
      description:
        "Build a form using Angular's form features. Implement form validation, handle form submission, and display validation errors for the form fields.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Services and Dependency Injection",
      level: 3,
      description:
        "Create and use services in Angular to share data and functionality across multiple components. Implement dependency injection to provide services to the components.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Level 4 tasks
    {
      name: "Making HTTP Requests",
      level: 4,
      description:
        "Use Angular's HttpClient module to make HTTP requests to a RESTful API. Fetch data from an API endpoint and display it in your Angular application.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Implementing Authentication",
      level: 4,
      description:
        "Add authentication functionality to your Angular application. Set up user registration, login, and logout features using authentication services and API calls.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Level 5 tasks
    {
      name: "Building a CRUD Application",
      level: 5,
      description:
        "Build a complete CRUD (Create, Read, Update, Delete) application using Angular. Create components for listing, adding, editing, and deleting items with proper data management.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Optimizing Performance",
      level: 5,
      description:
        "Optimize the performance of your Angular application by implementing lazy loading, code splitting, and caching strategies. Apply best practices for improving rendering speed and reducing bundle size.",
      skillId: angularSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // VUEJS TASKS
    // Level 1 tasks
    {
      name: "Setting Up Vue.js Development Environment",
      level: 1,
      description:
        "Set up your development environment for Vue.js by installing Node.js and a code editor. Create a new Vue.js project and run it locally.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Creating Vue Components",
      level: 1,
      description:
        "Create a basic Vue component that displays a simple message or content. Use the Vue CLI to generate the component files and add it to your Vue.js project.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Level 2 tasks
    {
      name: "Working with Vue Directives",
      level: 2,
      description:
        "Learn and use Vue directives such as v-if, v-for, and v-bind. Implement these directives in your Vue.js components to manipulate the DOM and handle dynamic rendering.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Vue Router Configuration",
      level: 2,
      description:
        "Implement routing and navigation in your Vue.js application. Set up multiple routes and create navigation links between different components/pages of your application using Vue Router.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Level 3 tasks
    {
      name: "Working with Vue Forms",
      level: 3,
      description:
        "Build a form using Vue.js form features. Implement form validation, handle form submission, and display validation errors for the form fields using Vue form libraries or built-in features.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Vue Components Communication",
      level: 3,
      description:
        "Learn and implement different ways of communication between Vue components such as props, events, and Vuex for state management. Pass data between parent and child components effectively.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Level 4 tasks
    {
      name: "Working with Vue CLI Plugins",
      level: 4,
      description:
        "Explore and use various Vue CLI plugins to enhance your Vue.js development experience. Install and configure plugins for tasks like unit testing, linting, and internationalization.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Vue.js State Management with Vuex",
      level: 4,
      description:
        "Implement state management in your Vue.js application using Vuex. Set up a centralized store, define state, mutations, actions, and getters to manage application-wide data.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    // Level 5 tasks
    {
      name: "Vue.js with RESTful API Integration",
      level: 5,
      description:
        "Integrate your Vue.js application with a RESTful API. Make HTTP requests, handle responses, and update the UI based on the received data. Use libraries like Axios or Vue Resource.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Vue.js Unit Testing",
      level: 5,
      description:
        "Write unit tests for your Vue.js components and functionality. Use testing frameworks like Jest or Vue Test Utils to create and run tests for your Vue.js application.",
      skillId: vuejsSkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // SYMFONY TASKS
    // Level 1 tasks
    {
      name: "Setting Up Symfony Development Environment",
      level: 1,
      description:
        "Set up your development environment for Symfony by installing PHP, Composer, and a code editor. Create a new Symfony project and run it locally.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Creating Routes and Controllers",
      level: 1,
      description:
        "Create routes and controllers in Symfony to handle HTTP requests. Define routes in YAML or annotations and implement corresponding controller actions to handle the requests.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // Level 2 tasks
    {
      name: "Working with Doctrine ORM",
      level: 2,
      description:
        "Learn and use Doctrine ORM in Symfony to interact with the database. Define entities, create migrations, and perform basic CRUD (Create, Read, Update, Delete) operations on the database.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Symfony Forms and Validation",
      level: 2,
      description:
        "Build forms in Symfony using the Form component. Create form classes, handle form submissions, and perform form validation using built-in validators or custom constraints.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // Level 3 tasks
    {
      name: "Working with Twig Templating Engine",
      level: 3,
      description:
        "Create and use Twig templates in Symfony to render dynamic content. Learn and use Twig syntax, create reusable templates, and pass data from controllers to templates.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Symfony Security and User Authentication",
      level: 3,
      description:
        "Implement user authentication and authorization in Symfony using Symfony Security component. Set up user registration, login, and logout functionality with proper security measures.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // Level 4 tasks
    {
      name: "Symfony API Development",
      level: 4,
      description:
        "Build an API using Symfony. Implement API endpoints, handle request/response serialization, and ensure proper data validation and error handling for API responses.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Symfony Caching and Performance Optimization",
      level: 4,
      description:
        "Learn and implement caching techniques in Symfony to improve performance. Configure caching layers, use cache adapters, and optimize critical parts of your application.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },

    // Level 5 tasks
    {
      name: "Symfony Testing and Test-Driven Development",
      level: 5,
      description:
        "Write tests for your Symfony application using PHPUnit or other testing frameworks. Practice Test-Driven Development (TDD) by writing tests before implementing the corresponding features.",
      skillId: symfonySkill.id,
      required: Math.random() < 0.5 ? true : false,
    },
    {
      name: "Symfony Deployment and Production Setup",
      level: 5,
      description:
        "Prepare your Symfony application for production deployment. Configure environment variables, optimize the application for production, and set up server requirements for hosting Symfony.",
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
