import React, { useState, useEffect } from 'react';
import {Row, Col, FormGroup,Label,Input, Card, CardTitle, CardBody, CardFooter, Button, UncontrolledTooltip, CardSubtitle} from "reactstrap";
import Moment from 'moment';
import axios from "axios";
import AlertMessage from "components/Alert/AlertMessage.js";
import {CustomDatePicker} from 'components/CustomInput/CustomInput.js';
import { Link } from "react-router-dom";
const styles = {
    normalGird:{
      fontSize:'12px',
      color:'#696969',
      fontWeight:'bold',
    },
    cardTitle:{
      fontSize:'12px',
      color:'#696969',
    }
  };

export default function SrList (props) {
  const [toDate,setToDate] = useState(Moment(new Date()).subtract(7,'days'));
  const [endDate,setEndDate] = useState(new Date);
  const [data, setData] = useState([]);
  const [num, setNum] = useState(1);
  const [message,setMessage] = useState("");
  const [alertOpen,setAlertOpen] = useState(false);
  const [srNo, setSrNo] = useState("");
  const [totCnt, setTotCnt] = useState(0);
  const [font, setFont] = useState("success");
  const [isBottom, setBottom] = useState(false);
  const [moreTodate, setMoreTodate] = useState(Moment(new Date()).subtract(7,'days'));
  const [moreEndDate,setMoreEndDate] = useState(new Date);
  const [moreSrNo, setMoreSrNo] = useState("");
  const {user}=props;
//  console.log("user:",user);
  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    if(user) {
    	onSubmit()
    }
    return function cleanup() {
      document.removeEventListener("scroll", onScroll);
    };
  }, [user]);
  function onScroll(){
    const view = document.getElementById('card');
    
    
    if(view.getBoundingClientRect().bottom <= window.innerHeight) {
      setBottom(true)
    }else {
      setBottom(false)
    }
  }
  const onSubmit = () => {
    if(user){
      setNum(1);
      setMoreTodate(toDate);
      setMoreEndDate(endDate);
      setMoreSrNo(srNo);
      axios.post("/shipper/selectSrList",{userNo:user?user.user_no:'', sr_no:srNo,toDate:toDate,endDate:endDate, num:1}).then(
        res => {
          if(res.statusText==="OK") {
            console.log(res.data)
            if(res.data.length > 0) {
              setFont("success")
              setTotCnt(res.data[0].tot_cnt);
              setData(res.data);
              setAlertOpen(true);
              
              setMessage("조회가 완료되었습니다.");
            }else {
              setFont("danger")
              setData([]);
              setTotCnt(0);
              
              setAlertOpen(true);
              setMessage("조회 결과가 없습니다.");
            }
          }
        } 
      )
    }else {
      setFont("danger")
      setAlertOpen(true);
      setMessage("로그인 정보가 없습니다.");     
    }

  }
  const onScrolltoTop =() => {
    window.scrollTo(0,0);
  }
  const onMore = (param) => {
    if(user){
      if((param-1) !== Number(data[0].tot_page)) {
        setNum(param);
        axios.post("/shipper/selectSrList",{userNo:user?user.user_no:'', bkg_no:moreSrNo,toDate:moreTodate,endDate:moreEndDate, num:param})
        .then(res => (setData([...data,...res.data])));
      }else {
        setFont("warning")
        setAlertOpen(true);
        setMessage("마지막 페이지입니다.");
      }
    }else{
      setFont("danger")
      setAlertOpen(true);
      setMessage("로그인 정보가 없습니다.");
    }
  }

  const handleClose = () => {
    setAlertOpen(false);
  }
    return (
        <>
        {/* var colWidths = ['xs', 'sm', 'md', 'lg', 'xl']; */}
            <Col className="ml-auto mr-auto mt-4" xs="11" md="11" sm="11">
               
                <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">
                    <CardTitle>
                      <Col>
                        <Row>
                          <Col xl="5" lg="6" sm="12" md="12">
                            <Row>
                              <div style={{maxWidth:'15%',}}>
                                <FormGroup style={{paddingTop:'50%'}}>
                                  <Label/>
                                  <span style={{marginLeft:'5px', fontSize:'12px',fontWeight:'bold' }}>SR일자</span>
                                </FormGroup>
                              </div>
                              <div style={{width:'40%'}}>
                                <FormGroup style={{ marginLeft:'5px', fontSize:'12px',fontWeight:'bold' }}>
                                  <Label/>
                                  <CustomDatePicker
                                      id="startDate"
                                      dateFormat="YYYY-MM-DD"
                                      timeFormat={false}
                                      value={toDate}
                                      onChange={(date)=>setToDate(date)}/>
                                </FormGroup>
                              </div>
                              <div style={{width:'5%'}}>
                                <FormGroup style={{paddingTop:'30px', fontSize:'12px',fontWeight:'bold' }}>
                                  <Label/>
                                  <span> ~ </span>
                                </FormGroup>
                              </div>
                              <div style={{width:'40%'}}>
                                <FormGroup style={{ marginLeft:'5px'}}>
                                  <Label/>
                                  <CustomDatePicker
                                      id="endDate"
                                      dateFormat="YYYY-MM-DD"
                                      timeFormat={false}
                                      value={endDate}
                                      onChange={(date)=>setEndDate(date)}/>
                                </FormGroup>
                              </div>
                            </Row>
                          </Col>
                          <Col xl="3" lg="3" sm="12" md="12">
                            <FormGroup>
                              <Label className="mb-0" style={{fontSize:'12px',fontWeight:'bold' }}>SR NUMBER</Label>
                              <Input 
                                type="text" 
                                id="bknum"
                                placeholder="SR Number"
                                maxLength="50"
                                value={srNo}
                                onChange={(e)=>setSrNo(e.target.value)}/>
                            </FormGroup>
                          </Col>
                          <Col xl="2" lg="2" sm="12" md="12">
	                          <FormGroup className="pt-3" >
	                          <Label/>
	                          <Link to={{pathname: `/srnew`, state:{user_no:props.user?props.user.user_no:'', sr_no:'', sr_date:'',doc_new:'Y'}}}>
	                          <Button id="new"
	                           style={{float:'right'}}
	                            color="info"
	                            size="lg"
	                            onClick={()=>onSubmit()}>NEW</Button>
	                            </Link>
	                            <UncontrolledTooltip delay={0} target="new">Create Booking</UncontrolledTooltip>
	                        </FormGroup>
                          </Col>
                          <Col xl="2" lg="2" sm="12" md="12">
                            <FormGroup className="pt-3" >
                              <Label/>
                              <Button
                                style={{minWidth:'100%',float:'right'}}
                                color="info"
                                size="lg"
                                onClick={()=>onSubmit()}>SEARCH</Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </CardTitle>
                    <CardSubtitle className="text-right pr-3 pt-2">
                      
                      <div>
                        <span style={styles.normalGird}>[ Data Count: {data.length}건 / {totCnt}건 ]</span>                          
                      </div>
                    </CardSubtitle>
                    <CardBody className="pt-2 pb-2">
                      <Row className="bg-light pb-2 pt-2 table table-hover">
                        <Col xl="4" lg="4" md="6" sm="12"  xs="12" className="mt-auto mb-auto">
                          <Row>
                            <Col className="text-center border-right pl-1 pr-1" xl="1" lg="1" md="1" sm="1"  xs="1" style={styles.normalGird}>#</Col>
                            <Col className="text-center border-right" xl="5" lg="5" md="5" sm="5"  xs="5" style={styles.normalGird}>SR NO </Col>
                            <Col className="text-center border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>SR DATE</Col>
                            <Col className="text-center border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>STATUS</Col>
                            
                          </Row>
                        </Col>
                        <Col xl="4" lg="4" md="6" sm="12"  xs="12" className="mt-auto mb-auto">
                          <Row>
                            
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>SEND DATE</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>MBL NO</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>RES ISSUE DATE</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>SCH VSL NAME</Col>
                          </Row>
                        </Col>
                        <Col xl="4" lg="4" md="6" sm="12"  xs="12" className="mt-auto mb-auto">
                          <Row>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>POL</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>POD</Col>
                            <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3"  xs="3" style={styles.normalGird}>CARGO PACK QTY</Col>
                            <Col className="text-center pt-3" xl="2" lg="2" md="2" sm="2"  xs="2" style={styles.normalGird}>CNTR</Col>
                          </Row>
                        </Col>
                      </Row>
                      {
                        data.length > 0 ? (
                          <>
                              {data.map((value,index) => {
                                return(
                                  <Link key={index} to={{pathname: `/srnew`, state:{user_no:value.user_no, sr_no:value.sr_no, sr_date:value.sr_date}}}>
                                    <Row  className="border-bottom pb-3">
                                      <Col xl="4" lg="4" md="6" sm="12"  xs="12">
                                        <Row>

                                          <Col className=" text-center pt-3 pl-1 pr-1" xl="1" lg="1" md="1" sm="1"  xs="1">{value.rownum}</Col>
                                          <Col className=" text-center pt-3" xl="5" lg="5" md="5" sm="5"  xs="5">{value.sr_no}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.sr_date_format}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.status_name}</Col>
                                        </Row>
                                      </Col>
                                      <Col xl="4" lg="4" md="6" sm="12"  xs="12">
                                        <Row>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.send_date_format}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.res_mbl_no}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.res_issue_date_format}</Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.sch_vessel_name}</Col>
                                          
                                        </Row>
                                      </Col>
                                      <Col xl="4" lg="4" md="6" sm="12"  xs="12">
                                        <Row>
                                            <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3"><span data-html="true" data-toggle="tooltip" title={value.sch_pol_name} >{value.sch_pol}<br/>{value.sch_scd_format?"("+value.sch_scd_format+")":''}</span></Col>
                                            <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3"><span data-html="true" data-toggle="tooltip" title={value.sch_pod_name} >{value.sch_pod}<br/>{value.sch_eta_format?"("+value.sch_eta_format+")":''}</span></Col>
                                          <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3"  xs="3">{value.cargo_pack_qty}</Col>
                                          <Col className=" text-center pt-3" xl="2" lg="2" md="2" sm="2"  xs="2">{value.cntr_count==="0"?"":value.cntr_count}</Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                </Link>
                                );
                              })}
                            </>
                        ):(null)
                      }
                    </CardBody>
                    <CardFooter className="text-center">
                      {data.length > 0 ? (
                        <Button
                        size="lg"
                        className="btn-round"
                        onClick={() => {
                          onMore(num + 1);
                        }}
                        color="primary">
                        <span>More&nbsp;{num}&nbsp;/&nbsp;{data.length!==0?data[0].tot_page:"0"}</span>
                        </Button>
                      ):(null)}
                     
                      {isBottom?(
                        <Button
                        style={{float:'right'}}
                        size="sm"
                        id="scrollTop"
                        onClick={() => {onScrolltoTop()}}
                        color="link">
                        <i className="fa fa-chevron-circle-up fa-2x"></i>
                        <UncontrolledTooltip delay={0} target="scrollTop">TOP</UncontrolledTooltip>
                      </Button>
                      ):(null)}
                      
                    </CardFooter>
                    

                </Card>
                
            </Col>
            
            <AlertMessage 
              message={message}
              isOpen={alertOpen}
              isClose={handleClose}
              // fontColor={font}   //선택사항
              alertColor={font} //선택사항
              timeOut={2000} //선택사항
              ></AlertMessage>
        </>
    )
}




             