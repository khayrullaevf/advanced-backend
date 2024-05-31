import PostCard from "@/components/cards/post.card";
import PostLoading from "@/components/shared/post-loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import $axios from "@/http";
import { useQuery } from "@tanstack/react-query";
import { Post } from "app.types";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { postStore } from "@/store/post.store";
import ConfirmModal from "@/components/modals/confirm.modal";

function Home() {

  const {setPosts,posts}=postStore()



  const { data, isLoading, error } = useQuery({
    queryKey: ['get-posts'],
    queryFn: async () => {
      const response = await $axios.get('/post/get-all');
      setPosts(response.data.posts)
      return response.data.posts; // Extracting 'posts' array from the response
    }
  });

  console.log(data);



  return (
    <>

<div className="container max-w-4xl mx-auto mt-28">
      {error&&(

         <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
            {error.message}
           </AlertDescription>
           </Alert>
      )}
      <div className="grid grid-cols-3 gap-4">
        {isLoading&&Array.from({length:6}).map((_,index)=><PostLoading key={index}/>)}
        {posts.map((post: Post,index) => (
          <PostCard key={index} post={post}/>
        ))}
      </div>
    </div>
    <ConfirmModal/>
    </>
  
  );
}

export default Home;
