import React, { useState } from 'react';
import { Box, FormLabel, Flex, Input, Select, Button, Stack } from '@chakra-ui/react';

const FilterComponent = ({ doctors, setFilteredDoctors }) => {
    const [status, setStatus] = useState('');
    const [id, setId] = useState([0, 500]);

    const handleFilter = () => {
        const filtered = doctors.filter((item) => {
            return (
                id[0] <= item.id && id[1] >= item.id &&
                (status ? item.status === status : true)
            );
        });
        setFilteredDoctors(filtered); 
    };

    const handleIdRange = (e) => {
        const ids = e.target.value.split(',').map(Number);
        setId(ids);
    };

    return (
        <Box mt={'30px'} borderRadius="md">
            <Flex mx={'98px'} bg="white" p={'15px 20px'} borderRadius={'10px'} justifyContent={'space-between'}>
                <Stack display={'flex'} flexDir={'row'} gap={10}>
                    <Box>
                        <FormLabel>ID Range:</FormLabel>
                        <Input
                            type="text"
                            onChange={handleIdRange}
                            value={id.join(',')}
                            placeholder="Min,Max"
                        />
                    </Box>

                    <Box>
                        <FormLabel>Status:</FormLabel>
                        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">All</option>
                            <option value="Approved">Approved</option>
                            <option value="Declined">Declined</option>
                        </Select>
                    </Box>
                </Stack>

                <Button alignSelf={'center'} colorScheme="teal" onClick={handleFilter}>Search</Button>
            </Flex>
        </Box>
    );
};

export default FilterComponent;
