import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/userSlice';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Spinner,
  useToast,
  VStack,
  HStack
} from '@chakra-ui/react';
import EditUser from './EditUser';
import DeleteUserModal from './DeleteUserModal';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .then(() => {
        toast({
          title: "User deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setDeleteModalOpen(false); // Close delete modal
      })
      .catch(() => {
        toast({
          title: "Failed to delete user.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setDeleteModalOpen(false); // Close delete modal
      });
  };

  const handleRowClick = (id) => {
    navigate(`/users/${id}`);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="teal" />
      </Box>
    );
  }

  if (error) {
    return <Box color="red.500" p={4}>Error fetching users: {error}</Box>;
  }

  return (
    <Box
      w="90vw"
      maxW="1200px"
      mx="auto"
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      overflowX="auto"
    >
      <VStack spacing={4} align="stretch" mb={6}>
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="lg"
          borderRadius="md"
        />
      </VStack>

      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Tr
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                _hover={{ bg: "gray.100", cursor: "pointer", transform: "scale(1.02)" }}
                transition="transform 0.2s ease-in-out"
              >
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>
                <Td isNumeric>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click event
                        handleEditClick(user); // Open edit modal
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click event
                        handleDeleteClick(user); // Open delete modal
                      }}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">No users found</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Edit User Modal */}
      {selectedUser && (
        <EditUser
          user={selectedUser}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {/* Delete User Modal */}
      {selectedUser && (
        <DeleteUserModal
          userId={selectedUser.id}
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          handleDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default UserList;
