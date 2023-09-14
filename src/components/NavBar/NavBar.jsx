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
      <div className='w-full h-20 bg-gradient-to-r from-slate-900 to-blue-900  flex justify-between items-center'>
        <div className='ml-10 text-4xl'>CollaborationHub👨‍💻</div>
        <div>
          
          <Link className='m-4 text-2xl font-bold text-' to="/" ><Button variant='ghost' className='text-2xl' color='warning'>Projects</Button></Link> 
        </div>
        <div className='flex items-center justify-center'>
          <h4 className='m-4 text-3xl'>Welcome {user.name}</h4>
          <Link className='m-4 mt-6' to="" onClick={handleLogOut}><span class="material-symbols-outlined">
          logout
          </span></Link>
        </div>
      </div>
  );
}