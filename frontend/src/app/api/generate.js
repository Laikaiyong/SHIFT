import axios from 'axios';

export default async function handler(req, res) {
        const prompt = req.json();
        console.log(prompt);
        const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,       {"contents": [{
            "parts":[{"text": prompt.desc}]
            }]});
            const generatedText = response[0].content.parts[0].text;
            if (response.code == 200) {
                // This is where you should perform backend actions if the verification succeeds
                // Such as, setting a user as "verified" in a database
                res.status(200).send(generatedText);
            }
};