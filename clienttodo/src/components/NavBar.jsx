import React from 'react';
import { NavLink } from "react-router-dom"

const NavBar = () =>{

const links =[{

    id:1,
    path:"/",
    text:"Home"
},
{
    id:2,
    path:"/mylist",
    text: "My List"
}]

    return( <nav className="navBar">
        <ul>
            {links.map(link =>{
                return <li key={link.id}>
                    <NavLink to={link.path} activeClassName="active-link" exact>{link.text}</NavLink></li>
            })}
        </ul>
    </nav>)
}

export default NavBar