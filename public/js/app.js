const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

messageOne.textContent=''


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            console.log(data.error)
        }
        else{
            console.log(data.location)
            messageOne.textContent=data.location
            console.log(data.forecast)
            messageTwo.textContent=data.forecast
        }
    })
})

})

