# Telegram Frontend

A frontend application for interacting with the Telegram backend. Built with React, TypeScript, and Vite.

---

## Overview

This project provides the frontend interface for your Telegram integration system.  
It connects to the backend to send and receive Real-time messages, Location, file and Images.

---

## Features

- React + TypeScript frontend  
- Built using Vite for fast hot module reloading  
- Integrated with backend API endpoints  
- ESLint for code quality  
- Configurable via environment variables  

---

## Technologies

- React  
- TypeScript  
- Vite  
- ESLint
- Cloudinary
- CSS / CSS Modules (or your preferred styling approach)  

---

## Getting Started

### Prerequisites

Make sure you have:

- Node.js v14 or higher  
- npm or yarn  

### Installation

Clone this repository:

```bash
git clone https://github.com/alidev-r1996/telegram-front.git
```

## Install dependencies:
```bash
npm install
# or
yarn install
```

## Configuration
Create a .env file in the root directory with values similar to:
```
VITE_API_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
UPLOADTHING_TOKEN=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
Adjust to your setup (API URL, keys, etc.).

## Running Locally
```bash
npm run dev
# or
yarn dev
```

## Project Structure
```
telegram-front/
├── public/                 # static files
├── src/                    # source code
│   ├── components/         # UI components
│   ├── pages/              # page views, routes
│   ├── services/           # API calls or data fetching
│   ├── styles/             # CSS / styling
│   └── main.tsx            # entry point
├── .env                    # environment vars (not committed ideally)
├── .gitignore
├── vite.config.ts
├── package.json
└── tsconfig.json
```

## Contributing

Contributions are welcome!  

<ol start="1">
  <li>Fork the repository</li>
  <li>Create a feature branch: <code>git checkout -b feature/YourFeature</code></li>
  <li>Commit your changes: <code>git commit -m "Add new feature"</code></li>
  <li>Push to your branch: <code>git push origin feature/YourFeature</code></li>
  <li>Open a Pull Request</li>
</ol>



