import { NavLink, useHistory } from 'react-router-dom'
import {Formik, useFormik, Field, FormikProvider, Form } from 'formik'
import * as yup from 'yup'

import {api} from '../../../api/api'

import './forms.scss'

//имя фамилия, фото, дата рождения
const FormRegistration=(props)=>{
    const {userId, setUserId} = props;
    const navigate = useHistory();
    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            repeat_password : '',
            terms:false,
            role:'',
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
            email: yup.string()
                        .email('неправильный')
                        .required('обзятельное поле'),
            password: yup.string()
                        .min(8, 'Минимум 8 символов')
                        .required('обзятельное поле'),
            role: yup.string()
                      .required('роль не выбрана'),
            terms: yup.boolean()
                        .required('Необходимо согласие')
                        .oneOf([true], "Необходимо согласие")

        })
    });

    const onRegistration = async () => {
        if(Object.keys(formik.errors).length == 0){
            console.log(formik.errors);
            // @ts-ignore
            const res = await api['getIsRegistrationSQL']({email:formik.values.email});
            console.log('Api Response:', res);
            console.log('Api Response:',  res.data.data[0]['count(password)']);
            if( res.data.data[0]['count(password)'] === '1')
                alert('Эта почта уже используется');
            else{
                await api['postRegistrationUser']({role:formik.values.role, email:formik.values.email, password:formik.values.password});
                const user_id = await api['getUserIdSQL']({email:formik.values.email});
                if (formik.values.role == 'Ученик'){
                    await api['postRegistrationStudent']({fcs:formik.values.name, information:formik.values.text, user_id: user_id.data.data[0]['id']});
                }
                else{
                    await api['postRegistrationLecturer']({fcs:formik.values.name, information:formik.values.text,  speciality:formik.values.speciality, experience:formik.values.experience, user_id: user_id.data.data[0]['id']});
                }
                setUserId(user_id.data.data[0]['id']);
                navigate.push(`/profile:${formik.values.email}`);
            }
        }
        else{
            console.log(formik.errors);
            alert('Допущены ошибки при заполнении формы регистрации')
        }
        //getIsRegistrationSQL

    }


    return(
        <FormikProvider value={formik}>
        <div className="form" onSubmit={formik.handleChange}>
            <h2>Регистрация</h2>
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
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <label htmlFor="password">Повторите пароль</label>
            <input
                id="repeat_password"
                name="repeat_password"
                type="password"
                value={formik.repeat_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />              
            {(formik.repeat_password === formik.values.password) && formik.touched.password? <div className='error'>пароли не совпадают</div>:null}
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
                    <option value="Ученик">Ученик</option>
                    <option value="Преподаватель">Преподаватель</option>
            </Field>
            {formik.errors.role && formik.touched.role? <div className='error'>{formik.errors.role}</div>:null}
           {/* // <ErrorMessage component="div" className="error" name="currency"/> */}
            <label htmlFor="text">О себе</label>
            <Field 
                id="text"
                name="text"
                as="textarea"
                value={formik.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {/* {/* <ErrorMessage component="div" className="error" name="text"/> */}
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
            <label className="checkbox">
                <input name="terms" type="checkbox" 
                value={formik.values.checkbox}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}/>
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms? <div className='error'>{formik.errors.terms}</div>:null}
            {/* {formik.errors.checkbox && formik.touched.checkbox? <div className='error'>{formik.errors.checkbox}</div>:null} */}

           <div className='btns'>
                <button type="submit" className='btns_registration' onClick={onRegistration}>Зарегестрироваться</button>
            </div>
        </div>
        </FormikProvider>
    )
}

export default FormRegistration;