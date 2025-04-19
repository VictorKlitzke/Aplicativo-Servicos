import { Outlet } from "react-router-dom";
import SidebarComponents from "../components/sidebar_components";
import HeaderComponents from "../components/header_components";

export default function Layout() {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <div style={{ width: "250px", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1030 }}>
                <SidebarComponents />
            </div>
            <div className="content-area ms-250 w-100 d-flex flex-column bg-light" style={{ marginLeft: "250px" }}>
                <HeaderComponents />
                <div
                    className="main-content p-4"
                    style={{
                        backgroundColor: "#f8f9fa",
                        minHeight: "calc(100vh - 70px)",
                        overflowY: "auto",
                    }}
                >
                    <div className="rounded shadow-sm bg-white p-4" >
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
