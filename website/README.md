# Website

## Overview

This is the documentation for the "website," a React-based web application designed to display player rankings based on specific categories such as goals, points, wins, and losses. The project includes a visual representation of the website's structure in the form of a diagram. Please refer to the diagram below:

![Website Diagram](https://media.discordapp.net/attachments/1159211106087215204/1208556007459131402/website.png?ex=65e3b67e&is=65d1417e&hm=1d1d86c275cd5e8f223a9a7fd2f66a42516d6b09e74b718d12a06595e64bcf99&=&format=webp&quality=lossless&width=1826&height=888)

## Getting Started

Follow these steps to set up and run the project:

1. Install dependencies:
    ```bash
    npm install
    ```

2. Run the development server:
    ```bash
    npm run dev
    ```

## Purpose

The primary purpose of the "website" is to present player rankings based on various categories. These categories may include but are not limited to:

- points
- wins
- defeats
- games

The website provides a user-friendly interface for viewing and interacting with the player rankings in real-time.

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

```
VITE_API_URL=https://yourdomain.com/api
VITE_GRAPHQL_URL=https://api.yourdomain.com/graphql
```

Make sure to replace placeholders like `yourdomain.com` with your actual domain.

## GraphQL Code Generation

The project, along with the codegen script, generates a special gql folder. This folder contains automatically generated types that ensure proper type checking for mutations and other GraphQL operations. This feature enhances the development experience and helps prevent runtime errors related to GraphQL queries.

## Scripts

- `dev`: Start the development server.
- `build`: Build the project for production.
- `preview`: Preview the production build locally.
- `codegen`: Run GraphQL code generation using the configuration specified in `codegen.ts`.
