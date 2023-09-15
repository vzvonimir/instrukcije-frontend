import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';
import '../css/rating.css';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RatingComponent({ instructorId, show, onClose, onRatingSubmit }) {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await api.post('/rateInstructor', {instructor_id:instructorId, rating:rating}, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        onRatingSubmit(instructorId, rating);
        onClose();
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
      }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rate Instructor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="rating-stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={rating > index ? 'star-filled' : 'star-empty'}
              onClick={() => handleRatingChange(index + 1)}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleRatingSubmit}>
          Submit Rating
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RatingComponent;