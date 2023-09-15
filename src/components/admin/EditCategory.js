import '../../css/admin-css/adminsidepanel.css';
import api from '../../api';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditCategory() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [categoryDetails, setCategoryDetails] = useState(null);
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
        async function fetchCategoryDetails() {
          try {
            const response = await api.get(`/getCategory/${categoryId}`);
            setCategoryDetails(response.data.category);
            setFormData({
                id: response.data.category.id,
                name: response.data.category.name
              });
          } catch (error) {
            console.error('Error fetching category details:', error);
          }
        }
    
        fetchCategoryDetails();
      }, [categoryId]);
    
      if (!categoryDetails) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div>Loading...</div>
            </div>
          );
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await api.put('/updateCategory', formData);
          navigate('/admin-panel/categories');
          toast.success('Category updated successfully.', {
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
        <h4 className='text-center custom-color'>Edit Category</h4>
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
              Update Category
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
    );
}

export default EditCategory;