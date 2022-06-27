# SpellRack

This is a monorepo containing both the frontend and backend for SpellRack, a Magic: The Gathering deck-building app produced for the capstone project for the TEKSystems Rising Talent program bootcamp. The frontend is built on Next.js/React, and it makes use of Redux for state management and the Material UI styling framework. The backend is a Spring Boot/Java-based REST API managing data persistence with MariaDB. Additionally, I've made use of the extremely generous Scryfall API to obtain card assets and implement search functionality on the frontend.

## Getting started

This project was developed on a machine running Node version 18.0.0 and Corretto 17 (Java OpenJDK 17.0.3). While the code is likely compatible with earlier versions of Node and Java, your mileage may vary.

### Backend (/server)

Please refer to and change the application.properties file as appropriate for your preferred database. Included configuration are simply the author's values or (in the case of, e.g., username and password) placeholders.

For development and demonstration purposes, I've found that simply opening the 'server' directory in your IDE of choice and using its development runner is sufficient. The IDE needs to support and have configuration for Maven. Running the project starts a TomCat server on localhost port 8080.

### Frontend (/web)

1. Navigate into the 'web' directory.
2. Run `npm install` to install dependencies.
3. `npm run dev` will start a development server with hot-reloading on localhost port 3000.

Once both the backend and frontend are running, direct your web browser of choice to [http://localhost:3000](http://localhost:3000).

#### To do

There's always room for improvement in any project. Notably, the frontend in its current state is missing consistent styling, has some disconnected/non-functional UI, and is outright missing intended features. If there's something you notice missing, please feel free to open an issue or make a PR, but know it's probably on my mind to get it fixed up ASAP!
