import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";

export default function useDoctorContext() {
  const context = useContext(DoctorContext)
  if(!context)
    {
        throw Error ("useDoctorContext must be used inside the DoctorContextProvider ")
    }
  return context
}
