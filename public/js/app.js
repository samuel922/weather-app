


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    messageOne.textContent = 'Loading Message...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
            response.json().then(({error, location, forecast} = {}) => {
                if (error) {
                    messageOne.textContent = error
                } else {
                    messageOne.textContent = location
                    messageTwo.textContent = forecast
                }
            })
    })
    
})