import { useStore } from '@/app/store';
import { useCallback, useState } from 'react';
import { useError } from '../useError';
import { Task } from '../../../types';
import axios from 'axios';



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
                setError(err);
                
                if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
                    switchErrorHandling(err.response.data.message);
                  } else if (axios.isAxiosError(err) && err.response && err.response.data) {
                    switchErrorHandling(JSON.stringify(err.response.data));
                  } else {
                    switchErrorHandling('タスク作成中に予期せぬエラーが発生しました。');
            }
            throw err;
     } finally {
        setIsLoading(false);
     }
    },[resetEditedTask,switchErrorHandling]
    );
    return {mutate, isLoading, error};    
};
    

