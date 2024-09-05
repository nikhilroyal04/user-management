import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Spinner, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../features/userSlice';

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchUserById(id))
      .catch(() => {
        toast({
          title: "Failed to fetch user details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [id, dispatch, toast]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="teal" />
      </Box>
    );
  }

  if (error) {
    return <Box color="red.500" p={4}>Error fetching user details: {error}</Box>;
  }

  return (
    <Box
      w="80vw"
      maxW="800px"
      mx="auto"
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      bg="white"
    >
      {user ? (
        <>
          <Text fontSize="2xl" fontWeight="bold">{user.name}</Text>
          <Text mt={2}><strong>Email:</strong> {user.email}</Text>
          <Text mt={2}><strong>Phone:</strong> {user.phone}</Text>
          {/* Add more user details as needed */}
        </>
      ) : (
        <Text>No user details available.</Text>
      )}
    </Box>
  );
};

export default UserDetail;
