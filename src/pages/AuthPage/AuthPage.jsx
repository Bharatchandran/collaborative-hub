import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Button } from '@nextui-org/react';
export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAuth, setShowAuth] = useState(false)
  return (
    <main className='min-h-screen'>
      {/* <nav className='w-full bg-red-800 h-14'>Navbar</nav> */}
      {/* <div className='flex h-[800px]'> */}
      <div className='flex h-screen'>
        <div className='basis-1/2 bg-gray-900 flex flex-col items-center justify-center'>
          <h1 className='text-8xl max-w-3xl'>Want to know what your team mates are working on?</h1>
          <p className='max-w-3xl mt-5 text-2xl'>Streamline collaboration with our GitHub project management app. Log your tasks, avoid overlap, and stay in sync with your team's work. Say goodbye to project conflicts and hello to efficient planning.</p>
          <button onClick={() => setShowAuth(!showAuth)}>Explore</button>
          
        </div>
        <div className='bg-gray-700 basis-1/2 flex justify-center items-center'>
          <div className=''>
        {showAuth? <div > 
          { showSignUp ?
          <SignUpForm setUser={setUser} setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
          :
          <LoginForm setUser={setUser} setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
      }
          
          </div> : "" }
          </div>
        </div>

      </div>
    </main>
    
  );
}
// test test