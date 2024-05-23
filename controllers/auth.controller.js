const authService = require('../service/auth.service')

class AuthController{


    async register(req,res,next){
        try {
            const{email,password}=req.body
            const data=await authService.register(email,password)
            res.cookie('refreshToken',data.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000,secure:true})
            return res.json(data)
            
        } catch (error) {
            console.log(error);
            
        }
    

    }
    async activation(req,res,next){
        try {
            const userId=req.params.id
            await authService.activation(userId)
            return res.redirect('https://t.me/fazliddinkhayrullaev')
        } catch (error) {
            console.log(error);
            
        }
        
    }


    async login(req,res,next){
        try {
            const{email,password}=req.body

            const data=await authService.login(email,password)
            res.cookie('refreshToken',data.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000,secure:true})
            return res.json(data)

            
        } catch (error) {
            console.log(error);
            
        }



    }
    async logout(req,res,next){
        try {
            const{email,password}=req.body


            const {refreshToken}=req.cookies

            const token=await authService.logout(refreshToken)
            res.clearCookie("refreshToken")


            return res.status(200).json({token})


         

            
        } catch (error) {
            console.log(error);
            
        }



    }


}



module.exports=new AuthController()