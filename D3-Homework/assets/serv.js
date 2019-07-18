//Dependenices
const express = require('express')
const path = require('path')

const app = express()
const port = 3000


//Configure middleware
//app.use(logger('dev'))

// Use express.static to serve the public folder as a static directory
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

//routing
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))