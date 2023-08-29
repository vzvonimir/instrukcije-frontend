import '../css/mainpanel.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import noImage from '../images/noimage.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';

function MainPanel() {
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

    return (
      <div className="bg-light p-4 custom-mainpanel">
        <h4>Services</h4>
        <hr />
        <div className="card-container">
          <Card className="card">
            <div className="card-image-container">
              <div className="circular-image">
                <Card.Img variant="top" src={noImage} className="card-image" />
              </div>
            </div>
            <Card.Body className="d-flex flex-column">
              <div>
                <Card.Title className="text-center">Ivan Ivic</Card.Title>
                <div><b>Category: </b>Srednja Skola</div>
                <div><b>Subject: </b>Fizika</div>
                <div><b>Price per 1h: </b>20€</div>
              </div>
              <Card.Text>
                Some quick exaample.
              </Card.Text>
              <div className="mt-auto">
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="primary">View</Button>
                  <div className="rating">{renderRatingStars(4)}</div>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="card">
            <div className="card-image-container">
              <div className="circular-image">
                <Card.Img variant="top" src={noImage} className="card-image" />
              </div>
            </div>
            <Card.Body className="d-flex flex-column">
              <div>
                <Card.Title className="text-center">Ivan Ivic</Card.Title>
                <div><b>Category: </b>Srednja Skola</div>
                <div><b>Subject: </b>Fizika</div>
                <div><b>Price per 1h: </b>20€</div>
              </div>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <div className="mt-auto">
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="primary">View</Button>
                  <div className="rating">{renderRatingStars(3)}</div>
                </div>
              </div>
            </Card.Body>
          </Card>

        </div>
      </div>
    );
}

export default MainPanel;