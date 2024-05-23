require('dotenv').config()
 

const express=require('express')
const  mongoose  = require('mongoose')

const fileUpload=require('express-fileupload')
const requestTime=require('./middlewares/request-time')


const app=express()


app.use(express.json())
app.use(fileUpload())
app.use(express.static('static'))
app.use(requestTime)







app.use('/api/post',require('./routes/post.route'))
app.use('/api/auth',require('./routes/auth.route'))





const PORT=process.env.PORT||8080
const bootstrap=async()=>{
    try {
     await mongoose.connect(process.env.DB_URL).then(()=>console.log('Connected to DB'))   
     app.listen(PORT,()=>console.log(`Listening on port - http://localhost:${PORT}`))
    } catch (error) {
    console.log(error);
    }
}


bootstrap()


