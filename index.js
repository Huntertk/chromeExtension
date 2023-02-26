
window.addEventListener("DOMContentLoaded",() => {
    getImage()
    getCoinInfo()
    getMotivation()
})

const getImage = () => {
    let url = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        document.getElementById('author').textContent = `By: ${data.user.name}`
        document.body.style.backgroundImage = `url(${data.urls.full})`
    })
    .catch(err => {
        console.log(err)
        document.body.style.backgroundImage = `url(https://images.unsplash.com/flagged/photo-1579750481098-8b3a62c9b85d?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzczODg1NTY&ixlib=rb-4.0.3&q=80)`
        
        document.getElementById('author').textContent = `By: Andrés Dallimonti`
    })
}
const getTime = () => {
    const currentTime = new Date()
    let currentTimeFormat = currentTime.toLocaleTimeString("en-us", {timeStyle: "medium"})

    document.getElementById('middle-container').innerHTML = currentTimeFormat
    // console.log(currentHour)
}

const getCoinInfo = () => {
    let url = `https://api.coingecko.com/api/v3/coins/bitcoin`
    fetch(url)
    .then(res => res.json())
    .then(data => {

        document.getElementById('crypto-details').innerHTML = `
            <img src="${data.image.small}" >
            <span class="crypto-name">${data.name}<span>
        `
        document.getElementById('crypto').innerHTML += `
            <p>💲₹${data.market_data.current_price.inr}</p>
            <p>⬆️ ₹${data.market_data.high_24h.inr}</p>
            <p>⬇️ ₹${data.market_data.low_24h.inr}</p>

        `
        // console.log(data)
        // console.log(data.market_data.low_24h.usd)
    })
    .catch(err => console.error(err))

}





const getWhether = () => {
    fetch('https://apis.scrimba.com/openweathermap/data/2.5/weather?q=patna&units=metric')
    
    .then(res => {
        if(!res.ok){
            throw Error("Data Not Available")
        }
        return res.json()
    })
    .then(data => {
        data.weather
            /*This Query for Getting Img*/
            document.querySelector('.whether').innerHTML = `
            
            <div class="whether-container">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" >
            <p>${Math.round(data.main.temp)}° C</p>
            </div>    
            <p>${data.name}</p>
            `
        
    })
    .catch(err => console.error(err))
}


const getMotivation  = () => {
    let url = `https://type.fit/api/quotes`
    fetch(url)
    .then(res => {
        if(!res.ok){
            throw Error("Error Occured")
        }
        return res.json()
    })
    .then(data => {
        const randomNumber = Math.floor(Math.random() * data.length)+1
        // console.log(data[randomNumber])
        document.getElementById('writer').innerHTML = data[randomNumber].text

        
    })
    .catch(err => console.error(err))
}


setInterval (() => {
    getImage()
    getMotivation()
},30000)

setInterval(()=>{
    getTime()
},1000)

getWhether()