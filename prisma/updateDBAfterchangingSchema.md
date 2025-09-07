# Guide to Interactions with Supabase
## Pushing to Supabase:
### 1. Save your changes in the `schema.prisma` file.

### 2. Generate the Prisma client by running:


```shell
npx prisma generate
```

This regenerates the Prisma client based on your updated schema.

### 3. (Option 1) Apply the changes to the database (Supabase) using migrations:

If you are in a development environment or you would not like to push your changes directly to production, you mush first create a migration for the changes you've made:


```shell
npx prisma migrate dev --name <migration_name>
```
Replace `<migration_name>` with a descriptive name for your migration (e.g., `add_new_column` or `update_user_model`). This command will create a new migration file based on your changes and apply it to the Supabase database.

### 3. (Option 2) Push the changes to Supabase:

If you are not in a development environment or you'd like to directly push changes to production, you can use:


```shell
npx prisma migrate deploy
```

This will apply the migration directly to your Supabase database without prompting for development actions.

### 5. Verify the changes:

After deploying, you can check the state of your Supabase database and ensure the changes were applied. You can use Supabase Studio or query the database using Prisma or SQL to verify the schema updates.

### Summary of Commands:
- `npx prisma generate:` Regenerate the Prisma client.
- `npx prisma migrate dev --name <migration_name>:` Create and apply migrations in a dev environment.
- `npx prisma migrate deploy:` Apply migrations to production (or Supabase).

Once these steps are completed, your changes in schema.prisma will be reflected in your Supabase database.

## Pulling from Supabase:
