import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthContextProvider>
    <DoctorContextProvider>
      <ChakraProvider>
         <App />
    </ChakraProvider>
    </DoctorContextProvider>
    </AuthContextProvider>
  </StrictMode>
 
)