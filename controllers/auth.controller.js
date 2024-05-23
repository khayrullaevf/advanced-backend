const authService = require('../service/auth.service')




class AuthController{


    async register(req,res,next){
        try {
            const{email,password}=req.body
            const user=await authService.register(email,password)
            return res.json(user)
            
        } catch (error) {
            console.log(error);
            
        }
    

    }
    async activation(req,res,next){
        try {
            const userId=req.params.id
            await authService.activation(userId)
            return res.json({message:"user activated"})
            
        } catch (error) {
            console.log(error);
            
        }

     
        
    }


}



module.exports=new AuthController()