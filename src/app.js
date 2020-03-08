const path=require('path')
const express= require('express')
const hbs =require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//define path for express configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//setup handlerbars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'sanket'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Robot',
        name:'sanket'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
       helpText:'This is some helpful text',
       title:'Help',
       name:'sanket'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:'You must provide address term'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                Error:error
            })
        } 
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    Error:error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            // console.log(location)
            // console.log(forecastData)
        })
    
    })
    
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'help page not found',
        name:'sanket'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found',
        name:'sanket'
    })
})


app.listen(port,()=>{
    console.log('server started on port '+port)

})