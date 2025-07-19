'use client'

import React, { FormEvent } from 'react'
import { useState, useCallback,useEffect } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { 
  Tooltip,
  IconButton,
  Container,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  ListItemText,
  List,
} from '@mui/material'
import { useRouter } from "next/navigation";
import { useLogout } from '@/hooks/auth/useLogout'
import { useStore } from '@/app/store'
import { useCreateTask } from '@/hooks/task/useCreateTask'
import { useFetchTasks } from '@/hooks/task/useFetchTask'
import { useUpdateTask } from '@/hooks/task/useUpdateTask'
import { useDeleteTask } from '../hooks/task/useDeleteTask';
import { Task } from '../../types'
import  ShieldCheckIcon from '@mui/icons-material/VerifiedUser';
import { ListItem } from '@mui/material';
import  EditIcon  from '@mui/icons-material/Edit';
import  DeleteIcon  from '@mui/icons-material/Delete';
import  CheckCircleIcon  from '@mui/icons-material/CheckCircle';
import  AddIcon  from '@mui/icons-material/Add';
import { Refresh } from '@mui/icons-material'


export const Todo = () => {

  const [input,setInput]=useState('')
  const [editedTask, setEditedTask]=useState<{id:number; title:string}>({id:0,title:''})
  
  const { 
    logout, 
    isLoading: isLoggingOut, 
  } = useLogout();
  
  const {
    tasks, 
    isLoading: isFetchingTasks, 
    refetch: refetchTasks 
  } = useFetchTasks()
 
  const {
    mutate: updateTask,
    isLoading: isUpdatingTask,
  } = useUpdateTask();

  const {
    mutate:createTask,
    isLoading: isCreatingTask,
  } = useCreateTask()

  const {
    mutate: deleteTask,
    isLoading: isDeletingTask,
  } = useDeleteTask();

  
  const isOverallLoading =
  isFetchingTasks ||
  isCreatingTask ||
  isUpdatingTask ||
  isDeletingTask ||
  isLoggingOut;

  
  const onSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (!editedTask.title)return;
    try{
      if (editedTask.id === 0){
        await createTask({title: editedTask.title});
      } else{
        await updateTask(editedTask)
      }
      setEditedTask({id:0, title:''});
      refetchTasks();
    }catch(err){
     console.error(err); 
    }
  };


  return (
    <Container maxWidth="sm" sx={{mt:4, mb:4}}>
      <Box 
        sx={{
          display: 'flex', 
          justifyContent:'space-between', 
          alignItems:'center', 
          mb:2
          }}
      >
        <Typography variant='h5' component="h1">
          Task Manager
        </Typography>
        <Button onClick={logout} disabled={isLoggingOut}>
          {isLoggingOut ? <CircularProgress size={24} />:<LogoutIcon />}
          Logout
        </Button>
        </Box>
        
        <Box component="form" onSubmit={onSubmit} sx={{display:'flex', gap:1, mb:2}}>
          <TextField
            label={editedTask.id === 0 ? '新しいタスク' : 'タスクを編集'}
            variant='outlined'
            fullWidth
            value={editedTask.title}
            onChange={(e)=>{
              setEditedTask({ ...editedTask, title: e.target.value })
            }}
            disabled={isOverallLoading} 
            size="small" 
          />
          <Button
            type="submit"
            variant='contained'
            disabled={!editedTask.title.trim()||isOverallLoading} //
          >
            {isOverallLoading ?<CircularProgress size={20}/> : (editedTask.id===0 ? <AddIcon /> : <EditIcon />) }
            {/* 上のコードは後で質問*/}
            {editedTask.id ===0 ? '追加':'更新'}
          </Button>
          {editedTask.id !==0 && (
            <Button 
              variant='outlined' 
              onClick={()=>{
                setEditedTask({id:0, title:''})
              }} 
              disabled={isOverallLoading}
              >
                キャンセル 
            </Button>
            // 上の実装がいまいち理解できない
          )}
        </Box>
        {isFetchingTasks ? (
          <Box 
          sx={{
            display:'flex',
            justifyContent:'center',
            mt:2
          }}
          >
            <CircularProgress />
          </Box>
        ):(
          <List>
            {tasks && tasks.length ===0 ? (
              <Typography 
              variant='body2' 
              color='textSecondary'
              sx={{
                mt:2
              }}
              >
                タスクがありません。
              </Typography>
            ):(
              tasks &&tasks.map((task)=>(
                <ListItem
                  key={task.id}
                  secondaryAction={
                    <Box>
                      <IconButton 
                        edge='end' 
                        aria-label='edit' 
                        onClick={()=>{
                          setEditedTask({id:task.id, title:task.title})
                        }}
                        > 
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge='end' 
                        aria-label='delete' 
                        onClick={async () => {
                          await deleteTask(task.id);
                          refetchTasks();
                        }}
                        > 
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                  sx={{border: '1px solid #ccc'}}
                >
                  <ListItemText primary={task.title}/>
                </ListItem>
              )))
          }
          </List>
        )}
    </Container>
  )
}