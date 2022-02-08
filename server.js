const express = require('express')
const app = express()
const PORT = 4000
const cors = require('cors')
const noteController = require('./controllers/noteController')
// const Note = require('./models/note')

// Bring in cors to communicate across ports
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/notes', noteController)

app.listen(PORT, () => {
    console.log('Smooth tunes flowing out of port: ', PORT);
})