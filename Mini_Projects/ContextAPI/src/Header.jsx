import { useContext } from 'react';
import { counterContext } from './MainContext.jsx';

function Header(){
    let {count , setCount ,color , counter , setCounter} = useContext(counterContext)
    return(
        <>
        
        <h2 className="text-center text-4xl" >yooo this is header duhh.....</h2>
    <h2 className="text-center text-4xl">
        this is button for plus    
        <button
            onClick={() => {
                if (count < 5) {
                    setCount(count + 1);
                }
                setCounter(!counter);
            }}
            className={`bg-gray-400 rounded-full p-4 text-center m-4 ${color ? 'bg-gray-500 text-white' : 'bg-gray-400 text-black'}`}
        >
            plus
        </button>
    </h2>
   

        </>
    )
}

export default Header;