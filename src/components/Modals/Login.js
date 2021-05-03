/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  Input,
  Row,Col,Label,Form,FormFeedback
} from "reactstrap";
import axios from 'axios';


function LoginPage(props) {
  console.log("login props :",props);
  // modals states
  
  // carousel states and functions

  const [animating, setAnimating] = React.useState(false);
  const [classic, setClassic] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  
  React.useEffect(() => {
	  setEmail("");setPassword("");
  },[props.openLogin]);
  
/*  React.useEffect(() => {
	 if(props.setLogin) {
		 axios.post("/auth/logout");
	 }
  },[props.setLogin]);*/
  
  /*const onSubmit =() => {
	  var frm = document.forms[0];

  if(email !== '' && password !== '') {
	  
	  console.log(">>>>> ok");
	  frm.submit();
  } else {
	   if(frm.id.value === '') {
		  props.onAlert("error","아이디는 필수 입력값 입니다.");
	   } else {
		   props.onAlert("error","비밀번호는 필수 입력값 입니다.");
	   }
	   
  }
  }*/
  
  const fncOnKeyPress = (e) => {

	  if("Enter" === e.key && (email !== undefined && password !== undefined) ) {
		  onSubmit();
		  //document.forms[0].submit();
		}
  }
  


  const login = (e) => {
    e.preventDefault();

    axios.post("/auth/login", {id : email, password : password,})
    .then(res => {
        store.setting(res.data.token, res.data.user);
    })
    .catch(err => {
        console.log(err);
    })

  }

  const logout = (e) => {
    e.preventDefault();
    store.logout();
  }
  
  const onSubmit=(event)=> {

	  if(event) {
		  event.preventDefault();
	  }
	  if(email && password ) {
			  document.loginForm.submit();
		  } else {
			 if(!email) {
				 setEmailError(true);
			 } 
			 if (!password) {
				 setPasswordError(true);
			 }
		  }
  }

  return (
    <>
        <Modal
                isOpen={props.openLogin}
                toggle={() => props.setOpenLogin(false)}
                className="modal-login" autoFocus={false}  
              >
                <div className="modal-header no-border-header text-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => props.setOpenLogin(false)}
                  >
                    <span>×</span>
                  </button>
                  <h6 className="text-muted">Welcome</h6>
                  <h3 className="modal-title text-center">WEIDONG FERRY</h3>
                  <p>Log in to your account</p>
                </div>
                <div className="modal-body">
                {/* 서버 반영 시 
                <Form name="loginForm" action="/oauth/authorize" method="POST" onSubmit={onSubmit}>
                */}
                <Form name="loginForm" action="http://localhost:5002/oauth/authorize" method="POST" onSubmit={onSubmit}>
					<input type='hidden' name='client_id' value='bWFtbWEgTTAwMDAwMA=='></input>
	                {/* 서버 반영 시 
	                    <input type='hidden' name='redirect_uri' value='/auth/local/callback'></input>
	                    */}
					<input type='hidden' name='redirect_uri' value='http://localhost:5000/auth/local/callback'></input>
					<input type='hidden' name='response_type' value='code'></input>
					<input type='hidden' name='state' value='12345'></input>
	                <FormGroup>
	                  <label>ID</label>
	                  <Input id="id" name="id" placeholder="" type="text" invalid={emailError} value={email} onChange={(e)=>{setEmail(e.target.value);setEmailError(e.target.value?false:true);}}   
	                  autoFocus/>
	                  <FormFeedback>{props.validation.REQ_MSG}</FormFeedback>
	                </FormGroup>
	                <FormGroup>
	                  <label>Password</label>
	                  <Input id="pw" name="pw" invalid={passwordError}
	                    defaultValue=""
	                    placeholder=""
	                    type="password"
	                    onChange={(e)=>{setPassword(e.target.value);setPasswordError(e.target.value?false:true)}}
	                    onKeyPress ={(e)=>fncOnKeyPress(e)}
	                    value={password}
	                  />
	                  <FormFeedback>{props.validation.REQ_MSG}</FormFeedback>
	                </FormGroup>
	                {props.setLogin?<label className="text-danger text-center">사용자 인증 시간이 만료 되었습니다. 다시 로그인 해주세요.</label>:<></>}
	                {props.errcode?<label className="text-danger text-center">{props.errcode ==='E1001'?props.validation.E1001:props.validation.E1002}</label>:<></>}
	                
	                <Button block className="btn-round" color="default"  type="submit">
	                  Log in
	                </Button>
                  </Form>
              </div>
              <div className="modal-footer no-border-footer pt-3 pb-2 mb-4 text-center" style={{alignSelf:'center'}}>
                <span className="text-muted text-center">
                  Looking{" "}
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    create an account
                  </a>{" "}
                  ?
                </span>
              </div>
        </Modal>
    </>
  );
}

export default LoginPage;