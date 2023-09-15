import Menu from '../components/Menu';
import SidePanel from '../components/SidePanel';
import MainPanel from '../components/MainPanel';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Home(){
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (categories) => {
    setSelectedCategories(categories);
  };

  const location = useLocation();
  const { user } = location.state || {};

    return (
        <>
        <Menu user={user} />
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SidePanel onSearch={handleSearch} onCategoryFilter={handleCategoryFilter}/>
          </div>
          <div className="col-md-9">
            <MainPanel searchQuery={searchQuery} selectedCategories={selectedCategories}/>
          </div>
        </div>
        </div>
        </>
    );
}

export default Home;