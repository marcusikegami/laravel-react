import { useEffect, useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
    // the useStateContext function is triggered at the beginning of the render process and will quickly redirect an unauthenticated user to the login page
    const { user, token, setUser, setToken } = useStateContext();

    if(!token) {
        return <Navigate to="/login" />
    }

    const logout = (event) => {
        event.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            });
    }
    // upon initial login, user details are displayed correctly on the header, however, after reload, the user details are not displayed
    // the useEffect function is triggered after each render process is finished. This will make certain the user information is displayed on the header
    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data);
            })
    }, []);

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
                        {user.name} &nbsp; &nbsp;
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