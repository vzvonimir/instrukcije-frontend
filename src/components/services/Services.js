import '../../css/services-css/services.css';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';


function Services() {
    const [servicesData, setServicesData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await api.get('/getUserServices', null, {
            headers: {
                Authorization: `Bearer ${authToken}`,
              },
        });
        setServicesData(response.data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }

    fetchServices();
  }, []);
    
  const handleDelete = async (serviceId) => {
    try {
      await api.delete(`/deleteService/${serviceId}`);
      setServicesData(servicesData.filter(service => service.id !== serviceId));
      setShowDeleteModal(false);
      setServiceToDelete(null);
      toast.success('Service deleted successful!', {
        position: toast.POSITION.TOP_RIGHT,
    });
    } catch (error) {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
  };

  const openDeleteModal = (serviceId) => {
    setServiceToDelete(serviceId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setServiceToDelete(null);
  };
    
    return (
    <>
      <div className="bg-light p-4 custom-services">
        <h4 className='text-center custom-color'>My Services</h4>
        <hr />
          <div className="text-start mt-2">
            <Link to="/profile/services/new" className="btn btn-primary">
              Add New Service
            </Link>
          </div>
          <div className="table-responsive mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.categories.name}</td>
                <td>{service.subjects.name}</td>
                <td>{service.price}</td>
                <td>{service.description}</td>
                <td className='text-center'>
                  <Link to={`/profile/services/${service.id}`} className="btn btn-warning">
                    <FaEdit />
                  </Link>
                  <button onClick={() => openDeleteModal(service.id)} className="btn btn-danger ms-2"><FaTrash /></button>
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
          Are you sure you want to delete this service?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(serviceToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default Services;