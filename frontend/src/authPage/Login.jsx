import React, { useState } from 'react';
import {
  Heading,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Container,
  Button,
  Box
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [marginLeft, setMarginLeft] = useState('0px');
  const [error,setError] = useState('');
  const {dispatch} = useAuthContext();
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    if (email === '' && password === '') { 
      if(marginLeft== '400px')
      {
        setMarginLeft('0px')
      }
      else{
        setMarginLeft((prev) => `${parseInt(prev) + 100}px`);
      }
      
    }

  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError(null);


        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if(!response.ok) {
            setError(data.error);
          
            console.log('Error', data.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
           
            console.log("User Logged in", data);
            navigate('/')

           
        } 
  }

  return (
    <>
      <Container bg={'white'} p={'30px'} mt={'30px'} borderRadius={'4px'}  color={'rgb(58, 57, 57)'}>
        <form
          onSubmit={handleSubmit}
        >
          <Heading fontSize={'30px'} fontWeight={'bold'} m={'30px 0'}>
           Log In
          </Heading>

          <Flex justifyContent={'space-between'} mb={'18px'} flexDir={'column'}>
            <Stack minW={'100%'} mb={'20px'}>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Your email"
                  fontSize={'14px'}
                  _focus={{
                    border: '2px solid #5F8D4E',
                    boxShadow: 'none',
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>
            </Stack>

            <Stack minW={'100%'} mb={'20px'}>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Your Password"
                  fontSize={'14px'}
                  _focus={{
                    border: '2px solid #5F8D4E',
                    boxShadow: 'none',
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FormControl>
            </Stack>

            <Flex justifyContent={'center'} textAlign={'center'} mb={'15px'}>
          {error && (<Box bg={'#ffefef'} color={'#e7195a'} p={'10px'} w={'100%'} borderRadius={'5px'} >{error}</Box>) }
      </Flex>

            <Flex justifyContent={'flex-end'}>
              <Button
                mr={marginLeft}
                
                maxW={'fit-content'}
                type="submit"
                bg="#5F8D4E"
                color={'white'}
                _hover={{ backgroundColor: '#83b571' }}
                onMouseEnter={handleMouseEnter}
              >
                login
              </Button>
            </Flex>
          </Flex>
        </form>
      </Container>
    </>
  );
}
