# Environment Setup & Deployment Guide

This guide explains how to set up and run the Qode Technologies application in both development and production environments with automatic environment detection.

## Overview

The application consists of:
- **Frontend** (React/Vite): `/home/batman/Desktop/qodetechnologies/`
- **Backend** (Node.js/Express): `/home/batman/Downloads/work/qodehost/`

Both frontend and backend automatically detect the environment and use appropriate configurations.

## Environment Files

### Frontend Environment Files

Located in `/home/batman/Desktop/qodetechnologies/`:

- `.env.development` - Development environment variables
- `.env.production` - Production environment variables

### Backend Environment Files

Located in `/home/batman/Downloads/work/qodehost/`:

- `.env.development` - Development environment variables
- `.env.production` - Production environment variables

## Configuration System

### Frontend Configuration

The frontend uses `/src/config/api.js` which automatically:
- Detects if running in development or production
- Loads appropriate environment variables
- Provides API endpoints and helper functions

```javascript
import apiConfig from '../config/api';

// Automatic endpoint resolution
const response = await fetch(apiConfig.getEndpoint('/api/v1/contacts'));
```

### Backend Configuration

The backend uses `/config/config.js` which automatically:
- Loads environment-specific `.env` files based on `NODE_ENV`
- Provides configuration object with all settings
- Includes dynamic CORS configuration

## Development Setup

### 1. Frontend Development

```bash
cd /home/batman/Desktop/qodetechnologies

# Install dependencies
npm install

# Start development server (uses .env.development)
npm run dev

# Or explicitly run in production mode
npm run dev:prod
```

### 2. Backend Development

```bash
cd /home/batman/Downloads/work/qodehost

# Install dependencies
npm install

# Start development server (uses .env.development)
npm run dev
# or
npm run start:dev

# Or explicitly run in production mode
npm run prod
# or
npm run start:prod
```

## Production Deployment

### 1. Environment Configuration

Update the production environment files with your actual values:

**Frontend** (`.env.production`):
```env
VITE_API_BASE_URL=https://your-live-backend-url.com
VITE_APP_ENV=production
```

**Backend** (`.env.production`):
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://your-production-cluster/qode_prod
JWT_SECRET=super_secure_jwt_production_secret_key
JWT_EXPIRE=7d
EMAIL_USERNAME=your-production-email@domain.com
EMAIL_PASSWORD=your-production-app-password
EMAIL_FROM=Qode <noreply@qode.com>
FRONTEND_URL=https://your-live-frontend-url.com
```

### 2. Frontend Production Build

```bash
cd /home/batman/Desktop/qodetechnologies

# Build for production
npm run build:prod

# Preview production build
npm run preview:prod
```

### 3. Backend Production Deployment

```bash
cd /home/batman/Downloads/work/qodehost

# Set environment variable
export NODE_ENV=production

# Start production server
npm run prod
# or
npm run start:prod
```

## Available Scripts

### Frontend Scripts

- `npm run dev` - Development server
- `npm run dev:prod` - Development server with production env
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm run preview` - Preview build
- `npm run preview:prod` - Preview production build
- `npm run preview:host` - Preview with network access

### Backend Scripts

- `npm run dev` - Development with NODE_ENV=development
- `npm run prod` - Production with NODE_ENV=production
- `npm run start` - Default (uses nodemon)
- `npm run start:dev` - Explicit development
- `npm run start:prod` - Explicit production

## Environment Variables

### Required Backend Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - Token expiration (default: 7d)
- `EMAIL_USERNAME` - Gmail address for sending emails
- `EMAIL_PASSWORD` - Gmail app password
- `EMAIL_FROM` - From address for emails
- `FRONTEND_URL` - Frontend URL for CORS

### Required Frontend Variables

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_APP_ENV` - App environment (development/production)

## Automatic Environment Detection

### Frontend Detection Logic

1. Checks `import.meta.env.DEV` (Vite's built-in flag)
2. Checks `import.meta.env.VITE_APP_ENV`
3. Falls back to development if unsure

### Backend Detection Logic

1. Uses `NODE_ENV` environment variable
2. Loads corresponding `.env.${NODE_ENV}` file
3. Falls back to `.env.development` if NODE_ENV not set

## Security Notes

- **Never commit `.env.production` files to version control**
- **Use strong JWT secrets in production**
- **Use production database credentials in production**
- **Configure proper CORS origins for production**
- **Use HTTPS in production**

## Troubleshooting

### Common Issues

1. **Wrong environment loaded**: Check `NODE_ENV` variable
2. **CORS errors**: Verify `FRONTEND_URL` in backend config
3. **Database connection**: Check `MONGODB_URI` for correct environment
4. **Email not sending**: Verify email credentials for current environment

### Debugging

Enable debug logging by checking the console output:
- Frontend shows environment detection in network requests
- Backend shows loaded environment on startup
- Database connection includes environment info

## Deployment Checklist

- [ ] Update `.env.production` files with real values
- [ ] Set `NODE_ENV=production` in production
- [ ] Use production database
- [ ] Configure production email service
- [ ] Set strong JWT secrets
- [ ] Configure proper CORS origins
- [ ] Test all functionality in production
- [ ] Monitor logs for environment detection
