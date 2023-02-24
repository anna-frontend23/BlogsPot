import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { api } from "../components/Api/Api"
import { PostPreview } from "../components/PostPreview/PostPreview"
import { getPosts } from '../redux/slices/postsSlice'
import { getUserInfo } from "../redux/slices/userSlice"
import postsStyles from './posts.module.scss'

export const Posts = () => {
const token = localStorage.getItem('token')
const dispatch = useDispatch()
const posts = useSelector((store) => store.posts)

async function postsFn (token) {
    try {
        const response = await api.getAllPosts(token)
        const data = await response.json()
        dispatch(getPosts(data))
    } catch (error) {
        console.log(error)
    }
}

async function userInfoFn () {
try {
    const response = await api.userInfo(token)
    const data = await response.json()
    dispatch(getUserInfo(data))
} catch (error) {
    console.log(error)
}
}

useEffect(()=>{
    if (token) {
        postsFn(token)
        userInfoFn(token)
    }
}, [])

    return (
        <>

        <div className={postsStyles.wrapper}>
            
            <div className={postsStyles.addIcon}>
            <Link className={postsStyles.link} to='/addPost'><i className="fa-solid fa-square-plus"></i></Link>
            </div>

            <div className={postsStyles.posts}>
            {posts?.map((el, i) => <PostPreview key={'post'+i} id={el._id} created={el.created_at} title={el.title} text={el.text} image={el.image} author={el.author}/>)}
            </div>
            
        </div>
        </>
    )
}