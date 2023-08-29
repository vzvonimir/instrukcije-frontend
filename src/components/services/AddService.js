import '../../css/services-css/addservice.css';
import api from '../../api';
import { fetchCategories, fetchSubjects } from '../../fetch/subject-categories';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddService() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [formData, setFormData] = useState({
        category_id: '',
        subject_id: '',
        price: '',
        description: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    useEffect(() => {
        async function fetchData() {
          const fetchedCategories = await fetchCategories();
          const fetchedSubjects = await fetchSubjects();
          setCategories(fetchedCategories);
          setSubjects(fetchedSubjects);
        }
    
        fetchData();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await api.post('/addService', formData);
          navigate('/profile/services');
          toast.success('Service added successfully.', {
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
      <div className="bg-light p-4 custom-addservice">
        <h4 className='text-center custom-color'>Add New Service</h4>
        <hr />
        <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="row mb-3">
            <label htmlFor="category" className="col-sm-3 col-form-label">
                Category:
            </label>
            <div className="col-sm-9">
                <select className="form-select" id="category" name="category_id" onChange={handleChange}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="subject" className="col-sm-3 col-form-label">
                Subject:
            </label>
            <div className="col-sm-9">
                <select className="form-select" id="subject" name="subject_id" onChange={handleChange}>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="price" className="col-sm-3 col-form-label">
                Price:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
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
                    onChange={handleChange}
                    rows="3"
                />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Add Service
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
    );
}

export default AddService;