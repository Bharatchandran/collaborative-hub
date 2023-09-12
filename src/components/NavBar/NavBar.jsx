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
      <div className='w-full h-20 bg-[#0d131b]  flex justify-between items-center'>
        <div className='ml-10 text-4xl'>Prototype👨‍💻</div>
        <div>
          <Link className='m-4 text-2xl font-bold text-' to="/" >Projects</Link> 
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