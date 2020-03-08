const request=require('request')


const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/7570e19bcdf4af94d3ccd8c454cfa70e/'+latitude+','+longitude
     request({url:url,json:true},(error,{body})=>{   
        if (error){
            callback('Unable to connect the forecast services',undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }else{
            
            callback(undefined,body.daily.data[0].summary+'it is currently '+body.currently.temperature+' degree out.The high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow +'.There is '+body.currently.precipProbability+' chance of the rain')
        }
     })

    
    

}

module.exports=forecast