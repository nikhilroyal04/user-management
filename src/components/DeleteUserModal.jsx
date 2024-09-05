import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../features/userSlice';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, useToast
} from '@chakra-ui/react';

const DeleteUserModal = ({ userId, isOpen, onClose, handleDelete }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDeleteClick = () => {
    handleDelete(userId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this user?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
