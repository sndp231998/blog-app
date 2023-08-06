import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";
import { searchPost } from "../services/post-service";
import "./navbar.css";

const CustomNavbar = () => {
    const userContextData = useContext(userContext)
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)
    const [keyword, setKeyword] = useState('')
    const [searchResult, setSearchResult] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        setLogin(isLoggedIn())
        setUser(getCurrentUserDetail())

    }, [login])



    const handleChange = async (e) => {
        // setting the keyword
        setKeyword(e.target.value);

        // fetch the blogs as per the keyword
        if (keyword) {

            let result = await searchPost(keyword);
            if(Array.isArray(result) && result.length > 0) {
                setSearchResult([...result])
            }
        }
    }

    const logout = () => {
        doLogout(() => {
            //logged out
            setLogin(false)
            userContextData.setUser({
                data: null,
                login: false
            })

            navigate("/")
        })
    }

    useEffect(() => {
    
    let lskdata = JSON.parse(localStorage.getItem("data"))

    if (lskdata) {
        if(lskdata.user.roles.length > 0) {

            setIsAdmin(lskdata.user.roles[0].id == 501 ? true : false)

        }
        // if(lskdata.user.roles[0] === 501) isAdmin = true;

    }
    }, [])
    
    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="md"
                fixed=""
                className="px-5"
            >
                <NavbarBrand tag={ReactLink} to="/">
                    MyBlogs
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >

                        <NavItem>
                            <NavLink tag={ReactLink} to="/" >
                                New Feed
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about" >
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/services" >
                                Services
                            </NavLink>
                        </NavItem>

                        {isAdmin && <NavItem>
                                                    <NavLink tag={ReactLink} to="/admin" >
                                                        Admin
                                                    </NavLink>
                                                </NavItem>}



                        <UncontrolledDropdown
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                            >
                                More
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={ReactLink} to="/services">
                                    Contact Us
                                </DropdownItem>
                                <DropdownItem>
                                    Facebook
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Youtube
                                </DropdownItem>
                                <DropdownItem>
                                    Instagram
                                </DropdownItem>
                                <DropdownItem>
                                    LinkedIn
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    {/* Search */}
                    <Nav className="navbar-parent">
                        <input type="text" value={keyword} onChange={handleChange} placeholder="Search" />
                        <div className="search-modal">
                {searchResult.length > 0 && searchResult.map((item,id) => {
                            return <NavLink href={'/posts/'+item.postId} dangerouslySetInnerHTML={{ __html: item.title }} key={item.postId}></NavLink>
                        })}
                </div>
                    </Nav>

                    <Nav navbar>

                        {
                            login && (

                                <>


                                    <NavItem>
                                        <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`} >
                                            Profile Info
                                        </NavLink>
                                        
                                    </NavItem>

                                    
                                    {/* <NavItem>
                                        <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`} >
                                            Profile Info
                                        </NavLink>
                                        
                                    </NavItem> */}

                                

                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard" >
                                            {user.email}
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink onClick={logout} >
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>



                            )
                        }

                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login" >
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup" >
                                            Signup
                                        </NavLink>
                                    </NavItem>


                                </>
                            )
                        }

                    </Nav>





                </Collapse>
            </Navbar>
                
        </div>

    )
}

export default CustomNavbar;