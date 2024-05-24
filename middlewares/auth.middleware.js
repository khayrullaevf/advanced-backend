const BaseError = require("../errors/base.error")
const tokenService = require("../service/token.service")


module.exports=function(req,res,next) {
    try {
    

        const authHeader=req.headers.authorization

        if(!authHeader){
            return next(BaseError.UnauthorizedError())

        }


        const accessToken=authHeader.split(" ")[1]
        console.log(accessToken);

        if(!accessToken){
            return next(BaseError.UnauthorizedError())
        }
        const userDto=tokenService.validateAccessToken(accessToken)
        if (!userDto) {
            return next(BaseError.UnauthorizedError())
        }
        req.user=userDto
        next()
    } catch (error) {
      next(BaseError.UnauthorizedError())
    }
    
}