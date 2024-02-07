<p align="center">
    <a href="https://github.com/MayurJagtap-Dev/pp-mern-projectmanager"><img src="logo.png" alt="Logo" width="100" height="100">
</a>

<h2 align="center">Project Manager</h2>

<p align="center">This project can be used by any individual to manage their clients and projects together.<br /></p>

## About This Project

what can we do in this application:

- Add client.
- Remove Client
- Update Client
- Add project for any existing client.
- Update or remove projects as needed.

## Technologies used

- React.js (Vite app)
- Node.js
- Express.js
- MongoDB database
- GraphQL
- Apollo Cliet

## Getting Started

To get the project up and running on your local system, follow these steps:

### Setting up:

- Clone the repository:

  ```bash
  git clone https://github.com/MayurJagtap-Dev/pp-mern-projectmanager.git
  ```

- Enter in project folder:

  ```bash
  cd pp-mern-projectmanager
  ```

- Setup server by installing dependencies:

  ```bash
  npm i
  ```

  setup environment variables in `.env ` file

  ```bash
  PORT = "Port_number_to_run_server"
  NODE_ENV = "development"
  MONGO_URI = "Paste_mondodb_database_url_here"
  ```

  start the server

  ```bash
  npm run dev
  ```

- Now move inside client folder and install dependencies:

  ```bash
  cd client
  npm i
  ```

  in `src/app.jsx` file you'll see following code, paste server url as shown in code below

  ```
  const client = new ApolloClient({
    uri: "Paste_server_url_here",
    cache: cache,
  });
  ```

- Open new terminal and start client by running following command:

  ```bash
  npm run dev
  ```

## Want to contribute?

For contribution, please follow the "fork-and-pull" Git workflow.

1.  **Fork** the repo on GitHub
2.  **Clone** the project to your own machine
3.  **Commit** changes to your own branch
4.  **Push** your work back up to your fork
5.  Submit a **Pull request** so that we can review your changes

`NOTE: Be sure to merge the latest from "upstream" before     making a pull request!`

## Find me here:

Email :- mayurjagtap9112@gmail.com

Project Link :- [Project_Repository_Link](https://github.com/MayurJagtap-Dev/pp-mern-projectmanager)

Github Profile :- [Github_Profile_Link](https://github.com/MayurJagtap-Dev)

Linkedin :- [Linkedin_Profile_Link](www.linkedin.com/in/mayurjagtap-dev)
