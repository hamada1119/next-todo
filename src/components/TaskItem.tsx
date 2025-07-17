import { FC, memo } from "react";
import { Task } from "../../types";
import { useDeleteTask } from "@/hooks/task/useDeleteTask";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useStore } from "@/app/store";



type TaskItemMemoProps = Omit<Task, 'created_at' | 'updated_at'>;
const TaskItemMemo : FC<TaskItemMemoProps> = ({id, title})=>{
    const {updateEditedTask} = useStore();

    const {mutate: deleteTask, isLoading:isDeleting}=useDeleteTask();
    
    return (
        <ListItem
        key={id}
        sx={{
            my:1,
            p:1,
            borderBottom:'1px solid #ccc',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between'

        }}
        >
            <ListItemText
                primary={title}
                sx={{
                    fontWeight:'bold',
                    flexGrow:1,
                }}
            />
            <Box sx={{ display: 'flex', alignItems: ' ' }}>
                <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={()=>{
                        updateEditedTask({id:id,title:title})
                    }}
                    sx={{color:'blue'}}
                >
                <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={()=>{
                        deleteTask(id);
                    }}
                    disabled={isDeleting}
                    sx={{ color:'red'}}
                >
                    <DeleteIcon fontSize='small' />
                </IconButton>

            </Box>
        </ListItem>
    )
}

export const TaskItem = memo(TaskItemMemo);
