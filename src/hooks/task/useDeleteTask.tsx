import { useStore } from "@/app/store";
import { useError } from "../useError";
import { useCallback, useState } from "react";
import axios from "axios";
import getErrorMessage from "@/utils/error";

export const useDeleteTask = () =>{
    const { switchErrorHandling } = useError()
    const { resetEditedTask } = useStore(); 

    const [isLoading, setIsLoading]=useState(false)
    const [error,setError]=useState<any>(null);

    const mutate = useCallback(
        async (id:number) =>{
            setIsLoading(true);
            setError(null);

            try{
                await axios.delete( `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
                resetEditedTask();
            }catch(err:unknown){
                setError(err);
                switchErrorHandling(getErrorMessage(err));
            }
        },[resetEditedTask, switchErrorHandling]
    )
    return {mutate, isLoading, error}
}