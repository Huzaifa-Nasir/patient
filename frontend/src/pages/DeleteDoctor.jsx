
import React from 'react';
import AlertDialogExample from '../components/DeleteAlert';
import useDoctorContext from '../hooks/useDoctorContext';
import useAuthContext from '../hooks/useAuthContext';

export default function DeleteDoctor({ doctor }) {  
    const { dispatch } = useDoctorContext();  
    const {user} =  useAuthContext();

    
    const deleteDoctor = async (onClose) => {  
        try {
            const response = await fetch(`/api/doctors/deleteDoc/${doctor._id}`, { 
                method: 'DELETE',
                headers:{'Authorization':`Bearer ${user.token}`}
            });
            const result = await response.json();

            if (!response.ok) {
                console.log("Error Deleting the Doctor:", response.statusText);
                return;
            }

            
            dispatch({ type: 'DELETE_DOCTOR', payload: result });
            onClose(); 
        } catch (error) {
            console.error("An error occurred while deleting the doctor:", error);
        }
    };

    return (
        <AlertDialogExample toDelete={deleteDoctor} />  
    );
}
