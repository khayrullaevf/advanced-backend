const postModel=require('../models/post.model')
const fileService = require('./file.service')

class PostService{
    async create(post,picture){
        const fileName=fileService.save(picture)
         const newPost= await postModel.create({...post, picture:fileName})
         return newPost
    }
    async getAll(){
        const allPosts=await postModel.find()
        return allPosts

    }
    async delete(id){
        const post=await postModel.findByIdAndDelete(id)
        return post

    }
    async edit(post,id){
        const updatedPost=await postModel.findByIdAndUpdate(id,post,
            {
            new:true
            })
        return updatedPost

    }
    async getOne(id){
        const post=await postModel.findById(id)
        return post

    }

}

module.exports=new PostService()