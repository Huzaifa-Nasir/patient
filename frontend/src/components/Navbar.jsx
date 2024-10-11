import { Box, Flex, Stack, Link as ChakraLink, Image, border } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import Logout from '../authPage/Logout'

export default function Navbar({showMiniNav,SetShowMiniNav}) {
  const [activeLink, setActiveLink] = useState(null);
  const {LogoutUser} = Logout();
  const {user}= useAuthContext();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if(link == '/miniNav')
    {
      SetShowMiniNav(true)
    }
    else{
      SetShowMiniNav(false)
    }

    if(link == '/logout')
    {
      console.log('logout clicked')
      LogoutUser();
    }
  };

  const linkStyle = (link) => ({
    backgroundColor: activeLink === link ? 'white' : 'transparent',
    color: activeLink === link ? 'green' : 'white',
    padding: '8px 12px',
    borderTopRadius: '5px',
   height:'59px'
    
    
  });
  const OtherlinkStyle = (link) => ({
    border: '2px solid white',
    borderColor : activeLink === link ? 'white' : 'transparent',
    padding: '8px 12px',
    borderTopRadius: '5px',
    height:'47px',
    borderBottomRadius: '5px',

  });

  return (
    <div>

      <Flex justifyContent={'space-between'} pt={'20px'}  px={'40px'} bg={'#285430'} color={'white'} fontWeight={'500'} h={'78px'}  >
        <Box  >
          <Stack direction={'row'} spacing={4}  textDecoration='none'>
          <ChakraLink
            style={{textDecoration:'none', }}
              as={RouterLink}
              to='/'
              sx={OtherlinkStyle('/')}
              onClick={() => handleLinkClick('/')}
            >
            <Image src={`/images/Logo.png`} alt='Logo Image' />
            </ChakraLink>

            <ChakraLink
            style={{textDecoration:'none',}}
              as={RouterLink}
              to='/miniNav'
              sx={linkStyle('/miniNav')}
              onClick={() => handleLinkClick('/miniNav')}
            >
              User
            </ChakraLink>
            <ChakraLink
 style={{textDecoration:'none',}}
              as={RouterLink}
              to='/patient'
              sx={linkStyle('/patient')}
              onClick={() => handleLinkClick('/patient')}
            >
              Patient
            </ChakraLink>
            <ChakraLink
             style={{textDecoration:'none'}}
              as={RouterLink}
              to='/helpcenter'
              sx={linkStyle('/helpcenter')}
              onClick={() => handleLinkClick('/helpcenter')}
            >
              Help Center
            </ChakraLink>
          </Stack>
        </Box>
        <Box>
          
          <Stack direction={'row'} spacing={4} >

          {
  !user ? (
    <>
      <ChakraLink
        style={{ textDecoration: 'none' }}
        as={RouterLink}
        to='/signup'
        sx={linkStyle('/signup')}
        onClick={() => handleLinkClick('/signup')}
      >
        Sign up
      </ChakraLink>

     
      <ChakraLink
        style={{ textDecoration: 'none' }}
        as={RouterLink}
        to='/login'
        sx={linkStyle('/login')}
        onClick={() => handleLinkClick('/login')}
      >
        Login
      </ChakraLink>
    </>
  ) : (
    <>
   
   <ChakraLink
      style={{ textDecoration: 'none',color:'black', fontWeight:'lighter', fontFamily:'cursive', padding: '8px 12px',
        borderTopRadius: '5px',
       height:'59px' }}
      as={RouterLink}
  
    >
      {user.email}
     
    </ChakraLink>

    <ChakraLink
      style={{ textDecoration: 'none' }}
      as={RouterLink}
     
      sx={linkStyle('/logout')}
      onClick={() => handleLinkClick('/logout')}
    >
      Logout
    </ChakraLink>
   
    </>
  )
}


            
           
          </Stack>
        </Box>
      </Flex>
    </div>
  );
}
