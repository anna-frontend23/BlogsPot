import { Form, Formik, ErrorMessage, Field } from "formik"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import { addComment } from "../../redux/slices/commentsSlice";
import { api } from "../Api/Api";
import addCommentStyles from './addComment.module.scss'

export const AddComment = () => {
const {id} = useParams()
const dispatch = useDispatch()

    return (
        <Formik 
        initialValues={{
            text: ''
        }}
        validationSchema={Yup.object({
            text: Yup.string()
              .min(1, 'Напишите что-нибудь')
              .required('Обязательно')
          })
        }
        onSubmit={(values, onSubmitProps) => {
            api.addComment(values, id)
            .then(response => response.json())
            .then(data => {
              if(!data.error) {
                //console.log(data.comments)
                let comment = data.comments[data.comments.length-1]
                let newComment = {
                    ...comment,
                    author: {
                        _id: comment.author
                    }
                }
                //console.log(newComment)
                onSubmitProps.resetForm()
                dispatch(addComment(newComment))
              }
          })
        }}>
        <Form className={addCommentStyles.addForm}>
        <Field className={addCommentStyles.field} name='text' as='textarea' placeholder='Оставьте Ваш комментарий' type='text'/>
        <ErrorMessage name='text'/>

        <button type='submit' className={addCommentStyles.addBtn}>Оставить комментарий</button>
        </Form>

        </Formik>
    )
}