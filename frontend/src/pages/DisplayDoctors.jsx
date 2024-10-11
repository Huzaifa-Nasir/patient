import { useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Flex,
  Button,
  Skeleton,
  Stack,
  Image,
  Text,
  Input,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import useDoctorContext from "../hooks/useDoctorContext";
import PopoverForm from "../components/Editable";
import useAuthContext from "../hooks/useAuthContext";
import FilterComponent from "../components/Filters";

export default function DisplayDoctors() {
  const { dispatch, doctors } = useDoctorContext();
  const [filteredDoctors, setFilteredDoctors] = useState([]); 
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);
  const { user } = useAuthContext();
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchDocs() {
      try {
        const result = await fetch("/api/doctors/displayDoc", {
          headers: { 'Authorization': `Bearer ${user?.token}` } 
        });
        const data = await result.json();
        console.log("data", data);

        if (result.ok) {
          setCount(data.count);
          dispatch({ type: 'SET_DOCTORS', payload: data.display });
        } else {
          console.log("error: ", data.error);
          setError(data.error); 
          console.error("Unexpected data format:", data.display);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An error occurred while fetching doctors."); 
      }
    }
    fetchDocs();
  }, [dispatch, user?.token]); 

  useEffect(() => {
    setFilteredDoctors(doctors); // Initialize filtered doctors with the fetched doctors
  }, [doctors]);

  const maleImages = ['/images/Avatar.png', '/images/male.png'];
  const femaleImages = ['/images/Group.png', '/images/female.png'];

  const getRandomImage = (gender) => {
    if (!gender) {
      return '/images/default.png'; 
    }
    const images = gender === 'Male' ? maleImages : femaleImages;
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const handleSave = async (updatedDoctor) => {
    try {
      const response = await fetch(`/api/doctors/update_doctor/${updatedDoctor._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}` 
        },
        body: JSON.stringify(updatedDoctor)
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setOk(false);
      } else {
        setError('');
        setOk(true);
        dispatch({ type: 'UPDATE_DOCTOR', payload: data.doctor });
       
      }
    } catch (error) {
      console.log("Error updating doctor:", error);
      setError("An error occurred while updating doctor."); 
     
    }
  };

  return (
    <Box minHeight="100vh" py={2}>
      {/* Pass setFilteredDoctors to FilterComponent */}
      <FilterComponent doctors={doctors} setFilteredDoctors={setFilteredDoctors} />
      <Box display={'flex'} justifyContent={'center'} mt={'10px'} mb={'10px'} mx={'98px'} bg={'white'} borderRadius={'10px'}  > 
        <Input placeholder="search doctors here" type="text" onChange={(e)=> setSearch(e.target.value)} border="none" _focus={{ boxShadow: 'none' }}  /> <Flex px={'20px'} alignItems={'center'}><SearchIcon/></Flex>
      </Box>
    
      <Box bg={'white'} mx={'98px'} borderRadius={'8px'}>
        <Flex justifyContent={'space-between'}>
          <Box>
            <Heading ml={'30px'} pt={'26px'} fontSize={'18px'} fontWeight={'medium'}>
              List Of Doctors
            </Heading>
            <Text ml={'30px'} fontSize={'12px'} fontWeight={'medium'} color={'#B5B5C3'}>
              {`${count} Doctors available`}
            </Text>
          </Box>

          <Box>
            <Button
              as={Link}
              to={'/addDoctor'}
              fontSize={'16px'}
              mr={'30px'}
              mt={'26px'}
              bg={'#5F8D4E'}
              color={'white'}
              _hover={{ bg: '#a1c892' }}
            >
              <Image mr={'5px'} src={`/images/Add-user.png`} alt='Add Doctor' /> Add new Doctor
            </Button>
          </Box>
        </Flex>

        <TableContainer mx={'30px'} mb={'109'} mt={'40px'}>
          <Table variant="simple">
            <Thead bg={'#FAFAFA'} color={'#B5B5C3'} fontSize={'12px'}>
              <Tr>
                <Th>Name</Th>
                <Th>ID</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Date Added</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody fontWeight={'500'} fontSize={'14px'}>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.filter((doc)=>{
                  const searchTerm = search.toLowerCase();
                  const firstNameMatch = doc.first_name.toLowerCase().includes(searchTerm);
                  const lastNameMatch = doc.last_name.toLowerCase().includes(searchTerm);
                  return searchTerm === '' ? doc : firstNameMatch || lastNameMatch;
                }).map((doc) => (
                  <Tr key={doc._id}> 
                    <Td>
                      <Flex gap={4}>
                        <Image src={getRandomImage(doc.gender)} alt={`${doc.gender} Avatar`} />
                        <div>
                          {`${doc.first_name} ${doc.last_name}`}
                          <br />
                          <span style={{ fontSize: '12px', color: '#B5B5C3' }}>{doc.doc_type}</span>
                        </div>
                      </Flex>
                    </Td>
                    <Td>{doc.id}</Td> {/* Highlighted change: Use _id instead of id */}
                    <Td>{doc.email_address}</Td>
                    <Td>{doc.phone_number}</Td>
                    <Td>
                      {doc.createdAt ? formatDistanceToNow(new Date(doc.createdAt), { addSuffix: true }) : 'N/A'}
                    </Td>
                    <Td>
                      <span
                        style={{
                          color: doc.status === 'Approved' ? '#5F8D4E' : '#F64E60',
                          backgroundColor: doc.status === 'Approved' ? '#F4FFF3' : '#FFE2E5',
                          borderRadius: "6px",
                          paddingLeft: '10px',
                          paddingRight: '10px',
                          paddingBottom: '5px',
                          paddingTop: '5px',
                        }}
                      >
                        {doc.status}
                      </span>
                    </Td>
                    <Td>
                      <PopoverForm doctor={doc} onSave={handleSave} error={error} setError={setError} ok={ok} setOk={setOk} />
                    </Td>
                  </Tr> ))  ) : ( <Tr>
                  <Td colSpan="7" textAlign="center"> 
                    Loading...
                    <Stack>
                      <Skeleton startColor='#F4FFF3' endColor='#5F8D4E' height='20px' />
                      <Skeleton startColor='#F4FFF3' endColor='#5F8D4E' height='20px' />
                      <Skeleton startColor='#F4FFF3' endColor='#5F8D4E' height='20px' />
                    </Stack>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
