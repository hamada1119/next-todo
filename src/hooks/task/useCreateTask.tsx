import { useStore } from '@/app/store';
import { useCallback, useState } from 'react';
import { useError } from '../useError';
import { Task } from '../../../types';
import axios from 'axios';
import getErrorMessage from '@/utils/error';



export const useCreateTask = () => {
    const { switchErrorHandling } = useError();
    const { resetEditedTask } = useStore();
    
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError] = useState<any>(null);

    const mutate = useCallback(
        async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await axios.post<Task>(
                    `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
                    task
                );
                resetEditedTask();
                return res.data;
            } catch (err: any) {
                setError(getErrorMessage(err));
     } finally {
        setIsLoading(false);
     }
    },[resetEditedTask,switchErrorHandling]
    );
    return {mutate, isLoading, error};    
};
    

