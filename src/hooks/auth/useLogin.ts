'use client'; 

import { useRouter } from "next/navigation";
import { useCallback } from "react"
import { useError } from "../useError"
import { useStore } from "@/app/store"
import axios from "axios"
import { Credential } from "../../../types";


export const useLogin = () =>{
    
    const router = useRouter()
    const { switchErrorHandling } = useError()
    
    const login = useCallback(
        async (user: Credential, onSuccess?: () => void) =>{
            try{
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`,user)
                router.push('/todo')
                onSuccess?.()
            } catch (err: any){
                switchErrorHandling(
                    err?.response?.data?.message || err.message || "Unknown error"
                )
            }
        },[router, switchErrorHandling]
    )   
    return login
}