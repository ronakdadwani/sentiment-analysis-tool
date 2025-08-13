# 🚀 Production Deployment Guide

## Prerequisites
- OpenAI API key
- Git repository
- Deployment platform account (Heroku, Vercel, Railway, etc.)

## Environment Setup

### 1. Server Environment Variables
Create `server/.env` file:
```bash
OPENAI_API_KEY=your_actual_openai_api_key
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com
```

### 2. Client Environment Variables
Create `client/.env` file:
```bash
REACT_APP_API_URL=https://your-backend-domain.com
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project root
3. Configure environment variables in Vercel dashboard
4. Deploy: `vercel --prod`

### Option 2: Heroku
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Set environment variables:
   ```bash
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set NODE_ENV=production
   ```
4. Deploy: `git push heroku main`

### Option 3: Railway
1. Connect GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Option 4: Render
1. Connect GitHub repository
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm start`
4. Configure environment variables

## Build Process

### 1. Build React App
```bash
cd client
npm run build
```

### 2. Test Production Build
```bash
cd server
NODE_ENV=production npm start
```

## Security Checklist
- [ ] Valid OpenAI API key
- [ ] CORS configured for production domains
- [ ] Input validation implemented
- [ ] Rate limiting enabled
- [ ] Error handling without sensitive info
- [ ] HTTPS enabled
- [ ] Environment variables secured

## Monitoring
- Set up health check endpoint monitoring
- Configure error tracking (Sentry)
- Monitor API usage and costs
- Set up uptime monitoring

## Post-Deployment
1. Test all functionality
2. Update README with live URL
3. Set up domain and SSL
4. Configure monitoring and alerts
