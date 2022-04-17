import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import Image from '../images/image4.jpg';

const Singin = () => {


  const { signIn } = UserAuth(); 

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const navigate = useNavigate();

  //Manipulating DOM
  const errorMessage = () => {
    return (
      <div className="text-center py-4 lg:px-4">
        <div className="p-2 bg-pink-900	 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-pink-600 uppercase px-2 py-1 text-xs font-bold mr-3">Error!</span>
          <span className="font-semibold mr-2 text-left flex-auto">{error}</span>
        </div>
      </div>
    );
  }; 
  //================================

  const handleSubmit =  async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/account');
    } catch (e) {

      if ( e.code == "auth/missing-email"){ setError("!");} 
      else if ( e.code == "auth/internal-error" ) { setError("!") }
      else if (e.code == "auth/user-not-found") { setError("no user") }
      else if (e.code == "auth/wrong-password") { setError("Wrong password") }
    } 
  }

  return (
    <div className=''>

        <div className="">
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <Link to="/"className="flex items-center">
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">NicoX</span>
                    </Link>
                    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium justify-center items-center">
                        <li>
                            <Link to="/singup" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sign Up</Link>
                        </li>
                        <li className="border-black border p-1 rounded-md">
                            <Link to="/login" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Log in</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

      <div className="flex justify-between max-w-[900px] justify-items-center	 mx-auto my-16 shadow-2xl bg-white rounded items-center	">

          <div>
            <img class="object-cover" src={Image} className="max-w-[500px]" />
          </div>

          <form onSubmit={handleSubmit} className="p-10 m-5" >

            <div>
              <h1 className='text-6xl font-bold py-2'>NicoX</h1>
              <h2 className='text-2xl font-bold py-2'>Sign Up</h2>
              <p className='py-2'>Don't have an account yet? <Link to="/singup" className='underline'>Sign Up.</Link> </p>
            </div>

            <div className=''>
              <label htmlFor="" className='py-2 font-medium'>Email Addres</label>
              <input onChange={(e)=>{setEmail(e.target.value)}} type="email" className='border p-3' placeholder="Email"  />
            </div>
            <div className=''>
              <label htmlFor="" className='py-2 font-medium'>Password</label>
              <input  onChange={(e) => {setPassword(e.target.value)}} type="password" className='border p-3' placeholder="******" />
            </div>

            <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white rounded-full mt-5 font-bold'>Sign Up</button>

          </form>

          <div id='errorConteiner'>
            {error && errorMessage()}
        </div>
      </div>

    </div>
  )
}

export default Singin