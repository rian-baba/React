import { useContext } from 'react';
import { counterContext } from "./MainContext";

function Signal(){
    let {count , color ,setCounter , counter} = useContext(counterContext);
    return(
        <>
    <div className='flex flex-wrap justify-center items-center'>
      {counter && count >= 5 && (
        <>
          <p className='text-red-500 text-center text-4xl'>The limit is only 5</p>
          <button onClick={() => { setCounter(!counter) }} className={`bg-gray-400 rounded-full p-4 text-center m-4 text-4xl  ${color ? 'bg-gray-500 text-white' : 'bg-gray-400 text-black'}`}>ok</button>
        </>
      )}
     {counter && count <= -5 && (
        <>
        <p className='text-red-500 text-center text-4xl'>The limit is only -5</p>
        <button  onClick={() => { setCounter(!counter) }} className={`bg-gray-400 rounded-full p-4 text-center text-4xl m-4 ${color ? 'bg-gray-500 text-white' : 'bg-gray-400 text-black'}`}>ok</button>
        </>
    )}   
       
    </div>
   

    </>
    )

}

export default Signal;