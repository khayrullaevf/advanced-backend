const postModel=require('./../models/post.model')

const postService=require('./../service/post.service')

class PostController{

    async getAll(req,res,next){
            try { 
                const allPosts=await postService.getAll()
                 res.status(200).json({
                   posts: allPosts
                })
        
            } catch (error) {
              next(error)

            }
     }

     async create(req,res,next){
        try {

          const post=await postService.create(req.body, req.files.picture)
          res.status(201).json({
          post
        })
        
     } catch (error) {
      next(error)

        
     }
     }
     async delete(req,res,next){
        try {
    
        const post=await postService.delete(req.params.id)
          res.status(200).json({
          post:post
        })
        
     } catch (error) {
      next(error)

     }
     }
     async edit(req,res,next){
        try {
         const post=await postService.edit(req.body,req.params.id)
          res.status(200).json({
          post
        })
        
     } catch (error) {
      next(error)

     }
     }
     
     async getOne(req,res,next){
        try { 
            const post=await postService.getOne(req.params.id)
             res.status(200).json({
               posts: post
            })
    
        } catch (error) {
          next(error)
        }
 }



}



module.exports=new PostController()