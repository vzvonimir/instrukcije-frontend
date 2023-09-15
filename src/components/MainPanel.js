import '../css/mainpanel.css';
import Card from 'react-bootstrap/Card';
import noImage from '../images/noimage.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function MainPanel({ searchQuery, selectedCategories  }) {
  const [servicesData, setServicesData] = useState([]);

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill yellow-star"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>);
      }
    }
    return stars;
  };

  useEffect(() => {
    async function fetchServices() {
      if(searchQuery){
        try {
          const authToken = localStorage.getItem('authToken');
          const response = await api.post('/search', {search:searchQuery},{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setServicesData(response.data.services);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }else if(selectedCategories.length > 0){
        try {
          const authToken = localStorage.getItem('authToken');
          const categoryParams = selectedCategories.map(categoryId => `categories[]=${categoryId}`).join('&');
          const response = await api.get(`/filterServices?${categoryParams}`,{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setServicesData(response.data.services);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }else{
        try {
          const authToken = localStorage.getItem('authToken');
          const response = await api.get('/getServices', null, {
              headers: {
                  Authorization: `Bearer ${authToken}`,
                },
          });
          setServicesData(response.data.services);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }
    }

    fetchServices();
  }, [searchQuery, selectedCategories]);

    return (
      <div className="bg-light p-4 custom-mainpanel">
        <h4>Services</h4>
        <hr />
        <div className="card-container">
          {servicesData.map(service => (
            <Card className="card" key={service.id}>
            <div className="card-image-container">
              <div className="circular-image">
              {service.instructors.profile_picture ? (
                 <Card.Img
                  variant="top"
                  src={`http://localhost:8000/storage/${service.instructors.profile_picture}`}
                  className="card-image"
                  />
              ) : (
                  <Card.Img
                    variant="top"
                    src={noImage}
                    className="card-image"
                  />
              )}
              </div>
            </div>
            <Card.Body className="d-flex flex-column">
              <div>
                <Card.Title className="text-center">{service.instructors.first_name} {service.instructors.last_name}</Card.Title>
                <div><b>Category: </b>{service.categories.name}</div>
                <div><b>Subject: </b>{service.subjects.name}</div>
                <div><b>Price per 1h: </b>{service.price}€</div>
              </div>
              <Card.Text>
                {service.description}
              </Card.Text>
              <div className="mt-auto">
                <div className="d-flex justify-content-between align-items-center">
                <Link to={`/view/${service.id}`} className="btn btn-primary">
                  View
                </Link>
                  <div className="rating">{renderRatingStars(service.instructors.avg_rating)}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
          ))}  

        </div>
      </div>
    );
}

export default MainPanel;