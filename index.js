const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const port = 3040
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})

let counter = 5

const counters = [
    {
        "name": "john",
        "counter": 1
    },
    {
        "name": "tom",
        "counter": 2
    },
    {
        "name": "sam",
        "counter": 3
    },
]

app.get('/counter', (req, res) => {

    console.log(counter)

    res.json({"counter": counter})
})

app.delete('/counter', (req, res) => {

    counter = 0

    res.json({"counter": counter})
})

app.post('/counter/increment', (req, res) => {

    counter += 1

    res.status(201).json({"counter": counter})
})

app.post('/counter/decrement', (req, res) => {

    counter -= 1

    res.status(201).json({"counter": counter})
})

app.post('/counter/double', (req, res) => {

    counter *= 2

    res.status(201).json({"counter": counter})
})

app.put('/counter', (req, res) => {

    if(req.query.value) {
        counter = req.query.value
    }

    res.status(201).json({"counter": counter})
})

app.get('/counter/:name', (req, res) => {

    const {name} = req.params

    const counterObject = counters.find(counter => counter.name === name);

    const counter = counterObject.counter

    res.json({"counter": counter})
})

app.delete('/counter/:name', (req, res) => {

    const {name} = req.params

    // const counterObject = counters.find(counter => counter.name === name);

    // console.log(counterObject)

    // counterObject.counter = 0

    // res.json({"counter": counterObject.counter})

    const counterIndex =  counters.findIndex(function (counter) {
        return counter.name === name;
    });

    const oldCounter = counters.find(counter => counter.name === name);

    const updatedCounter = {...oldCounter,  
        "counter": 0
    }

    counters.splice(counterIndex, 1, updatedCounter)

    const resetCounter = counters[counterIndex].counter

    res.json({"contact": resetCounter})
})

app.post('/counter/:name/increment', (req, res) => {

    const {name} = req.params

    // const counterObject = counters.find(counter => counter.name === name);

    // console.log(counterObject)

    // // counterObject.counter += 1

    // // res.json({"counter": counterObject.counter})

    const counterIndex =  counters.findIndex(function (counter) {
        return counter.name === name;
    });

    const oldCounter = counters.find(counter => counter.name === name);

    const incrementOldCounter = oldCounter.counter + 1

    const updatedCounter = {...oldCounter,  
        "counter": incrementOldCounter
    }

    counters.splice(counterIndex, 1, updatedCounter)

    const resetCounter = counters[counterIndex].counter

    res.json({"contact": resetCounter})
})

// app.post('/counter/:name/decrement', (req, res) => {

//     const {name} = req.params

//     const counterObject = counters.find(counter => counter.name === name);

//     console.log(counterObject)

//     counterObject.counter -= 1

//     res.json({"counter": counterObject.counter})
// })

// app.post('/counter/:name/double', (req, res) => {

//     const {name} = req.params

//     const counterObject = counters.find(counter => counter.name === name);

//     console.log(counterObject)

//     counterObject.counter *= 2

//     res.json({"counter": counterObject.counter})
// })