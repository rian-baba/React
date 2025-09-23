import { useContext } from 'react';
import Footer from './Footer';
import Header from './Header';
import { counterContext } from './MainContext';
function Home(){
    let {count , color , setColor} = useContext(counterContext);
    return (
        <div>
            <div className={`min-h-screen min-w-full flex flex-col justify-center items-center ${color ? 'bg-gray-700 text-white' : 'bg-slate-300 text-black'}`}>

                 <Header />
            <h1 className="text-center text-4xl my-8">
                Soo This is the Home and the number is : {count}
            </h1>
            <p className={'text-4xl'}>
                Press to convert in :
                <button
                    onClick={() => { setColor(!color); }}
                    className={`bg-gray-400 rounded-full p-4 text-center text-4xl m-4 ${color ? 'bg-gray-500 text-white' : 'bg-gray-400 text-black'}`}
                >
                    {!color ? "Dark" : "Bright"}
                </button>
            </p>
            <Footer />
            </div>  
        </div>
    );
}

export default Home;