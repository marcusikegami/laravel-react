import { useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    // the useStateContext function is triggered at the beginning of the render process and will quickly redirect an unauthenticated user to the login page
    const { user, token } = useStateContext();

    if(!token) {
        return <Navigate to="/login" />
    }

    const logout = (event) => {
        event.preventDefault();
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/users">Users</Link>
                <Link to ="/dashboard">Dashboard</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" className="btn-logout" onClick={logout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet /> {/* Outlet Components render the child components */}
                </main>
            </div>
        </div>
    )
};