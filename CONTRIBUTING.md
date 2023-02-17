# Contributing

Thanks for your interest in contributing to useWallet! Please take a moment to review this document **before submitting a pull request.**

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/CasperDash/useWallet/discussions).

> **Note**
>
> **Please ask first before starting work on any significant new features. This includes things like adding new connectors, hooks, chains, API providers, etc.**
>
> It's never a fun experience to have your pull request declined after investing time and effort into a new feature. To avoid this from happening, we request that contributors create a [feature request](https://github.com/CasperDash/useWallet/discussions/categories/ideas) to first discuss any API changes or significant new ideas.

<br>

## Basic guide

This guide is intended to help you get started with contributing. By following these steps, you will understand the development process and workflow.

- [Contributing](#contributing)
  - [Basic guide](#basic-guide)
  - [Cloning the repository](#cloning-the-repository)
  - [Installing Node.js and pnpm](#installing-nodejs-and-pnpm)
  - [Installing dependencies](#installing-dependencies)
  - [Starting the development playground](#starting-the-development-playground)
  - [Running the test suite](#running-the-test-suite)
  - [Writing documentation](#writing-documentation)
  - [Submitting a pull request](#submitting-a-pull-request)

<br>

---

<br>

## Cloning the repository

To start contributing to the project, clone it to your local machine using git:

```bash
git clone https://github.com/CasperDash/useWallet --recurse-submodules
```

Or the [GitHub CLI](https://cli.github.com):

```bash
gh repo clone CasperDash/useWallet -- --recurse-submodules
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Installing Node.js and pnpm

useWallet uses [pnpm workspaces](https://pnpm.io/workspaces) to manage multiple projects. You need to install **Node.js v16 or higher** and **pnpm v7 or higher**.

You can run the following commands in your terminal to check your local Node.js and npm versions:

```bash
node -v
pnpm -v
```

If the versions are not correct or you don't have Node.js or pnpm installed, download and follow their setup instructions:

- Install Node.js using [fnm](https://github.com/Schniz/fnm) or from the [official website](https://nodejs.org)
- Install [pnpm](https://pnpm.io/installation)

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Installing dependencies

Once in the project's root directory, run the following command to install the project's dependencies:

```bash
pnpm install
```

After the install completes, pnpm links packages across the project for development and [git hooks](https://github.com/toplenboren/simple-git-hooks) are set up.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Starting the development playground

To start the local development playground, run the following. This will run a [Next.js](https://nextjs.org) app (located at [`examples/example-react`](../examples/example-react)) that is set up for playing around with code while making changes.

```bash
pnpm play
```

Once the Next.js dev server is running, you can make changes to any of the package source files (e.g. `packages/react`) and it will automatically update the playground. (If the playground isn't automatically updating, try running `pnpm dev` to relink packages in development mode.)

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Running the test suite

Next, in a different terminal session, you have the following options for running tests:

- `pnpm test` — runs tests in watch mode
- `pnpm test:run` — performs single run without watch mode

When adding new features or fixing bugs, it's important to add test cases to cover the new/updated behavior.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Writing documentation

Documentation is crucial to helping developers of all experience levels use useWallet. useWallet uses [Nextra](https://github.com/shuding/nextra) and [MDX](https://mdxjs.com) for the documentation site (located at [`docs`](../docs)). To start the site in dev mode, run:

```bash
pnpm docs:dev
```

Try to keep documentation brief and use plain language so folks of all experience levels can understand. If you think something is unclear or could be explained better, you are welcome to open a pull request.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Submitting a pull request

When you're ready to submit a pull request, you can follow these naming conventions:

- Pull request titles use the [Imperative Mood](https://en.wikipedia.org/wiki/Imperative_mood) (e.g., `Add something`, `Fix something`).
- [Changesets](#versioning) use past tense verbs (e.g., `Added something`, `Fixed something`).

When you submit a pull request, GitHub will automatically lint, build, and test your changes. If you see an ❌, it's most likely a bug in your code. Please, inspect the logs through the GitHub UI to find the cause.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

<br>

---

<div align="center">
  ✅ Now you're ready to contribute to useWallet! Follow the next steps if you need more advanced instructions.
</div>

---
