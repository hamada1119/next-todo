'use client'
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from '../../../types';
import getErrorMessage from '@/utils/error';
import { useError } from '../useError';

export const useFetchTasks = () =>{
    const {switchErrorHandling} =useError()
    const [tasks, setTasks]=useState<Task[] | null>(null); 
    const [error, setError]=useState<unknown>(null)
    const [isLoading, setIsLoading]=useState(false)

    const FetchTasks = useCallback(async () =>{
        setIsLoading(true)
        setError(null)
        try{
            const res = await axios.get<Task[]>(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
            setTasks(res.data)
        }catch(err: unknown){
            setError(err);
            switchErrorHandling(getErrorMessage(err))
        }finally{
            setIsLoading(false)
        }
    },[switchErrorHandling])

    useEffect(()=>{
        FetchTasks();
    },[])

    const refetch = useCallback(()=>{
        FetchTasks();
    },[FetchTasks])
    return {tasks, isLoading, error, refetch}

}