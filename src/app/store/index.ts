import { createContext, useContext, useState, useCallback } from 'react';
import React from 'react';

type EditedTask={
    id:number
    title:string
}

type State = {
        editedTask: EditedTask
        updatedEditedTask: (payload: EditedTask)=> void
        resetEditedTask: () =>void
    }


const StoreContext = createContext<State>({
    editedTask: { id: 0, title: '' },
    updatedEditedTask: () => {},
    resetEditedTask: () => {},
    });

export const StoreProvider: React.FC<{ children:React.ReactNode }> = ({children})=>{
    const [editedTask, setEditedTask] = useState<EditedTask>({id: 0, title:''});

    const updatedEditedTask = (payload:EditedTask) =>{
        setEditedTask(payload)
    };

    const resetEditedTask = () =>{
        setEditedTask({id: 0, title:''})
    }

    const value : State = {
        editedTask,
        updatedEditedTask,
        resetEditedTask,
    };
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>  
    );
};

export const useStore = () => useContext(StoreContext);


// //zustandを使ったver
// import { create } from 'zustand';

// type EditedTask={
//     id:number
//     title:string
// }

// type State = {
//     editedTask: EditedTask
//     updatedEditedTask: (payload: EditedTask)=> void
//     resetEditedTask: () =>void
// }

// const useStore = create<State>((set) =>({
//     editedTask:{id: 0 , title:''},
//     updatedEditedTask: (payload) => 
//         set({
//             editedTask: payload,
//         }),
//         resetEditedTask: ()=> set({editedTask: {id:0, title:''}}),
// }))

// export default useStore