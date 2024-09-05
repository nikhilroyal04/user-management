import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import Header from './components/Header';
import UserDetail from './components/UserDetail';

function App() {
  return (
    <Router>
      <Header />
      <Box p={4}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/users/:id" element={<UserDetail />} /> 
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
