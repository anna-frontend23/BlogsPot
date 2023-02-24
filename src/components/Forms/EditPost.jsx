import { Field, Form, Formik } from "formik"
import { editPost } from "../../redux/slices/postsSlice"
import { api } from "../Api/Api"
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import editPostStyles from './editPost.module.scss'

export const EditPost = ({post}) => {
    const dispatch = useDispatch()
    const id = post._id

    async function handler(values) {
        try {
            const response = await api.editPost(id, values)
            const data = await response.json()
            dispatch(editPost(data))
            alert('Изменения сохранены')
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <Formik
        initialValues={{
            title: post.title,
            text: post.text,
            picture: post.image
        }}
        validationSchema={Yup.object({
            title: Yup.string()
                .min(1, 'Придумайте название'),
            text: Yup.string()
                .min(1, 'Напишите что-нибудь'),
            picture: Yup.string()
                
        })}
        onSubmit={(values) => { 
            handler(values)
        }}>

            <Form className={editPostStyles.editForm}>
            <h1 className={editPostStyles.h1}>Редактировать пост</h1>
            <div className={editPostStyles.field_wrapper}><span>Название:</span><Field className={editPostStyles.field} name='title' placeholder='Название' type='text' /></div>
            <div className={editPostStyles.field_wrapper}><span>Текст:</span><Field className={editPostStyles.field} name='text' as='textarea' placeholder='Текст' /></div>
            <div className={editPostStyles.field_wrapper}><span>Фото</span><Field className={editPostStyles.field}  name='picture' placeholder='URL картинки' type='text' /></div>

            <button className={editPostStyles.editBtn} type='submit'>Сохранить</button>

            </Form>

        </Formik>
        </>
        
    )
}