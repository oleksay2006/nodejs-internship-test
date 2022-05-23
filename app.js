const express = require('express');
const path = require('path');
const app = express();
const countries = require('./country-by-capital-city.json')

app.use(express.json())

app.get('/capitals', (req, res) => {
  res.status(200).json(countries)
})

app.get('/capital', (req, res) => {
  const country = countries.find(i => i.country == req.query.country[0].toUpperCase() + req.query.country.substring(1))
  res.status(200).json({message: `Capital of ${country.country} is ${country.city}`, info: country})
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => {
  console.log('Server has been started on 3000...')
})