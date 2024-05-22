const postModel=require('./../models/post.model')

const postService=require('./../server/post.service')

class PostController{

    async getAll(req,res){
            try { 
                const allPosts=await postService.getAll()
                 res.status(200).json({
                   posts: allPosts
                })
        
            } catch (error) {
                res.status(404).json(error)
            }
     }

     async create(req,res){
        try {

          console.log(req.files);
          const post=await postService.create(req.body, req.files.picture)
          res.status(201).json({
          post
        })
        
     } catch (error) {
        console.log(error);
         res.status(500).json(error)
        
     }
     }
     async delete(req,res){
        try {
    
        const post=await postService.delete(req.params.id)
          res.status(200).json({
          post:post
        })
        
     } catch (error) {
        console.log(error);
         res.status(500).json(error)
     }
     }
     async edit(req,res){
        try {
         const post=await postService.edit(req.body,req.params.id)
          res.status(200).json({
          post
        })
        
     } catch (error) {
        console.log(error);
         res.status(500).json(error)
     }
     }
     
     async getOne(req,res){
        try { 
            const post=await postService.getOne(req.params.id)
             res.status(200).json({
               posts: post
            })
    
        } catch (error) {
            res.status(404).json(error)
        }
 }



}



module.exports=new PostController()