import axios from "axios"
import { useCallback } from "react"
import { useError } from "../useError";
import { Credential } from "../../../types";


export const useRegister = () => {
    const { switchErrorHandling } = useError();

    const register = useCallback(
        async (user: Credential, onSuccess?: () => void) => {
            try{
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`,user)
                onSuccess?.()
            } catch(err: any){
                switchErrorHandling(
                    err?.response?.data?.message || err.message || "Unknown error"
                )
            }
        },[switchErrorHandling]
    )
    return register
}