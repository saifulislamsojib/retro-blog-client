import { MenuIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { context } from '../../../App';
import Spinner from '../../../images/spinner-loader.gif';
import AddBlog from '../AddBlog/AddBlog';
import ManageAdmin from '../ManageAdmin/ManageAdmin';
import ManageBlog from '../ManageBlog/ManageBlog';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {

    const { path, url } = useRouteMatch();

    const { isAdmin, setIsAdmin, loggedInUser, adminLoaded, setAdminLoaded } = useContext(context);

    const { email, photo } = loggedInUser;

    const [loading, setLoading] = useState(false);

    const { pathname } = useLocation();

    const history = useHistory();

    const [navbarToggler, setNavbarToggler] = useState(false);

    const handleToggler = () => setNavbarToggler(preValue=> !preValue);

    useEffect(() => {
        setLoading(true);
        (async () => {
            if (!adminLoaded){
                const res = await fetch(`https://retro-blog.herokuapp.com/isAdmin?email=${email}`);
                const data = await res.json();
                setIsAdmin(data);
                setLoading(false);
                setAdminLoaded(true);
            }
            else{
                setLoading(false);
            }
        })()
    }, [email, setIsAdmin, setAdminLoaded, adminLoaded])

    return (
        <div>
           {
               loading?
               <img className="h-64 block mx-auto mt-10 rounded-full" src={Spinner} alt="" />
               :<div className="lg:grid lg:grid-cols-5 lg:gap-4 mx-1">
                   <div>
                        <Sidebar url={url} handleToggler={handleToggler} navbarToggler={navbarToggler} />
                   </div>
                   <div className="col-span-4">
                        <div className="flex items-center justify-between py-2 px-3 rounded-lg sticky top-0 bg-white shadow-lg">
                            <button onClick={handleToggler} className="mt-1 navbar-toggler lg:hidden focus:ring-2 p-1 rounded-full focus:outline-none">
                                <MenuIcon className="block text-blue-500 h-6 w-6" />
                            </button>
                            <h3 className='mt-1 font-medium text-2xl'>
                                {pathname?.split('/')[2]?.split(/(?=[A-Z])/)?.join(' ').toUpperCase()||'MANAGE BLOG'}
                            </h3>
                            <img onClick={()=> history.push('/dashboard')} src={photo || 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png'} className="h-10 w-10 rounded-full" alt="" />
                        </div>
                        <Switch>
                            <Route exact path={path}>
                                <ManageBlog />
                            </Route>
                            <Route path={`${path}/addBlog`}>
                                <AddBlog />
                            </Route>
                            <Route path={`${path}/manageAdmin`}>
                                <ManageAdmin />
                            </Route>
                        </Switch>
                   </div>
               </div>
            //    :<div className="text-center">
            //        <Navbar />
            //        <h2 className="text-red-500 mt-8 text-3xl font-medium">You Are Not Authorized!</h2>
            //    </div>

           }
        </div>
    );
};

export default Dashboard;