import NavBar from "../Navigation/Navigation"

const Layout = ({children}) => {
  return(
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout;