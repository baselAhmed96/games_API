import React, { useEffect, useState } from 'react'
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Register from "../Register/Register";
import Layout from '../Layout/Layout';
import Login from '../Login/Login';
import Home from '../Home/Home';
import All from '../All/All';
import GameDetails from '../GameDetails/GameDetails';
import jwtDecode from 'jwt-decode';
import GamesBy from '../GamesBy/GamesBy';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';


export default function App() {

const [loggedInUser, setloggedInUser] = useState(null)

function getLoginUser(){
    if (localStorage.getItem("tkn") != null) {
        let tkn  = localStorage.getItem("tkn")
        let userData =  jwtDecode( tkn )
        setloggedInUser(userData)
    }
}

function removeUserData(){
    localStorage.removeItem('tkn')
    setloggedInUser(null)
}

useEffect(function(){
    checkReload()
},[] )

function checkReload(){
    if (localStorage.getItem("tkn") != null && loggedInUser == null ) {
        getLoginUser()
    }
}


    let router = createBrowserRouter([
        {path:"" , element:<Layout logOut={removeUserData} crrUser={loggedInUser}/> , children:[
            {path:"" , element:<ProtectedRoute userData={loggedInUser} saveUserData={getLoginUser}> <Home/> </ProtectedRoute>},
            {path:"home" , element:<ProtectedRoute userData={loggedInUser} saveUserData={getLoginUser}> <Home/> </ProtectedRoute>},
            {path:"login" , element:<Login saveUserData={getLoginUser}/>},
            {path:"register" , element:<Register/>},

            {path:"all-games" , element:<ProtectedRoute userData={loggedInUser} saveUserData={getLoginUser}> <All/> </ProtectedRoute>},
            {path:"game-details/:id" , element:<ProtectedRoute userData={loggedInUser} saveUserData={getLoginUser}> <GameDetails/> </ProtectedRoute>},
            {path:"platforms/:platf" , element:<ProtectedRoute userData={loggedInUser} saveUserData={getLoginUser}> <GamesBy/> </ProtectedRoute>},
            {path:"category/:cat" , element:<ProtectedRoute userData={loggedInUser} saveUserData={getLoginUser}> <GamesBy/> </ProtectedRoute>},
            {path:"'sort-by'/:sort" , element:<ProtectedRoute userData={loggedInUser} saveUserData={getLoginUser}> <GamesBy/> </ProtectedRoute>},
            {path:"*" , element:<NotFound/>},
        ]}
    ])


return(
<>
<RouterProvider router={router}/>
</>
)
;
}
