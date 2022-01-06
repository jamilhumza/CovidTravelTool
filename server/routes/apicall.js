const express = require('express')
const router = express.Router()
var db = require('../dbhandler.js')
const request = require('request')
const fetch = require('node-fetch')
const NodeCache = require('node-cache')
const myCache = new NodeCache()
const pool = require('../dbhandler')

//05039 06037
const API = process.env.API_KEY
const API_URL1 = `https://api.covidactnow.org/v2/county/`
const API_URL2 = `.json?apiKey=${API}`

router.post('/apifetch', async (req, res) => {
  const { code } = req.body
  fetch(API_URL1 + code + API_URL2)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          res.send({
            county: data.county,
            cases: data.actuals.cases,
            caseDensity: data.metrics.caseDensity,
            riskLevel: data.riskLevels.overall,
          })
        })
      } else {
        throw 'There is something wrong'
      }
    })
    .catch((error) => {
      res.send({ error: 'Error' })
    })
  //if (code > )
  /*const response = await fetch(API_URL1 + code + API_URL2)
  const data = await response.json()

  console.log(
    data.county,
    data.metrics.caseDensity,
    data.actuals.cases,
    data.riskLevels.overall
  )
  res.send({
    county: data.county,
    cases: data.actuals.cases,
    caseDensity: data.metrics.caseDensity,
    riskLevel: data.riskLevels.overall,
  })*/
})

router.post('/savedata', async (req, res) => {
  const d = new Date()
  const date =
    (d.getMonth() + 1).toString() +
    '/' +
    d.getDate().toString() +
    '/' +
    d.getFullYear().toString()

  try {
    const { county, cases, caseDensity, riskLevel } = req.body
    const newData = await pool.query(
      'INSERT INTO countydata (county, cases, casedensity, risklevel, date) VALUES ($1, $2, $3, $4, $5)',
      [county, cases, caseDensity, riskLevel, date]
    )
    res.send(newData)
  } catch (err) {
    console.error(err)
  }
})

router.get('/alldata', async (req, res) => {
  try {
    const allData = await pool.query('SELECT * FROM countydata')
    res.json(allData.rows)
  } catch (err) {
    console.error(err.message)
  }
})

router.delete('/data/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteData = await pool.query(
      'DELETE FROM countydata WHERE id = $1',
      [id]
    )
    res.json('Data was deleted!')
  } catch (err) {
    console.log(err.message)
  }
})

module.exports = router
