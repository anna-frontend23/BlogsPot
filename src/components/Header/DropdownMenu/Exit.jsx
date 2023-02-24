import { useNavigate } from "react-router-dom";
import btnStyles from './exit.module.scss'

export const Exit = () => {
const navigate = useNavigate()

const signOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate('/signIn')
    }
    return (
        <button type='button' className={btnStyles.btn} onClick={signOut}>Выход</button>
    )
}