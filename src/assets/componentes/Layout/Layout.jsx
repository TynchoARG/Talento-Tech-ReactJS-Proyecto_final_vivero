// Componente Layout
// Envuelve toda la App con el Header, el Main y el Footer.

import { Outlet } from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
    return (
        <div className="layout">
            <Header/>
            <main className="layout-main">
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;