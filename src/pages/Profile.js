import React, { useEffect, useState } from 'react';
import api from '../api';
import Menu from '../components/Menu';
import UserSidePanel from '../components/UserSidePanel';
import { Route, Routes, useLocation } from 'react-router-dom';
import UserData from '../components/UserData';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import Services from '../components/services/Services';
import AddService from '../components/services/AddService';
import EditService from '../components/services/EditService';

function Profile() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await api.get('/getUser', null,{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  
    fetchUserData();
  }, []);

  if (userData === null) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div>Loading...</div>
        </div>
      );
  }

  const updateUserData = (updatedUserData) => {
    setUserData(updatedUserData);
  };

  return (
    <>
    <Menu user={userData} />
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserSidePanel user={userData} />
          </div>
          <div className="col-md-9">
            <Routes location={location}>
              <Route path="/" element={<UserData user={userData} />} />
              <Route path="/edit" element={<EditProfile user={userData} updateUserData={updateUserData}/>} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/new" element={<AddService />} />
              <Route path="/services/:serviceId" element={<EditService />} />
            </Routes>
          </div>
        </div>
    </div>
    </>
  );
}

export default Profile;
