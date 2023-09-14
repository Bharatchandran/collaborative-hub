import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { Button } from "@nextui-org/react";
export default function LoginForm({ setUser, setShowSignUp, showSignUp }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className=''>
      <div className='bg-black bg-opacity-70 w-[600px] p-20 rounded-xl'>
        <form className='flex flex-col w-full' autoComplete="off" onSubmit={handleSubmit}>
          <label className='text-white font-bold'>Email</label>
          <input className='bg-slate-100' type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label className='text-white font-bold'>Password</label>
          <input className='bg-slate-100' type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <div className=' flex justify-end '>

          <Button className='w-20' color='primary' variant="ghost" type="submit">LOG IN</Button>
          </div>
        </form>
        <div className='flex items-center'>
        <p>Don't have an account?</p>
        <button className='bg-transparent border-none font-bold text-blue-600 ml-2' onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>

        </div>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}