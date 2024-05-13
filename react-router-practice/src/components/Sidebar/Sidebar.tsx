import React, { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";

import "./Sidebar.scss"
import { NavLink } from 'react-router-dom';
function Sidebar() {
    const [collapse, setOpenCollapse] = useState(false);
    // const { pathname } = useLocation()
    // const match = useMatch(`/${pathname}`)

    // Lấy pathname parent hiện tại của trang

    const handleCollapseToggle = () => {
        setOpenCollapse(!collapse);
    }

    return (
        <div className='sidebar-wrapper'>
            <div className='sidebar-side text-left text-md-start'>
                <div className='ms-4'>
                    <button className='btn-sidebar' type="button" aria-expanded='true' onClick={handleCollapseToggle}>
                        INSTALLATION <IoMdArrowDropdown />
                    </button>
                    <ul className={`nav-collapse ${collapse ? 'collapse' : ''}`} id='collapseSidebar'>
                        <li><NavLink className='title' to={`/docs/getting-started`}><span></span>Getting Started</NavLink></li>
                        <li><NavLink className='title' to="#"><span></span>Add React to a Website</NavLink></li>
                        <li><NavLink className='title' to="#"><span></span>Create a New React App</NavLink></li>
                        <li><NavLink className='title' to="#"><span></span>CDN Links</NavLink></li>
                        <li><NavLink className='title' to="#"><span></span>Release Channels</NavLink></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Sidebar