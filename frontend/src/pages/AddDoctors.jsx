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


export default function AddDoctors({doctorData,setDoctorData,errors, setErrors}) {
 
    const navigate = useNavigate();

    const handleSubmit = (event)=>{
        event.preventDefault();
        navigate('/nextForm')
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
          
            <Flex borderBottom={'3px solid #5F8D4E'} w={'210px'}   //Bar1
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
        
         
            <Flex w={'210px'}    //Bar2
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
      Basic Information
    </Heading>

    <Flex justifyContent={"space-between"} mb={"18px"}>
      <Stack minW={"50%"} mr={"30px"}>
        <FormControl isRequired>
          <FormLabel>User Type</FormLabel>
          <Select
            placeholder="Select user type"
            _focus={{
              border: "2px solid #5F8D4E",
              boxShadow: "none",
            }}
          >
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
          </Select>
        </FormControl>
      </Stack>

      <Stack minW={"50%"}>
        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="Select Gender"
            _focus={{
              border: "2px solid #5F8D4E",
              boxShadow: "none",
            }}
            onChange={(e)=> setDoctorData({...doctorData , gender: e.target.value})}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>
      </Stack>
    </Flex>

    <Flex justifyContent={"space-between"} mb={"18px"}>
      <Stack minW={"50%"} mr={"30px"}>
        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            placeholder="Your First Name"
            fontSize={"14px"}
            _focus={{
              border: "2px solid #5F8D4E",
              boxShadow: "none",
            }}
            onChange={(e)=> setDoctorData({...doctorData , firstName: e.target.value})}
            value={doctorData.firstName}
          />
        </FormControl>
      </Stack>

      <Stack minW={"50%"}>
        <FormControl isRequired>
          <FormLabel>Designation</FormLabel>
          <Input
            type="text"
            placeholder="Your Designation"
            fontSize={"14px"}
            _focus={{
              border: "2px solid #5F8D4E",
              boxShadow: "none",
            }}
          />
        </FormControl>
      </Stack>
    </Flex>

    <FormControl mb={"18px"} isRequired>
      <FormLabel>Last Name</FormLabel>
      <Input
        type="text"
        maxW={"50%"}
        placeholder="Your Last Name"
        fontSize={"14px"}
        _focus={{
          border: "2px solid #5F8D4E",
          boxShadow: "none",
        }}
        onChange={(e)=> setDoctorData({...doctorData , lastName: e.target.value})}
            value={doctorData.lastName}
      />
    </FormControl>

    <Flex justifyContent="flex-end">
      <Button type="submit" bg="#5F8D4E" color={'white'} _hover={{backgroundColor:'#83b571'}}>
        Next Step
      </Button>
    </Flex>
  </form>
</Stack>

      </Box>
    </>
  );
}
