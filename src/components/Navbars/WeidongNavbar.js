import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
// import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import axios from "axios";
// reactstrap components
import {
  // Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  // NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
  // Row,Col
} from "reactstrap";
// core components
import WeidingAuth from "components/Navbars/WeidongAuthNavbar.js";
import LoginModal from "components/Modals/Login.js";
import RegisterModal from "components/Modals/Register.js";


function WeidongNavbar(props) { 

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  
  const {user,errcode}=props;
  
  React.useEffect(() => {
	  setLogin(props.setLogin);
  },[props.setLogin]);
  
  React.useEffect(() => {
	  if(props.errcode){setLogin(true)}
  },[props.errcode]);
  
  React.useEffect(() => {

    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    
    const updateNavbarColor = () => {

      if (
        document.documentElement.scrollTop > 140 ||
        document.body.scrollTop > 140
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 100 ||
        document.body.scrollTop < 100
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  
  const isSign = (data) => {console.log(data.pw);
	  axios ({
			url:'/auth/join',
			method:'POST',
			data: {provider:'local',
				   id:data.id,password:data.password,
				   name:'',
				   phone:'',
				   email:'',
				   linkyn:'N'}
		}).then(res=>{
		              alert('가입되었습니다. 로그인 하여 서비스 사용이 가능합니다.');
					  props.history.push("/");
		}
		)
		.catch(err => {
			if(err.response != undefined) {
				if(err.response.status == "300") {
					alert(err.response.data);
				}
			}
		});
  }
  
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null} 
      <Navbar
        className={"fixed-top pt-0"}
        expand="lg"
        id="navbar-main"
        style={{borderBottom:'1px solid #0098e1',backgroundImage:
        "url(" + require("assets/img/bg_header_wrap.gif") + ")"}}
      >
        <Container>
          <div  className="container" style={{top:'0',position:'absolute'}}>
            <WeidingAuth  openLogin={()=>setLogin(!login)}
                          openRegister={()=>setRegister(!register)}
                          
                          onLogOut={(e)=>props.logOut(e)} 
                          setUser={props.setUser}
                          {...props}/>
          </div>
          <div className="navbar-translate" style={{marginTop:'30px'}} >
            <NavbarBrand className="p-0 m-0" id="navbar-brand" to="/weidongIndex" tag={Link} >
              <img alt="logo" src={require("assets/img/logo.gif")}/>
            </NavbarBrand>
            <UncontrolledTooltip placement="bottom" target="navbar-brand">
              WEIDONG FERRY
            </UncontrolledTooltip>
            <button
              className="navbar-toggler"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setBodyClick(true);
                setCollapseOpen(true);
              }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen} style={{paddingTop:'40px'}}>
                        <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2" nav to="/dashboard" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                            DASHBOARD
                          </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2"  nav to="/schedule" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                            SCHEDULE
                          </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2" nav to="/bookinglist" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                          REQUEST
                          </DropdownToggle>
                        </UncontrolledDropdown> 
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2" nav to="/confirmList" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                          CONFIRM
                          </DropdownToggle>
                        </UncontrolledDropdown> 
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2" nav to="/srlist" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                          SR
                          </DropdownToggle>
                        </UncontrolledDropdown>   
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2" nav to="/bllist" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                          BL
                          </DropdownToggle>
                        </UncontrolledDropdown>                   
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle className="mr-2 mt-2" nav to="/vslocation" tag={Link} style={{fontSize:'15px',color:'#444444'}}>
                            LOCATION
                          </DropdownToggle>
                        </UncontrolledDropdown>
                      </Nav>
          </Collapse>
        </Container>
      </Navbar>
      {/*login modal*/}
      <LoginModal 
          openLogin={login}
          setOpenLogin={(e)=>{setLogin(e);if(props.errcode){props.history.push("/");props.clearCode();}}}
          //onSetIsAuthenticated ={(state)=>props.onSetIsAuthenticated(state)}
          //onLogin={(data)=>isLogin(data)} 
          {...props}
        />
      {/*login modal*/}
      <RegisterModal 
          openRegister={register}
          setOpenRegister={(e)=>setRegister(e)}
          openLogin={() => setLogin(true)}
      />
      
    </>
  );
}


export default WeidongNavbar;
