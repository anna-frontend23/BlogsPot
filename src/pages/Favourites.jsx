import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PostPreview } from '../components/PostPreview/PostPreview'
import favStyles from './favourites.module.scss'

export const Favourites = () => {

const likes = useSelector((store) => store.likes)

    return (
        <div>
            <div className={favStyles.header}> 
            <Link className={favStyles.link} to="/posts">Главная страница</Link>
            <h1 className={favStyles.h1}>Избранные посты</h1>
            </div>
            {likes && likes.length>0
                ? <div className={favStyles.posts}> {likes.map((el, i) => <PostPreview key={'post'+i} id={el._id} created={el.created_at} title={el.title} text={el.text} image={el.image} author={el.author}/> )}
                </div>
                : <div className={favStyles.empty}><h3>Вы еще ничего не добавили в избранное</h3></div>
            }

        </div>
    )
}