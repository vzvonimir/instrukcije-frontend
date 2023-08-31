import '../css/usersidepanel.css';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserSidePanel({user}) {
    const location = useLocation();

    return (
      <div className="bg-light p-4 custom-usersidepanel">
        <h4 className='text-center'>USER PANEL</h4>
        <hr />
        <div>
        <Link
          to="/profile"
          className={`link-hover-underline ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          User Data
        </Link>
        <NavLink
          to="/profile/edit"
          className={`link-hover-underline ${location.pathname.includes('/edit') ? 'active' : ''}`}
        >
          Edit Profile
        </NavLink>
        <NavLink
          to="/profile/change-password"
          className={`link-hover-underline ${location.pathname.includes('/change-password') ? 'active' : ''}`}
        >
          Change Password
        </NavLink>
        {(user.role === '1' || user.role === '3') && (
          <NavLink
            to="/profile/services"
            className={`link-hover-underline ${location.pathname.includes('/services') ? 'active' : ''}`}
          >
            Services
          </NavLink>
        )}
        </div>
      </div>
    );
}

export default UserSidePanel;