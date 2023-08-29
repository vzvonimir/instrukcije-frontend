import Menu from '../components/Menu';
import SidePanel from '../components/SidePanel';
import MainPanel from '../components/MainPanel';
import { useLocation } from 'react-router-dom';

function Home(){
  const location = useLocation();
  const { user } = location.state;

    return (
        <>
        <Menu user={user} />
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SidePanel />
          </div>
          <div className="col-md-9">
            <MainPanel />
          </div>
        </div>
        </div>
        </>
    );
}

export default Home;