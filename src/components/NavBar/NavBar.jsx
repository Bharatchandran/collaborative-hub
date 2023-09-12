import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }
const [activeLink, setActiveLink] = useState("")

  return (
//     <nav className='flex justify-center' >
// <div className='w-[50%] flex justify-between'>      
//       <span>Welcome, {user.name}</span>
//       <Link to="/" >CollaborateProjects</Link>
//       <Link to="" onClick={handleLogOut}>Log Out</Link>
//       </div>
//     </nav>


/* <div className='border-1 h-20 flex items-center justify-between text-2xl className="m-10"'>
  <div className="m-10">Logo</div>
  <div onClick={()=> setActiveLink("Project")} className="m-10">
    {activeLink === "Project" ?<Link  to="/" ><h1 className='text-blue-700'>Project</h1></Link>: <Link to="/" >Projects</Link> }</div>
  <div className="m-10"><Link to="" onClick={handleLogOut}>Log Out</Link></div>
</div> */


<Navbar className='h-20'>
<NavbarBrand>
  {/* <AcmeLogo /> */}
  <p className="font-bold text-inherit">ACME</p>
</NavbarBrand>
<NavbarContent className="hidden sm:flex gap-4 " justify="center">
  <NavbarItem>
  <Link className='text-3xl' to="/" >Projects</Link>
  </NavbarItem>
  <NavbarItem isActive>
    <Link className='text-3xl' href="#" aria-current="page">
      Customers
    </Link>
  </NavbarItem>
  <NavbarItem>
    <Link className='text-3xl' color="foreground" href="#">
      Integrations
    </Link>
  </NavbarItem>
</NavbarContent>
<NavbarContent justify="end">
 
  <NavbarItem>
    <Button className=''  as={Link} color="primary" href="#" variant="flat">
    <Link to="" onClick={handleLogOut}>Log Out</Link>
    </Button>
  </NavbarItem>
</NavbarContent>
</Navbar>

  );
}