
import {z} from 'zod'
 
export const postSchema = z.object({
  title:z.string().min(2),
  body:z.string().min(15),
})


export const authSchema=z.object({
  email:z.string().email(),
  password:z.string().min(4).max(30),
})
