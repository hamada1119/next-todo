import { useRouter } from "next/navigation";
import { useLogin } from './useLogin';
import { useError } from '../useError';
import { useStore } from '@/app/store';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import getErrorMessage from '@/utils/error';


export const useLogout=()=>{
    const router = useRouter();
    const {switchErrorHandling}=useError();

    const { resetEditedTask } = useStore(); 

    const [csrfToken, setCsrfToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
     const fetchCsrf = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/csrf`, {
          credentials: 'include',
        })
        const data = await res.json()
        setCsrfToken(data.csrf_token) 
      } catch (err) {
        console.error('CSRFトークン取得失敗', err)
      }
    }
    fetchCsrf()
  }, [])


  const logout = useCallback(async ()=>{
    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`,{
        method: 'POST',
        credentials: 'include',
        headers:{
          'Content-Type':'application/json',
          'X-CSRF-Token':csrfToken,
        },
      })
      router.push('/')
    } catch (err: unknown) {
        setError(err);
        switchErrorHandling(getErrorMessage(err));
      }
  },[csrfToken,router, resetEditedTask, switchErrorHandling])
  return { logout, isLoading, error }; 
}