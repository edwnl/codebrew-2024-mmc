import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_ROUTES } from '../utils/pageRoutes';
import Logo from "./Logo";

const NavBar = () => {
    return (
        <nav className="flex flex-col items-center justify-center mx-auto p-4 border-b-2 border-black">
            <Logo size="text-3xl"/>
            {/*For Development only, remove in production.*/}
            <div className="flex pb-1">
                {PAGE_ROUTES.map((route) => (
                    <Link key={route.key} to={route.pathname} className="mx-3">
                        {route.pathname === '/' ? 'Home' : route.key}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
