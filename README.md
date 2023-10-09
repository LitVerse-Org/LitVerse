# Local Development Environment Setup

This guide will walk you through setting up your local development environment for the Litverse project.

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

This will install all the necessary dependencies for the project.

### Step 5: Start the Development Server

In the project directory, run:

```bash
npm run dev
```

Now, navigate to `http://localhost:3000/{page file name}` in your browser to see the app running.

## Database Visualizer

### Step 6: View Your Database

To visualize and interact with your database, run:

```bash
npx prisma studio
```

After running the command, you can access the database visualizer at `http://localhost:5555/`.
