// import { NavLink } from 'react-router-dom'
// import {Formik, useFormik} from 'formik'
// import * as yup from 'yup'

// import './forms.scss'
// //имя фамилия, фото, дата рождения
// const FormLogin=()=>{s
//     const formik = useFormik({
//         initialValues:{
//             email:'',
//             password:'',
//             terms:false,
//         },
//         onSubmit: values=>{
//             console.log(JSON.stringify(values, null, 2))
//         },
//         validationSchema: yup.object({
//             email: yup.string()
//                         .email('неправильный')
//                         .required('обзятельное поле'),
//             password: yup.string()
//                          .required('обзятельное поле'),

//         })
//     });

//     return(
//         <form className="form" onSubmit={formik.handleChange}>
//             <h2>Вход</h2>
//             <label htmlFor="email">Ваша почта</label>
//             <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//             />
//             {formik.errors.email && formik.touched.email? <div className='error' style={{color:'red'}}>{formik.errors.email}</div>:null}
//             <label htmlFor="password">Пароль</label>
//             <input
//                 id="password"
//                 name="password"
//                 type="text"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//             />
//             {formik.errors.password && formik.touched.password? <div className='error'>{formik.errors.password}</div>:null}
//             <label className="checkbox">
//                 <input name="terms" type="checkbox" 
//                 value={formik.values.checkbox}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}/>
//                 Соглашаетесь с политикой конфиденциальности?
//             </label>
//             {formik.errors.checkbox && formik.touched.checkbox? <div className='error'>{formik.errors.checkbox}</div>:null}
           
//            <div className='btns'>
//             <button type="submit">Вход</button>
//              <NavLink exact to ="/registration"><button type="submit">Регистрация</button></NavLink>
//             </div>
//         </form>
//     )
//<input type="file" name="AddImage" id="AddImage" accept="image/*" />

// }

// export default FormLogin;