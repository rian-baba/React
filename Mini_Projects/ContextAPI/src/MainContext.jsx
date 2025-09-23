import {createContext, useState} from 'react';
export const counterContext = createContext()

function MainContext({children}){
    const [count,setCount] = useState(1);
    const [counter,setCounter] = useState(true)
    const [color,setColor] = useState(false)

    let globalOBJ = {count , setCount , color , setColor ,counter , setCounter}

return(
    <counterContext.Provider value={globalOBJ}>
    {children}
    </counterContext.Provider>
)
}

export default MainContext;