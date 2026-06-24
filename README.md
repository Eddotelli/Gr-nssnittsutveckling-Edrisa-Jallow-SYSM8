# Drone Delights

A fictional drone food delivery web application built with React. Users can browse a menu, add items to a cart, save favorites, and place orders. Authentication is required to access profile and favorites pages.

## Features

- Browse menu by category (Burgers, Poke, Drinks, Sides)
- Add items to cart and proceed to checkout
- Save favorite items (requires login)
- User registration and login
- Protected routes for profile and favorites
- Mock backend via JSON Server

## Tech Stack

- React 19
- React Router v7
- JSON Server (mock REST API)
- concurrently (runs frontend and backend in parallel)

## Prerequisites

- Node.js and npm installed

## Getting Started

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

This starts both the React app at http://localhost:3000 and the JSON Server API at http://localhost:3001.

## Available Routes

| Path | Description |
|------|-------------|
| `/` | Home page |
| `/menu` | Browse the full menu |
| `/cart` | View your cart |
| `/checkout` | Place your order |
| `/login` | Log in |
| `/signup` | Create an account |
| `/profile` | Your profile *(requires login)* |
| `/favorites` | Your saved favorites *(requires login)* |
