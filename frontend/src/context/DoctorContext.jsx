import { createContext, useReducer } from "react";

export const DoctorReducer = (state,action)=>{
    switch(action.type)
    {
        case 'INSERT_DOCTOR':
            return{
                ...state,
                doctors:[ action.payload , ...state.doctors ]
            }
            case 'SET_DOCTORS':
            return {
                ...state,
                doctors: action.payload, 
            };
            case 'UPDATE_DOCTOR':
                return {
                  ...state,
                  doctors: state.doctors.map((doctor) =>
                    doctor._id === action.payload._id ? action.payload : doctor
                  )
                };
             case 'DELETE_DOCTOR':
                    return{
                        ...state,
                        doctors: state.doctors.filter((d)=> d._id !== action.payload._id)
                    }
            
        default:
            return state
    }

}

export const DoctorContext = createContext();

export default function DoctorContextProvider ({children}){
const [state, dispatch ] = useReducer(DoctorReducer,{
    doctors:[], 
})

    return(
        <>
            <DoctorContext.Provider value={{...state, dispatch}}>
                   {children}
            </DoctorContext.Provider>
        </>
    )
}

