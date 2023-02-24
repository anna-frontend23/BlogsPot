import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { api } from "../components/Api/Api";
import { setToken } from "../redux/slices/tokenSlice";
import signInStyles from './signIn.module.scss'

export const SignIn = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("")

const sendForm = (e) => {
    e.preventDefault();
    const body = {
        email,
        password
    }
        api.signIn(body)
        .then(res => {
            if (res.status === 401) {
                throw Error("Неправильный логин или пароль")
            } else if (res.status === 404) {
                throw Error("Пользователь не найден")
            }
            return res.json()
        })
        .then(data => {
                localStorage.setItem("token", data.token);
                setEmail("");
                setPassword("");
                dispatch(setToken(data.token))
                navigate('/posts');
            })
        .catch((err) => {
            console.log(err)
            if (err.message == "Неправильный логин или пароль") {
                    alert("Неправильный логин или пароль")
                } else if (err.message == "Пользователь не найден") {
                    alert("Пользователь не найден")
                }
        })
        
        
}

    return (
        <>
        <form className={signInStyles.container} onSubmit={sendForm}>
            <h2 className={signInStyles.h2}>Авторизация</h2>
            <div className={signInStyles.fields}>
            <input className={signInStyles.input}
                type="email" 
                placeholder="E-mail" 
                value={email} 
                required
                onChange={(e) => {setEmail(e.target.value)}}
            />
            <input className={signInStyles.input}
                type="password" 
                placeholder="Пароль" 
                value={password} 
                onChange={(e) => {setPassword(e.target.value)}}
            />
            </div>
            <div className={signInStyles.fields}>
            <button className={signInStyles.signInBtn} type='submit'>Войти</button>
            <button className={signInStyles.signInBtn} type='button'><Link to="/signUp" style={ {color: 'white', textDecoration: 'none'} }>Зарегистрироваться</Link></button>
            </div>
        </form>
            
            </>

    )
}