# Open letter website template

This template repository can be used to create open letters website in which signatures can be collected. It built using [Next.js](https://nextjs.org/) and TypeScript.

See the project [_PlanerInnen für Deutsche Wohnen & Co Enteignen_](https://github.com/vogelino/planerinnenfuerdwe) for an example.

## Create your own open letter

The signatures of the open letter are collected on [Supabase](http://supabase.io) instance. To replicate this repo, you must first make sure to have your own Supabase instance (the backend) containing a single table with the following columns:

- userId (reference to the auth table, required)
- firstName (text, required)
- lastName (text, required)
- confirmedAt (timestamp, required)
- organisation (text, optional)

Then, clone this repository (the frontend), create a file on the root level named `.env` or `.env.development.local` and fill in the required values (see `.env.example` for a reference). You need to add the following env variables as [GitHub secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) for your repository if you wish the github actions to run:

- `NEXT_PRIVATE_SUPABASE_SERVICE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`

Finally, run `npm install` to install all required dependencies and then `npm run dev` to start developing locally. All available script can be found further down.

### Quality management

This repo use husky and lint-staged to run some quality management script before each commits. These scripts are:
- Lint all js files
- Type-check changed typescript files
- Run tests concerned by changed files

To enable type checking of only staged files, a script has been added `scripts/tsc-lint.sh`. To allow this script to run, you might need to give it the relevant permissions. Run `chmod +x scripts/tsc-lint.sh`. The script is needed because there is otherwise no way to run `tsc` only on staged files. Typescript only allows for either a list of files or a `tsconfig.json`. 

## Structure

The folder structure follows [Next.js](https://nextjs.org/)'s recommendations.

### Views and components

Page routing is achieved with [Next.js](https://nextjs.org/)'s [file-system routing](https://nextjs.org/docs/routing/introduction). The views themselves are simply React components that can be found in `src/components`. All other components can be found there as well.

### Storybook

This repo uses [Storybook](https://storybook.js.org/) to create and test its React components in isolation.
It also uses the [storyshots addon](https://storybook.js.org/docs/react/workflows/snapshot-testing#gatsby-focus-wrapper) to create test snapshots.

### Testing

The library [jest](https://jestjs.io/) is used to unit test the code as well as [testing-library](https://testing-library.com/) to test the react components, user events, and other things.

To run the tests enter:
```sh
npm t
```

Or in watch mode:
```sh
nom run test:watch
```

### Styling & Theming

This project uses [Tailwind CSS](http://tailwindcss.com) for styling. The primary style definitions can be found in `src/style/theme.ts`. The theme can be referenced in every component. For visual consistency, definitions from the theme should be used whenever possible. Information about using the theme can be found in Theme UI's docs.

## Workflow

New features, fixes, etc. should always be developed on a separate branch:

1. In your local repository, checkout the `main` branch.
2. Run `git checkout -b <name-of-your-branch>` to create a new branch (ideally following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and with a reference ID).
3. Make your changes
4. Push your changes to the remote: `git push -U origin HEAD`
5. Open a pull request.

You can commit using the `npm run cm` command to ensure your commits follow our conventions.

## Deployment

The frontend is currently deployed to [Vercel](https://vercel.com/). Pushing to the `main` branch will automatically trigger a new deploy. This should be avoided, if possible. Rather use pull requests against main.

