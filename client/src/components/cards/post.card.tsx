import { Post } from "app.types";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import $axios, { API_URL } from "@/http";
import { Button } from "../ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { postStore } from "@/store/post.store";
import { toast } from "sonner";

const PostCard = ({post}:{post:Post}) => {
   const [open, setOpen] = useState(false)
  const{onOpen,setPost}=useConfirm()
  
  const {setPosts,posts}=postStore()

  const onDelete=()=>{
   onOpen()
   setPost(post)
  }


  const {mutate,isPending}=useMutation({
    mutationKey:['edit-post'],
    mutationFn:async(values:z.infer<typeof postSchema>)=>{
        const {data}=await $axios.put(`/post/edit/${post._id}`,values)
        return data
    },
    onSuccess:data=>{
        const newData=posts.map(c=>c._id===data.id?data:c)
        setPosts(newData)
        setOpen(false)

    },
    onError:()=>{
     toast('Something wentr wrong , Please try again ')
    }
})

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  })
  function onSubmit(values: z.infer<typeof postSchema>) {
    console.log(values);
    mutate(values)
    
  }

  return (
    <Card>
      <img src={`${API_URL}/${post.picture}`} alt={post.title} className="rounded-t-md" />
      <CardContent className="mt-2">
        <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
        <p className="line-clamp-2 mt-1 text-muted-foreground text-sm">{post.body}</p>
      </CardContent>
      <CardFooter className="gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button className="w-full rounded-md"  onClick={()=>setOpen(true)}>Edit</Button>
        </PopoverTrigger>
         <PopoverContent>
         <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
            <Input placeholder="Write your post title..." {...field}  className="bg-secondary"  disabled={isPending}/>
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
            <Textarea placeholder="Write post body..." {...field}  className="bg-secondary"  disabled={isPending}/>
            </FormControl>
            <FormDescription>
             This is your public display name.
            </FormDescription>
             <FormMessage />
          </FormItem>
          )}
        />
       
        <Button type="submit" className="rounded-full" disabled={isPending}>Submit</Button>
      </form>
      </Form>


         </PopoverContent>
       </Popover>
        <Button className="w-full rounded-sm" variant={'destructive'}  onClick={onDelete}>Delete</Button>
      </CardFooter>
   
    </Card>
  )
}

export default PostCard