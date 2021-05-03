/*eslint-disable*/
import React,{useState,useEffect, useRef, useContext} from "react";
// reactstrap components
import {
  Button,
  Modal,
  Input,Row,Col,
  Card,CardTitle,UncontrolledTooltip,InputGroup,InputGroupText, InputGroupAddon,Label
} from "reactstrap";
import Tabs from "components/Taps/Taps.js";
import CardSubtitle from "reactstrap/lib/CardSubtitle";
import CardBody from "reactstrap/lib/CardBody";
import axios from 'axios'
import Collapse from "reactstrap/lib/Collapse";
import FormGroup from "reactstrap/lib/FormGroup";
import {observer} from 'mobx-react-lite';
import UserStore from "store/UserStore.js";
import AlertModal from 'components/Modals/Alert.js';
import * as validation from 'components/common/validation.js';
const styles = {
  normalGird:{
    fontSize:'9',
    color:'#696969',
    fontWeight:'bold',
  },
  cardTitle:{
    fontSize:'16px',
    color:'#696969',
  },

  textHeader: {
    fontSize:'16px',
    color:'#696969',
    fontWeight:'bold'
  },
  textGrid: {
    fontSize:'12px',
    color:'#696969',
  }


};

function GridRow(props) {
  const [value,setValue] = useState(props.value);
  const [open,setOpen] = useState(false);

  useEffect(() => {
    setValue(props.value)

    return function cleanup() {
      // setValue(null);
      // setOpen(false);
    };
  },[open]);

  return(
    <>
    <Row  className="pb-2 pt-2" style={{cursor:'pointer'}} onClick={() => setOpen(!open)}>
      <Col className=" text-center pt-3" xl="1" lg="1" md="1" sm="1" xs="1">{value.num}</Col>
      <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3" xs="3">{value.company_name}</Col>
      <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3" xs="3">{validation.NameReplace(value.company_master)}</Col> 
      <Col className=" text-center pt-3" xl="5" lg="5" md="5" sm="5" xs="5">{value.address + value.address_detail}</Col>
    </Row>
    <Collapse isOpen={open}>
      <CardBody className="mt-0 pt-0 pb-1 mb-1 border">
        <CardTitle className="pt-1 mt-1">
          <Col>
            <span className="pt-3 mt-2" style={{color:'black',fontSize:'30px',color:'#696969',fontWeight:'bold'}}>&nbsp;{value.company_name}</span>      
          </Col>
        </CardTitle>  
        <CardBody>
        <Col>
          <Row className="pt-3 pb-3 border-bottom">
            <Col className="" xl="4" sm="4" md="4" lg="4" xl="4">
              <span style={styles.textHeader}>대표</span>
            </Col>
            <Col className="text-center" xl="8" sm="8" md="8" lg="8" xl="8">
              <span style={styles.textGrid}>{validation.NameReplace(value.company_master)}</span>
            </Col>
          </Row>

          <Row className="pt-3 pb-3 border-bottom">
            <Col className="" xl="3" sm="3" md="3" lg="3" xl="3">
              <span style={styles.textHeader}>업종</span>
            </Col>
            <Col className="text-center" xl="3" sm="3" md="3" lg="3" xl="3">
              <span style={styles.textGrid}>{value.sector}</span>
            </Col>
            <Col className="" xl="3" sm="3" md="3" lg="3" xl="3">
              <span style={styles.textHeader}>업태</span>
            </Col>
            <Col className="text-center" xl="3" sm="3" md="3" lg="3" xl="3">
              <span style={styles.textGrid}>{value.busniess_type}</span>
            </Col>
          </Row>
          <Row className="pt-3 pb-3 border-bottom">
            <Col className="" xl="3" sm="3" md="3" lg="3" xl="3">
              <span style={styles.textHeader}>전화번호</span>
            </Col>
            <Col className="text-center" xl="3" sm="3" md="3" lg="3" xl="3">
              <span style={styles.textGrid}>{validation.TELFormatter(value.phone)}</span>
            </Col>
            <Col className="" xl="3" sm="3" md="3" lg="3" xl="3">
              <span style={styles.textHeader}>FAX</span>
            </Col>
            <Col className="text-center" xl="3" sm="3" md="3" lg="3" xl="3">
              <span style={styles.textGrid}>{validation.TELFormatter(value.fax)}</span>
            </Col>
          </Row>
          <Row className="pt-3 pb-3 border-bottom">
            <Col className="" xl="4" sm="4" md="4" lg="4" xl="4">
              <span style={styles.textHeader}>E-Mail</span>
            </Col>
            <Col className="text-center" xl="8" sm="8" md="8" lg="8" xl="8">
              <span style={styles.textGrid}>{value.company_email}</span>
            </Col>
          </Row>
          <Row className="pt-3 pb-3 border-bottom">
            <Col className="" xl="4" sm="4" md="4" lg="4" xl="4">
              <span style={styles.textHeader}>주소</span>
            </Col>
            <Col className="text-center" xl="8" sm="8" md="8" lg="8" xl="8">
              <span style={styles.textGrid}>{value.address + ' ' +value.address_detail}</span>
            </Col>
          </Row>
          <Row className="pt-3 pb-3 border-bottom">
            <Col className="text-right"><Button color="primary" onClick={()=>props.addCompany(value)}>등록</Button></Col>
          </Row>
        </Col>
        </CardBody>
      </CardBody>
      
     
    </Collapse>
  </>
  )
}


// function CheckboxForm(props) {
//   const store = useContext(UserStore);
//   const [value, setValue] = useState(props.value);
//   const [index, setIndex] = useState(props.index);
//   const [check, setChecked] = useState(props.value.user_stats==='Y'?true:false);
//   const [ConfirmOpen, setConFirmOpen] = useState(false);
//   const [confirmMessage,setConfirmMessage] = useState("");
//   const [confirmGubun, setConfirmGubun] = useState(1);
//   const [user,setUser]=useState(props.user);
//   useEffect(() => {
//     setUser(props.user);
//     return function cleanup() {
      

//     };
//   },[props]);
//   const onCheckClick = (e) => {
//     if(e.target.checked) {
//         setConfirmGubun(1)
//         setConFirmOpen(true);
//         setConfirmMessage("해당 업체에 사용요청을 하시겠습니까?");

//     }else {
//         setConfirmGubun(2);
//         setConFirmOpen(true);
//         setConfirmMessage("해당 업체에 사용요청을 취소하시겠습니까?");
//     }
//   }
//   const onSectionAddRequest = () => {
//     if(user) {
//       axios.post('/api/searchMappingUser',{user:user.user}).then(
//         res=>{
//           if(res.statusText==="OK"){
//             if(res.data.length > 0){
//               props.alert('이미신청중이거나 승인된 업체가 존재합니다.');
//               setConFirmOpen(false);
//             }else {

//               axios.post("/api/insertCompanyUser",{company_id:value.company_id,section_id:value.section_id,user:user.user}).then(
//                 res=> {
//                   if( res.statusText === "OK" ) {
//                     props.alert('사용 신청이 완료되었습니다. 관리자 승인 후 사용가능합니다.');
//                     setChecked(true);
//                     setConFirmOpen(false);
//                   }else {
//                     setChecked(false);
//                     setConFirmOpen(false);
//                   }
//                 })
//             }
//           }
//         }
//       ) 
//     }else {
//       props.alert('로그인 정보가 없습니다.');
//       setConFirmOpen(false);
//     }
//   }
//   const onSectionDelete = () => {
//     if(isAuth) {
//       axios.post("/api/deleteMappingUser",{company_id:value.company_id,section_id:value.section_id,user:user.user}).then(
//         res=>{
//           if(res.statusText==="OK") {
//             setChecked(false);
//             setConFirmOpen(false);
//             props.alert("취소 완료.");

//           }
//         }
//       )
//     }else {
//       props.alert('로그인 정보가 없습니다.');
//       setConFirmOpen(false);
//     }  
//   }


//   return (
//     <>
//       <FormGroup check>
//       <Label check>
//       <Input type="checkbox" defaultValue={check} checked={check} onChange={(e,v) => onCheckClick(e)}/>
//       <span className="form-check-sign" />
//       <span className={value.user_stats==="A"?"text-primary":
//                       value.user_stats==="Y"?"text-success":
//                       value.user_stats==="N"?"text-danger":
//                       value.user_stats==="P"?"text-waring":""} style={styles.textGrid}>{value.detail_name}</span>
//       </Label>
//     </FormGroup>
    
//   </>
//   )
// }



export default function Company(props) {
  const [businessNumber,setBusinessNumber] = useState('');
  const [data, setData] = useState([]);
  const [open,setOpen] = useState(true);
  const [detailRow, setDetailRow] = useState([])
  const [sectionList, setSectionList] = useState([])
  const element=useRef(null);
  const [message,setMessage] = useState("");
  const [alertOpen,setAlertOpen] = useState(false);
  const [font, setFont] = useState("success");
  const [ConfirmOpen, setConFirmOpen] = useState(false);
  const [confirmMessage,setConfirmMessage] = useState("");
  const [paentParam,setParentParam] = useState(null);
  const {user}= props
  useEffect(() => {
    if(!open) {
      document.getElementById("bn").focus();
    }

    return function cleanup() {
      setData([]);
      setBusinessNumber('')
    };
  }, [open]);
  const handleClose = () => {
    setAlertOpen(false);
  }
  const onSubmit = () => {
    if(user) {
      axios.post("/api/searchCompanyList",{bn:businessNumber.replaceAll('-',''),lineCode:'WDFC'}).then(
        res=> {
          if(res.statusText ==='OK') {
            if(res.data.length > 0) {
              
              setData(res.data);
            }else {
              setAlertOpen(true)
              setMessage("검색결과가 존재하지 않습니다.");
              setData([]);
              setSectionList([]);
            }
            
          }
        }
      )
    }else {
      alertMessageSet('로그인 이후 이용해주시기 바랍니다.')
    }
  }
  const onKeyPress = (e) => {
    if(e.key==='Enter') {
      if(businessNumber.length===0){
        setOpen(true);
      }else {
        onSubmit();
      }
      
    }
  }
  const onFocusOut =(e) => {
    if(businessNumber.length ===0) {
      setOpen(true);
    }
  }
  const onModalClose = () => {
    
    setSectionList([])
    setData([]);
    setBusinessNumber('');
    setDetailRow([]);
    setOpen(true);
  
    props.setOpenCompany(false)
  }
  const ConfirmOn = (value) => {
    setParentParam(value)
    if(value) {
        setConFirmOpen(true);
        setConfirmMessage("해당 업체에 사용요청을 하시겠습니까?");
    }
  }
  const alertMessageSet =(message) => {
    setAlertOpen(true);
    setMessage(message);
  }



  const onSectionAddRequest = () => {
    if(user) {
      axios.post('/api/searchMappingUser',{user:user}).then(
        res=>{
          if(res.statusText==="OK"){
            if(res.data.length > 0){
              alertMessageSet('이미 승인된 업체가 존재합니다.');
              setConFirmOpen(false);
            }else {
              axios.post("/api/insertCompanyUser",{param:paentParam, user:user}).then(
                res=> {
                  if(res.statusText==="OK"){
                    if(res.data==="SUCCESS"){
                      alertMessageSet('사용 신청이 완료되었습니다. ');
                      setConFirmOpen(false);
                    }else {
                      setConFirmOpen(false);
                    }
                  }
                  console.log(res);
                })
            }
          }
        }
      ) 
    }else {
      alertMessageSet('로그인 정보가 없습니다.');
      setConFirmOpen(false);
    }
  }
  return (
    <>
        <Modal
          isOpen={props.openCompany}
          toggle={() => onModalClose()}
          className="modal-lg"
          >
          
          <>

        <Card className="card-raised card-form-horizontal no-transition mb-4">
          <CardTitle className="pb-5">
            <Col>
            
              <span style={{fontSize:'15px',fontWeight:'bold'}}>업체 찾기</span>
            </Col>
          </CardTitle>
          <CardSubtitle>
                <Col xl="12" lg="12" sm="12" md="12">
                    {open?(
                      <Button style={{width:'100%'}} color="default" onClick={()=>{setOpen(false)}}>
                        <i className="fa fa-search"></i>BUSINESS NUMBER
                      </Button>
                    ):(
                      <div>
                        <InputGroup>
                        {/* Since the css properties cannot check the previous sibling of an element and for the design consistency we recommend to use the "input-group-addon" after the "form-control" like in this example */}
                        <Input 
                          type="text" 
                          id="bn"
                          maxLength="10"
                          placeholder="Enter Without '-'"
                          disabled={detailRow.length===0?false:true}
                          ref={element}
                          onChange={(e)=>{if(e.target.value.length ===10) {
                            setBusinessNumber(e.target.value.replace(/(\d{3})(\d{2})(\d{5})/g,'$1-$2-$3')); 
                          }else {
                            setBusinessNumber(e.target.value)
                          }}}
                          value={businessNumber}
                          onKeyPress={onKeyPress}
                          onBlur={onFocusOut}
                          />
                        <InputGroupAddon addonType="append">
                          <InputGroupText style={{borderLeft:'solid',padding:'0'}}>
                            <Button size="sm" color='link' onClick={()=> onSubmit()}>
                            <i className="fa fa-search" />
                            </Button>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                    )}
                  
                </Col>
            </CardSubtitle>
            <CardBody>
                <Col xl="12" lg="12" sm="12" md="12">
                      <>
                      <Row className="bg-light pb-2 pt-2">
                        <Col className="text-center pt-3 border-right" xl="1" lg="1" md="1" sm="1" xs="1" style={styles.normalGird}>#</Col>
                        <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3" xs="3" style={styles.normalGird}>NAME</Col>
                        <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3" xs="3" style={styles.normalGird}>MASTER</Col>
                        <Col className="text-center pt-3 border-right" xl="5" lg="5" md="5" sm="5" xs="5" style={styles.normalGird}>ADDRESS</Col>
                      </Row>
                      {data.length > 0?(
                        <>
                        {data.map((value,index) => {
                          return(
                            <GridRow key={index} value={value} 
                              // onChange={(e) => viewChange(e)}
                              addCompany={(value) => ConfirmOn(value)}
                              />
                          )
                        })}
                        
                        </>
                      ):(null)}
                      {/* <CardTitle className="pt-1 mt-1">
                        {sectionList.length>0?(
                          <Col>
                          <h4 style={{color:'black'}}>담당 업무</h4>
                        </Col>
                        ):(null)}
                        
                        <CardBody>
                          <Col>
                            <Row>
                              {sectionList.map((value,index) => {
                                return(
                                  <Col key={index} xl="6" sm="6" md="6" lg="6" xl="6">
                                    <CheckboxForm user={props} key={index} value={value} index={index} alert={(e) =>alertMessageSet(e)}/>
                                  </Col>
                                )
                              })}
                            
                            </Row>
                          </Col>
                        </CardBody>
                      </CardTitle> */}
                      </>
                </Col>
          </CardBody>
        </Card>
      </>
      <AlertModal 
        message={message}
        open={alertOpen}
        close={handleClose}
        status ="error"/>
      <Modal
        size="sm"
        isOpen={ConfirmOpen}
      //toggle={() => setOpen(false)}
      >
        <div className="modal-header no-border-header">
          <button
            className="close"
            type="button"
            onClick={() => setConFirmOpen(false)}
          >×</button>
        </div>
        <div className="modal-body text-center pl-0 pr-0">
          <h5>{confirmMessage}</h5>
        </div>
        <div className="modal-footer">
          <div className="left-side">
          <Button className="btn-link" color="danger" type="button" onClick={()=> {onSectionAddRequest()}}>Yes</Button>
          </div>
          <div className="divider" />
          <div className="right-side">
              <Button
              className="btn-link"
              color="default"
              type="button"
              onClick={() => setConFirmOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>    
    </Modal>
    </>
  );
}
