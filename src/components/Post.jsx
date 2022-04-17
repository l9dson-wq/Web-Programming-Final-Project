import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState} from 'react';
import { storage } from '../firebase';
//Codigo para manipular la base de datos JSON
import {collection, getDocs, addDoc, query, orderBy} from 'firebase/firestore';
import {db} from '../firebase';
//importaciones para saber si el usuario esta logeado
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Image from '../Ilustrations/Ilustration4.png';
import SecondImage from '../Ilustrations/Ilustration9.png';

function Post() {

    /* Solo si estoy logeado user recibira su valor. */
    const {user, logout} = UserAuth();

    //utilizare esto para mostrar la foto de perfil del usuario logeado en la pagina de post
    const [profile, setProfile] = useState();
    const [nameEmail, setNameEmail] = useState();
    const [pfp, setPfp] = useState();

    const [progress, setProgress] = useState(0);
    const [postUrl, setPostUrl] = useState('');
    const [descriptionPost, setDescriptionPost] = useState('');
    const [error, setError] = useState();
    //variable de estado para las publicaciones
    const [publicaciones, setPublicaciones] = useState( [] );
    //variable para saber si el usuario esta logeado

    let date = new Date();
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = (file) => {
        if (!file) return;

        const storageRef = ref(storage, `/files/${file.name}`);
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
                setPostUrl(url)
            })
        }
        );
    };

    const sendingData = async () => {
        console.log("llegamos hasta aqui");
        try {
            const docRef = await addDoc(collection(db, "Post"), {
                description: descriptionPost, 
                image: postUrl,
                user: nameEmail,
                userPfp: profile,
                timeDate: output,
            });
            console.log("Document written with ID: ", docRef.id);
            window.location.href = window.location.href;
            } catch (e) {
            console.error("Error adding document: ", e.code);
            }
    }

    //referencia a la base de datos
    const postCollection = collection(db, "Post");

    //funcion para mostrar todas las publicaciones
    const getPost = async () => {
        const data = await getDocs(postCollection);
        
        setPublicaciones(
            data.docs.map((doc) => ({...doc.data(), id:doc.id})) 
        );
    }

    // console.log(publicaciones.reverse())

    //usando useEffect
    useEffect( () => {
        getPost();
        //verificando que el usuario no este logeado
        //user === null ? console.log("el usuario no esta logeado") : console.log(user)
    }, [])

    const returnPost = () => {
        return (
        publicaciones.map( ( publicacion ) => {
            return (
                <div className="max-w-[650px] h-auto mx-auto shadow-2xl bg-white rounded overflow-auto mt-10 shadow-xl border border-slate">
                    <div className="w-full flex justify-between p-3">
                    <div className="flex">
                        <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                        <img src={publicacion.userPfp} alt="profilepic" />
                        </div>
                        <span className="pt-1 ml-2 font-bold text-lg">{publicacion.user}</span>
                    </div>
                    <span className="px-2 hover:bg-gray-300 cursor-pointer rounded"><i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>
                    </div>
                    <img className="w-full bg-cover h-auto" src={publicacion.image && publicacion.image} />
                    <div className="px-3 pb-2">
                    <div className="pt-1">
                        <div className="mb-2 text-base">
                        <span className="font-extrabold mr-2 text-lg">{publicacion.user}</span> {publicacion.description}
                        </div>
                        <p className="font-light text-sm">{output}</p>
                    </div>
                    </div>
                </div>
            )
        })
        )
    }

    //Funcion que mostrara las opciones para poder publicar un post si el usuario esta logeado
    const UserLogged = () => {
        if (user === null){
            return;
        }else{
            return (
                <div className="flex flex-col items-center"> 
                    <div className='max-w-[650px] flex bg-slate-100 m-5 border-black p-5 grow flex-col'>
                        <div className='m-5 border'>
                            <div className="max-w-lg shadow-md">
                                <form action="" className="w-full p-4">
                                    <div className="mb-2">
                                    <label for="comment" className="text-lg text-gray-600">Add a description</label>
                                    <textarea className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                                        name="comment" placeholder="" onChange={(e)=>{setDescriptionPost(e.target.value)}}></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className='max-w-auto flex flex-col items-center content-center justify-items-center'>
                            <form onSubmit={formHandler}>
                            <div class="flex justify-center">
                                <div class="mb-3 w-96">
                                    <label for="formFile" class="form-label inline-block mb-2 text-gray-700"></label>
                                    <input class="form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
                                </div>
                                </div>
                                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 h-auto'>Upload image</button>
                                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 h-auto' onClick={sendingData}>Share post</button>
                                {/* {returnUploadPostButton()} */}
                                <h2 className='text-solid-400 text-base font-light m-5'>If you only want to publish text, do not upload an image.</h2>
                            </form>
                            {/* <h3>Uploaded {progress} %</h3> */}
                        </div>
                    </div>    

                    <div className='border-stone-900 '>
                        <img src={SecondImage} className="h-96" />
                    </div>
                    
                </div>
            )
        }
    }

    // const returnUploadPostButton = () => {
    //     if (postUrl === '') {
    //         return;
    //     }else {
    //         return(
    //             <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 h-auto' onClick={sendingData}>Upload Post</button>
    //         )
    //     }
    // }

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
          }
        }
      }

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
                <li className="border-black border p-1 rounded-md">
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

    dataView();

  return (
    <div className="">

        <div className="">
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 shadow-black shadow-2x1">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <Link to="/"className="flex items-center">
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">NicoX</span>
                    </Link>
                    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium justify-center items-center">
                            {ReturnAccountButton()}
                            {ReturnSignupButton()}
                            {ReturnLoginButton()}
                            {returnPfp()}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        
        <div className="flex flex-row">
            <div className="w-auto border-red-600 border-stone-900 max-h-max flex">
                <div className='flex flex-col justify-between items-center'>
                    <div className=" text-center"> 
                        <h1 className="text-white text-6xl  m-5 font-extrabold">Welcome to the post section</h1>
                        <h2 className="text-green-400 text-3xl m-5 font-bold">Only logged in users can post!</h2>

                        <h2 className="text-blue-300 text-2xl font-light m-5">Use your mouse scroll to see the above post</h2>
                        <h2 className="text-violet-400 text-2xl font-light m-5">You need to go to the account section to logout</h2>
                    </div>

                    <div className='border-stone-900 '>
                        <img src={Image} className="w-100" />
                    </div>
                </div>
            </div>

            <div className="w-200 h-200 bg-slate-100 overflow-y-auto m-auto scrollbar-hide">
                {returnPost()}
            </div>

            <div className=' flex flex-col items-center'>
                {UserLogged()}
            </div> 


        </div>

    </div>
  )
}

export default Post