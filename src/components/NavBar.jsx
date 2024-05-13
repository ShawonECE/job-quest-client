import { LuUserCircle } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "./AuthProvider";
import { Tooltip } from 'react-tooltip';
import logo from '../assets/logo_transparent.png';
import ThemeBtn from "./ThemeBtn";
// import axios from "axios";

const NavBar = () => {
    const {user, logOutUser, loading} = useContext(AuthContext);
    const handleLogOut = () => {
        logOutUser()
        // .then(() => {
        //     axios.post('http://localhost:3000/logout', { withCredentials: true})
        // })
        .catch(error => console.error(error));
    };
    const handleActiveNavLink = ({ isActive }) => {
        return {
            color: isActive ? "#2C3333" : "",
            backgroundColor: isActive ? "#00000000" : "",
            borderRadius: '8px',
            border: isActive ? '1px solid #2C3333' : ""
        };
    };
    return (
        <div className="navbar bg-base-100 p-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 dark:bg-gray-700 rounded-box w-52">
                        <li><NavLink style={handleActiveNavLink} to="/">Home</NavLink></li>
                        <li><NavLink style={handleActiveNavLink} to="/all-jobs">All Jobs</NavLink></li>
                        <li><NavLink style={handleActiveNavLink} to="/applied-jobs">Applied Jobs</NavLink></li>
                        <li><NavLink style={handleActiveNavLink} to="/add-job">Add Job</NavLink></li>
                        <li><NavLink style={handleActiveNavLink} to="/my-jobs">My Jobs</NavLink></li>
                        <li><NavLink style={handleActiveNavLink} to="/blogs">Blogs</NavLink></li>
                    </ul>
                </div>
                <div className="flex gap-2 items-center">
                    <img className="w-5" src={logo} alt="" />
                    <h2 className="text-xl font-bold">JobQuest</h2>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    <li><NavLink style={handleActiveNavLink} to="/">Home</NavLink></li>
                    <li><NavLink style={handleActiveNavLink} to="/all-jobs">All Jobs</NavLink></li>
                    <li><NavLink style={handleActiveNavLink} to="/applied-jobs">Applied Jobs</NavLink></li>
                    <li><NavLink style={handleActiveNavLink} to="/add-job">Add Job</NavLink></li>
                    <li><NavLink style={handleActiveNavLink} to="/my-jobs">My Jobs</NavLink></li>
                    <li><NavLink style={handleActiveNavLink} to="/blogs">Blogs</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <ThemeBtn></ThemeBtn>
                {
                    !loading && (user?.photoURL ?
                        <div className="avatar" data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName} >
                            <div className="w-8 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>
                        :
                        <LuUserCircle className="text-[32px]" />)
                }
                <Tooltip id="my-tooltip" place="left-start" />
                {
                    loading &&
                    <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                }
                {
                    !loading && (user ?
                        <button onClick={handleLogOut} className="btn bg-[#E7F6F2] dark:bg-transparent dark:text-white">Log Out</button>
                        :
                        <Link to='/login'><button className="btn bg-[#E7F6F2] text-[#2C3333] dark:bg-transparent dark:text-white">Log In</button></Link>)
                }
                {
                    loading &&
                    <div className="skeleton w-24 h-12"></div>
                }
            </div>
        </div>
    );
};

export default NavBar;