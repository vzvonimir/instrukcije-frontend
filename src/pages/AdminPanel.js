import React, { useEffect, useState } from 'react';
import api from '../api';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminSidePanel from '../components/admin/AdminSidePanel';
import AdminUsers from '../components/admin/AdminUsers';
import '../css/admin-css/adminsidepanel.css';

function AdminPanel() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await api.get('/getUser', null, {
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


  return (
    <>
    <div className="container-fluid">
        <div className="row">
          <div className='col-sm-3 custom-nav1'>
          <AdminSidePanel user={userData} />
          </div>
          <div className="col-sm-9">
            <Routes location={location}>
                <Route path="/" element={<AdminUsers />} />
            </Routes>
          </div>
        </div>
    </div>
    </>
  );
}

export default AdminPanel;
