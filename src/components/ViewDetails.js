import '../css/view.css';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useState, useEffect } from 'react';
import noImage from '../images/noimage.jpg';
import RatingComponent from './RatingComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewDetails() {
    const { serviceId } = useParams();
    const [serviceDetails, setServiceDetails] = useState(null);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [currentInstructorId, setCurrentInstructorId] = useState(null);
    const [ratings, setRatings] = useState({});

    const handleOpenRatingModal = (instructorId) => {
        setCurrentInstructorId(instructorId);
        setShowRatingModal(true);
    };

    const handleCloseRatingModal = () => {
        setShowRatingModal(false);
    };

    const handleRatingSubmit = (instructorId, rating) => {
        setRatings({ ...ratings, [instructorId]: rating });
        handleCloseRatingModal();
    };

    const handleFavorite = async (instructorId) => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await api.post('/addFavorite', {instructor_id:instructorId}, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
      }
  };

    useEffect(() => {
        async function fetchServiceDetails() {
          try {
            const response = await api.get(`/getService/${serviceId}`);
            setServiceDetails(response.data.service);
          } catch (error) {
            console.error('Error fetching service details:', error);
          }
        }
    
        fetchServiceDetails();
      }, [serviceId]);

      if (serviceDetails === null) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div>Loading...</div>
            </div>
          );
      }

  return (
    <div className="view-details-container">
      <div className="center-content">
        <div className="content-wrapper">
          <div className="left-section">
            <img src={
                serviceDetails.instructors.profile_picture ? 
                `http://localhost:8000/storage/${serviceDetails.instructors.profile_picture}` :
                noImage
            }
             alt="Instructor" className="instructor-image mb-2" />
            <div className="instructor-info">
              <h2 className="instructor-name">Instructor info</h2>
              <p><b>First Name:</b> {serviceDetails.instructors.first_name}</p>
              <p><b>Last Name:</b>  {serviceDetails.instructors.last_name}</p>
              <p><b>Address</b>  {serviceDetails.instructors.address}</p>
              <p><b>City:</b>  {serviceDetails.instructors.city}</p>
              <p className="instructor-description">
                <b>Description:</b>  {serviceDetails.instructors.description}
              </p>
            </div>
          </div>
          <div className="right-section">
            <div className="service-section">
              <h2 className="service-title">Service Information</h2>
              <p><b>Category:</b> {serviceDetails.categories.name}</p>
              <p><b>Subject</b> {serviceDetails.subjects.name}</p>
              <p><b>Price per 1h:</b> {serviceDetails.price}€</p>
              <p className="service-description">
                <b>Description:</b> {serviceDetails.description}
              </p>
            </div>
            <div className="contact-section">
              <h2 className="contact-title">Contact Information</h2>
              <p><b>Email:</b> {serviceDetails.instructors.email}</p>
              <p><b>Phone:</b> {serviceDetails.instructors.phone}</p>
            </div>
            <div className="actions-section">
              <button onClick={() => handleOpenRatingModal(serviceDetails.instructors.id)} className="rate-button">Rate Instructor</button>
              <button onClick={() => handleFavorite(serviceDetails.instructors.id)} className="favorite-button">Add to Favorites</button>
            </div>
          </div>
        </div>
        <RatingComponent
        instructorId={currentInstructorId}
        show={showRatingModal}
        onClose={handleCloseRatingModal}
        onRatingSubmit={handleRatingSubmit}
      />
      </div>
    </div>
  );
}

export default ViewDetails;