import { create } from 'apisauce';
import { CONFIG } from "./config";

export type RowData = {[key: string]: any};

const sauce = create({
  baseURL: CONFIG.BASE_URL,
  headers: { Accept: "application/json" },
});

const api = {
  sauce,

  getMyCourseSQL: function(){
    return sauce.get<RowData[]>('/main/queries/getMyCourseSQL', {student_id:1});
  },

  getCourseSQL:function(data:any){
    return sauce.get<RowData[]>('/main/queries/getCourseSQL', data);
  },
  getLogInProfileSQL: function(data:any){
    return sauce.get<RowData[]>('/main/queries/getLogInProfileSQL', data);
  },
  
  getIsRegistrationSQL:  function(data:any){
    return sauce.get<RowData[]>('/main/queries/getIsRegistrationSQL', data);
  },

  postRegistrationStudent: function(data:any){
    return sauce.post<RowData[]>('/main/queries/postRegistrationStudent', data);
  },

  postRegistrationLecturer:function(){
    return sauce.post<RowData[]>('/main/queries/postRegistrationLecturer', {fcs:'a', email:'a', password:'a', information:'a', speciality:'a', experience:'a' });
  },
 
  postRegistrationUser:function(){
    return sauce.post<RowData[]>('/main/queries/postRegistrationUser', {role:'a', student_id:'0', lecturer_id:'1'});
  },

  postCourse:function(){
    return sauce.post<RowData[]>('/main/queries/postCourse', {title:'a', descript:'a'});
  },

  postStudentCourse:function(){
    return sauce.post<RowData[]>('/main/queries/postStudentCourse', {student_id:'3', course_id:'1'});
  },

  postLecturerCourse:function(){
    return sauce.post<RowData[]>('/main/queries/postLecturerCourse', {lecturer_id:'1', course_id:'1'});
  },

};

export { api };