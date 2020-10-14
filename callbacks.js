let animals = ['Giraffe', 'Elephant', 'Yak']

// Classic Callback Function
animals.forEach( function(animal, index) {
    console.log(animal, index)
} )


// Arrow Function Notation
animals.forEach( (animal, index) => {
    console.log(animal, index)
} )

// Same output with out the curly braces AND on one line
animals.forEach( (animal, index) => console.log(animal, index) )

animals.forEach( function(animal) {
    console.log(animal)
})

// Vs.
animals.forEach( (animal) => 
    console.log(animal)
)



