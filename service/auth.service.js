const UserDto = require("../dtos/user.dto")
const userModel = require("../models/user.model")
const bcrypt=require('bcrypt')
const tokenService = require("./token.service")

class AuthService{

    async register(email,password){
        
        const existUser=await userModel.findOne({email})


        if (existUser) {
            throw new Error('User has already registered with this email '+email)
        }
        const hashPassword=await bcrypt.hash(password,10)

        const user=await userModel.create({email,password:hashPassword})

        //email service



        //jwt generatsiya



        //token






        const userDto=new UserDto(user)
        const tokens=tokenService.generateToken({...userDto})

        await tokenService.saveTokens(userDto.id,tokens.refreshToken)




        return {user:userDto,...tokens}


    }

    async activation(userId){
        const user=await userModel.findById(userId)

        if (!user) {
            throw new Error('user does not exist')
        }

        user.isActivated=true

        await user.save()

    }



}

module.exports=new AuthService()