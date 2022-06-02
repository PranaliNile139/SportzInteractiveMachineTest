// const express = require('express')
// const bodyParser = require('body-parser')
// const {v4 : uuidv4} = require('uuid')
// const formTemplet = require('./form')
// const repo = require('./repository')

// const app = express()
// const port = process.env.PORT || 3000

// // The body-parser middleware to parse form data
// app.use(bodyParser.urlencoded({extended : true}))

// // Get route to display HTML form
// app.get('/', (req, res) => {
// res.send(formTemplet({}))
// })

// // Post route to handle form submission logic and
// app.post('/', (req, res) => {
// // Fetching user inputs
// const {name, email} = req.body
// // Creating new unique id
// const userId = uuidv4()

// // Saving record to the database
// // with attaching userid to each record
// repo.create({
// 	userId,
// 	name,
// 	email
// })
// res.send('Information submitted!')
// })

// // Server setup
// app.listen(port, () => {
// console.log(`Server start on port ${port}`)
// })
