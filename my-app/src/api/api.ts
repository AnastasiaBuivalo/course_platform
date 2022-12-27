import { create } from 'apisauce';
import { CONFIG } from "./config";

export type RowData = {[key: string]: any};

const sauce = create({
  baseURL: CONFIG.BASE_URL,
  headers: { Accept: "application/json" },
});

const api = {
  sauce,

  getMyCourseSQL: function(data:any){
    return sauce.get<RowData[]>('/main/queries/getMyCourseSQL', data);
  },

  getMyCreateCourseSQL:function(data:any){
    return sauce.get<RowData[]>('/main/queries/getMyCreateCourseSQL', data);
  },


  getCoursesSQL:function(data:any){
    return sauce.get<RowData[]>('/main/queries/getCoursesSQL', data);
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

  getStudent:  function(data:any){
    return sauce.get<RowData[]>('/main/queries/getStudent', data);
  },

  getUser:  function(data:any){
    return sauce.get<RowData[]>('/main/queries/getUser', data);
  },

  getLecturer:  function(data:any){
    return sauce.get<RowData[]>('/main/queries/getLecturer', data);
  },

  getUserIdSQL:function(data:any){
    return sauce.get<RowData[]>('/main/queries/getUserIdSQL', data);
  },
  getMyRoleSQL:function(data:any){
    return sauce.get<RowData[]>('/main/queries/getMyRoleSQL', data);
  },
  getStudentIdSQL:function(data:any){
    return sauce.get<RowData[]>('/main/queries/getStudentIdSQL', data);
  },

  getLecturerIdSQL:function(data:any){
    return sauce.get<RowData[]>('/main/queries/getLecturerIdSQL', data);
  },

  postRegistrationStudent: function(data:any){
    return sauce.post<RowData[]>('/main/queries/postRegistrationStudent', data);
  },

  postRegistrationLecturer:function(data:any){
    return sauce.post<RowData[]>('/main/queries/postRegistrationLecturer', data);
  },
 
  postRegistrationUser:function(data:any){
    return sauce.post<RowData[]>('/main/queries/postRegistrationUser', data);
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

  updateStudent:function(data:any){
    return sauce.post<RowData[]>('/main/queries/updateStudent', data);
  },

  updateLecturer:function(data:any){
    return sauce.post<RowData[]>('/main/queries/updateLecturer', data);
  },

};

export { api };