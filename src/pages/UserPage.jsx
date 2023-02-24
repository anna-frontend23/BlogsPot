import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { EditAvatar } from "../components/Forms/EditAvatar"
import { EditUser } from "../components/Forms/EditUser"
import { Modal } from '../components/Modal/Modal'
import userInfoStyles from './userPage.module.scss'

export const UserPage = () => {
const userInfo = useSelector((store) => store.user)
const {name, avatar, email, about} = userInfo
const [userModalActive, setUserModalActive] = useState(false)
const [avatarModalActive, setAvatarModalActive] = useState(false)

    return (
        <>
        
        <div className={userInfoStyles.link_wrapper}><Link className={userInfoStyles.link} to='/posts'>Главная страница</Link></div>
       
        

        <div className={userInfoStyles.wrapper_info}>

            <div className={userInfoStyles.img_wrapper}>
                <img className={userInfoStyles.profilePic} src={`${avatar}`}></img>
                <span className={userInfoStyles.editIcon}><i onClick={() => setAvatarModalActive(true)} className="fa-solid fa-pen-to-square"></i></span>
            </div>

            <div><span className={userInfoStyles.field_name}>Имя:</span><span>{name}</span></div>
            <div><span className={userInfoStyles.field_name}>О себе:</span><span>{about}</span></div>
            <div><span className={userInfoStyles.field_name}>Email:</span><span>{email}</span></div>

            <button className={userInfoStyles.editBtn} type='button' onClick={() => setUserModalActive(true)}>Редактировать</button>
        </div>
        <button type='button'>Редактировать</button>

       <Modal active={userModalActive} setActive={setUserModalActive}>
        <EditUser user={userInfo}/>
        </Modal> 

        <Modal active={avatarModalActive} setActive={setAvatarModalActive}>
        <EditAvatar avatar={avatar} />
        </Modal>
        </>
    )
}