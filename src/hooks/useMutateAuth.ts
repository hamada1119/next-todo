import axios from "axios";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { Credential } from "../../types";
import { useError } from "./useError";
import { Task } from "../../types";
import { useCallback } from "react";
// import { useMutation } from '@tanstack/react-query'

export const useMutateAuth= () =>{
    const router = useRouter()
    const { switchErrorHandling } = useError()
    const resetEditedTask = useStore().resetEditedTask

    const login = useCallback(
        async (user: Credential, onSuccess?: () => void) =>{
            try{
                await axios.post(`{process.env.NEXT_PUBLIC_API_URL}/login`,user)
                router.push('/todo')
                onSuccess?.()
            } catch (err: any){
                switchErrorHandling(
                    err?.response?.data?.message || err.message || "Unknown error"
                )
            }
        },[router, switchErrorHandling]
    )    

    const register = useCallback(
        async (user: Credential, onSuccess?: () => void) => {
            try{
                await axios.post(`{process.env.NEXT_PUBLIC_API_URL}/signup`,user)
                onSuccess?.()
            } catch(err: any){
                switchErrorHandling(
                    err?.response?.data?.message || err.message || "Unknown error"
                )
            }
        },[switchErrorHandling]
    )

    const logout = useCallback(
        async (onSuccess?: () => void) => {
            try {
                await axios.post(`{process.env.NEXT_PUBLIC_API_URL}/logout`)
                resetEditedTask()
                router.push('/')
                onSuccess?.()
            } catch (err:any){
                switchErrorHandling(
                   err?.response?.data?.message || err.message || "Unknown error"
                )
            }
        },[router, switchErrorHandling,resetEditedTask]
    )
    return {login, register, logout}
}