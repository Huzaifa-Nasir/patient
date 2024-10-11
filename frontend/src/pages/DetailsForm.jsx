import {
  Box,
  Text,
  Flex,
  Stack,
  Heading,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import useDoctorContext  from "../hooks/useDoctorContext"
import useAuthContext from "../hooks/useAuthContext";

export default function AddDoctors({doctorData,setDoctorData,errors,setErrors}) {
  const {dispatch } = useDoctorContext();
  const {user} = useAuthContext();
    const navigate = useNavigate();
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const mappedDoctorData = {
          first_name: doctorData.firstName,
          last_name: doctorData.lastName,
          gender: doctorData.gender,
          DOB: doctorData.DOB,
          email_address: doctorData.email,
          phone_number: doctorData.phone,
          doc_type: doctorData.doctor_type,
          status: doctorData.status,
      };
        try{
          const data = await fetch('/api/doctors/addDoc',{
            method:'POST',
            headers:{'Content-Type':'application/json',
             'Authorization':`Bearer ${user.token}`
            },
            body: JSON.stringify(mappedDoctorData),
          })
          const result = await data.json();
          console.log('Success:', result);
          console.log("Error is:",result.error)
          if(!data.ok)
          {
            setErrors(result.error)

          }
          if(data.ok)
          {
         
            setDoctorData({
              gender: '',
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              DOB: '',
              doctor_type: '',
              status: '',
          });
          setErrors(null);
            

            dispatch({type:'INSERT_DOCTOR',payload: result})
            navigate('/docs');
          }
         }
         catch(error)
         {
          console.log(error);
         }
    }

  return (
    <>
      <Box bg={"white"} m={"20px 200px"} borderRadius={"5px"} p={"40px 80px"}>
        <Stack
          display={"flex"}
          flexDir={"row"}
          justifyContent={"center"}
          mb={"30px"}
        >
          
            <Flex  w={'210px'}   //Bar1
              mr={"60px"}
              alignItems={"baseline"}
              flexDir={"row"}
              color={"#5F8D4E"}
            >
              <Text mr={"5px"} fontWeight={"semibold"} fontSize={"25px"}>
                1
              </Text>
              <Text fontWeight={"semibold"} fontSize={"13px"}>
                Basic Information
              </Text>
            </Flex>
        
         
            <Flex borderBottom={'3px solid #5F8D4E'} w={'210px'}    //Bar2
              alignItems={"baseline"}
              flexDir={"row"}
              color={"#5F8D4E"}
            >
              <Text mr={"5px"} fontWeight={"semibold"} fontSize={"25px"}>
                2
              </Text>
              <Text fontWeight={"semibold"} fontSize={"13px"}>
                Enter Details
              </Text>
            </Flex>
         
        </Stack>

        <Stack>
  <form onSubmit={handleSubmit}>
    <Heading fontSize={"23px"} fontWeight={"medium"} m={"30px 0"}>
      Enter Details
    </Heading>


    <Flex justifyContent={"space-between"} mb={"18px"}>
      <Stack minW={"50%"} mr={"30px"}>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Your email"
            fontSize={"14px"}
            _focus={{
              border: "2px solid #5F8D4E",
              boxShadow: "none",
            }}
            onChange={(e)=> setDoctorData({...doctorData , email:e.target.value})}
            value={doctorData.email}
          />
        </FormControl>
      </Stack>

      <Stack minW={"50%"}>
        <FormControl isRequired>
          <FormLabel>DOB</FormLabel>
          <Input
            type="date"
            placeholder="Your Designation"
            fontSize={"14px"}
            _focus={{
              border: "2px solid #5F8D4E",
              boxShadow: "none",
            }}
            onChange={(e)=> setDoctorData({...doctorData , DOB:e.target.value})}
            value={doctorData.DOB}
          />
        </FormControl>
      </Stack>
    </Flex>

<Flex justifyContent={"space-between"} mb={"18px"}>
<Stack minW={"50%"} mr={"30px"}>
        <FormControl isRequired>
          <FormLabel>Doctor Type</FormLabel>
          <Input
            type="text"
            placeholder="Doctor type"
            fontSize={"14px"}
            _focus={{
              border: "2px solid #5F8D4E",
              boxShadow: "none",
            }}
            onChange={(e)=> setDoctorData({...doctorData , doctor_type:e.target.value})}
            value={doctorData.doctor_type}
          />
        </FormControl>
      </Stack>


      <Stack minW={"50%"}>
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
  type="tel"
  placeholder="Phone Number"
  fontSize={"14px"}
  _focus={{
    border: "2px solid #5F8D4E",
    boxShadow: "none",
  }}
  onChange={(e)=> setDoctorData({...doctorData , phone:e.target.value})}
  value={doctorData.phone}
/>

        </FormControl>
      </Stack>
    </Flex>

    <Stack minW={"50%"} mb={'20px'}>
        <FormControl isRequired>
          <FormLabel>Status</FormLabel>
          <Select
            placeholder="Select Status"
            _focus={{
              border: "2px solid #5F8D4E",
              boxShadow: "none",
            }}
            onChange={(e)=> setDoctorData({...doctorData , status: e.target.value})}
          >
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </Select>
        </FormControl>
      </Stack>


      <Flex justifyContent={'center'} textAlign={'center'}>
          {errors && (<Box bg={'#ffefef'} color={'#e7195a'} p={'10px'} width={'50%'} borderRadius={'5px'} >{errors}</Box>) }
      </Flex>

    <Flex justifyContent="flex-end">
      <Button type="submit" bg="#5F8D4E" color={'white'} _hover={{backgroundColor:'#83b571'}}>
        Submit
      </Button>
      </Flex>
      
   
  </form>
</Stack>

      </Box>
    </>
  );
}
