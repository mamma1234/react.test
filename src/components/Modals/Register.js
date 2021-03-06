/*eslint-disable*/
import React,{useState, useEffect} from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  Input,Row,Col,Label, InputGroup,InputGroupAddon,InputGroupText,Tooltip,Card
} from "reactstrap";
import axios from 'axios'
import { Link } from "react-router-dom";
import TermsOfService from "components/Modals/TermsOfService.js"
import PrivacyPolicy from "components/Modals/PrivacyPolicy.js"
import AlertModal from 'components/Modals/Alert.js';
import CardBody from "reactstrap/lib/CardBody";
import CardFooter from "reactstrap/lib/CardFooter";
import * as validation from 'components/common/validation.js';




export default function RegisterPage(props) {
  // carousel states and functions
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [DupCheck,setDupCheck] = useState("");
  const [DupCheckColor,setDupCheckColor] = useState(false);
  const [firstPass, setFirstPass] = useState("");
  const [firstPassColor, setFirstPassColor] = useState(false);
  const [secondPass, setSecondPass] = useState("");
  const [secondPassColor, setSecondPassColor] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [email,setEmail] = useState("");
  const [emailState, setEmailState]= useState("");
  const [message, setMessage] = useState("")//Alert Message
  const [alertOpen, setAlertOpen] = useState(false)//Alert Open State
  const [viewPw, setViewPw] =useState(true);
  const [pwCheck,setPwCheck] = useState(false);
  const [term, setTerm] = useState(false);
  const [valueTerm, setValueTerm] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [valuePrivacy, setValuePrivacy] = useState(false);
  const [ConfirmOpen, setConFirmOpen] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [successUser, setSuccessUser] = useState(false);
  const [failUser, setFailUser] = useState(false);
  const [userName,setUserName] = useState("");
  const [phoneNum,setPhoneNum] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [certifyStatus, setCertifyStatus] = useState(false);//???????????? ????????????
  useEffect(()=> {
    if(pwConfirm.length > 0){
      if(pw===pwConfirm) {
        
        setSecondPass('');
        setSecondPassColor(false);
        setPwCheck(true)

      }else {
        setPwCheck(false)
        setSecondPass('??????????????? ???????????? ????????????.');
        setSecondPassColor(true)
      }
    }else {
      setPwCheck(false);
      setSecondPass('');
      setSecondPassColor(true)
    }

  },[pwConfirm]);
  useEffect(()=> {
    if(pw===pwConfirm) {
      setSecondPass('');
      setSecondPassColor(false);
      setPwCheck(true);
    }else {
      if(pwConfirm.length >0) {
        setPwCheck(false)
        setSecondPass('??????????????? ???????????? ????????????.');
        setSecondPassColor(true);
      }
    }

    if(validation.verifyPassword(pw)) {
      setFirstPass("");
      setFirstPassColor(false);
    }else {
      if(pw.length===0){
        setFirstPass("");
        setFirstPassColor(false);
      }else {
        setFirstPass("8??? ????????? ??????/?????????/?????????/??????????????? ???????????? ?????????.");
        setFirstPassColor(true);
      }
    }
  },[pw])
  const AlertMessage = (message) => {
    setAlertOpen(true);
    setMessage(message);
  }
  const onChangeIdBlur =(id) => {
    if(!DupCheckColor){
      setDupCheck("");
    }
  }
  const onChangeId = (value) => {
    setId(value);
    if(value.length===0){
        setDupCheck("");
        setDupCheckColor(true);
    }else {
      if(!validation.verifyId(value)){
        setDupCheckColor(true);
        setDupCheck("8??? ????????? ???/????????? ?????? ???????????? ?????? ????????????.");
      }else {
        if(value.length>0){
          axios ({
            url:'/auth/dupcheck',
            method:'POST',
            data: {id:value}
          }).then(res=>{
            if(res.status===200){
              if(res.data==="OK"){
                setDupCheckColor(false)
                setDupCheck("?????? ?????? ??? ?????? ID?????????.");
              }else {
                setDupCheckColor(true);
                setDupCheck("?????? ????????? ????????? ?????????.");
              }
            }else {
              setDupCheck("?????? ??? ?????? ????????? ?????????.");
              setDupCheckColor(true)
            }
            })
          .catch(err => {
            setDupCheckColor(true);
          });
        }
  
  
  
      }
    }
   
    
   
  }
  useEffect(()=> {
    if(phoneNum.length > 0) {
      axios.post("/auth/dupcheckPhone",{num:phoneNum}).then(
        res=> {
          if(res.status===200) {
            if(res.data==="OK") {
              setPhoneCheck(false);
            }else {
              setPhoneCheck(true);
            }
          }else {
            setPhoneCheck(true);
          }
          
        }
      )
    }
  },[phoneNum])
  const onChangeEmail = (value) => {

    if(value.length===0){
      setEmailState("");
      setEmailCheck(true);
    }else {
      
      if(validation.validationEmail(value)){
        axios ({
          url:'/auth/dupcheckMail',
          method:'POST',
          data: {mail:value}
        }).then(res=>{
          if(res.status===200){
            if(res.data==="OK"){
              setEmailCheck(false)
              setEmailState("");
            }else {
              setEmailCheck(true);
              setEmailState("?????? ????????? ????????? ?????????.");
            }
          }else {
            setEmailCheck("?????? ??? ?????? ????????? ?????????.");
            setEmailState(true)
          }
          })
        .catch(err => {
          setEmailCheck(true);
        });
       }else {
        setEmailCheck(true);
        setEmailState("????????? ????????? ?????? ????????????.")
       }
    }
    setEmail(value);
  }


  const onTerm = (value) => {
    setValueTerm(value)
  }
  const onPrivacy =(value) => {
    setValuePrivacy(value);
  }
  const Serti =() => {

	  return axios ({
			url:'/auth/sertify_weidong',
			method:'POST',
			data: {}
		}).then(res=>{ 
			var form1 = document.form1;
			window.open("", "auth_popup", "width=430,height=640,scrollbar=yes");	
			form1.target = "auth_popup";
			form1.tc.value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd";
			form1.action = "https://safe.ok-name.co.kr/CommonSvl";
			form1.method = "post";
			form1.cp_cd.value=res.data.CP_CD;
			form1.mdl_tkn.value=res.data.MDL_TKN;
			form1.submit();
			
		}
		)
		.catch(err => {
			AlertMessage(String(err));
		});
  }


  const onsubmit = () => {
    if(id.length===0) {
      AlertMessage("ID??? ?????? ?????? ???????????????.");
      return;
    }
    if(DupCheck) {
      AlertMessage("?????? ???????????? ID ?????????.");
      return;
    }
    if(pw.length===0){
      AlertMessage("???????????? ??? ?????? ?????? ???????????????.");
      return;
    }
    if(firstPassColor) {
      AlertMessage("8??? ????????? ??????/?????????/?????????/??????????????? ???????????? ?????????.");
      return;
    }
    if(pwConfirm.length===0) {
      AlertMessage("???????????? ?????? ??? ?????? ?????? ???????????????.");
      return;
    }
    if(!pwCheck) {
      AlertMessage("???????????? ??? ???????????? ????????????.");
      return;
    }
    if(email.length===0) {
      AlertMessage("???????????? ?????? ?????? ?????????.");
      return;
    }
    if(emailCheck) {
      AlertMessage("???????????? ????????? ?????? ????????????.");
      return;
    }
    if(!valueTerm) {
      AlertMessage("????????? ??????????????? ?????? ???????????????.");
      return;
    }
    if(!valuePrivacy) {
      AlertMessage("??????????????????????????? ?????? ???????????????.");
      return;
    }
    if(!certifyStatus) {
      AlertMessage("????????? ?????? ????????? ?????? ?????? ???????????????.");
      return;
    }
    if(phoneCheck) {
      AlertMessage("?????? ????????? ????????? ???????????????.");
      return;
    }
    setConFirmOpen(true);
  }
  window.event_popup = function() {
	  if(document.kcbResultForm.RSLT_CD.value === "B000"){
		  setPhoneNum(document.kcbResultForm.TEL_NO.value);
      setUserName(document.kcbResultForm.RSLT_NAME.value);
      setBirthDay(document.kcbResultForm.RSLT_BIRTHDAY.value);
      setGender(document.kcbResultForm.RSLT_SEX_CD.value);
		  setCertifyStatus(true);
	  } else {
		  setCertifyStatus(false);
		  AlertMessage("document.kcbResultForm.RSLT_MSG.value \n error: ????????? ?????? ????????? ?????? ???????????????. ?????? ??????????????????.");
	  }
  }
  const onCreateUser = () => {
      axios ({
        url:'/auth/join',
        method:'POST',
        data: {provider:'local',
            id:id,
            password:pw,
            name:userName,
            phone:phoneNum,
            email:email,
            gender:gender,
            birthDay:birthDay,
            kakaoid:'',
            tokenkakao:'',naverid:'',tokennaver:'',faceid:'',tokenface:'',googleid:'',tokengoogle:'',linkyn:'N'}
      }).then(res=>{
        if(res.statusText==="OK") {
          setConFirmOpen(false);
          handleClose();
          setSuccessUser(true);
        }else {
          setFailUser(true);
          handleClose();
        }
                    
      }).catch(err => {
        console.log(err);
        setFailUser(true);
        handleClose();
        setConFirmOpen(false);
      })
     
  }
  const reset = () => {
    setId("");
    setPw("");
    setPwConfirm("");
    setDupCheck("");
    setDupCheckColor(false);
    setFirstPass("");
    setFirstPassColor(false);
    setSecondPass("");
    setSecondPassColor(false);
    setEmailCheck(false);
    setEmail("");
    setEmailState("");
    setMessage("")//Alert Message
    setAlertOpen(false)//Alert Open State
    setViewPw(true);
    setPwCheck(false);
    setTerm(false);
    setValueTerm(false);
    setPrivacy(false);
    setValuePrivacy(false);
    setConFirmOpen(false);
    setSuccessUser(false);
    setFailUser(false);
    setUserName("");
    setPhoneNum("");
    setBirthDay("");
    setGender("");
    setPhoneCheck(false);
    setCertifyStatus(false);//???????????? ????????????
  }
  const handleClose = () => {
    reset()
    props.setOpenRegister(false);
  }
  return (
    <>
        	<form name="form1">
          <input type="hidden" name="tc" />	
          <input type="hidden" name="cp_cd" />	
          <input type="hidden" name="mdl_tkn" />	
          <input type="hidden" name="target_id"/>	
          </form>
          <form name="kcbResultForm" method="post">
            <input type="hidden" name="RSLT_CD"/>
            <input type="hidden" name="RSLT_MSG"/>
            <input type="hidden" name="TEL_NO"/>
            <input type="hidden" name="RSLT_NAME"/>
            <input type="hidden" name="RSLT_BIRTHDAY" />
            <input type="hidden" name="RSLT_SEX_CD" />
          </form>  	
        <Modal
          isOpen={props.openRegister}
          toggle={() => handleClose()}
          className="modal-register">
          <div className="modal-header no-border-header text-center">
            <button
              className="close"
              type="button"
              onClick={() => handleClose()}
            >??
            </button>
            <h3 className="modal-title">CREATE ACCOUNT</h3>
          </div>
          <div className="modal-body">
          <Col>
            <Row>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <InputGroup >
                  <Input
                    id="idGroup"
                    type="text" 
                    // maxLength="10"
                    placeholder="ID"
                    autoComplete="off"
                    onChange={(e)=>onChangeId(e.target.value)} 
                    onBlur={(e)=>onChangeIdBlur(e.target.value)}
                    value={id}/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      {id.length>0?(
                        <i className={DupCheckColor===false?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"} />
                      ):null}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <label className={DupCheckColor===false?"text-success":"text-danger"}>{DupCheck}</label>
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <InputGroup >
                  <Input
                    id="pwGroup"
                    type={viewPw?"password":"text"}
                    value={pw}
                    placeholder="????????????"
                    onChange={(e)=>setPw(e.target.value)}/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText style={{padding:'0'}}>
                      <Button style={{textAlignLast:'right'}} size="sm" color="link" onClick={()=>setViewPw(!viewPw)}><i className={viewPw?"fa fa-eye-slash":"fa fa-eye"}/></Button>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <label className={firstPassColor===false?"text-success":"text-danger"}>{firstPass}</label>
              </Col>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <InputGroup >
                  <Input
                    id="pwCheck"
                    type={viewPw?"password":"text"}
                    value={pwConfirm}
                    onChange={(e)=>setPwConfirm(e.target.value)}
                    placeholder="???????????? ??????"/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      {pwConfirm.length > 0?(
                        <i className={pwCheck===true?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"} />
                      ):null}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <label className={secondPassColor===false?"text-success":"text-danger"}>{secondPass}</label>
              </Col>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <InputGroup >
                  <Input
                    id="emailCheck"
                    type="text"
                    onChange={(e)=>onChangeEmail(e.target.value)}
                    value={email}
                    autoComplete="off"
                    placeholder="?????????"/>
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {email.length>0?(
                          <i className={emailCheck===false?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"} />
                        ):null}
                      </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                <label className={emailCheck===false?"text-success":"text-danger"}>{emailState}</label>
              </Col>
              {certifyStatus===false?(
                <Col xs="12" xl="12" lg="12" md="12" sm="12">
                  <Button style={{width:'100%'}} onClick ={() => Serti()}><i className="fa fa-address-card"/>????????????</Button>
                </Col>
              ):(
                <>
                {
                  phoneCheck===true?(
                    <>
                    <Col xs="12" xl="12" lg="12" md="12" sm="12" className="border-bottom">
                      <span style={{fontSize:'15px',fontWeight:'bold'}}>?????? ????????? ????????? ????????? ???????????????.</span>
                    </Col>
                    <Col xs="12" xl="12" lg="12" md="12" sm="12">
                        <Button style={{width:'100%'}}>ID ??????</Button>
                    </Col>
                    </>
                  ):(
                    <>
                    <Col xs="12" xl="12" lg="12" md="12" sm="12" className="border-bottom">
                      <span style={{fontSize:'15px',fontWeight:'bold'}}>?????? ????????? ?????? ???????????????.</span>
                    </Col>
                    <Col xs="6" xl="6" lg="6" md="6" sm="6" className="pt-3">
                      <FormGroup>
                        <label>??????</label>
                        <Input
                          value={userName}
                          style={{readOnly:true}}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="6" xl="6" lg="6" md="6" sm="6" className="pt-3">
                      <FormGroup>
                        <label>HP</label>
                        <Input
                          value={phoneNum}
                          style={{readOnly:true}}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="6" xl="6" lg="6" md="6" sm="6" className="pt-3">
                      <FormGroup>
                        <label>????????????</label>
                        <Input
                          value={birthDay}
                          style={{readOnly:true}}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="6" xl="6" lg="6" md="6" sm="6">
                      <Row style={{marginTop:'30%'}}>
                        <Col xs="6" xl="6" lg="6" md="6" sm="6">
                          <div className="form-check-radio">
                            <Label check>
                              <Input
                                checked={gender==="M"?true:false}
                                type="radio"
                              />
                              ??? <span className="form-check-sign" />
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6" xl="6" lg="6" md="6" sm="6">
                          <div className="form-check-radio">
                            <Label check>
                              <Input
                                checked={gender==="F"?true:false}
                                type="radio"
                              />
                              ??? <span className="form-check-sign" />
                            </Label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </>)}
                </>
              )}
              
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <Row className="border-bottom pt-3">
                     <Col xl="6" sm="6" md="6" lg="6" xl="6" className="text-left"><span>????????? ?????? ??????</span>
                  </Col>
                </Row>
                <Row>
                  <Col xl="12" sm="12" md="12" lg="12" xl="12">
                    <FormGroup className="mt-3" check>
                      <Label check>
                        <Input type="checkbox" checked={valueTerm} onChange={() => setTerm(true)}/><span className="form-check-sign" /><span>??????????????? ?????? ?????????.(??????)</span>
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <Row className="border-bottom pt-3">
                     <Col xl="6" sm="6" md="6" lg="6" xl="6" className="text-left"><span>????????????????????????</span>
                  </Col>
                </Row>
                <Row>
                  <Col xl="12" sm="12" md="12" lg="12" xl="12">
                    <FormGroup className="mt-3" check>
                      <Label check>
                        <Input type="checkbox" checked={valuePrivacy} onChange={() => setPrivacy(true)}/><span className="form-check-sign" /><span>???????????? ??????????????? ?????? ?????????.(??????)</span>
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <Row>
                  <Col xl="12" sm="12" md="12" lg="12" xl="12">
                    <Button color="success" style={{width:'100%'}} onClick={()=> onsubmit()}>?????? ??????</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </div>
      </Modal>
      <Modal
        role="document"
        isOpen={term}
        toggle={()=> setTerm(!term)}>
          <TermsOfService clickTerm={(value)=> onTerm(value)} modalClose={() => setTerm(false)}/>
      </Modal>
      <Modal
        role="document"
        isOpen={privacy}
        toggle={()=> setPrivacy(!privacy)}>
          <PrivacyPolicy clickPrivacy={(value)=> onPrivacy(value)} modalClose={() => setPrivacy(false)}/>
      </Modal>
      <AlertModal 
        message={message}
        open={alertOpen}
        close={()=>setAlertOpen(false)}
        toggle={() => setAlertOpen(false)}
        status ="error"/>
      <Modal
        size="sm"
        //toggle={() => setOpen(false)}
        isOpen={ConfirmOpen}>
        <div className="modal-header no-border-header">

        </div>
        <div className="modal-body text-center pl-2 pr-2">
          <h5>?????? ????????? ????????? ?????? ???????????????????</h5>
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button className="btn-link" color="danger" type="button" onClick={()=> onCreateUser()}>Yes</Button>
          </div>
          <div className="divider" />
          <div className="right-side">
              <Button
              className="btn-link"
              color="default"
              type="button"
              onClick={() => setConFirmOpen(false)}>
              No
            </Button>
          </div>
        </div>
      </Modal>    
      <Modal
        size="lg"
        //toggle={() => setOpen(false)}
        toggle={()=>setSuccessUser(!successUser)}
        isOpen={successUser}>
          <div className="card-raised card-form-horizontal no-transition card-profile">
            <img src={id.length%2===0?require("assets/img/welcome2.png"):require("assets/img/welcome.png")}/>
            <CardBody>
              {/* <h5 className="card-description">(?????? ???????????????)</h5> */}
              <Col className="text-center">
                <span>?????? ????????? ?????? ???????????????. {userName}?????? ????????????</span>&nbsp;<span className="text-danger">{id}</span>&nbsp;<span>?????????.</span>
              </Col>
            </CardBody>
            <CardFooter className="text-center">
              <Link to={{pathname:`/weidongIndex`}}><Button className="mr-3" onClick={()=> {setSuccessUser(false)}}>?????? ????????????</Button></Link>
              <Button className="ml-3" onClick={() => {setSuccessUser(false);props.openLogin()}}>?????????</Button>
            </CardFooter>
          </div>
        
      </Modal>
      <Modal
        size="lg"
        //toggle={() => setOpen(false)}
        toggle={()=>setFailUser(!failUser)}
        isOpen={failUser}>
          <div className="card-raised card-form-horizontal no-transition card-profile">
            <CardBody>
              {/* <h5 className="card-description">(?????? ???????????????)</h5> */}
              <Col className="text-center">
                <span>?????? ????????? ?????? ???????????????. ?????? ??? ?????? ????????? ?????????.</span>
              </Col>
            </CardBody>
            <CardFooter className="text-center">
              <Button onClick={()=>setFailUser(!failUser)}>??????</Button>
            </CardFooter>
          </div>
        
      </Modal>    
    </>
  );
}
