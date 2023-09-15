import { useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Services() {
    const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await api.get('/favorites', null, {
            headers: {
                Authorization: `Bearer ${authToken}`,
              },
        });
        setFavoritesData(response.data.favorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }

    fetchFavorites();
  }, []);
    
  const handleRemove = async (instructorId) => {
    try {
      const response = await api.delete(`/removeFavorite/${instructorId}`);
      setFavoritesData(favoritesData.filter(favorite => favorite.instructor.id !== instructorId));
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
    <>
      <div className="bg-light p-4 custom-services">
        <h4 className='text-center custom-color'>My Favorites</h4>
        <hr />
          <div className="table-responsive mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favoritesData.map(favorite => (
              <tr key={favorite.id}>
                <td>{favorite.id}</td>
                <td>{favorite.instructor.first_name}</td>
                <td>{favorite.instructor.last_name}</td>
                <td>{favorite.instructor.city}</td>
                <td>{favorite.instructor.email}</td>
                <td>{favorite.instructor.phone}</td>
                <td className='text-center'>
                  <button onClick={() => handleRemove(favorite.instructor.id)} className="btn btn-danger ms-2">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

    </>
    );
}

export default Services;