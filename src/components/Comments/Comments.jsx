import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../redux/slices/commentsSlice'
import { api } from '../Api/Api'
import commentStyles from './comments.module.scss'


export const Comments = ({el}) => {
   
const dispatch = useDispatch()
const [name, setName] = useState('')
const user = useSelector((store) => store.user)
const {author, text, post, _id} = el


async function getAuthorName(id) {
    let response = await api.getUserInfo(id)
    let result = await response.json()
    let name = result.name
    setName(name)
    return name
 }

 useEffect(() => {
    getAuthorName(author._id)
 }, [])

 async function deleteCommentFn(post, _id) {
      try {
         const response = await api.deleteComment(post, _id)
         const data = await response.json()
         dispatch(deleteComment(_id))
      } catch (error) {
         console.log(error)
      }
 }

    return (
       <>
       <div className={commentStyles.comments_block}>
            <div className={commentStyles.comment_block}>
            <span className={commentStyles.author}>{name}</span>
            <div className={commentStyles.text}>
               {text} 
            {author && author._id === user._id &&
               <div className={commentStyles.icon}><i className="fa-solid fa-trash-can" onClick={() => deleteCommentFn(post, _id)}></i></div>
               }
            </div>
            </div>
       </div>
       
       </>
    )
}