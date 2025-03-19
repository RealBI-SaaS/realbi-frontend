# Installation Guide

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or pnpm package manager
- Git

## Setup Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/analytics-saas.git
cd analytics-saas/frontend/saas-frontend
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using pnpm
pnpm install
```

### 3. Environment Setup
1. Create a `.env` file in the root directory
2. Copy the contents from `.env.example` 
3. Update the environment variables with your values

### 4. Start Development Server
```bash
# Using npm
npm run dev

# Or using pnpm
pnpm dev
```

The application will be available at `http://localhost:5173` (or the port specified in your environment variables).

## Available Scripts

- `npm run dev` or `pnpm dev` - Start development server
- `npm run build` or `pnpm build` - Build for production
- `npm run start` or `pnpm start` - Start production server
- `npm run lint` or `pnpm lint` - Run linting
- `npm run test` or `pnpm test` - Run tests

## Project Structure

```
saas-frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles and theme
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request





