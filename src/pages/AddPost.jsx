import { Formik, Form, ErrorMessage, Field } from "formik"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { api } from "../components/Api/Api";
import {addPost} from '../redux/slices/postsSlice'
import addFormStyles from './addPost.module.scss'

export const AddPost = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

    return (
        <>
        <Formik
        initialValues={{
            title: '',
            text: '',
            image: '',

        }}
        validationSchema={Yup.object({
            title: Yup.string()
              .min(1, 'Введите заголовок')
              .required('Обязательно'),
            text: Yup.string()
              .min(1, 'Напишите что-нибудь')
              .required('Обязательно'),
              image: Yup.string()
              .required('Обязательно')
          })
        }
        onSubmit={(values, onSubmitProps) => {
            api.addPost(values)
            .then(response => response.json())
            .then(data => {
              if(!data.error) {
                //console.log(data)
                onSubmitProps.resetForm()
                dispatch(addPost(data))
                navigate(`../${data._id}`)
              }
          })
        }}
        >

        <Form className={addFormStyles.addForm}>
        <h1 className={addFormStyles.h1}>Добавление поста</h1>
        <Field className={addFormStyles.field} name='title' placeholder='Заголовок' type='text'/>
        <ErrorMessage name='title'/>

        <Field className={addFormStyles.field} name='text' as='textarea' placeholder='Текст' type='text'/>
        <ErrorMessage name='text'/>

        <Field className={addFormStyles.field} name='image' placeholder='URL картинки' type='text'/>
        
        <button className={addFormStyles.addBtn} type='submit'>Добавить пост</button>
        </Form>
        
        </Formik>
        
        </>
       

    )
}