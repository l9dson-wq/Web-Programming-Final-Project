## Login, Share post React app

This is an app created with:

 * Fronted --> **React JS, Tailwinds CSS**.
 * Backend --> **Firebase**.
 
* When we upload a React project to GitHub, git doesn't load the node modules folder, so when you download the repository you have to run the following command inside the folder of my repo: 

` npm i ` or ` npm install `

* if you are in linux and your're using another package manager, for  example yarn, you need to use the following command in the same folder of my repo:

` yarn install `, IDK if you can use just ` yarn i `, look that in google for yourself.

***

## Versions I used

| Names         | Version       | 
| ------------- |:-------------:| 
| Npm           | 8.7.0         | 
| Node JS       | 17.9.0        |
| Firebase      | 9             |

* if you're using linux and don't know how to update npm, can take a look in this fantastic repo https://github.com/nvm-sh/nvm  <---- ** I always install NodeJS and Npm with this repo guide ** and never had problems.

***

# Be carefull, first you need to initialize your own firebase and firebase tokens, Here will be all that you need to do step by step.

1. Go to https://firebase.google.com/ ( if you're logged in to your google account probably you don't need to sign up )

https://user-images.githubusercontent.com/69158247/163726567-80c38a29-55c7-4f5e-87b6-7062f47ca4d6.mp4

![image](https://user-images.githubusercontent.com/69158247/163726635-6d256790-8521-431c-9021-813bc61a7ccf.png)

| Option | Description |
| ------:| -----------:|
| Firebase config file   | File location --> firebase.js |

# those are important: its has to be `if true` an both cases, firestore and storage 
![image](https://user-images.githubusercontent.com/69158247/163728799-eb318d91-31ee-40c6-9889-57fe7f54a0cb.png)

![image](https://user-images.githubusercontent.com/69158247/163728816-bcdb1057-e3ca-4d3d-bcc5-5ebd1ef71a3a.png)


***

## Some captures of the project
* Principal page.
![image](https://user-images.githubusercontent.com/69158247/163722043-e34f0c68-12d3-4de5-89af-43e0ba34bed9.png)

***

### Tailwind CSS
* i'ts sure you don't will have problems with this but if for some reasons you have problems with this take a look in the Tailwind doc: https://tailwindcss.com/docs/guides/create-react-app

