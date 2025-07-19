'use client'

import React, { FormEvent } from 'react'
import { useState } from 'react'
import { 
  Box,
  Typography,
  Container,
  TextField,
  Button,
  IconButton,
} from '@mui/material'
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useRegister } from '@/hooks/auth/useRegister'
import { useLogin } from '@/hooks/auth/useLogin'
import AutorenewIcon from '@mui/icons-material/Autorenew';

const Auth = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw]=useState('')
  const [isLogin, setIsLogin]=useState(true)

  const register = useRegister()
  const login = useLogin()


  const submitAuthHandler = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(isLogin){
      await login({email, password: pw})
    } else {
      await  register({email, password: pw}, async()=>{
        await login({email, password:pw})
      }
      )
    }
  }

  return (
    <Container maxWidth='sm'>
      <Box
        display="flex"
        flexDirection="column"
        alignItems='center'
        justifyContent='content'
        minHeight="100vh"
      >
        <Box display='flex' alignItems="center" mb={2}>
          <CheckCircleIcon color="primary" sx={{ mr:1 }} />
          <Typography variant='h5' fontWeight="bold">
            Todo app by React/Go(echo)
          </Typography>
        </Box>

        <Typography variant='h6' gutterBottom>
          {isLogin? 'Login' : 'Create a new account'}
        </Typography>

        <Box component="form" onSubmit={submitAuthHandler} width="100%">
          <TextField
            fullWidth
            margin='normal'
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            fullWidth
            margin='normal'
            label="パスワード"
            type="password"
            value={pw}
            onChange={(e)=> setPw(e.target.value)}
            autoFocus
          />
          <Box textAlign="center" mt={2}>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!email || !pw}
            >
              {isLogin ? 'ログイン' : 'Sign Up'}
            </Button>
          </Box>
        </Box>
        <IconButton
          color='primary'
          onClick={() => setIsLogin(!isLogin)}
          sx = {{mt: 2}}
        >
          <AutorenewIcon />
        </IconButton>
      </Box>
    </Container>
  )
}

export default Auth