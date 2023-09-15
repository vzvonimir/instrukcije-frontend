import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/sidepanel.css';
import { FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import api from '../api';

function SidePanel({ onSearch, onCategoryFilter  }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onCategoryFilter(selectedCategories);
  };

    return (
      <div className="custom-sidepanel">
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleChange}
            />
            <Button variant="success" type="submit"><FiSearch size={18} /></Button>
          </Form>
          <hr />
          <p className="fw-bold mb-2">Filter by Category:</p>
          <Form onSubmit={handleFilterSubmit}>
          {categories.map((category) => (
            <Form.Check
              key={category.id}
              className="mb-2"
              style={{ fontSize: '17px' }}
              type="checkbox"
              id={`category-${category.id}`}
              label={category.name}
              onChange={() => handleCategoryChange(category.id)}
            />
          ))}
          <Button
            variant="success"
            type="submit"
            className="mt-2"
          >
             Filter
          </Button> 
          </Form>
      </div>
    );
}

export default SidePanel;