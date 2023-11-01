After you fetch dev branch, all of a sudden your build fails.

#### Throughout your environment, make sure these things are lined up:
1. Your PSQL server port # and the server port # in the .env file are the same.
2. You are at the correct urls for the frontend and database visualizer.
3. etc...

#### Do these steps next:
1. Delete node_modules folder using `rm -rf node_modules`
2. Run `npm install`
3. Run `npm run dev`
asdasd
4. Open another terminal, navigate to the project directory
5. Start your PSQL server through the mac "postgres" app, windows "pgadmin" app, or through the terminal. 
   1. There are many ways to run your psql server, but just make sure the port it is running on is the same as the port in the database_url in the .env file in the project (5431 or 5432), and in the command used below. They just need to all be the same port.

#### Fresh Prisma Migration Steps:
1. Run `npm install prisma --save-dev`
   1. This makes a new migration that will account for the new changes in the schema.prisma file.
2. Run `npx prisma generate`
3. Run `npx prisma migrate dev`
4. Run `npx prisma studio. `