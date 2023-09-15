import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api';
import { fetchCategories, fetchSubjects } from '../../fetch/subject-categories';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function EditService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [categories, setCategories] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
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

  useEffect(() => {
    async function fetchServiceDetails() {
      try {
        const response = await api.get(`/getService/${serviceId}`);
        setServiceDetails(response.data.service);
        setFormData({
            id: response.data.service.id,
            category_id: response.data.service.categories.id,
            subject_id: response.data.service.subjects.id,
            price: response.data.service.price,
            description: response.data.service.description,
          });
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    }

    fetchServiceDetails();
  }, [serviceId]);

  if (!serviceDetails || !categories || !subjects) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div>Loading...</div>
        </div>
      );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put('/updateService', formData);
      navigate('/profile/services');
      toast.success('Service updated successfully.', {
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
      <h4 className='text-center custom-color'>Edit Service</h4>
      <hr />
      <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="row mb-3">
            <label htmlFor="category" className="col-sm-3 col-form-label">
                Category:
            </label>
            <div className="col-sm-9">
                <select className="form-select" id="category" name="category_id" onChange={handleChange} value={formData.category_id}>
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
                <select className="form-select" id="subject" name="subject_id" onChange={handleChange} value={formData.subject_id}>
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
                Price per 1h:
            </label>
            <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
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
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Update Service
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
}

export default EditService;