import React, { useEffect, useState } from 'react';
import api from '../api';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminSidePanel from '../components/admin/AdminSidePanel';
import AdminUsers from '../components/admin/AdminUsers';
import '../css/admin-css/adminsidepanel.css';
import Categories from '../components/admin/Categories';
import AddCategory from '../components/admin/AddCategory';
import EditCategory from '../components/admin/EditCategory';
import Subjects from '../components/admin/Subjects';
import AddSubject from '../components/admin/AddSubject';
import EditSubject from '../components/admin/EditSubject';

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
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/new" element={<AddCategory />} />
                <Route path="/categories/:categoryId" element={<EditCategory />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/subjects/new" element={<AddSubject />} />
                <Route path="/subjects/:subjectId" element={<EditSubject />} />
            </Routes>
          </div>
        </div>
    </div>
    </>
  );
}

export default AdminPanel;
