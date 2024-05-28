import { Post } from "app.types";
import { create } from "zustand";

type PostStoreType={
    posts:Post[],
    setPosts:(posts:Post[])=>void

}


export const postStore=create<PostStoreType>(set=>({
    posts:[],
    setPosts:posts=>set({posts:posts})
}))
