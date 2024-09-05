import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../features/userSlice';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, useToast, IconButton
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const EditUser = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  
  const [editedUser, setEditedUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleSave = () => {
    setLoading(true);
    dispatch(editUser(editedUser))
      .then(() => {
        setLoading(false);
        toast({
          title: "User updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsEditable(false); 
        onClose();
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Failed to update user.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleCancel = () => {
    setEditedUser(user);  
    setIsEditable(false);
    onClose();            
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Edit User
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={onClose}
            position="absolute"
            right={4}
            top={4}
            variant="ghost"
            size="sm"
          />
        </ModalHeader>
        <ModalBody>
          <Input
            placeholder="Name"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            mb={4}
            isReadOnly={!isEditable} 
            bg={isEditable ? '' : 'gray.200'} 
          />
          <Input
            placeholder="Email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            mb={4}
            isReadOnly={!isEditable}
            bg={isEditable ? '' : 'gray.200'} 
          />
          <Input
            placeholder="Phone"
            value={editedUser.phone}
            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            mb={4}
            isReadOnly={!isEditable}
            bg={isEditable ? '' : 'gray.200'} 
          />
        </ModalBody>
        <ModalFooter>
          {!isEditable ? (
            <Button onClick={() => setIsEditable(true)} colorScheme="blue">
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} isLoading={loading} loadingText="Saving Changes" colorScheme="blue">
                Save
              </Button>
              <Button onClick={handleCancel} ml={3}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUser;
