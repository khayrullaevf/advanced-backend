import { Post } from "app.types";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { API_URL } from "@/http";
import { Button } from "../ui/button";

const PostCard = ({post}:{post:Post}) => {
  return (
    <Card>
      <img src={`${API_URL}/${post.picture}`} alt={post.title} className="rounded-t-md" />
      <CardContent className="mt-2">
        <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
        <p className="line-clamp-2 mt-1 text-muted-foreground text-sm">{post.body}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full rounded-md">Edit</Button>
        <Button className="w-full rounded-sm" variant={'destructive'}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default PostCard