'use client'

import React, { FormEvent } from 'react'
import { useState, useCallback,useEffect } from 'react'
import { useMutateAuth } from '@/hooks/useMutateAuth'
import LogoutIcon from '@mui/icons-material/Logout'
import { 
  Tooltip,
  IconButton,
} from '@mui/material'
import { useRouter } from "next/navigation";


export const Todo = () => {
  const router = useRouter()
  const [csrfToken, setCsrfToken] = useState('')

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
    }catch(error){
      console.log('ログアウトに失敗しました',error)
    }
  },[csrfToken,router])

  
  return (
    <div>
      <Tooltip title="ログアウト">
        <IconButton onClick={logout} color="primary">
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}