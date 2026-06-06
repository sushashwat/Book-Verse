import { Outlet } from "react-router-dom";
import Header from './Header'
 function Layout (){
    return (
        <div className="app-wrapper">
            <Header/>
            <main className="main-content">
                <Outlet/>
            </main>

            <footer className="footer">

                <p> © 2026 BookVerse - Your Personal Online Library</p>
            </footer>
        </div>
    )
 }
export default Layout;
