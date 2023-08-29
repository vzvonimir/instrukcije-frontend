import '../css/userdata.css';

function UserData({user}) {
    return (
    <>
      <div className="bg-light p-4 custom-userdata">
        <h4 className='text-center custom-color'>User data</h4>
        <hr />
        <div className="user-info">
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address || 'N/A'}</p>
            <p><strong>City:</strong> {user.city || 'N/A'}</p>
            <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
            <p><strong>Description:</strong> {user.description || 'N/A'}</p>
        </div>
      </div>
    </>
    );
}

export default UserData;