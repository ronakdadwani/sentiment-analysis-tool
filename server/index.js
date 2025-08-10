const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    console.log("Analyzing text:", text);
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is missing. Please check your .env file.");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Analyze the sentiment of this text: "${text}". Respond with: Sentiment (Positive/Negative/Neutral), Confidence, and a short explanation.`,
        },
      ],
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
