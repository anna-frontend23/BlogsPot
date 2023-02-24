import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const Main = () => {

const token = localStorage.getItem('token')
const navigate = useNavigate()

useEffect(() => {
    if (token) {
        navigate('/posts')
    } else {
        navigate('/signIn')
    }
}, [])

    return (
        <div>
            <Outlet/>
        </div>
    )
}