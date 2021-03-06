import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {Row, Col, Card, Container, CardBody, Button , Modal, InputGroup, Input, InputGroupAddon, InputGroupText} from "reactstrap";
import axios from "axios";
import AlertModal from 'components/Modals/Alert.js';
import * as validation from 'components/common/validation.js';
const styles = {
    headerText: {
        fontSize:'16px',
        color:'#5f6368',
        fontFamily:'Roboto,Arial,sans-serif',
        marginBottom:'5px'

    },bodyText:{
        fontSize:'19px',
        color:'#5f6368',
        fontFamily:'Roboto,Arial,sans-serif',
        marginBottom:'5px'

    }
}
export default function UserSection(props) {
    const [user, setUser] = useState(props.user);
    const [userData, setUserData] = useState([]);
    const [ConfirmOpen, setConFirmOpen] = useState(false)
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("");
    const [userBirth, setUserBirth] = useState("");
    const [userTel, setUserTel] = useState("");
    const [newTel, setNewTel] = useState("");
    const [insertDate, setInsertDate] = useState("");
    const [userMail, setUserMail] = useState("");
    const [userType, setUserType] = useState("");
    const [userGender, setUserGender] = useState("");
    const [message, setMessage] = useState("");
    const [userNo, setUserNo] = useState("");
    const [certifyStatus, setCertifyStatus] = useState(false);
    const [emailCheckMessage ,setEmailCheckMessage] = useState("");
    const [emailCheck, setEmailCheck] = useState(true);
    const [alertOpen, setAlertOpen] = useState(false);
    const [NumberChangeOpen, setNumberChangeOpen] = useState(false);
    const [pwdModifyDate, setPwdModifyDate] = useState("")
    useEffect(()=> {
        
        setUser(props.user)
        if(props.user) {
            onSubmit();

        }

    },[props])
    useEffect(()=> {
        console.log('props.user',props.user)
        setUser(props.user)
        if(props.user) {
            onSubmit();
        }

    },[])
    useEffect(()=> {
        if(userData.length > 0) {
            setUserId(userData[0].local_id);
            setUserNo(userData[0].user_no);
            setUserName(userData[0].user_name);
            setUserBirth(userData[0].user_birth);
            setUserTel(userData[0].user_phone);
            setInsertDate(userData[0].insert_date);
            setUserMail(userData[0].user_email);
            setUserType(userData[0].user_type);
            setUserGender(userData[0].user_gender);
            setPwdModifyDate(userData[0].pwd_modify_date);
        }
    },[userData])

    const onSubmit = () => {
        axios.post("/com/getUserInfo", {userno:user.user_no}).then(
            res => {
                if(res.statusText==="OK") {
                    if(res.data.length > 0) {
                        setUserData(res.data);
                    }else {
                        setUserData([]);
                    }
                }
            }
        )
    }
    const saveNewTel = () => {
        axios.post("/com/setUserInfo",{gubun:'phone',oldTel:userTel, newTel:newTel,userno:userNo}).then(
            res => {
                if(res.statusText==="OK") {
                    if(res.status===200) {
                        AlertMessage("????????? ????????? ?????????????????????.");
                        setUserTel(newTel);
                        setNumberChangeOpen(false);
                    }else {
                        AlertMessage("????????? ??????????????????. ????????? ?????? ??????????????????.");
                        setNumberChangeOpen(false);
                    }
                }else {
                    AlertMessage("????????? ??????????????????. ????????? ?????? ??????????????????.");
                    setNumberChangeOpen(false);
                } 
            }
        ).catch(e => {
            AlertMessage(String(e));
            setNumberChangeOpen(false);
        })
    }
    const saveNewMail = () => {
        if(emailCheck) {
            AlertMessage("?????? ?????? ???????????? ?????? ??????????????????.");
            return;
        }

        axios.post("/com/setUserInfo",{gubun:'email',email:userMail,userno:userNo}).then(
            res => {
                if(res.statusText==="OK") {
                    if(res.status===200) {
                        AlertMessage("????????? ????????? ?????????????????????.");
                    }else {
                        AlertMessage("????????? ??????????????????. ????????? ?????? ??????????????????.");
                    }
                }else {
                    AlertMessage("????????? ??????????????????. ????????? ?????? ??????????????????.");
                } 
            }
        ).catch(e => {
            AlertMessage(String(e));
        })
    }
    const onSerti = () => {
        if(document.kcbResultForm.RSLT_CD.value !== "B000"){
            axios.post ('/auth/sertify_weidong',{}).then(
                res=>{ 
                    var form1 = document.form1;
                    window.open("", "auth_popup", "width=430,height=640,scrollbar=yes");	
                    form1.target = "auth_popup";
                    form1.tc.value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd";
                    form1.action = "https://safe.ok-name.co.kr/CommonSvl";
                    form1.method = "post";
                    form1.cp_cd.value=res.data.CP_CD;
                    form1.mdl_tkn.value=res.data.MDL_TKN;
                    setConFirmOpen(false);
                    form1.submit();
                }).catch(err => {
                setConFirmOpen(false);
                AlertMessage(String(err));
            });
        }else {
            if((document.kcbResultForm.RSLT_NAME.value === userName) && 
            (document.kcbResultForm.RSLT_BIRTHDAY.value === userBirth) && 
            (document.kcbResultForm.RSLT_SEX_CD.value === userGender)) {
                setCertifyStatus(true);
                setNewTel(document.kcbResultForm.TEL_NO.value);
                if(userTel !== document.kcbResultForm.TEL_NO.value) {
                    setNumberChangeOpen(true);
                }
                AlertMessage("????????? ?????????????????????. ");
            }else {
                setCertifyStatus(false);
                AlertMessage("?????? ????????? ???????????? ????????????. ?????? ?????? ??? ????????????.");   
            }
        }
    }
    window.event_popup = function() {
        if(document.kcbResultForm.RSLT_CD.value === "B000"){

            if((document.kcbResultForm.RSLT_NAME.value === userName) && 
                (document.kcbResultForm.RSLT_BIRTHDAY.value === userBirth) && 
                (document.kcbResultForm.RSLT_SEX_CD.value === userGender)) {
                    setCertifyStatus(true);
                    setNewTel(document.kcbResultForm.TEL_NO.value);
                    if(userTel !== document.kcbResultForm.TEL_NO.value) {
                        setNumberChangeOpen(true)
                    }
                    AlertMessage("????????? ?????????????????????. ");
                }else {
                    setCertifyStatus(false);
                    AlertMessage("?????? ????????? ???????????? ????????????. ?????? ?????? ??? ????????????.");   
                }
        } else {
            setCertifyStatus(false);
            AlertMessage("????????? ?????? ????????? ?????? ???????????????. ?????? ??????????????????.");
        }
    }
    const AlertMessage = (message) => {
        setAlertOpen(true);
        setMessage(message);
    }
    const onChangeEmail = (value) => {

        if(value.length===0){
          setEmailCheckMessage("");
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
                  setEmailCheckMessage("");
                }else {
                  setEmailCheck(true);
                  setEmailCheckMessage("?????? ????????? ????????? ?????????.");
                }
              }else {
                setEmailCheckMessage("?????? ??? ?????? ????????? ?????????.");
                setEmailCheck(true);
              }
              })
            .catch(err => {
                setEmailCheck(true);
            });
           }else {
            setEmailCheck(true);
            setEmailCheckMessage("????????? ????????? ?????? ????????????.")
           }
        }
        setUserMail(value);
      }
    
    return (
       <>	
        <div className="section section-white">	
            <Container>
                <CardBody className="pt-2 pb-2 bg-white">
                    <Row>
                        <Col className="ml-auto mr-auto" xs="10" sm="10" md="10" lg="10" xl="10">
                            <span style={{fontSize:'15px',fontWeight:'bold'}} className="mt-1 text-center">
                                ??? ??????
                            </span>
                        </Col>
                    </Row>
                </CardBody>
            </Container>
            <Container>
                <Card className="card-just-text card-raised card-form-horizontal no-transition mb-4">
                    <CardBody>
                        <Row>
                        <Col style={{cursor:'pointer'}} onClick={() => {if(!certifyStatus){setConFirmOpen(true)}}}>
                            <Row className="mt-5 border-bottom">
                                <Col className="text-left" xs="2" sm="2" md="2" lg="2" xl="2">
                                    <span style={styles.headerText}>ID</span>
                                </Col>
                                <Col className="text-left" xs="12" sm="12" md="10" lg="10" xl="10">
                                    <span style={styles.bodyText}>{userId}</span>
                                </Col>
                            </Row>
                            <Row className="mt-5 border-bottom">
                                <Col className="text-left" xs="2" sm="2" md="2" lg="2" xl="2">
                                    <span style={styles.headerText}>??????</span>
                                </Col>
                                <Col className="text-left" xs="12" sm="12" md="10" lg="10" xl="10">
                                    <span style={styles.bodyText}>{userName}</span>
                                </Col>
                            </Row>
                            <Row className="mt-5 border-bottom">
                                <Col className="text-left" xs="2" sm="2" md="2" lg="2" xl="2">
                                    <span style={styles.headerText}>????????????</span>
                                </Col>
                                <Col className="text-left" xs="12" sm="12" md="10" lg="10" xl="10">
                                    <span style={styles.bodyText}>{validation.YMDFormatter(userBirth)}</span>
                                </Col>
                            </Row>
                            <Row className="mt-5 border-bottom">
                                <Col className="text-left" xs="2" sm="2" md="2" lg="2" xl="2">
                                    <span style={styles.headerText}>??????</span>
                                </Col>
                                <Col className="text-left" xs="12" sm="12" md="10" lg="10" xl="10">
                                    <span style={styles.bodyText}>{userGender==="M"?"??????":userGender==="F"?"??????":""}</span>
                                </Col>
                            </Row>
                            <Row className="mt-5 border-bottom">
                                <Col className="text-left" xs="2" sm="2" md="2" lg="2" xl="2">
                                    <span style={styles.headerText}>?????????</span>
                                </Col>
                                <Col className="text-left" xs="12" sm="12" md="10" lg="10" xl="10">
                                    <span style={styles.bodyText}>{validation.TELFormatter(userTel)}</span>
                                </Col>
                            </Row>
                            <Row className="mt-5 border-bottom">
                                <Col className="text-left" xs="2" sm="2" md="2" lg="2" xl="2">
                                    <span style={styles.headerText}>?????????</span>
                                </Col>
                                <Col className="text-left" xs="12" sm="12" md="10" lg="10" xl="10">
                                    {certifyStatus===true?(
                                        <>
                                        <InputGroup style={{padding:'0'}}>
                                            <Input
                                                id="emmail"
                                                type={"text"}
                                                value={userMail}
                                                // autoComplete="off"
                                                onChange={(e)=>onChangeEmail(e.target.value)}
                                                placeholder="?????????"/>
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText style={{padding:'0'}}>
                                                    <Button size="sm" color={emailCheck===false?"success":"danger"} onClick={()=> saveNewMail()}>??????</Button>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            </InputGroup>
                                            <label className={emailCheck===false?"text-success":"text-danger"}>{emailCheckMessage}</label>
                                        </>
                                    ):(
                                        <span style={styles.bodyText}>{userMail}</span>
                                    )}
                                    
                                </Col>
                            </Row>
                            <Row className="mt-5 border-bottom">
                                <Col className="text-left" xs="2" sm="2" md="2" lg="2" xl="2">
                                    <span style={styles.headerText}>?????????</span>
                                </Col>
                                <Col className="text-left" xs="12" sm="12" md="10" lg="10" xl="10">
                                    <span style={styles.bodyText}>{insertDate}</span>
                                </Col>
                            </Row>
                        </Col>
                        </Row>
                        <Link to={{pathname: `/password`}}>
                            <Row>
                                <Col>
                                    <Row className="mt-5 border-bottom">
                                        <Col className="text-left" xs="2" sm="2" md="2" lg="2" xl="2">
                                            <span style={styles.headerText}>????????????</span>
                                        </Col>
                                        <Col className="text-left" xs="12" sm="12" md="10" lg="10" xl="10">
                                            <Row>
                                                <Col xs="2" sm="2" md="2" lg="2" xl="2">
                                                    *********
                                                </Col>
                                                <Col xs="10" sm="10" md="10" lg="10" xl="10">
                                                    <span style={styles.bodyText}>?????????????????? : {pwdModifyDate}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Link>
                    </CardBody>
                </Card>
            </Container>
        </div>
        <Modal
            size="sm"
            //toggle={() => setOpen(false)}
            isOpen={ConfirmOpen}>
            <div className="modal-header no-border-header">

            </div>
            <div className="modal-body text-center pl-2 pr-2">
            <h5>?????? ????????? ?????? ????????? ???????????????. ?????????????????????????</h5>
            </div>
            <div className="modal-footer">
            <div className="left-side">
                <Button className="btn-link" color="danger" type="button" onClick={()=> onSerti()}>Yes</Button>
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
        <AlertModal 
            message={message}
            open={alertOpen}
            close={()=>setAlertOpen(false)}
            toggle={() => setAlertOpen(false)}
            status ="error"/>
            <Modal
            size="sm"
            //toggle={() => setOpen(false)}
            isOpen={NumberChangeOpen}>
            <div className="modal-header no-border-header">

            </div>
            <div className="modal-body text-center pl-2 pr-2">
                <h5>?????? ????????? [{validation.TELFormatter(userTel)}] ?????? ?????? ????????? [{validation.TELFormatter(newTel)}] ??? ?????? ???????????????????</h5>
            </div>
            <div className="modal-footer">
            <div className="left-side">
                <Button className="btn-link" color="danger" type="button" onClick={()=> saveNewTel()}>Yes</Button>
            </div>
            <div className="divider" />
            <div className="right-side">
                <Button
                className="btn-link"
                color="default"
                type="button"
                onClick={() => setNumberChangeOpen(false)}>
                No
                </Button>
            </div>
            </div>
        </Modal>
        </>
        
    )
}




             