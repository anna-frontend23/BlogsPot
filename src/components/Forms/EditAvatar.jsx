import { Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux"
import * as Yup from 'yup';
import { editAvatar } from "../../redux/slices/userSlice";
import { api } from "../Api/Api";
import editAvatarStyles from './editAvatar.module.scss'

export const EditAvatar = ({avatar}) => {
const dispatch = useDispatch()

async function handler(values) {
    try {
        //console.log(values)
        const response = await api.editAvatar(values)
        const data = await response.json()
        dispatch(editAvatar(data))
        alert('Изменения сохранены')
        
    } catch (error) {
        console.log(error)
    }
}
    return (
        <Formik
        initialValues={{
            avatar: avatar
        }}
        validationSchema={Yup.object({
            avatar: Yup.string()
                .min(1, 'Необходима ссылка на фото')
        })}
        onSubmit={(values) => {
            handler(values)
        }}>

            <Form className={editAvatarStyles.editForm} >
            <h1 className={editAvatarStyles.h1}>Аватар</h1>
            <Field className={editAvatarStyles.field} name='avatar' placeholder='URL Вашего фото' type='text' />
            <button className={editAvatarStyles.editBtn} type='submit'>Сохранить</button>
            </Form>

        </Formik>
    )
}