alert('Hello!')

let url = 'https://api.exchangeratesapi.io/latest?base=usd'

let dollarInput = document.querySelector('#dollars')
let targetCurrencySelect = document.querySelector('#target-currency')
let convertButton = document.querySelector('#convert')
let resultDisplay = document.querySelector('#result')

convertButton.addEventListener('click', function() {

    // dollars
    let dollars = dollarInput.value //todo validation
    // What currency
    let currency = targetCurrencySelect.value // todo validation

    console.log(dollars, currency)
    
    fetch(url)
        .then(response => {
            // Response is all the things from the server
            console.log(response)
            // extract JSON
            return response.json() // convert JavaScript objects, array, wha

            // Or
            // let JSONPromise = response.json()
            // return JSONPromise

        }) // delete function and add the arrow to change to arrow notation
        .then(data => {
            console.log(data)
            // can you figure out the conversion?
            allRates = data.allRates
            // currency is CAD, or HDK, ISK...
            let conversion = allRates[currency]

            // Math
            let result = dollars * conversion 
            // display results
            resultDisplay.innerHTML = result

        })

})

// If you are going to read data use square brackets