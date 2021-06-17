const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()

//Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Handlebars engine config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Onyango samuel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Onyango Samuel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Get help',
        name: 'Onyango Samuel'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorr: 'An address must be provided.'
        })
    }
    const place_name = req.query.address
    geocode(place_name, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: place_name
            })
        })
    })


    // res.send({
    //     lacation: 'Kitui',
    //     forecast: 'It is snowing',
    //     address: req.query.address
    // })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Onyango Samuel',
        errorMessage: 'Page not found'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Onyango Samuel',
        errorMessage: 'Help article not found'
    })
})

app.listen(port, () => {
    console.log('Server started on port ', + port)
})