import { NavLink } from 'react-router-dom'
import {Formik, useFormik, Field, FormikProvider, Form } from 'formik'
import * as yup from 'yup'

import './forms.scss'
//имя фамилия, фото, дата рождения
const FormRegistration=()=>{
    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            terms:false,
            role:''
        },
        onSubmit: values=>{
            console.log(JSON.stringify(values, null, 2))
        },
        validationSchema: yup.object({
            email: yup.string()
                        .email('неправильный')
                        .required('обзятельное поле'),
            password: yup.string()
                         .required('обзятельное поле'),
            role: yup.string()
                      .required('роль не выбрана'),

        })
    });


    let repeat_password = '';

    return(
        <FormikProvider value={formik}>
        <Form className="form" onSubmit={formik.handleChange}>
            <h2>Регистрация</h2>
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email? <div className='error' style={{color:'red'}}>{formik.errors.email}</div>:null}
            <label htmlFor="password">Пароль</label>
            <input
                id="password"
                name="password"
                type="text"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />


            <label htmlFor="password">Повторите пароль</label>
            <input
                id="password"
                name="password"
                type="text"
                value={repeat_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />              
            {(repeat_password == formik.values.password) && formik.touched.password? <div className='error'>пароли не совпадают</div>:null}
            {formik.errors.password && formik.touched.password? <div className='error'>{formik.errors.password}</div>:null}

            <label htmlFor="text">Выберите фото для своего профиля: </label>
            <input type="file" name="AddImage" id="AddImage" accept="image/*" placeholder='фото профиля' />

            <label htmlFor="role">Статус аккаунта</label> 
            <Field
                id="role"
                name="role"
                as="select"
                >
                    <option value="">Выберите роль</option>
                    <option value="USD">Ученик</option>
                    <option value="UAH">Преподаватель</option>
            </Field>
            {formik.errors.role && formik.touched.role? <div className='error'>{formik.errors.role}</div>:null}
           {/* // <ErrorMessage component="div" className="error" name="currency"/> */}
            <label htmlFor="text">О себе</label>
            <Field 
                id="text"
                name="text"
                as="textarea"
            />
            {/* {/* <ErrorMessage component="div" className="error" name="text"/> */}


            <label className="checkbox">
                <input name="terms" type="checkbox" 
                value={formik.values.checkbox}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}/>
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.checkbox && formik.touched.checkbox? <div className='error'>{formik.errors.checkbox}</div>:null}

           <div className='btns'>
                <button type="submit" className='btns_registration'>Зарегестрироваться</button>
            </div>
        </Form>
        </FormikProvider>
    )
}

export default FormRegistration;