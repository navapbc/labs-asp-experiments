# Getting Started

## Building your environment

Creat an `.env.local` file in your project root and add your OpenAI API Key

```bash
touch .env.local
```

```javascript
OPENAI_API_KEY=xxxxxxxxx
```

### Set up for Neon DB

Create an `.env` file in your project root

`touch .env`

Your `.env` file will have the following in it:

```javascript
# Database
DATABASE_URL="postgres://your-neon-db-connection-string-here"

# Auth
JWT_SECRET="32-character-min-secure-jwt-secret-key" 
```

For a quick setup, you can use [Instagres](https://www.instagres.com/) (powered by NeonDB) to get a temporary hosted PostgreSQL database.
       - Go to [Instagres](https://www.instagres.com/) and create a new database.
       - Copy the provided database URL.
       - Paste this URL as the value for `DATABASE_URL` in your `.env` file.
       - **Important:** Instagres databases expire after one hour. You can create a new one when needed or consider creating a free Neon account for a more persistent database.

**Run Database Migrations:**

- To set up the database schema, you need to run database migrations. This will create the necessary tables in your PostgreSQL database.
- Run the following command in your terminal:

     ```bash
     npm run db:push
     ```

This command uses Dirzzle ORM to push your database schema to the configured database.

### Install Dependencies

Run the following to install dependencies:

```bash
pnpm install
```

Finally, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

