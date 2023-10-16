# Local Development Environment Setup

This guide will walk you through setting up your local development environment for the LitVerse project.

## Prerequisites
- **PostgreSQL 16** installed on your local machine. [download from here](https://www.postgresql.org/download/)
  - If you are a mac user, also download [postgres.app](https://postgresapp.com/) for a very simple and good GUI for running your PSQL server. 
- **Node.js and npm** installed. If you don't have them, you can download and install from the [Node.js official website](https://nodejs.org/).
- You have cloned the "development" branch from the repository, and are in this new, current repo and NOT THE OLD ONE - https://github.com/LitVerse-Org/litverse.git
- (OPTIONAL) [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) for testing API calls. They are useful and very common tools in industry, but are absolutely not necessary to use. Just can be helpful tools.
  - It does the same thing as commands like `curl -X POST http://localhost:3000/api/createMockUsers`, where you're just externally triggering an API call to see if its doing what you want it to or not, and lets you visualize everything there. Very useful if you take just a second to learn it.


### Quick Setup Steps
1. Open terminal, navigate to the project directory
2. Run `npm install`
3. Run `npm run dev`
   1. This will run the frontend server.
   2. Go to http://localhost:3000/login to see the frontend while you develop.
4. Open another terminal, navigate to the project directory
   1. Start your PSQL server through the mac "postgres" app, windows "pgadmin" app, or through the terminal. 
      1. There are many ways to run your psql server, but just make sure the port it is running on is the same as the port in the database_url in the .env file in the project (5431 or 5432), and in the command used below. They just need to all be the same port.
   2. Run `psql -h localhost -U postgres -p 5431`
      1. Run `CREATE ROLE dev WITH LOGIN PASSWORD 'litverse123'; ALTER ROLE dev CREATEDB;`
      2. Run `quit` to leave this psql CLI and go back to normal terminal CLI
   3. Run `createdb litverseDB` 
   4. Run `npm install prisma --save-dev`
   5. Run `npx prisma generate`
   6. Run `npx prisma migrate dev`
   7. Run `npx prisma studio. `
   8. Go to http://localhost:5555/ or http://localhost:5556/ (whichever it says in your terminal) to see the database visualizer.
      1. Make sure the models you see match whats in our prisma.schema file, just to make sure you're running the right stuff.
5. At this point, you're ready to develop.
   1. Now, decide on what feature you want to develop and then create a branch for it. Make your changes, test your changes, then submit a PR once your changes are complete and working.
      1. Be detailed and concise in your PR, so that i can clearly see what it's for

#### Optional (Create 100 Mock Users)
1. While your frontend (...:3000), prisma studio(...:5555), and psql server are all running, open another terminal and in our project directory:
2. Run `curl -X POST http://localhost:3000/api/userOperations/createMockUsers`
   1. (Different command for windows. Can also use Postman to trigger this. 
   2. This will create 100 mock users in the database. You can view them in the database visualizer (Prisma Studio).
   3. All this command is doing is triggering the createMockUsers function in the createMockUsers.js file in the api folder. You can view the code in the api folder to see how it works.

### Prompt Help Template
- First, Run this command in your directory to get file structure:
    - `tree -L 8 -I 'node_modules|yarn.lock|amplify'`
      - You can copy and paste this file structure into ChatGPT so that it can help you much better.
- Prompt Help Template {copy and paste this into prompt, then edit}:
  - ##### "{Copy and paste the tree file structure you just got}
  - ##### I am a member of a student group developing a literature/art-focused microblogging webapp called "LitVerse". We are working off of feature branches in a normal github workflow, using pull requests to submit changes.
  - ##### Our tech stack is: Next.js, React, Express, TailwindCSS, Prisma, PostgreSQL16
  - ##### {Insert any other relevant context here, the more details it has the better it can help you}
  - ##### My current goal is to: {insert your current goal}
  - ##### Given the details I have just provided you, please guide me with detailed steps to reach this goal. 
  - ##### Please remember all of this specific context throughout this conversation to provide the most accurate and tailored responses possible."