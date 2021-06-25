import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Fragment, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { context } from '../../../App';
import { userSignOut } from '../../Login/authManager';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

  const { loggedInUser, setLoggedInUser } = useContext(context);

  const { email, photo } = loggedInUser;

  const handleSignOut = () => {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        userSignOut()
        .then(signOut => {
          if (signOut) {
            setLoggedInUser({});
            swal("Logged Out!", "Logged Out successfully!", "success");
          }
        })
      }
    });
  }

  return (
    <Disclosure as="nav" className="bg-blue-600 sticky top-0">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                   <XIcon className="block text-white h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block text-white h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className='flex items-center'>
                  <Link to="/" className="text-gray-200 text-xl">RETRO BLOG</Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        exact={true}
                        activeClassName='bg-blue-800'
                        key={item.name}
                        to={item.path}
                        className={classNames(
                          'text-gray-300 hover:bg-blue-700',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        {email?
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={photo||"https://w7.pngwing.com/pngs/931/209/png-transparent-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black-silhouette.png"}
                              alt=""
                            />
                          </Menu.Button>
                          :<NavLink
                            exact={true}
                            activeClassName='bg-blue-800'
                            to='/login'
                            className={classNames(
                              'text-gray-300 hover:bg-blue-700',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          >
                            Login
                          </NavLink>
                        }
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <>
                              <Link
                                to="/dashboard"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Your Profile
                              </Link>
                              <span
                              onClick={handleSignOut}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                )}
                              >
                                Sign out
                              </span>
                              </>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  exact={true}
                  key={item.name}
                  to={item.path}
                  activeClassName='bg-blue-800'
                  className={classNames(
                    'text-gray-300 hover:bg-blue-700',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar;