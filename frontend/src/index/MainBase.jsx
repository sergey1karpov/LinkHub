import { Outlet } from "react-router-dom"
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#08090a'
}

export default function MainBase() {
    return (
        <>
            <Header />

            <div style={styles}>
                <Outlet />
            </div>

            <Footer />
        </>
    )
}