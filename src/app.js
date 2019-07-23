const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wenhao Zhang'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Wenhao Zhang'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some helpful text.',
        name: 'Wenhao Zhang'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if(!address){
        return res.send({error: 'You must provide an andress!'})
    }

    geocode(address,(error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            return res.send({
                location,
                forecast: forecastData
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        error: 'Help article not found',
        name: 'Wenhao Zhang'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        error: 'Page not found',
        name: 'Wenhao Zhang'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port + '.')
})