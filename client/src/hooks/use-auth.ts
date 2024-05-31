import { authType } from "@/interfaces"
import { create } from "zustand"


type AuthStore={
    authState:authType
    setAuth:(state:authType)=>void

}


export const useAuth=create<AuthStore>(set=>({
    authState:'login',
    setAuth:state=>set({authState:state})
}))