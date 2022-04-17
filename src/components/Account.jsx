import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
//referencias para la base de datos
import {collection, getDocs, getDoc, deleteDoc, addDoc} from 'firebase/firestore';
import {db} from '../firebase';
//images
import Image from '../Ilustrations/Ilustration4.png'

const Account = () => {

  const {user, logout} = UserAuth();
  const [nameEmail, setNameEmail] = useState();
  const [profile, setProfile] = useState();
  /////////->>>>>>>>>>Bar things
  

  const dataView = async (e) => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    
    const avaibleNamesArray = [];
    const avaibleData = [];

    querySnapshot.forEach((doc) => {
      avaibleNamesArray.push(doc.data()); //almaceno todos los nombres en mi arreglo
      });
    //const avaibleName2 = avaibleNamesArray.indexOf(user.email);
      
    //creo que esto se puede mejorara bastante --- NO DEJARLO ASI --
    for(let i=0; i<avaibleNamesArray.length; i++){
      if (avaibleNamesArray[i].email === user.email) {
        setNameEmail(avaibleNamesArray[i].user);
        setProfile(avaibleNamesArray[i].profile);
        //console.log(nameEmail);
      }
    }
  }

  dataView();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log("You are logged out");
    } catch (e) {
      console.log(e);
    }
  };

  /////---> bar functions
  const returnPfp = () => {
      if ( user === null ) {
          return;
      } else {
          return(
              <li>
                  <div class="relative">
                      <img class="w-10 h-10 rounded-full" src={profile} alt="" />
                      <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
              </li>
          );
      }
  }

  const ReturnAccountButton = () => {
      if (user === null){
          return;
      } else{
          return(
              <li>
                  <Link to="/account" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Account</Link>
              </li>
          );
      } 
  }

  const ReturnLoginButton = () => {
      if (user === null){
          return(
              <li>
                  <Link to="/login" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Log in</Link>
              </li>
          );
      }else{
          return;
      }
  }

  const ReturnSignupButton = () => {
      if (user === null){
          return(
              <li>
                  <Link to="/singup" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sign Up</Link>
              </li>
          );
      }else {
          return;
      }
  }



  return (
    <div className='relative h-screen bg-hero-lonely bg-30 bg-no-repeat bg-right-bottom'>

        <div className="">
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <Link to="/"className="flex items-center">
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">NicoX</span>
                    </Link>
                    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium justify-center items-center">
                            {ReturnAccountButton()}
                            {ReturnLoginButton()}
                            {ReturnSignupButton()}
                            {returnPfp()}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

      <div className="max-w-[500px] mx-auto my-16 p-4 flex flex-col justify-center justify-items-center justify-self-center">
          <h1 className='text-2xl font-bold py-4 text-white'>Account</h1>
          {/*Using the card User*/}

          <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-5">
            <div className="flex flex-col items-center pb-10">
                <img className="mb-3 w-24 h-24 rounded-full shadow-lg mt-10" src={profile}/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{nameEmail}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{user && user.email}</span>
            </div>
        </div>

          {/* sss */}

          <div className='max-w-[380px] flex flex-row justify-between'>
            <button onClick={handleLogout} className='bg-pink-700 bg-green-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full'>Logout</button>
            <button className='bg-pink-700 bg-green-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full'><Link to="/">Section Post</Link></button>
          </div>

          
        </div>

      </div>
  )
}

export default Account