

// const inputGroup = document.querySelector('.input-group');
const search = document.querySelector('#search');
const sendBtn = document.querySelector('#sendMessage');
const output = document.querySelector('#output');
const history = document.querySelector('#history');
// const previewInput = document.querySelector('#preview')

sendBtn.addEventListener('click', ()=>{
    if(!search.value){
        output.textContent = 'please enter your question first'
    }else{
        getMessages()
    }
});

history.addEventListener('click', (e)=>{
    e.preventDefault();    
    console.log(history.textContent)
    
})
// please enter your api key here, this is not a valid api key
const API_KEY = '';

async function getMessages() {
    let Inputquestion = '';

    if(search){
         Inputquestion = search.value.trim();
    }

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-1106",
            messages: [{ "role": "user", "content": Inputquestion}],
        })
    };
        console.log('getMessages');

        try {
            output.textContent='thinking...'
            const response = await fetch('https://api.openai.com/v1/chat/completions', options);
            const data = await response.json();
            console.log(data);
            output.textContent = data.choices[0].message.content;

            if(data.choices[0].message.content){
               searchinputvalue =  search.value;
               console.log(searchinputvalue);
            //    history.append(searchinputvalue);
            }
            
        } catch (error) {
          //  output.textContent= data.error.type
            console.error(error);
        }


}
