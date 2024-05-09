import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import { auth } from '../firebase/config.js'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged 
} from "firebase/auth";
import {useDispatch} from 'react-redux'
import { setUser } from '../store/usersSlice.js';

function LoginPage() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [loginType, setLoginType] = useState('login')
  const [userCredentials, setUserCredentials] = useState({})
  const [error, setError] = useState('')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({id:user.uid, email: user.email}))
    } else {
      dispatch(setUser(null))
    }
    if(isLoading) {setIsLoading(false)}
    
  }) 

  function handleCredentials(e) {
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
  }

  function handleSignup(e) {
    setError("")
    e.preventDefault()
  createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
  .catch((error) => {
    setError(error.message)
    })
  }

  function handleLogin(e) {
    e.preventDefault()
    setError("")
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .catch((error) => {
    setError(error.message)
    })
  }

  function handlePasswordReset() {
    const email = prompt('Favor informar o seu e-mail.')
    sendPasswordResetEmail(auth, email)
    alert('E-mail enviado! Verifique sua caixa de entrada, e siga as instruções para criar uma nova senha.')
  }
  
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Bem vindo a lista de livros</h1>
            <p>Entrar ou criar uma conta para continuar</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Entrar
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Cadastrar
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input onChange={(e)=>{handleCredentials(e)}} type="text" name="email" autoComplete="username" placeholder="Digite o seu email" />
                  </div>
                  <div className="form-control">
                      <label>Senha *</label>
                      <input onChange={(e)=>{handleCredentials(e)}} type="password" name="password" autoComplete="current-password" placeholder="Digite a sua senha" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>{handleLogin(e)}} className="active btn btn-block">Entrar</button>
                    : 
                    <button onClick={(e)=>{handleSignup(e)}} className="active btn btn-block">Cadastrar</button>
                  }

                  {
                    error &&
                  <div className="error">
                    {error}
                  </div>
                  }            
                  

                  <p onClick={handlePasswordReset} className="forgot-password">Esqueceu a senha?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  