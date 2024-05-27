import React from 'react'

import { Link, NavLink, Outlet } from 'react-router-dom'

import "./Nav.scss"
import { CgExternal } from "react-icons/cg";
import { Navbar } from 'react-bootstrap'
import { LuLanguages } from 'react-icons/lu';
function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg h-75">
                <div className="container-fluid navbar-container" >
                    <Navbar.Brand>
                        <Link className='logo-link' to='/'>
                            <img
                                alt=""
                                src="/src/assets/react.svg"
                                width="30"
                                height="30"
                                className="brand-logo d-inline-block align-top"
                            />{' '}
                            React
                        </Link>
                    </Navbar.Brand>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse">
                        <div className="navbar">
                            <NavLink className="nav-link me-3 ms-5" aria-current="page" to="/docs">Docs</NavLink>
                            <NavLink className="nav-link me-3" to="/tutorial">Tutorial</NavLink>
                            <NavLink className="nav-link me-3" to="/blog">Blog</NavLink>
                            <NavLink className="nav-link me-3" to="/community">Community</NavLink>
                            <NavLink className="nav-link me-3" to="/react-hook-form">Form & Yup</NavLink>
                            <NavLink className="nav-link me-3" to="/register">Register</NavLink>
                            <NavLink className="nav-link" to="/user-info">User info</NavLink>
                        </div>
                    </div>
                    <form className="d-flex align-items-center" role="search">
                        <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                        <div className='link d-flex flex-rows align-items-center'>
                            <NavLink className="vers me-3" to="#">v18.2.0</NavLink>
                            <NavLink className="lang me-3 d-flex align-items-center" to="#"><LuLanguages className='me-2 fs-5' />Languages</NavLink>
                            <NavLink className="git" to="https://github.com/facebook/react/" target='_blank'>Github <CgExternal /></NavLink>
                        </div>
                    </form>
                </div>
            </nav >
            <Outlet />
        </div >
    )
}

export default Nav