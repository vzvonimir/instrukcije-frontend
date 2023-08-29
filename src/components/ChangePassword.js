import '../css/changepassword.css';
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserData() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
      });

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('authToken');
            await api.post('/changePassword', formData, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });
      
            navigate('/profile');
            toast.success('Password changed successfully!', {
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
      <div className="bg-light p-4 custom-changepassword">
        <h4 className='text-center custom-color'>Change Password</h4>
        <hr />
        <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="row mb-3">
            <label htmlFor="oldPassword" className="col-sm-3 col-form-label">
                Old Password:
            </label>
            <div className="col-sm-9">
                <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name="old_password"
                    value={formData.old_password}
                    onChange={handleChange}
                    required
                />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="newPassword" className="col-sm-3 col-form-label">
                New Password:
            </label>
            <div className="col-sm-9">
                <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="confirmationPassword" className="col-sm-3 col-form-label">
                Confirm Password:
            </label>
            <div className="col-sm-9">
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="new_password_confirmation"
                    value={formData.new_password_confirmation}
                    onChange={handleChange}
                    required
                />
            </div>
          </div>
          
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
    );
}

export default UserData;