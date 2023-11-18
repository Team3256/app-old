# Notes when using Supabase

Let `DB_URL=postgresql://postgres:d0a344c4-882e-42ba-806c-da5149911e35@ec2-54-244-76-183.us-west-2.compute.amazonaws.com:5432/postgres`

When you `git pull`, in addition to remembering to do `pnpm install`...:

- Also run `supabase db pull --db-url=$DB_URL`
- Also run `supabase db reset` if changes existed

When you locally edit, remember to do commit your migrations via

```
supabase db push --db-url=$DB_URL
```

To double check that your migrations have synced:

```
supabase migration list --db-url=$DB_URL
```
