import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Singin from './components/Singin';
import Singup from './components/Singup';
import Account from './components/Account'
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Post from './components/Post';


function App() {
  return (
    <div className='h-screen bg-stone-900 box-border overflow-auto relative scrollbar-hide	'>
      
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path='/singup' element={<Singup />} />
          <Route path='/account' element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>} />
          <Route path='/login' element={<Singin />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
