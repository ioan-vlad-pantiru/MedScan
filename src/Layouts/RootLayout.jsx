import { Outlet } from "react-router-dom"
import SideBar from "../Components/SideBar"
import TopBar from "../Components/TopBar"

import Card from "../Components/Card"

function RootLayout() {

    return (
      <div id="root-layout">
        <SideBar/>
        <div className="column">
          <TopBar title={"Patients"}/>
          <Outlet/>
        </div>
      </div>
    )
  }
  
  export default RootLayout
  