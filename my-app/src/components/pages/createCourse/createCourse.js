import { NavLink, useHistory } from 'react-router-dom'
import {Formik, useFormik, Field, FormikProvider, Form } from 'formik'
import * as yup from 'yup'

import {api} from '../../../api/api'

import '../formPage/forms.scss'

//имя фамилия, фото, дата рождения
const CreateCourse=(props)=>{
    const {userId} = props;
    const navigate = useHistory();
    const formik = useFormik({
        initialValues:{
            name:'',
            duration:'', 
            price:'',
            description:''

        },
        onSubmit: values=>{
            console.log(JSON.stringify(values, null, 2))
        },
        validationSchema: yup.object({
            name:  yup.string()
                        .required('обзятельное поле'),
            duration:  yup.string()
            .required('обзятельное поле'),

            price:  yup.string()
            .required('обзятельное поле'),
        })
    });


    const onCreate = async()=>{
        if(Object.keys(formik.errors).length == 0){
            // @ts-ignore
            const lector_id = await api['getLecturerIdSQL']({user_id:userId});
            const res = await api['postCourse']({title:formik.values.name, descript: formik.values.description, price:formik.values.price, duration:formik.values.duration, lecturer_id:lector_id?.data?.data[0]['id']});
            const courseId =  await api['getCourseIdSQL']({title:formik.values.name});
            const lect = await api['postLecturerCourse']({lecturer_id:lector_id?.data?.data[0]['id'], course_id: courseId?.data?.data[0]['id']});
            console.log(res.data.data);
            navigate.push(`/profile:${userId}`);
        }
        else{
            console.log(formik.errors);
            alert('Допущены ошибка при заполнении');
        }
    }

    return(
        <FormikProvider value={formik}>
        <div className="form" onSubmit={formik.handleChange}>
            <h2>Курс</h2>
            <label htmlFor="text">Название</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name? <div className='error' style={{color:'red'}}>{formik.errors.name}</div>:null}

            <label htmlFor="text">Выберите фото для обложки курса: </label>
            <input type="file" name="AddImage" id="AddImage" accept="image/*" placeholder='фото профиля' />

            <label htmlFor="text">Описание</label>
            <Field 
                id="description"
                name="description"
                as="textarea"
                value={formik.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />


            <label htmlFor="text">Длительность</label>
            <input
                id="duration"
                name="duration"
                type="text"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.duration && formik.touched.duration? <div className='error' style={{color:'red'}}>{formik.errors.duration}</div>:null}

            <label htmlFor="text">Цена</label>
            <input
                id="name"
                name="price"
                type="text"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.price && formik.touched.price? <div className='error' style={{color:'red'}}>{formik.errors.price}</div>:null}
            {/* <label htmlFor="text">Стоимость</label>
            <input
                id="text"
                name="price"
                type="text"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.error.price && formik.touched.price? <div className='error' style={{color:'red'}}>{formik.errors.price}</div>:null} */}

           <div className='btns'>
                <button type="submit" className='btns_registration' onClick={onCreate}>Создать</button>
            </div>
        </div>
        </FormikProvider>
    )
}

export default CreateCourse;