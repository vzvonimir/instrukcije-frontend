import '../../css/admin-css/adminsidepanel.css';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';


function Categories() {
    const [categoriesData, setCategoriesData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await api.get('/categories', null, {
            headers: {
                Authorization: `Bearer ${authToken}`,
              },
        });
        setCategoriesData(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);
    
  const handleDelete = async (categoryId) => {
    try {
      await api.delete(`/deleteCategory/${categoryId}`);
      setCategoriesData(categoriesData.filter(category => category.id !== categoryId));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      toast.success('Category deleted successful!', {
        position: toast.POSITION.TOP_RIGHT,
    });
    } catch (error) {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
  };

  const openDeleteModal = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };
    
    return (
    <>
      <div className="bg-light p-4 custom-content">
        <h4 className='text-center custom-color'>Categories</h4>
        <hr />
          <div className="text-start mt-2">
            <Link to="/admin-panel/categories/new" className="btn btn-primary">
              Add New Category
            </Link>
          </div>
          <div className="table-responsive mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                    {category.created_at ? new Date(category.created_at).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    }) : 'N/A'}
                </td>
                <td className='text-center'>
                  <Link to={`/admin-panel/categories/${category.id}`} className="btn btn-warning" title="Edit">
                    <FaEdit />
                  </Link>
                  <button onClick={() => openDeleteModal(category.id)} className="btn btn-danger ms-2" title="Delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>


      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Category?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(categoryToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default Categories;