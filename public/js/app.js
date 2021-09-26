const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault() 

    const location = search.value
    console.log("location")
    console.log(location)

    messageOne.textContent = 'Data Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/climate?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log("data.error")
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log("data from fetch api")
                console.log(data)
                messageOne.textContent = ''
                messageTwo.textContent = data.forecast
            }
        })
    })
})
