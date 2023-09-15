import '../css/editprofile.css';
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile({user, updateUserData }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        city: user.city,
        address: user.address,
        phone: user.phone,
        description: user.description,
        profile_picture: ''
      });
  
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === "file") {
          setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await api.post('/updateUser', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          updateUserData(formData);
          navigate('/profile');
          toast.success('User successfully updated.', {
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
      <div className="bg-light p-4 custom-editprofile">
        <h4 className='text-center custom-color'>Edit Profile</h4>
        <hr />
        <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="row mb-3">
            <label htmlFor="firstName" className="col-sm-3 col-form-label">
                First Name:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="first_name"
                    value={formData.first_name || ""}
                    onChange={handleChange}
                />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="lastName" className="col-sm-3 col-form-label">
                Last Name:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="last_name"
                    value={formData.last_name || ""}
                    onChange={handleChange}
                />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-3 col-form-label">
                Email:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="city" className="col-sm-3 col-form-label">
                City:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="address" className="col-sm-3 col-form-label">
                Address:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={"" || formData.address}
                    onChange={handleChange}
                />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
                Phone:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="description" className="col-sm-3 col-form-label">
                Description:
            </label>
            <div className="col-sm-9">
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    rows="3"
                />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="profilePicture" className="col-sm-3 col-form-label">
                Profile Picture:
            </label>
            <div className="col-sm-9">
              <input
                type="file"
                className="form-control-file"
                id="profilePicture"
                name="profile_picture"
                accept="image/jpeg, image/png, image/jpg, image/gif"
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
    );
}

export default EditProfile;