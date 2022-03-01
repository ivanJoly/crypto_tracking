import React from "react";
import NavBarContainer from "./NavBarContainer";
import MenuToggle from "./MenuToggle";
import MenuLinks from "./MenuLinks";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <NavBarContainer>
      {/* <MenuToggle toggle={() => toggle()} isOpen={isOpen} /> */}
      <MenuLinks isOpen={isOpen}/>
    </NavBarContainer>
  )
}

export default NavBar;