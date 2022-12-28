import { useState, useEffect } from "react";
//import { NavLink, useHistory } from 'react-router-dom'
import {Formik, useFormik, Field, FormikProvider, Form } from 'formik'
import * as yup from 'yup'

import {api} from '../../../api/api'

import './editProfile.scss'
import './profilePage.scss'

const getUser =async (userId, setUser) => {
    if(userId){
        const res = await api['getUser']({user_id:userId});
        console.log(res.data.data[0]);
        setUser(res?.data?.data[0]['email']);
    }
};

const EditProfile =(props)=>{
    const {role, student, lector} = props;
    const [user, setUser] = useState();
    const s_id =  student ? student['user_id']?student['user_id']:'':'';
    const l_id = lector ? lector['user_id']?lector['user_id']:'':'';
    const fcs_s = student?student['fcs']?student['fcs']:'':'';
    const fcs_l = lector?lector['fcs']?lector['fcs']:'':'';
    const i_s = student?student['information']?student['information']:'':'';
    const i_l = lector?lector['information']?lector['information']:'':'';
    const userId = s_id || l_id;
    const formik = useFormik({
        initialValues:{
            name:fcs_s||fcs_l,
            text:i_s||i_l, 
            experience:lector?lector['experience']:'', 
            speciality:lector?lector['speciality']:''
        },
        onSubmit: values=>{
            console.log(JSON.stringify(values, null, 2))
        },
        validationSchema: yup.object({
            name:  yup.string()
                        .required('обзятельное поле'),

        })
    });

    useEffect(()=>{
        const res = getUser(userId, setUser);
    }, []);

    console.log(`user ${user}`);
    const onEdit=async () => {
        if(student || lector){
            if(student){
                const res = await api['updateStudent']({student_id:student['id'], fcs:formik.values.name, information:formik.values.text});
            }
            else{
                const res = await api['updateLecturer']({student_id:student['id'], fcs:formik.values.name, information:formik.values.text, speciality:formik.values.speciality, experience:formik.values.experience});
            }

        }
    };

    return(
        <FormikProvider value={formik}>
            <div className="profile_current_screen" style = {role === 'Ученик'?{height:'714px'}:null}>
        <div className="edit" onSubmit={formik.handleChange}>
            <h2>Редактировать</h2>
            <label htmlFor="email">Ваше имя </label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name? <div className='error' style={{color:'red'}}>{formik.errors.name}</div>:null}
            <label htmlFor="email">Ваша почта: {user? user:''}</label>

            <label htmlFor="text">Выберите фото для своего профиля: </label>
            <input type="file" name="AddImage" id="AddImage" accept="image/*" placeholder='фото профиля' />

            <label htmlFor="role">Статус аккаунта: {role}</label> 
            
            <label htmlFor="text">О себе</label>
            <Field 
                id="text"
                name="text"
                as="textarea"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            {role === 'Преподаватель'? <div>
                <label htmlFor="text">Специальность</label>
                <Field 
                    id="speciality"
                    name="speciality"
                    as="textarea"
                    value={formik.values.speciality}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <label htmlFor="text">Опыт</label>
                <Field 
                    id="experience"
                    name="experience"
                    as="textarea"
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div> :null}

           <div className='btns'>
                <button type="submit" className='btns_registration' onClick={onEdit}>Сохранить</button>
            </div>
        </div>
        </div>
        </FormikProvider>
    )
}

export default EditProfile;