require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama3-8b-8192";
const GROQ_API_KEY = "API_KEY";

app.post('/summarize', async (req, res) => {
  const { content } = req.body;

  if (!content || content.length < 20) {
    return res.status(400).json({ error: 'invalid content' });
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: `Summarize this webpage content in 5 concise bullet points WITHOUT SAYING "HERE ARE THE BULLET POINTS" please:\n\n${content}`
          }
        ],
        temperature: 0.5,
        max_tokens: 300
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0].message.content) {
      console.error("unusual API response:", data);
      return res.status(500).json({ error: 'unusual response from Groq API.' });
    }

    const summary = data.choices[0].message.content.trim();
    res.json({ summary });

  } catch (err) {
    console.error("error in summarization!:", err);
    res.status(500).json({ error: 'summarizing failed. ' + err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
