import { Outlet } from "react-router-dom"
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

//Стили для базового блока
const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#08090a'
}

//Базовая страница для лендинга сайта
export default function MainBase() {
    return (
        <>
            {/* Содержимое хедера */}
            <Header />

            <div style={styles}>
                {/* Отображение контента */}
                <Outlet />
            </div>

            {/* Содержимое футера */}
            <Footer />
        </>
    )
}