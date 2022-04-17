import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
//referencias para la base de datos
import {collection, getDocs, getDoc, deleteDoc, addDoc} from 'firebase/firestore';
import {db} from '../firebase'; 
import { async } from '@firebase/util';
//referencias para subir archivos
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';

const Singup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Variables de estado para los datos extras del usuario
  const [localUser, setLocalUser] = useState();
  const [userName, setUserName] = useState(); 
  const [userLastName, setUserLastName] = useState(); 
  const [profile, setProfile] = useState();

  const navigate = useNavigate();
  
  const {createUser} = UserAuth();

    //Manipulating DOM
    const errorMessage = () => {
      return (
        <div className="mt-5 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
          <p className="font-bold">Ocurrio un error!</p>
          <p>{error}</p>
        </div>
      );
    }; 
    //=================================

    const knowUser = async (e) => {
      try {
        await createUser(email, password);
        const docRef = await addDoc(collection(db, "Users"), {
          user: localUser,
          name: userName,
          lastName: userLastName,
          email: email,
          profile: profile,
        });
        await navigate('/account');
        // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
          if(e.code == "auth/invalid-email"){setError("Please check the email fill before to continue")}
          else if(e.code == "auth/internal-error"){setError("An error has occurred")}
          else if(e.code == "auth/weak-password"){setError("Password should be at least 6 characters")}
          else if(e.code == "auth/email-already-in-use"){setError("This email is already in use")}
        }
  };

  const validationUser = async (e) => {
    const querySnapshot = await getDocs(collection(db, "Users")); //obtengo los datos de la base de datos

    const avaibleNamesArray = []; //creo un arreglo

    querySnapshot.forEach((doc) => {
      avaibleNamesArray.push(doc.data().user); //almaceno todos los nombres en mi arreglo
      });
    const avaibleName2 = avaibleNamesArray.indexOf(localUser); //Hago un indexOf para saber si name se encuentre en el arreglo
    
    if ( avaibleName2 !== -1) {
      console.log("usuario no dispoible");
      setError("Usuario no disponible");
    } else{
      console.log("usuario disponible");
      knowUser(); //si el usuario esta disponiblo podremos agregar dicho usuario a la base de datos de firebase
    }
  };

  //codigo ---> progress number y subida de archivos
  const [progress, setProgress] = useState(0);

  const formHandler = (e) => {
      e.preventDefault();
      const file = e.target[0].files[0];
      uploadFiles(file); 
  };

  const uploadFiles = (file) => {
      if (!file) return;

      const storageRef = ref(storage, `/pfpUsers/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
          "state_changed", 
          (snapshot) => {
              const prog = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
          setProgress(prog);
      }, (err) => console.log(err),
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            console.log(url)
            setProfile(url);
          })
      }
      );
  };

  const readUser = async (e) => {
    e.preventDefault();
    setError('');
    //si no se ha declado ningun nombre para name entonces lanzare un error
    if ( email !== ''){
      if (password !== '') {
        if (userName !== undefined ){
          if ( userLastName !== undefined ){
            if (localUser !== undefined){
              if ( profile !== undefined) {
                validationUser();
              } else { setError("Please Upload an Image before to continue")}
            } else { setError("Please fill User field");}
          } else{ setError("Please fill Last name field"); }
        } else{ setError("Please fill Name field");}
      }else{ setError("Please fill password field"); } 
    }else{
      setError("Please fill Email field");
    }
  };

  return (
    <div>

        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 mb-10">
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


      <div className='max-w-[700px] h-auto mx-auto p-4 shadow-2xl bg-white rounded overflow-auto'>

        <div>
        <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
        <p className='py-2'>Already have an account? <Link to="/login" className="underline">Sign in.</Link> </p>
        </div>

        <div id='errorConteiner'>
          {error && errorMessage()}
        </div>

        <form onSubmit={readUser}>
          {/* Input para el correo o email */}
          <div className='flex flex-col py-2'>
            <label htmlFor="" className='py-2 font-medium'>Email Addres</label>
            <input type="email" className='border p-3' onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" />
          </div>
          {/* Input para el password */}
          <div className='flex flex-col py-2'>
            <label htmlFor="" className='py-2 font-medium'>Password</label>
            <input type="password" className='border p-3' onChange={(e) => {setPassword(e.target.value)}} placeholder="******" />
          </div>
          {/* Input para los datos extras */}
          <div className="flex flex-col py-2">
            <label htmlFor="" className='py-2 font-medium'>Name</label>
            <input type="text" className='border p-3' placeholder="Name" onChange={(e) => {setUserName(e.target.value)}} />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="" className='py-2 font-medium'>Last name</label>
            <input type="text" className='border p-3' placeholder="Last name" onChange={(e) => {setUserLastName(e.target.value)}}/>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="" className='py-2 font-medium'>User</label>
            <input type="text" className='border p-3' placeholder="User"  onChange={(e)=>{setLocalUser(e.target.value)}} />
          </div>

          <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white rounded-full'>Sign Up</button>
        </form>

        <div className="flex flex-row items-center py-2 mt-5 mb-5 grow">
            <div className='flex items-center box-border justify-center flex-row max-w-[700px] bg-white p-4 rounded grow' >
              <h3 className='mr-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>Uploaded {progress} %</h3>
              <form onSubmit={formHandler}>
                  <input type="file" className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700' />
                  <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Upload</button>
              </form>
            </div>
          </div>

      </div>

      {/* <p className="text-green-400	">a</p> */}
    </div>
  )
}

export default Singup

//---->DOCUMENTACION IMPORTANTE PARA MI<-----
//Con la etiqueta Link (Con mayusculas) puedo navegar hacia otras rutas || esto es de React-router-dom y 
//por eso tenemos que importarlo.