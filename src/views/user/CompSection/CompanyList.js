import React, { useState, useEffect } from 'react';
import {Row, Col, Button, CardBody, Form, Badge, Modal} from "reactstrap";
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import Card from 'reactstrap/lib/Card';
import CardFooter from 'reactstrap/lib/CardFooter';
const styles = {
    normalGird:{
      fontSize:'20px',
      color:'#696969',
      fontWeight:'bold',
    },
    cardTitle:{
      fontSize:'16px',
      color:'#696969',
    }
  };

export default function CompanyList(props) {
    const [value, setValue] = useState(props.value);
    const [index, setIndex] = useState(props.index);
    const [data,setData] = useState([])
    const [user,setUser] = useState(props.user);
    const [ConfirmOpen,setConFirmOpen] = useState(false);
    const [confirmMessage, setConfirmMessage]= useState("");
    const [deleteState,setDeleteState] = useState([]);
    const [message,setMessage] = useState("");
    const [alertOpen,setAlertOpen] = useState(false);
    const [font, setFont] = useState("success");
    useEffect(() => {
        setUser(props.user)
        setValue(props.value);
        setIndex(props.index);
        onsubmit();
        return function cleanup() {

        };
    }, [props]);
    const handleClose = () => {
        setAlertOpen(false);
    }



    const onsubmit = () => {
        axios.post("/api/searchCompanyUser",{companyId:value.company_id,sectionId:"",id:user.user_no,status:""}).then(
            res=> {
                if(res.statusText==="OK") {
                    if(res.data.length > 0) {
                        console.log(res.data);
                        setData(res.data);
                    }else {
                        setData([])
                    }
                }
            }
        )
    }
    const onDeleteSection = () => {
        axios.post("/api/deleteMappingUser",{company_id:deleteState.company_id,section_id:deleteState.section_id,user:user.user_no}).then(
            res=>{
              if(res.statusText==="OK") {
                setConFirmOpen(false);
                setAlertOpen(true);
                setMessage("업체 섹션 삭제가 왼료되었습니다.");     
                onsubmit();
    
            }
        })


    }
    
    const onConfirmOpen = (value) => {
        setDeleteState(value)
        setConFirmOpen(true);
        setConfirmMessage("["+value.section_name+"] 섹션을 영구적으로 삭제 하시겠습니까?");
    }
    return(
        <div>
            <Card className="card-just-text card-raised card-form-horizontal no-transition mb-4">
                <CardBody>
                    <span style={{fontSize:'20px', fontWeight:'bold'}}>{value.company_name}</span>
                </CardBody>
                <Row className="mb-4">
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.normalGird}>영문명</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center border-right">
                        <span style={styles.cardTitle}>{value.company_ename}</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.normalGird}>MASTER</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.cardTitle}>{value.company_master}</span>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.normalGird}>업종</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center border-right">
                        <span style={styles.cardTitle}>{value.sector}</span>
                    </Col>

                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.normalGird}>업태</span>
                    </Col>
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center">
                        <span style={styles.cardTitle}>{value.business_type}</span>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs="3" xl="3" lg="3" md="3" sm="3" className="text-center border-right">
                        <span style={styles.normalGird}>주소</span>
                    </Col>
                    <Col xs="9" xl="9" lg="9" md="9" sm="9" className="text-left">
                        <span style={styles.cardTitle}>{value.address}&nbsp;{value.address_detail}</span>
                    </Col>
                </Row>
                <CardFooter className="text-center">
                    <>
                    {
                        data.length > 0 ?(
                            <>
                            <Row className="pb-3">
                                <Col className="text-center border-right" xl="1" lg="1" md="1" sm="1" xs="1" style={styles.normalGird}>#</Col>
                                <Col className="text-center border-right" xl="3" lg="3" md="3" sm="3" xs="3" style={styles.normalGird}>SECTION</Col>
                                <Col className="text-center border-right" xl="4" lg="4" md="4" sm="4" xs="4" style={styles.normalGird}>STATE</Col>
                                <Col className="text-center border-right" xl="2" lg="2" md="2" sm="2" xs="2" style={styles.normalGird}>APPLY DATE</Col>
                                <Col className="text-center" xl="2" lg="2" md="2" sm="2" xs="2" style={styles.normalGird}>x</Col>
                            </Row>
                            {
                                data.map((value,index)=> {
                                    return(
                                        <Row key={index}>
                                            <Col xs="1" xl="1" lg="1" md="1" sm="1">
                                                <span>{value.num}</span>
                                            </Col>
                                            <Col xs="3" xl="31" lg="3" md="3" sm="3">
                                                <span>{value.section_name}</span>
                                            </Col>
                                            {value.status === 'N'?(
                                            <>
                                                <Col xs="1" xl="1" lg="1" md="1" sm="1">
                                                    <span>{value.status==="A"?"신청":
                                                           value.status==="P"?"대기":
                                                           value.status==="N"?"거절":
                                                           value.status==="Y"?"승인":""}</span>
                                                </Col>
                                                <Col xs="3" xl="3" lg="3" md="3" sm="3">
                                                    <span>사유 : {value.remark}</span>
                                                </Col>
                                            </>
                                            ):(
                                            <>
                                                <Col xs="4" xl="4" lg="4" md="4" sm="4">
                                                    <span>{value.status==="A"?"신청":
                                                           value.status==="P"?"대기":
                                                           value.status==="N"?"거절":
                                                           value.status==="Y"?"승인":""}</span>
                                                </Col>
                                            </> 
                                            )}
                                            <Col xs="2" xl="2" lg="2" md="2" sm="2">
                                                <span>{value.apply_date}</span>
                                            </Col>
                                            <Col xs="2" xl="2" lg="2" md="2" sm="2">
                                                <span><Button size="sm" onClick={()=>onConfirmOpen(value)}>삭제</Button></span>
                                            </Col>
                                            
                                        </Row>
                                    )
                                })
                            }
                            </>
                        ):(null)
                    }
                    </>
                </CardFooter>
            </Card>
            <Modal 
                size="sm"
                //toggle={() => setOpen(false)}
                isOpen={ConfirmOpen}>
                <div className="modal-body text-center pl-0 pr-0">
                <h5>{confirmMessage}</h5>
                </div>
                <div className="modal-footer">
                <div className="left-side">
                <Button className="btn-link" color="danger" type="button" onClick={()=> {onDeleteSection()}}>Yes</Button>
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
            <AlertMessage 
              message={message}
              isOpen={alertOpen}
              isClose={handleClose}
              // fontColor={font}   //선택사항
              alertColor={font} //선택사항
              timeOut={2000} //선택사항
              ></AlertMessage>  
        </div>
    )
}