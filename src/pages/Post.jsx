import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { api } from "../components/Api/Api"
import { AddComment } from "../components/Comments/AddComment"
import {Modal} from'../components/Modal/Modal'
import { Comments } from "../components/Comments/Comments"
import { EditPost } from "../components/Forms/EditPost"
import { getPostComments } from "../redux/slices/commentsSlice"
import {deletePost} from '../redux/slices/postsSlice'
import postStyles from './post.module.scss'
import { deleteLike, setLike } from "../redux/slices/likeSlice"


export const Post = () => {

const user = useSelector((store) => store.user)
const comments = useSelector((store) => store.comments)
const likes = useSelector((store) => store.likes)
const dispatch = useDispatch()
const navigate = useNavigate()
const {id} = useParams()

const [showComments, setShowComments] = useState(false)
const [modalActive, setModalActive] = useState(false)

const post = useSelector((store) => {
    const currentPost = store.posts.find((el) => el._id === id)
        return currentPost
})
const {title, text, image, author} = post

const getPostCommentsFn = (id) => {
    api.getPostComments(id)
    .then(res => res.json())
    .then(data => {
        if(!data.error) {
            dispatch(getPostComments(data))
        }
    })
 }
useEffect(() => {
    getPostCommentsFn(id)
 }, [])



// const getPostFn = async () => {
//         let response = await api.getPost(id)
//         let data = await response.json()
//         return data
// }
// const {
//     data, isLoading, isError, error
// } = useQuery({
//     queryKey: ['post'],
//     queryFn: getPostFn, 
// })
//  if (isLoading) return <span>Загружаем пост...</span>
//  if (isError) {
//     console.log(error.message)
    
//     return (
//         <div>Ошибка загрузки. Обновите страницу.</div>
//     )
//  }
 
 

 

 const deletePostFn = (id) => {
    api.deletePost(id)
    .then(res => res.json())
    .then(data => {
        if (!data.error) {
            dispatch(deletePost(id))
            navigate('/posts')
        }
    })
    
 }


const setLikeFn = (e, id) => {
    e.stopPropagation()
    dispatch(setLike(post))
    api.setLike(id)
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            console.log(data.error)
        }
    })
    
}

const deleteLikeFn = (e, id) => {
    e.stopPropagation()
    dispatch(deleteLike(post))
    api.deleteLike(id)
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            console.log(data.error)
        } 
    })
    
}
    return (
        <>
        <div className={postStyles.wrapper}>
            <div className={postStyles.link_wrapper}><Link className={postStyles.link} to='/posts'>Главная страница</Link></div>
            <div className={postStyles.header}>
            <h1 className={postStyles.title}>{title}</h1>
            {author && author._id === user._id &&<div className={postStyles.icons}>
                <div className={postStyles.icon}><i className="fa-solid fa-pencil" onClick={() => setModalActive(true)}></i></div>
                <div className={postStyles.icon}><i className="fa-solid fa-trash-can" onClick={() => deletePostFn(id)}></i></div>
            </div>}
            </div>
            
            <div className={postStyles.main}>
            <img className={postStyles.img} src={`${image}`}/>
            <div className={postStyles.author}> 
                <span className={postStyles.author_name}>Автор: {author.name}</span>
                {likes.find((el) => el._id === id)
                ? <span className={postStyles.favourite}><i className="fa-solid fa-heart" onClick={(e) => deleteLikeFn(e, id)}></i>В избранном</span>
                : <span className={postStyles.favourite}><i className="fa-regular fa-heart" onClick={(e) => setLikeFn(e, id)}></i>В избранное</span>
            }
            </div>
            <div className={postStyles.text}>
            {text}
            </div>
            </div>

        
            
            <h3 className={postStyles.h3} onClick={() => setShowComments(!showComments)}>Комментарии<>{showComments ?<i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}</></h3>
            <div>
               {comments && comments.length>0 && showComments
               ? comments.map((el, i) =>  <Comments el={el}  key={i}/>)
               : <AddComment/>} 
            </div>
        

        </div>

        <Modal active={modalActive} setActive={setModalActive}>
            <EditPost post={post} />
        </Modal>
        </>
    )
}