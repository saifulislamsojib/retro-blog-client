import { BriefcaseIcon, HomeIcon, PlusCircleIcon, ShieldCheckIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({url, handleToggler, navbarToggler}) => {

    const sidebarData = [
        {
            name: 'Manage Blog',
            path: url,
            Icon: BriefcaseIcon
        },
        {
            name: 'Add Blog',
            path: `${url}/addBlog`,
            Icon: PlusCircleIcon
        },
        {
            name: 'Manage Admin',
            path: `${url}/manageAdmin`,
            Icon: ShieldCheckIcon
        },
        {
            name: 'Home',
            path: '/',
            Icon: HomeIcon
        }
    ]

    return (
        <div className={`bg-blue-700 min-h-screen px-3 pt-5 fixed sidebar z-50 duration-300 ${navbarToggler?"left-0":"-left-full lg:left-0"}`}>
            <div className="flex items-center justify-between">
                <h1 className="text-white font-medium text-2xl">Dashboard</h1>
                <button onClick={handleToggler} className="navbar-toggler lg:hidden focus:ring-2 p-1 rounded-full focus:outline-none mb-1">
                    <XIcon className="block text-white h-6 w-6" />
                </button>
            </div>
            <ul className="mt-5">
                {
                    sidebarData.map(({name, path, Icon}) => (
                        <li key={path} className='mt-2'>
                            <NavLink
                                activeClassName="bg-blue-900 sidebar-active"
                                className="p-3 rounded-md text-gray-100 text-lg flex items-center"
                                exact={true}
                                to={path}
                                onClick={handleToggler}
                            >
                                <Icon className="w-6 h-6 mr-2" />
                                {name}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Sidebar;