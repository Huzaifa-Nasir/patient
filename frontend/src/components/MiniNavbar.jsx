import { background, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext';


export default function MiniNavbar() {
const {user} = useAuthContext();
 const [activelink,setActiveLink] = useState('');

 const coloring = (linkName)=>{

    setActiveLink(linkName);
 }

const applyColors =(linkName)=>({
 color: activelink == linkName? '#5F8D4E':'inherit',
 background : activelink == linkName? '#F4FFF3':'inherit',
 padding:'12px 20px'
})
        

  return (
    <div>
      {
        user ? (<Flex backgroundColor={'white'} height={'80px'} width={'full'} gap={8} px={'52px'} py={'17px'} color={'#C9C9C9'} alignItems={'center'} >
          <span onClick={()=>coloring('doc')} style={applyColors('doc')}> <Link  to={'/docs'}>Doctors</Link></span>
          <span onClick={()=>coloring('admin')} style={applyColors('admin')} ><Link  to={'admin'}>Admisistrator</Link></span>
          <span  onClick={()=>coloring('acc')} style={applyColors('acc')}><Link  to={'/acc'}>Account</Link></span>
        </Flex>) :
        (<Navigate to={'/login'}/>)  
}
    </div>
  )
}
