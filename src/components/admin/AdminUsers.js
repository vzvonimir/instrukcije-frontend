import '../../css/admin-css/adminsidepanel.css';
import { FaTrash, FaBan, FaUserCog } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import api from '../../api';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showBanModal, setShowBanModal] = useState(false);
    const [userToBan, setUserToBan] = useState([]);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [userToUpdateRole, setUserToUpdateRole] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await api.get('/users', null, {
            headers: {
                Authorization: `Bearer ${authToken}`,
              },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/deleteUser/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      setShowDeleteModal(false);
      setUserToDelete(null);
      toast.success('User deleted successful!', {
        position: toast.POSITION.TOP_RIGHT,
    });
    } catch (error) {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
  };

  const handleBan = async (userId) => {
    try {
      await api.post(`/banUser/${userId}`);
      setUsers(prevUsers => prevUsers.map(user => user.id === userId ? { ...user, status: 1 - user.status } : user));
      setShowBanModal(false);
      toast.success(
        userToBan.status === 0
          ? 'User banned successfully!'
          : 'User unbanned successfully!',
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setUserToBan([]);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const openBanModal = (userId) => {
    setUserToBan(userId);
    setShowBanModal(true);
  };
  
  const closeBanModal = () => {
    setShowBanModal(false);
    setUserToBan(null);
  };
    
  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const openRoleModal = (user) => {
    setUserToUpdateRole(user);
    setShowRoleModal(true);
  };

  const closeRoleModal = () => {
    setShowRoleModal(false);
    setUserToUpdateRole(null);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleUpdateRole = async () => {
    try {
      await api.post('/updateRole', {user_id: userToUpdateRole, role_id: selectedRole });
      const updatedUsers = users.map((user) => {
        if (user.id === userToUpdateRole) {
          return { ...user, role: selectedRole };
        }
        return user;
      });
      setUsers(updatedUsers);
      setShowRoleModal(false);
      setSelectedRole('');
      toast.success('User role updated successfully.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
    
    return (
    <>
      <div className="bg-light p-4 custom-content">
        <h4 className='text-center custom-color'>Users</h4>
        <hr />
          <div className="table-responsive mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>
                  {user.status === 0 ? (
                    <span style={{ color: 'green' }}>Active</span>
                  ) : (
                    <span style={{ color: 'red' }}>Ban</span>
                  )}
                </td>
                <td>
                  {user.role === '1' ? (
                    <span>Admin</span>
                  ) : user.role === '2' ? (
                    <span>Student</span>
                  ) : user.role === '3' ? (
                    <span>Instructor</span>
                  ) : (
                    <span>Unknown</span>
                  )}
                </td>
                <td className='text-center'>
                  <button onClick={() => openBanModal(user)} className="btn btn-warning ms-2" title="Ban User"><FaBan /></button>
                  <button onClick={() => openRoleModal(user.id)} className="btn btn-secondary ms-2" title="Update Role"><FaUserCog /></button>
                  <button onClick={() => openDeleteModal(user.id)} className="btn btn-danger ms-2" title="Delete User"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      {/* Update Role Modal */}
      <Modal show={showRoleModal} onHide={closeRoleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="roleSelect">Select Role:</label>
            <select
              className="form-select"
              id="roleSelect"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value=''>Choose Role</option>
              <option value="1">Admin</option>
              <option value="2">Student</option>
              <option value="3">Instructor</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRoleModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateRole}>
            Update Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* BanUser Confirmation Modal */}
      <Modal show={showBanModal} onHide={closeBanModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm {userToBan.status === 0 ? 'Ban' : 'Unban'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to {userToBan.status === 0 ? 'Ban' : 'Unban'} this User?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeBanModal}>
          Cancel
        </Button>
        <Button variant="warning" onClick={() => handleBan(userToBan.id)}>
        {userToBan.status === 0 ? 'Ban' : 'Unban'}
        </Button>
      </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this User?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(userToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default AdminUsers;