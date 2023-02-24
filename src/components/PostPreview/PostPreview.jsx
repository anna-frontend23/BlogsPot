import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteLike, setLike } from '../../redux/slices/likeSlice'
import { api } from '../Api/Api'
import postPreviewStyles from './postPreview.module.scss'


export const PostPreview = ({id, created, title, text, image, author}) => {
const navigate = useNavigate()
const dispatch = useDispatch()
const likes = useSelector((store) => store.likes)
const postDetail = () => {
    navigate(`../${id}`)
}

const post = useSelector((store) => {
    const currentPost = store.posts.find((el) => el._id === id)
    return currentPost
})

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
        <div className={postPreviewStyles.box} onClick={postDetail}>
            <div className={postPreviewStyles.header}>
            <h3 className={postPreviewStyles.h3}>{title}</h3>
            <div className={postPreviewStyles.side_info}>
            <span className={postPreviewStyles.author}>Автор: {author.name}</span>
            <span className={postPreviewStyles.card__heart}>
            {
                likes.find((el) => el._id === id)
                ? <i className="fa-solid fa-heart" onClick={(e) => deleteLikeFn(e, id)}></i>
                : <i className="fa-regular fa-heart" onClick={(e) => setLikeFn(e, id)}></i>
            }
        </span>
        </div>
            </div>
            <img className={postPreviewStyles.img} src={`${image}`}/>
            
            <span>{text}</span>

        </div>
    )
}