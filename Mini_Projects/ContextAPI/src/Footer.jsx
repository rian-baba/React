import { useContext } from 'react';
import { counterContext } from './MainContext';
import Signal from './Signal';

export default function Footer() {
    const { count, setCount ,color , counter , setCounter } = useContext(counterContext);

    return (
        <>
            <h2 className="text-center text-4xl">
                soo this is the footer and here is the button for Minus :
                <button
                    onClick={() => {
                        if (count > -5) {
                            setCount(count - 1);
                            
                        }
                        setCounter(!counter);
                    }}
                    className={`bg-gray-400 rounded-full p-4 text-center text-4xl m-4 ${color ? 'bg-gray-500 text-white' : 'bg-gray-400 text-black'}`}
                >
                    minus
                </button>
            </h2>

            {/* Show limit signal */}
            <Signal />
        </>
    );
}
