import { Box,Flex,Heading,Text,Image} from '@chakra-ui/react'
import React from 'react'

export default function Home() {
  return (
   <>
   <Box bg={'#DCE9E2'} minH={'87vh'} >
   <Flex>

    <Flex flexDir={'column'} justifyContent={'center'} m={'110px 123px'} >
        <Text color={'#00856F'} fontWeight={'bold'}>Welcome to DoctorCare</Text>
        <Heading mt={'16px'} mb={'24px'} fontSize={'52px'} fontWeight={'bold'}>Simplified healthcare <br /> for everyone</Heading>
        <Text >The doctors at DoctorCare go beyond the symptoms to treat the root cause <br /> of your illness and provide a long-term cure.</Text>
    </Flex>
    <Flex>
        <Image src="/images/image.png"></Image>
    </Flex>

   </Flex>

   </Box>

   
   </>
  )
}
