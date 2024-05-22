const express=require('express')
const  mongoose  = require('mongoose')
const postModel=require('./models/post.model')


const app=express()




app.use(express.json())



const DB_URL='mongodb+srv://fazliddin:XirdNFBsS5lvMLqn@cluster0.xwsklby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.get('/',async(req,res)=>{

    try { 
        const allPosts=await postModel.find()
        res.status(200).json({
           posts: allPosts
        })

    } catch (error) {
        res.status(404).json(error)
    }





 res.status(200).json({
    message:'Hello Fazliddin'
 })

})

app.post('/', async(req,res)=>{

    try {
        const{title,body}=req.body
        const newPost= await postModel.create({title,body})
   
   
       res.status(201).json({
       newPost
       })
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }

   
   })

app.delete('/:id',(req,res)=>{
    console.log(req.params);
    res.json({
        id:req.params.id,
        body:req.body
    })
   })

app.put('/:id',(req,res)=>{
    console.log(req.params);
    res.json({
        id:req.params.id,
        body:req.body
    })
   })


app.get('/post',(req,res)=>{
    res.status(200).json({
       message:'Hello posts'
    })
   
   })




const PORT=8080



const bootstrap=async()=>{
    try {
     await mongoose.connect(DB_URL,).then(()=>console.log('Connected to DB'))   
     app.listen(PORT,()=>console.log(`Listening on port - http://localhost:${PORT}`))
    } catch (error) {
    console.log(error);
    }
}


bootstrap()





//domain-port-endpoint
//http://localhost:8080/