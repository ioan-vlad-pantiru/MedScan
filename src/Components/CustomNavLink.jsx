import "./CustomNavLink.css"

function CustomNavLink({logo, text, isActive}) {
    return (
        <div className={isActive ? "header-nav-link header-nav-link-active":"header-nav-link"}>
            <img src={logo} alt="Logo" />
            <p className="size-lg">{text}</p>
        </div>
    )
}
export default CustomNavLink