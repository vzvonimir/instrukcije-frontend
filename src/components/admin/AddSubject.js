import '../../css/admin-css/adminsidepanel.css';
import api from '../../api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddSubject() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await api.post('/addSubject', formData);
          navigate('/admin-panel/subjects');
          toast.success('Subject added successfully.', {
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
        <h4 className='text-center custom-color'>Add New Subject</h4>
        <hr />
        <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="row mb-3">
            <label htmlFor="name" className="col-sm-3 col-form-label">
                Name:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleChange}
                />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Add Subject
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
    );
}

export default AddSubject;