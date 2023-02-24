import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../components/Api/Api";
import signUpStyles from './signUp.module.scss'


export const SignUp = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const sendForm = (e) => {
    e.preventDefault();
    const body = {
        email,
        password,
    }
    api.signUp(body)
    .then(res => {
        if(res.status === 409) {
            throw Error("Пользователь уже существует.")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        navigate('../signIn')
    })
    .catch(err => {
        console.log(err)
        alert("Пользователь уже существует. Авторизуйтесь.")
        navigate('../signIn')
    })
    
}

    return (
        <>
        
        <form className={signUpStyles.container} onSubmit={sendForm}>
        <div className={signUpStyles.arrow}>
            <Link to="/signIn"><i className="fa-solid fa-arrow-left"></i></Link>
            <h2 className={signUpStyles.h2}>Регистрация</h2>
        </div> 
            
            <div className={signUpStyles.fields}>
            <input className={signUpStyles.input} type="email" required placeholder="Введите e-mail" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            <input className={signUpStyles.input} type="password" required placeholder="Введите пароль" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>

            <button className={signUpStyles.signUpBtn} type='submit'>Зарегистрироваться</button>
            </div>
        </form>
        
        </>
    )
}