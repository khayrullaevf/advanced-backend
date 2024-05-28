
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet"
import { useCreatePost } from "@/hooks/use-create-post"
import { postSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { ChangeEvent, useState } from "react"

import { toast } from "sonner"
import $axios from "@/http"
import { postStore } from "@/store/post.store"

function CreatePost(){

  const {posts,setPosts}=postStore()
      const [loading, setLoading] = useState<boolean>(false)
     const [picture, setPicture] = useState<File|null>(null)
    const {isOpen,onClose}=useCreatePost()


  
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  })
 

  function onSubmit(values: z.infer<typeof postSchema>) {
    if (!picture) return null
    setLoading(true)

    const formData=new FormData()
    formData.append('title',values.title)
    formData.append('body',values.body)
    formData.append('picture',picture)

  
  

    const promise=$axios.post('/post/create',formData).then(res => {
     const newData=[...posts,res.data]
     setPosts(newData)
     form.reset()
     onClose()

    })
    .catch(error => {
      console.error('Error:', error);
    }).finally(()=>{
      setLoading(false)
    });
    console.log(formData)
    toast.promise(promise,{
      loading:'loading...',
      success:'Successfully created!!!',
      error:'Something went wrong😟'
    })
  }
   

  function onFileChange(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files&&event.target.files[0]
    setPicture(file as File)
  }





    




  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Post</SheetTitle>
          <SheetDescription>
           Write what in your mind
          </SheetDescription>
           <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
            <Input placeholder="Write your post title..." {...field}  className="bg-secondary" disabled={loading}/>
            </FormControl>
             <FormDescription>
             This is your public display name.
            </FormDescription>
            <FormMessage />
            </FormItem>
             )}
             />
            <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
            <FormItem>
            <FormLabel>Body</FormLabel>
            <FormControl>
            <Textarea placeholder="Write post body..." {...field}  className="bg-secondary" disabled={loading}/>
            </FormControl>
            <FormDescription>
             This is your public display name.
            </FormDescription>
             <FormMessage />
          </FormItem>
          )}
        />
        <div>
          <Label htmlFor="picture">Picture</Label>
          <Input id='picture' type="file" className="bg-secondary"  onChange={onFileChange} disabled={loading}/>
        </div>
        <Button type="submit" className="rounded-full"  disabled={loading}>Submit</Button>
      </form>
      </Form>
      </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default CreatePost
