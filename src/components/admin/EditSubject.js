import '../../css/admin-css/adminsidepanel.css';
import api from '../../api';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditSubject() {
    const navigate = useNavigate();
    const { subjectId } = useParams();
    const [subjectDetails, setSubjectDetails] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      useEffect(() => {
        async function fetchSubjectDetails() {
          try {
            const response = await api.get(`/getSubject/${subjectId}`);
            setSubjectDetails(response.data.subject);
            setFormData({
                id: response.data.subject.id,
                name: response.data.subject.name
              });
          } catch (error) {
            console.error('Error fetching subject details:', error);
          }
        }
    
        fetchSubjectDetails();
      }, [subjectId]);
    
      if (!subjectDetails) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div>Loading...</div>
            </div>
          );
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await api.put('/updateSubject', formData);
          navigate('/admin-panel/subjects');
          toast.success('Subject updated successfully.', {
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
        <h4 className='text-center custom-color'>Edit Subject</h4>
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
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Update Subject
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
    );
}

export default EditSubject;