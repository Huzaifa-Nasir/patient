import React, { useState,useRef } from 'react';
import { 
  FormControl, 
  FormLabel, 
  Input, 
  Stack, 
  ButtonGroup, 
  Button, 
  Box, 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverArrow, 
  PopoverCloseButton, 
  IconButton, 
  useDisclosure,
  Text,
  
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import FocusLock from 'react-focus-lock';
import DeleteDoctor from '../pages/DeleteDoctor';

// 1. Create a text input component
const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl >
      <FormLabel fontSize={'14px'} htmlFor={props.id}>{props.label}</FormLabel>
      <Input fontSize={'14px'} ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

// 2. Create the form
const Form = ({ firstFieldRef, onCancel, onSave, doctor, error, setError,ok, setOk }) => {
  // Ensure doctor object is defined
  if (!doctor) {
    console.error("Doctor object is undefined in Form component");
    return null; // Handle the error appropriately
  }

  const [firstName, setFirstName] = useState(doctor.first_name);
  const [lastName, setLastName] = useState(doctor.last_name);
  const [email, setEmail] = useState(doctor.email_address);
  const [phoneNumber, setPhoneNumber] = useState(doctor.phone_number);
  const [docType, setDocType] = useState(doctor.doc_type);
  const [status, setStatus] = useState(doctor.status);

  const handleSave = () => {
    // Example validation
    if (!firstName || !lastName || !email || !phoneNumber || !docType || !status) {
      setError("All fields are required.");
      return;
    }

    // Clear error if validation passes
   

    onSave({
      ...doctor,
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      phone_number: phoneNumber,
      doc_type: docType,
      status: status,
    });
  };

  return (
    <Stack spacing={4}>
      <TextInput
        label='First name'
        id='first-name'
        ref={firstFieldRef}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextInput
        label='Last name'
        id='last-name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextInput
        label='Email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        label='Phone Number'
        id='phone-number'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextInput
        label='Doctor Type'
        id='doc-type'
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
      />
      <TextInput
        label='Status'
        id='status'
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      {error && (<Text bg={'#ffefef'} color={'#e7195a'} p={'10px'} width={'100%'} borderRadius={'5px'}>{error}</Text> )}
      {ok && (<Text bg={'green.100'} color={'green.800'} p={'10px'} width={'100%'} borderRadius={'5px'}>Documnet Saved</Text> )}
      <ButtonGroup display='flex' justifyContent='flex-end'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} colorScheme='teal'>
          Save
        </Button>
        
        <DeleteDoctor doctor={doctor}  />
      </ButtonGroup>
    </Stack>
  );
};

// 3. Create the PopoverForm
export default function PopoverForm({ doctor, onSave, error, setError, ok ,setOk }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);

  const handleSave = (updatedDoctor) => {
    onSave(updatedDoctor);
  // Clear any errors on successful save
  };

  return (
    <Box>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={()=>{
          onOpen();
          setOk(false)
          setError('')
        }}
        onClose={() => {
          if (!error) {
            onClose(); // Close popover only if there are no errors
          }
        }}
        placement='auto'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size='sm' icon={<EditIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5} >
          <FocusLock persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Box >
            <Form 
              
              firstFieldRef={firstFieldRef} 
              onCancel={onClose} 
              onSave={handleSave} 
              doctor={doctor} 
              error={error}
              setError={setError}
              ok={ok} setOk={setOk}
            />
            </Box>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
