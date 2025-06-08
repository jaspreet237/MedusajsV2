✅ Steps to Use Your Repo:
Clone the Repo:

bash
git clone https://github.com/jaspreet237/MedusajsV2.git
cd MedusajsV2
Install Dependencies:

bash
yarn install
# or
npm install
Create .env File:
Copy the .env.template and fill in values:

bash
Copy
Edit
cp .env.template .env
Run with Docker:
Make sure Docker is running, then:

bash
docker-compose up --build
Access Medusa Admin/Storefront/Backend:
Depends on your docker-compose.yml setup. Usually:

Backend: http://localhost:9000
------------------------------------------------------------------------------------------------------------------------------------------
✅  Here’s a step-by-step guide to running Medusa.js v2 from scratch in Docker, ideal for new projects.

1. Prerequisites
Docker and Docker Compose installed
Basic command line knowledge
2. Create a New Medusa v2 Project
Use the Medusa CLI to scaffold a new project. If you don’t have it, install globally:

sh
npm install -g @medusajs/medusa-cli
Create a new project:

sh
medusa new my-medusa-store
cd my-medusa-store
3. Create a Dockerfile
Create a file named Dockerfile in your project root:


Dockerfile
v3
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
4. Create docker-compose.yml
Create a file named docker-compose.yml in your project root:

5. Configure Medusa Environment
Medusa v2 will read from .env or environment variables. For basic setup, you can rely on the environment variables in docker-compose.yml.
If you want, create a .env file for more settings.

6. Start Medusa with Docker
In your project root, run:

sh
docker-compose up --build
Medusa will now be running at http://localhost:9000/app.

#command to create user for login:
docker-compose exec medusa npx medusa user -e admin@example.com -p supersecret

7. Initialize the Database (if needed)
For fresh setups, Medusa v2 may auto-migrate. If you ever need to run migrations manually:

sh
docker-compose exec medusa npx medusa migrations run
8. Access Medusa
API: http://localhost:9000/app
Admin: v2 does not include admin UI by default. You can add it as a separate service.
9. Next Steps
Add plugins or modules as needed (payments, file storage, etc.)
For production, set proper environment variables, secrets, and use medusa start instead of dev.

#command to create user for login:
docker-compose exec medusa npx medusa user -e admin@example.com -p supersecret
