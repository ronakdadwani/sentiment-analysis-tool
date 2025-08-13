const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();

// Security middleware
app.use(express.json({ limit: '1mb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://yourdomain.com'] // Add your domain
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post("/analyze", async (req, res) => {
  const { text } = req.body;

  // Input validation
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: "Text is required and must be a string" });
  }

  if (text.length > 1000) {
    return res.status(400).json({ error: "Text is too long. Maximum 1000 characters allowed." });
  }

  try {
    console.log("Analyzing text:", text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
      // Return mock response for testing
      console.log("No API key found, returning mock response");
      const mockResponses = [
        "Sentiment: Positive, Confidence: 85%, Explanation: This text expresses joy and satisfaction.",
        "Sentiment: Negative, Confidence: 78%, Explanation: This text shows frustration or disappointment.",
        "Sentiment: Neutral, Confidence: 65%, Explanation: This text appears to be factual without strong emotional content."
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      return res.json({ result: randomResponse });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Analyze the sentiment of this text: "${text}". Respond with: Sentiment (Positive/Negative/Neutral), Confidence, and a short explanation.`,
        },
      ],
      max_tokens: 150,
      temperature: 0.3,
    });
    
    console.log("OpenAI response received");
    const result = completion.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error("Error in /analyze endpoint:", error);
    
    if (error.message.includes("API key")) {
      res.status(500).json({ error: "OpenAI API key is missing or invalid" });
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      res.status(500).json({ error: "Cannot connect to OpenAI API. Check your internet connection." });
    } else if (error.status === 401) {
      res.status(500).json({ error: "OpenAI API key is invalid or expired" });
    } else if (error.status === 429) {
      res.status(500).json({ error: "OpenAI API rate limit exceeded. Please try again later." });
    } else {
      res.status(500).json({ error: `OpenAI API error: ${error.message}` });
    }
  }
});

// Serve React app for all other routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
