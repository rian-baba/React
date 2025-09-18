import react from 'react'
import {useNavigate , link} from 'react-router-dom'
import {Container, Logo, LogoutBtn} from '../index'
import { useSelector } from 'react-redux'

function Header(){
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

 const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
    return(
        <>
       <header>
        <Container>
            <nav className="flex">
                <div className="mr-4">
                <link to="/">
                <Logo width="70px"/>
                </link>
                </div>
            <div>
                <ul className="flex ml-auto">
                {
                    navItems.map((item) => item.active? (
                        <li key={item.name}>
                            <button onClick={() => navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                        </li>
                    ): null)
                }
                {authServices && (
                    <li>
                        <LogoutBtn />
                    </li>
                ) }
                </ul>
            </div>
            </nav>
        </Container>
       </header>

        </>
    )
}

export default Header