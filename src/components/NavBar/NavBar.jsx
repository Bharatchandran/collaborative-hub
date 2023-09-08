import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='flex justify-center' >
<div className='w-[50%] flex justify-between'>      
      <span>Welcome, {user.name}</span>
      <Link to="/" >CollaborateProjects</Link>
      <Link to="" onClick={handleLogOut}>Log Out</Link>
      </div>
    </nav>
  );
}