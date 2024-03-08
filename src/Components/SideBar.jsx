import CustomNavLink from "./CustomNavLink";
import "./SideBar.css"

function SideBar() {
    return (
        <div className="sidebar shadow">
            <img src="Logo.svg" alt="Logo" className="logo"/>
            <div className="divider-horizontal"></div>
            <nav>
                <CustomNavLink logo="dashboard.svg" text="Dashboard" isActive={false}/>
                <CustomNavLink logo="patient.svg" text="Patients" isActive={true}/>
                <CustomNavLink logo="chart.svg" text="Statistics" isActive={false}/>
                <CustomNavLink logo="research.svg" text="Research" isActive={false}/>
                <CustomNavLink logo="comment.svg" text="Feedback" isActive={false}/>
            </nav>
        </div>
    )
}

export default SideBar