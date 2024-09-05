import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../features/userSlice';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  VStack,
} from '@chakra-ui/react';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });

  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', phone: '' };

    if (!user.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!user.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!user.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    setLoading(true);
    dispatch(addUser(user))
      .then(() => {
        setLoading(false);
        toast({
          title: 'User added successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setUser({ name: '', email: '', phone: '' });
        navigate('/');
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: 'Failed to add user.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      w={{ base: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%' }} // Responsive width
      maxW="600px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input
            id="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <FormErrorMessage>{errors.phone}</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="teal"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Adding User"
        >
          Add User
        </Button>
      </VStack>
    </Box>
  );
};

export default AddUser;
