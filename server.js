const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const config = require('./fetch-api-key');
const uatToken = config.uatToken


app.post('/api/openai/travel', async (req, res) => {

    console.log(req.body);

    const options = {
        hostname: 'openai-test.web.abc.com',
        path: '/openai-public-api/conversation',
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': 'basic ' + uatToken,
          'Content-Type': 'application/json'
        }
      };

        const city = "Seattle"
        const data = JSON.stringify({
          "messages": [
            {
              "role": "system",
              "content": "You are a local in the city and willing to give recommendations to visitor to your city."
            },
            {
              "role": "user",
              "content": `Provide the top 10 attractions of ${city} in a short list with descriptions and latitude and longtitude as a JSON object`
            }
          ],
          "conversation_mode": [
            "default"
          ],
          "model": config.model,
          "conversation_guid": "asdf123",
          "conversation_source": config.source
        });
        
    try {
        const reqBCAI = await https.request(options, (resBCAI) => {
          let responseData = '';
          resBCAI.on('data', (chunk) => {
            responseData += chunk.toString();
        
          });
        
          resBCAI.on('end', () => {
        
            const jsonStrings = responseData.match(/(.*)}]}]}/g);
            const result = JSON.parse(jsonStrings[jsonStrings.length-1]);
            const content = result.choices[0].messages[0].content
            const output = content.substring(content.indexOf('{'), content.lastIndexOf('}')+1);
            const cities = JSON.parse(output)
            console.log(JSON.stringify(cities));
            res.json(cities);
          });
        });
        
        reqBCAI.on('error', (error) => {
          console.error(error);
        });

        reqBCAI.write(data);
        reqBCAI.end();

    } catch (error) {
        res.status(500).send('Error communicating with OpenAI API');
    }
});

app.post('/api/openai/blackjack', async (req, res) => {

  console.log(req.body);

  const options = {
      hostname: config.hostname,
      path: config.path,
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': 'basic ' + uatToken,
        'Content-Type': 'application/json'
      }
    };

      // "content": `I'm playing black jack with a deck of ${numberCard}.  These cards have been used in previous hands ${shownCards}. The dealer has King and six,  
      // I have three, six and four.  Should I take a hit or stand? Provide your reason in json with decision Yes or No and rationale`

      const data = JSON.stringify({
        "messages": [
          {
            "role": "system",
            "content": "You are an expert statistician and you are giving answer to question related to probability."
          },
          {
            "role": "user",
            "content": `${req.body.messages[0].content}. The goal is to have higher points than the dealer has without going over 21 points. 
            should I take another card or not? Provide your reason in json with decision Yes or No and rationale`
          }
        ],
        "conversation_mode": [
          "default"
        ],
        "model": config.model,
        "conversation_guid": "asdf123",
        "conversation_source": config.source
      });

      console.log(data);
      
  try {
      const reqBCAI = await https.request(options, (resBCAI) => {
        let responseData = '';
        resBCAI.on('data', (chunk) => {
          responseData += chunk.toString();
      
        });
      
        resBCAI.on('end', () => {
      
          const jsonStrings = responseData.match(/(.*)}]}]}/g);
          const result = JSON.parse(jsonStrings[jsonStrings.length-1]);
          const content = result.choices[0].messages[0].content
          let output = " ";
          try {
            output = content.substring(content.indexOf('{'), content.lastIndexOf('}')+1);
          }
          catch (error) { 
            output = content.substring(content.indexOf('json')+4, content.lastIndexOf('}')+1);
          }
          const decisions = JSON.parse(output)
          console.log(JSON.stringify(decisions));
          res.json(decisions);
        });
      });
      
      reqBCAI.on('error', (error) => {
        console.error(error);

      });

      reqBCAI.write(data);
      reqBCAI.end();

  } catch (error) {
      res.status(500).send('Error communicating with OpenAI API');
  }
});

app.post('/api/openai/fake', async (req, res) => {

    console.log(req.body);

    //Make fake result from ChatGTP
    const random = Math.random();
    const chance = random < 0.5 ? "No": "Yes";
    res.json ({"decision":chance, "rationale":"Random decision.  Just Have fun"})
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
