import { NavLink } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from '../firebase/config.js'
import {useDispatch} from 'react-redux'
import { setUser } from '../store/usersSlice.js';

function Header({pageTitle}) {
  const dispatch = useDispatch()
  function handleSignOut() {
    if(confirm('Tem certeza que quer sair da página?')) {     
      signOut(auth).then(() => {
        dispatch(setUser(null))
      }).catch((error) => {
        console.log()
      })
    }
  }

    return (
      <>

            <h1>{pageTitle}</h1>

            <div className="header-btns">

                    <NavLink to="/">
                      <button className="btn">
                          Livros
                      </button>
                    </NavLink>

                    <NavLink to="/add-book">
                      <button className="btn">
                          Adicionar Livro +
                      </button>
                    </NavLink>

                    <button onClick={handleSignOut} className="btn transparent">
                      Sair
                    </button>

               
            </div>
    
      </>
    )
  }
  
  export default Header
  