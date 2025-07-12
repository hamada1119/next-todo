"use client";

import React, { useEffect } from 'react'
import Auth from '../components/Auth'
import axios from 'axios';
import { CsrfToken } from '../../types';


const Page = () => {

  useEffect(() => {
    axios.defaults.withCredentials=true;
    const getCsrfToken = async () =>{
      try{
        const response = await axios.get<CsrfToken>(
          `${process.env.NEXT_PUBLIC_API_URL}/csrf`
        );
        axios.defaults.headers.common['X-CSRF-Token']=response.data.csrf_token;
        console.log('CSRF Token set successfully.')
      }catch(error){
        console.log('CSRF token fetch Failed',error);
      }
    };
    getCsrfToken();
  },[]);

  return (
    <>
      <Auth />
    </>
  );
}

export default Page