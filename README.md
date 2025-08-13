# 🧠 Sentiment Analysis Tool

An AI-powered full-stack web application for real-time sentiment detection using OpenAI's GPT-4 model. Built with **React.js**, **Node.js**, and **Express**, it classifies text as **Positive**, **Negative**, or **Neutral** with a confidence score and brief explanation.

---
## 🚀 Demo
🖥️ Live Link: _[Coming Soon]_  
📸 Preview Screenshot:

---
## 📦 Features

- 🎯 Real-time sentiment detection
- 🤖 Powered by OpenAI GPT-4 (via API)
- 🧾 Explanation & confidence percentage
- 🔄 Responsive and clean UI
- 🔐 Secure backend with `.env` protection
- ⚙️ Ready for CSV upload & analytics features (Phase 2)

---

## 🛠️ Tech Stack

| Layer      | Tech                        |
|------------|-----------------------------|
| Frontend   | React.js, Axios, CSS        |
| Backend    | Node.js, Express.js         |
| AI Service | OpenAI GPT-4 API            |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure

```
sentiment-analyzer/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js
│   └── package.json
├── DEPLOYMENT.md          # Deployment guide
├── vercel.json            # Vercel configuration
└── Procfile              # Heroku configuration
```

---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/sentiment-analysis-tool.git
cd sentiment-analysis-tool
```

### 2. Setup Backend
```bash
cd server
npm install
# Add your OpenAI key in a .env file
echo "OPENAI_API_KEY=your-key-here" > .env
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm start
```

## 🚀 Production Deployment

### Quick Deploy Options:

1. **Vercel (Recommended)**: 
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel` in project root
   - Follow prompts and set environment variables

2. **Heroku**:
   - Install Heroku CLI
   - Run: `heroku create your-app-name`
   - Set environment variables in Heroku dashboard
   - Deploy: `git push heroku main`

3. **Railway**:
   - Connect GitHub repository
   - Set environment variables in dashboard
   - Automatic deployment on push

### Environment Variables Required:
- `OPENAI_API_KEY`: Your OpenAI API key
- `NODE_ENV`: Set to "production"
- `FRONTEND_URL`: Your frontend domain (for CORS)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## ✨ Upcoming Features (Phase 2+)
- 📤 Upload CSV file for batch sentiment analysis
- 📊 Interactive data visualization (charts)
- 😃 Emotion detection (happy, angry, sad, etc.)
- 📄 Export analysis to PDF report
- 🔐 User authentication (optional)

---

## 🔧 Development

### Available Scripts

**Backend:**
- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm run prod`: Start with production environment

**Frontend:**
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests

### API Endpoints

- `POST /analyze`: Analyze sentiment of provided text
- `GET /health`: Health check endpoint

---

## 📝 License

This project is licensed under the ISC License.

