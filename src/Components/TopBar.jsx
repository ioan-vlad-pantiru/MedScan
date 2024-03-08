import CustomNavLink from "./CustomNavLink";
import "./TopBar.css"

function TopBar({title}) {
    return (
        <div className="topbar">
            <div className="topbar-content">
                <h1 className="c-black size-xxl">{title}</h1>
                <div className="user-info">
                    <h4> <span className="c-primary">Hello, Dr.</span> Andrei Popa</h4>
                    <img src="user.svg" alt="profile photo"/>
                </div>
            </div>
            <div className="divider-horizontal"></div>
        </div>
    )
}

export default TopBar