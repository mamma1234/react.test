import React from "react";
// import { Link } from "react-router-dom";
// nodejs library that concatenates strings
// import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
// import Headroom from "headroom.js";
// reactstrap components
// import Select from "react-select";
import {
  Button,
  //   Navbar,
  //   NavItem,
  //   Nav,
//   FormGroup,
  ButtonDropdown,
  DropdownToggle,NavItem,Badge,Card,CardBody,Tooltip
//   DropdownMenu,
//   DropdownItem,
} from "reactstrap";
import axios from "axios";

import { Link } from "react-router-dom";
import Popover from "reactstrap/lib/Popover";
import UncontrolledPopover from "reactstrap/lib/UncontrolledPopover";
import PopoverHeader from "reactstrap/lib/PopoverHeader";
import PopoverBody from "reactstrap/lib/PopoverBody";
import MyProfile from "components/Modals/MyProfile";
import MyMsg from "components/Modals/MyMessage";
import CompanyModal from 'components/Modals/Company.js';
import CompanyMappingAlert from 'components/Modals/MappingAlert.js'
function WeidongAuthNavbar(props) {
  const [user,setUser] = React.useState(null);
  const [company, setCompany] = React.useState(false);
	const [msg,setMsg] = React.useState("0");
	const [section,setSection] = React.useState(false);
	React.useEffect(() => {
		  axios.get("/auth/verify")
          .then(res => {
                   var data = res.data.user;
        	      props.setUser(data);
        	  });
	},[]);
	
	React.useEffect(() => {
     setUser(props.user);
     
		 if(props.user) {
       axios.post("/api/searchMappingUser",{user:props.user}).then(
         res=> {
           if(res.statusText==="OK"){
             
              if(res.data.length !== 0) {
                setSection(false);
              }else {
                setSection(true);
              }
           }
         }
       )
			/* axios.get("/weidong/getUserMeassage")
	         .then(res => {
	                  var data = res.data;
	       	          setMsg(data);
	       	  });*/
		 } else {
			 setMsg("0");
		 }
	},[props.user]);

  React.useEffect(() => {
    if(section) {
      const timeout = setInterval(()=>{
        setSection(false)
      },3000);
      return () => clearInterval(timeout)
    }
    
  },[section]);

  return (
      
    <div className="float-right">
    {!user?<>
        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            onClick={()=>props.openLogin(!props.openLogin)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >로그인
        </Button>
        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            onClick={()=>props.openRegister(!props.openRegister)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >회원가입
        </Button>
        </>:                    
        	<>
		<Button
		className="pt-0 pb-0 mt-0 mb-0 text-dark"
		size="sm"
		onClick={(e)=>props.onLogOut(e)}
		style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
		>로그아웃
		</Button>
		<font style={{fontFamliy:'굴림',fontSize:'11px',color:'#666'}} >{user?user.user_name+'님 환영합니다.':''} </font>
    <Button id="profile" style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
      className="p-0 mt-0 mb-1">
      <i className="fa fa-user-o fa-2X" />
    </Button>
    <UncontrolledPopover className="popover" trigger="legacy" placement="bottom" target="profile">
      <MyProfile style={{zIndex:'9999'}} user={props} openCompany ={() => setCompany(!company)} />
    </UncontrolledPopover>
    {section===true?(
      <Tooltip placement="bottom" target="profile" isOpen={section} toggle={() => setSection(false)}>
        <CompanyMappingAlert/>
      </Tooltip>
    ):(null)}

    
    <Button id="alram" style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
      className="p-0 mt-0 mb-1" onClick={(e) => e.preventDefault()}>
      <i className="fa fa-bell-o fa-2X" />{msg != '0'?<Badge color="danger" pill>{msg}</Badge>:<></>} 
	  </Button>
	    <UncontrolledPopover className="popover" trigger="legacy" placement="bottom" target="alram">
	    <MyMsg style={{zIndex:'9999'}} {...props}/>
	  </UncontrolledPopover>
    </>}


        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            //onClick={()=>setRegister(!register)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >사이트맵
        </Button>
        <ButtonDropdown>
            <DropdownToggle size="sm" className="mt-0 mb-0 mr-0 border-0 rounded-0" style={{backgroundColor:'#0098e1',paddingTop:'5px'}}
            	href="https://www.weidong.com/index.do?lang=ko_KR"
            	target="_blank">여객사이트</DropdownToggle>
        </ButtonDropdown>
        <ButtonDropdown>
        <DropdownToggle size="sm" className="mt-0 mb-0 mr-0 ml-0 border-0 rounded-0" style={{backgroundColor:'#0098e1',paddingTop:'5px'}}
        	href="https://www.cargo.weidong.com/index.do?lang=ko_KR"
        	target="_blank">화물사이트</DropdownToggle>
         </ButtonDropdown>
        {/* <ButtonDropdown isOpen={dropdownOpen} toggle={()=>setDropdownOpen(!dropdownOpen)} >
            <DropdownToggle caret size="sm" className="mt-0 mb-0 ml-0 border-0 rounded-0" style={{paddingTop:'5px',backgroundColor:'#333'}}>{langTitle}</DropdownToggle>
            <DropdownMenu className="mt-0" style={{minWidth:'6rem'}}>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("KOREA")}>KOREA</DropdownItem>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("CHINESE")}>CHINESE</DropdownItem>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("ENGLISH")}>ENGLISH</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown> */}
        <CompanyModal 
          isUser={user}
          openCompany={company}
          setOpenCompany={(e)=>setCompany(e)}
          {...props}
      />
    </div>
  );
}
//);

export default WeidongAuthNavbar;
