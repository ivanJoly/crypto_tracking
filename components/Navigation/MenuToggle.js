import React from "react"
import { Box, CloseButton, MenuButton, IconButton, HamburgerIcon } from "@chakra-ui/react"
 
const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseButton /> : 
      <MenuButton as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"/>}
    </Box>
  )
}

export default MenuToggle;