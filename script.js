const ingredienser = document.getElementById('ingredienser');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', () => {
    
    // Vi skapar vår prompt som vi skickar till OpenAI
    let prompt = "Du är en vegetarisk kock och skall ge förslag på mat jag kan laga på de ingredienser jag har hemma."
    prompt += "Du kan även ge förslag på nya ingredienser jag kan köpa för att laga nya spännande rätter."
    prompt += "De ingredienser jag har hemma är: "
    prompt += ingredienser.value;
    console.log("Vad vi skickar till OpenAI: " + prompt);

    // Vi skickar vår prompt till OpenAI
    callChatGPT(prompt)
    .then(reply => {
        console.log('ChatGPT: ' + reply);
        svar.innerHTML = "<p>" + reply + "</p>";
    })
    .catch(error => {
        console.error('Error:', error);
    });

});

// Själva anropet
async function callChatGPT(prompt) {

    svar.innerHTML += "<p>Tänker!</p><p>Det kan ta mig några minuter att förbereda ett svar.</p>"

    console.log('Promptar OpenAI API...');

    // API Nyckel + URL
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  
    // Inställningar för OpenAI
    const data = {
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'},
                     {'role': 'user', 'content': prompt}]
      };
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
  
    // Tar emot svaret
    const result = await response.json();
    const reply = result.choices[0].message.content;
    
    return reply;
  }