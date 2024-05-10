import { LuUserCircle } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "./AuthProvider";
import { Tooltip } from 'react-tooltip';
import ThemeBtn from "./ThemeBtn";

const NavBar = () => {
    const {user, logOutUser, loading} = useContext(AuthContext);
    const handleLogOut = () => {
        logOutUser()
        .then(res => console.log(res))
        .catch(error => console.error(error));
    };
    return (
        <div className="navbar bg-base-100 px-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 dark:bg-gray-700 rounded-box w-52">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/crafts">Crafts</NavLink></li>
                        <li>
                            <a>Categories</a>
                            <ul className="p-2">
                                <li><NavLink to="crafts-by-category/Clay Sculpture">Clay Sculpture</NavLink></li>
                                <li><NavLink to="crafts-by-category/Stone Sculpture">Stone Sculpture</NavLink></li>
                                <li><NavLink to="crafts-by-category/Beaded Sculpture">Beaded Sculpture</NavLink></li>
                                <li><NavLink to="crafts-by-category/Metal Sculpture">Metal Sculpture</NavLink></li>
                                <li><NavLink to="crafts-by-category/Food carving">Food carving</NavLink></li>
                                <li><NavLink to="crafts-by-category/Natural Material Sculpture">Natural Material Sculpture</NavLink></li>
                            </ul>
                        </li>
                        <li><NavLink to="/add-craft">Add Craft</NavLink></li>
                        <li><NavLink to="/my-crafts">My Crafts</NavLink></li>
                    </ul>
                </div>
                <h2 className="text-xl font-bold">Artifex</h2>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/crafts">Crafts</NavLink></li>
                    <li>
                        <details>
                            <summary>Categories</summary>
                            <ul className="p-2 z-10 dark:bg-gray-700">
                                <li><NavLink to="crafts-by-category/Clay Sculpture">Clay Sculpture</NavLink></li>
                                <li><NavLink to="crafts-by-category/Stone Sculpture">Stone Sculpture</NavLink></li>
                                <li><NavLink to="crafts-by-category/Beaded Sculpture">Beaded Sculpture</NavLink></li>
                                <li><NavLink to="crafts-by-category/Metal Sculpture">Metal Sculpture</NavLink></li>
                                <li><NavLink to="crafts-by-category/Food carving">Food carving</NavLink></li>
                                <li><NavLink to="crafts-by-category/Natural Material Sculpture">Natural Material Sculpture</NavLink></li>
                            </ul>
                        </details>
                    </li>
                    <li><NavLink to="/add-craft">Add Craft</NavLink></li>
                    <li><NavLink to="/my-crafts">My Crafts</NavLink></li>
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
                        <button onClick={handleLogOut} className="btn dark:bg-transparent dark:text-white">Log Out</button>
                        :
                        <Link to='/login'><button className="btn dark:bg-transparent dark:text-white">Log In</button></Link>)
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