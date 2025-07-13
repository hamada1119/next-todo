import { ST } from 'next/dist/shared/lib/utils';
import { createContext, useContext, useState, useCallback } from 'react';
import React from 'react';

type EditedTask={
    id:number
    title:string
}

type State = {
        editedTask: EditedTask
        updateEditedTask: (payload: EditedTask)=> void
        resetEditedTask: () =>void
    }


const StoreContext = createContext<State>({
    editedTask: { id: 0, title: '' },
    updateEditedTask: () => {},
    resetEditedTask: () => {},
    });

export const StoreProvider: React.FC<{ children:React.ReactNode }> = ({children})=>{
    const [editedTask, setEditedTask] = useState<EditedTask>({id: 0, title:''});

    const updateEditedTask = (payload:EditedTask) =>{
        setEditedTask(payload)
    };

    const resetEditedTask = () =>{
        setEditedTask({id: 0, title:''})
    }

    const value : State = {
        editedTask,
        updateEditedTask,
        resetEditedTask,
    };
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>  
    );
};

export const useStore = (): State => {
    const context = useContext(StoreContext)
    if (!context) throw new Error('useStore must be used within a StoreProvider')
    return context
}

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