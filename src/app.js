const express = require('express');
const app = express();
require('dotenv').config();
const prediction = require('./utils/prediction')
const hbs = require('hbs')
const path = require('path')

const port = process.env.PORT || 3000;


app.use(express.json());

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Climate Prediction',
        name: 'Goutam Bhowmick'
    })
})
 
app.get('/climate',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

        prediction(req.query.address, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData

            })
        })
    })








app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})


