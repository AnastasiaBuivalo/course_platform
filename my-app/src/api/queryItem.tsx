import React, { useState, useRef, useCallback } from 'react';

type QueryItem = {
    query: string;
    description: string;
  };

const customRequests: QueryItem[] = [
  
    {
      query:'getMyCourseSQL',
      description:'getMyCourseSQL',
    },
  
    {
      query:'getCourseSQL',
      description:'getCourseSQL',
    },
    {
      query:'getLogInProfileSQL',
      description:' getLogInProfileSQL',
    },
    {
      query:'getIsRegistrationSQL',
      description:'getIsRegistrationSQL',
    },
  

    {
      query:'postRegistrationStudent',
      description:'postRegistrationStudent',
    },
    {
      query:'postRegistrationLecturer',
      description:'postRegistrationLecturer',
    },
    {
      query:'postRegistrationUser',
      description:'postRegistrationUser',
    },
    {
      query:'postCourse',
      description:'postCourse',
    },
    {
      query:'postStudentCourse',
      description:'postStudentCourse',
    },
    {
      query:'postLecturerCourse',
      description:'postLecturerCourse',
    },
  ];
