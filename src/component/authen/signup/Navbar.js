import '../signup/Test.css'
import React from "react";
import { red } from "@mui/material/colors";
export default function Navbar() {

    const pages = [
        {
            badge: 'Bài viết',
            navigate: 'following'
        },
        {
            badge: 'Hỏi đáp',
            navigate: 'question'
        },
        {
            badge: 'Thảo luận',
            navigate: 'discusion'
        }
    ];
    return (<div className="container">
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="" style={{ color: "red" }}>BLOG</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {pages.map((item) => {
                            return <li key={item.badge} className="nav-item">
                                <a className="nav-link" href={item.navigate}>{item.badge}</a>
                            </li>
                        })}
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <button type="button" className="btn btn-light" style={{ backgroundColor: "#fff", border: "none" }}>
                        <i className="bi bi-person-fill"></i>
                        <span style={{marginLeft:"5px"}}>Đăng ký/Đăng nhập</span>
                    </button>
                </div>
            </div>
        </nav>
    </div>)
}