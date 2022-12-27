import { NavLink, useHistory } from 'react-router-dom'
import {Formik, useFormik, Field, FormikProvider, Form } from 'formik'
import * as yup from 'yup'

import {api} from '../../../api/api'

// import './forms.scss'
import './profilePage.scss'

const EditProfile =(props)=>{
    const {role, student, lector} = props;
    const navigate = useHistory();
    const formik = useFormik({
        initialValues:{
            name:'',
            text:'', 
            experience:'', 
            speciality:''
        },
        onSubmit: values=>{
            console.log(JSON.stringify(values, null, 2))
        },
        validationSchema: yup.object({
            name:  yup.string()
                        .required('обзятельное поле'),

        })
    });


    const onEdit=()=>{

    }

    return(
        <FormikProvider value={formik}>
        <div className="form" onSubmit={formik.handleChange}>
            <h2>Редактировать</h2>
            <label htmlFor="email">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name? <div className='error' style={{color:'red'}}>{formik.errors.name}</div>:null}
            <label htmlFor="email">Ваша почта: {formik.values.email}</label>

            <label htmlFor="text">Выберите фото для своего профиля: </label>
            <input type="file" name="AddImage" id="AddImage" accept="image/*" placeholder='фото профиля' />

            <label htmlFor="role">Статус аккаунта: {role}</label> 
            
            <label htmlFor="text">О себе</label>
            <Field 
                id="text"
                name="text"
                as="textarea"
                value={formik.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            {formik.values.role === 'Преподаватель'? <div>
                <label htmlFor="text">Специальность</label>
                <Field 
                    id="speciality"
                    name="speciality"
                    as="textarea"
                    value={formik.speciality}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <label htmlFor="text">Опыт</label>
                <Field 
                    id="experience"
                    name="experience"
                    as="textarea"
                    value={formik.experience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div> :null}

           <div className='btns'>
                <button type="submit" className='btns_registration' onClick={onEdit}>Сохранить</button>
            </div>
        </div>
        </FormikProvider>
    )
}

export default EditProfile;