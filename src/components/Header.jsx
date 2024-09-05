import React from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box bg="teal" p={4} color="white">
      <Flex justify="space-between" align="center">
        <Heading size="lg">User Management</Heading>
        <Button as={Link} to="/add" colorScheme="" variant="outline">
          Add User
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
