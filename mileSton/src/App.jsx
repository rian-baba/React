import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authServices from './appwrite/auth'
import { logIn, logOut } from './store/authSlice.js'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData) {
        dispatch(logIn({userData}))
      }
      else{
        dispatch(logOut())
      }
    })
    .finally(() => setLoading(false))
  } , [])

  return !loading ? (
   <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
     <div className="w-full block"> 
      <Header/>
      <main>
        {/*outlet */}
      </main>
      <Footer/>
    </div>
   </div>
  ) : null
}

export default App
