import '../../css/admin-css/adminsidepanel.css';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';


function Subjects() {
    const [subjectsData, setSubjectsData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await api.get('/subjects', null, {
            headers: {
                Authorization: `Bearer ${authToken}`,
              },
        });
        setSubjectsData(response.data.subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    }

    fetchSubjects();
  }, []);
    
  const handleDelete = async (subjectId) => {
    try {
      await api.delete(`/deleteSubject/${subjectId}`);
      setSubjectsData(subjectsData.filter(subject => subject.id !== subjectId));
      setShowDeleteModal(false);
      setSubjectToDelete(null);
      toast.success('Subject deleted successful!', {
        position: toast.POSITION.TOP_RIGHT,
    });
    } catch (error) {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
  };

  const openDeleteModal = (subjectId) => {
    setSubjectToDelete(subjectId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSubjectToDelete(null);
  };
    
    return (
    <>
      <div className="bg-light p-4 custom-content">
        <h4 className='text-center custom-color'>Subjects</h4>
        <hr />
          <div className="text-start mt-2">
            <Link to="/admin-panel/subjects/new" className="btn btn-primary">
              Add New Subject
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
            {subjectsData.map(subject => (
              <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>
                    {subject.created_at ? new Date(subject.created_at).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    }) : 'N/A'}
                </td>
                <td className='text-center'>
                  <Link to={`/admin-panel/subjects/${subject.id}`} className="btn btn-warning" title="Edit">
                    <FaEdit />
                  </Link>
                  <button onClick={() => openDeleteModal(subject.id)} className="btn btn-danger ms-2" title="Delete"><FaTrash /></button>
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
          Are you sure you want to delete this Subject?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(subjectToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default Subjects;