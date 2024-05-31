import { Post } from "app.types"
import { create } from "zustand"


type ConfirmStore={
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void,
    post:Post,
    setPost:(post:Post)=>void
}


export const useConfirm=create<ConfirmStore>(set=>({
    isOpen:false,
    post:{} as Post ,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
    setPost:post=>set({post})
}))