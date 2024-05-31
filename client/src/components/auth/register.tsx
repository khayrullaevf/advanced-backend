import { authSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useAuth } from "@/hooks/use-auth"


function Register() {

    const{setAuth}=useAuth()

    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })


   
     
    
      function onSubmit(values: z.infer<typeof authSchema>) {
        console.log(values);
      }
       

  return (
    <>
      <h1 className="text-2xl font-bold">Register</h1>
      <p className="text-sm text-muted-foreground">Already have an account ?  <span className="cursor-pointer text-blue-500 hover:underline" onClick={()=>setAuth('login')}>Sign in</span></p>
      <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Email address</FormLabel>
            <FormControl>
            <Input placeholder="example@gmail.com" {...field}   />
            </FormControl>
            <FormMessage />
            </FormItem>
             )}
             />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
            <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
            <Input placeholder="******" type="password" {...field}   />
            </FormControl>

             <FormMessage />
          </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full" >Submit</Button>
      </form>
      </Form>








    </>
  )
}

export default Register
