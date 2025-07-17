import { useStore } from "@/app/store";
import { useError } from "../useError"
import { useCallback, useState } from "react";
import { Task } from "../../../types";
import axios from "axios";
import getErrorMessage from "@/utils/error";



export const useUpdateTask = () => {
    const { switchErrorHandling } = useError()
    const { resetEditedTask } = useStore(); 

    const [isLoading, setIsLoading]=useState(false)
    const [error,setError]=useState<any>(null);
    
    const mutate = useCallback(
    async (task: Omit<Task, 'created_at' | 'updated_at'>) => {
        setIsLoading(true);
        setError(null);
        try{
            const res = await axios.put<Task>(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
                {title:task.title}
            )
            resetEditedTask();
            return res.data;
        } catch(err: unknown){
            setError(err);
            switchErrorHandling(getErrorMessage(err));
            throw(err)
            } finally{
                setIsLoading(false)
            }
        },
        [resetEditedTask,switchErrorHandling]
    );
    return { mutate, isLoading, error };
}