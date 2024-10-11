import React from 'react'
import useAuthContext from '../hooks/useAuthContext'
import useDoctorContext from '../hooks/useDoctorContext'



export default function Logout() {
    const {dispatch} = useAuthContext();
    const {dispatch:DoctorDispatch} = useDoctorContext();

    const LogoutUser = ()=>{
        console.log('iam in')
        localStorage.removeItem('user');
        dispatch({type:'LOGOUT'})
        DoctorDispatch({type:'SET_DOCTORS',payload:[]})
    }
  return {LogoutUser};
}
