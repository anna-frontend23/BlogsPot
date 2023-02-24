import { Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { editUserInfo } from "../../redux/slices/userSlice";
import { api } from "../Api/Api";
import editUserStyles from './editUser.module.scss'

export const EditUser = ({user}) => {
const dispatch = useDispatch()

async function handler(values) {
    try {
        const response = await api.editUser(values)
        const data = await response.json()
        dispatch(editUserInfo(data))
        alert('Изменения сохранены')
        
    } catch (error) {
        console.log(error)
    }
}

    return (
        <>
        <Formik
        initialValues={{
            name: user.name,
            about: user.about
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                .min(1, 'Укажите свое имя'),
            about: Yup.string()
                .min(1, 'Расскажите о себе')  
        })}
        onSubmit={(values) => {
            handler(values)
        }}>

            <Form className={editUserStyles.editForm}>
            <h1 className={editUserStyles.h1}>О Вас</h1>

            <Field className={editUserStyles.field} name='name' type='text' placeholder='Имя' />
            <Field className={editUserStyles.field} name='about' as='textarea' placeholder='О себе' />
            {/* <Field className={editUserStyles.field} name='avatar' type='text' placeholder='URL Вашего фото' /> */}
            
            <button className={editUserStyles.editBtn} type='submit'>Сохранить</button>
            </Form>

        </Formik>
        </>
    )
}