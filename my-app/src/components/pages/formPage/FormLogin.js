import { useState } from 'react'
import { NavLink, useHistory} from 'react-router-dom'
import {Formik, useFormik} from 'formik'
import * as yup from 'yup'

import {api} from '../../../api/api'

import './forms.scss'


const FormLogin=(props)=>{
    let {userId, setUserId} = props;
    const [error, setError] = useState(false);
    const navigate = useHistory();
    const LogIn = async (email, password) => {
        if(!(formik.errors.email && formik.touched.email && formik.errors.password && formik.touched.password)){
            //alert('Отправка формы');
            console.log('login');
            // if (selectedQuery) {
            // @ts-ignore
            let res = await api['getLogInProfileSQL']({email:email,  password:password});
            console.log('Api Response:', res);
            console.log('Api Response:', res.data.data[0]['count(password)']);
            if(res.data.data[0]['count(password)'] != '0'){
                res = await api['getUserIdSQL']({email:email});
                console.log(res.data.data[0]['id']);
                setUserId(res.data.data[0]['id']);
                userId = res.data.data[0]['id'];
                navigate.push(`/profile:${userId}`);
            }
            else{
                console.log('неверно');
                setError(true);
            }
            
        }
        //setCourseList((courseList)=>[...courseList, ...res?.data?.data]);
        //setNewItemLoading(false);
        // }
    };

    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            terms:false,
        },
        onSubmit: values=>{
            alert('Отправка формы');
            //console.log(JSON.stringify(values, null, 2))
        },
        validationSchema: yup.object({
            email: yup.string()
                        .email('неправильный')
                        .required('обзятельное поле'),
            password: yup.string()
                         .min(8, 'Минимум 8 символов')
                         .required('обзятельное поле'),

        })
    });

    return(
        <div className="form">
            <h2>Вход</h2>
            {error? <div className='error' style={{color:'red'}}>Неверная почта или пароль</div>:null}
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
            {formik.errors.password && formik.touched.password? <div className='error'>{formik.errors.password}</div>:null}
            
           <div className='btns'>
            <button onClick = {()=>LogIn(formik.values.email,formik.values.password)}>Вход</button>
             <NavLink exact to ="/registration"><button >Регистрация</button></NavLink>
            </div>
        </div>
    )

}

export default FormLogin;