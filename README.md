# Local Development Environment Setup

This guide will walk you through setting up your local development environment for the Litverse project.

### Quick Notes
- Run this command in your directory to get file structure:
    - `tree -L 4 -I 'node_modules|yarn.lock|amplify'`
    - You can copy and paste this file structure into ChatGPT so that it can help you much better.

## Prerequisites

- **PostgreSQL 16** installed on your local machine. [download from here](https://www.postgresql.org/download/)
- **Node.js and npm** installed. If you don't have them, you can download and install from the [Node.js official website](https://nodejs.org/).
- You have cloned the "development" branch from the repository.

## Database Setup

### Step 1: Install PostgreSQL 16

If you haven't already installed PostgreSQL 16, download and install it from the [official PostgreSQL website](https://www.postgresql.org/download/).

### Step 2: Create a Local Database

Once PostgreSQL 16 is installed:

1. Open your terminal or command prompt.
2. MAKE SURE YOUR .ENV DATABASE_URL PORT MATCHES YOUR PSQL PORT.
   3.  example, if: DATABASE_URL="postgresql://dev:litverse123@localhost:`5431`/litverseDB"
   4. Then my PSQL server also needs to be running on port `5431`
2. Access the PostgreSQL command line using the `psql` command.
3. Create a new database named `litverseDB`:

```sql
CREATE DATABASE litverseDB;
```

## Local Environment Setup

### Step 3: Branching

Ensure you're working in a new branch created from the "development" branch to avoid disrupting the main codebase.

### Step 4: Install Dependencies

Navigate to the project directory in your terminal and run:

```bash
npm install
```

- This will install all the necessary dependencies for the project.

### Step 5: Start the Development Server

In the project directory, run:

```bash
npm run dev
```

Now, navigate to `http://localhost:3000/{page file name}` in your browser to see the app running, and append the page file name that you want to view (optional).

## Database Visualizer

### Step 6: View Your Database

To visualize and interact with your database, run:

```bash
npx prisma studio
```

After running the command, you can access the database visualizer at `http://localhost:5555/`.


### Step 6: Populate Your Database with Mock(fake) Users

Run this command (depending on your OS) to populate the database with 100 mock users:
- Mac command: `curl -X POST http://localhost:3000/api/createMockUsers>`
- Windows command: `Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/createMockUsers`
    - Make sure that your frontend is running on port 3000 when you execute this command.
    - This will create 100 mock users in the database. You can view them in the database visualizer (Prisma Studio).
    - All this command is doing is triggering the createMockUsers function in the createMockUsers file in the api folder. You can view the code in the api folder to see how it works.