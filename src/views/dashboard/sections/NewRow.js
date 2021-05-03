import React,{useState, useEffect} from "react";
// reactstrap components

import { Link } from "react-router-dom";

import { Row,Col,Card, Badge} from "reactstrap";
//import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import axios from "axios"
// import './dashboard.css'
import * as validation from 'components/common/validation.js';
const styles = {
    headerFontStyle:{
      fontSize:'15px',
      color:'#696969',
      fontWeight:'600',
      
    },
    gridTitle:{
      fontSize:'20px',
      color:'#696969',
      fontWeight:'bold'
    },
    progressText:{
      fontSize:'15px',
      color:'black',
      fontWeight:'bold',
      fontWeight:'600',
    },
    gridCard:{
      zIndex:0,
      width:'100%',
      padding:'15px'
      // minHeight:'100%'
    },
    gridTitleRow:{
      textAlignLast:'center',
      width:'100%'
    },
    listText:{
      fontSize:'13px',
      color:'#696969',
    }
  
  };

export default function NewRow (props) {
    const [value, setValue] = useState(props.parameter!==null?props.parameter:[]);
    const [dptDate, setDptDate] = useState("");
    const [statusName, setStatusName] = useState("");
    const [state, setState] = useState(props.state!==null?props.state:null);
    const [viewWidth,setViewWidth] = useState(props.viewWidth!==null?props.viewWidth:'12.5%');
    useEffect(() => {
        
        setValue(props.parameter!==null?props.parameter:[]);
        setState(props.state!==null?props.state:null);
        setViewWidth(props.viewWidth!==null?props.viewWidth:'12.5%')
        if((value.mrn !== null && value.mbl_no != null)) {
            axios.post("/api/getmfcsInfo",{mrn:value.mrn, mblNo:value.mbl_no}).then(
                res=> {
                    if(res.statusText==="OK" && res.data.length > 0) {
                        setStatusName(res.data[0].STATUS_NAME);
                        setDptDate(res.data[0].DPT_DATE);
                        props.sum(true);
                    }else {
                        props.sum(false);
                    }
                }
            )
        }else {
            props.sum(false);
        }
    },[props]);
    return(
        <Row xl="12" lg="12" md="12" sm="12" xs="12">
            <Card className="no-transition" style={styles.gridCard}>
                <Row xl="12" lg="12" md="12" sm="12" xs="12" style={{margin:'1em 0'}} className="border solid 1px">
                    {/* BKG SAVE 단계 */}
                    {state.save?(
                        <Col style={{maxWidth:viewWidth}} className={value.status1===null?"step":"next"}>
                            {(value.user_no !== null&&value.bkg_no!==null&&value.bkg_date!=null&&value.status1!==null)?(
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col className="text-center" style={{marginRight:'18px'}}>
                                                <Link  to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                                    <i className={value.status1===null?"fa fa-floppy-o fa-3x text-secondary":"fa fa-floppy-o fa-3x text-primary"}/>
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <Link  to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                                    <Badge color="primary">BKG SAVE</Badge>
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <Link  to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                                    <span style={styles.progressText}>{value.bkg_no}</span>
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <Link  to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                                    <span style={styles.progressText}>{value.status1}</span>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>):
                                (<Row>
                                    <Col>
                                        <Row>
                                            <Col className="text-center" style={{marginRight:'18px'}}>
                                                <i className={value.status1===null?"fa fa-floppy-o fa-3x text-secondary":"fa fa-floppy-o fa-3x text-primary"}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <Badge color="primary">BKG SAVE</Badge>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <span style={styles.progressText}>{value.bkg_no}</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <span style={styles.progressText}>{value.status1}</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>)}
                            </Col>):null}
                    
                    {/* BKG SEND 단계 */}
                    {state.send?(
                        <Col style={{maxWidth:viewWidth}} className={value.status2===null?"step":"next"}>
                        {(value.user_no !== null&&value.bkg_no!==null&&value.bkg_date!=null&&value.status2!==null)?(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                            <i className={value.status2===null?"fa fa-paper-plane-o fa-3x text-secondary":"fa fa-paper-plane-o fa-3x text-primary"}/>   
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                            <Badge className="ml-2 mr-2" color="primary">BKG SEND</Badge>&nbsp;<Badge color="primary">{value.status_cnt2}</Badge> 
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                            <span style={styles.progressText}>{value.bkg_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/booking`, state: {user_no:value.user_no, bkg_no:value.bkg_no, bkg_date:value.bkg_date}}}>
                                        <span style={styles.progressText}>{value.status2}</span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.status2===null?"fa fa-paper-plane-o fa-3x text-secondary":"fa fa-paper-plane-o fa-3x text-primary"}/>  
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">BKG SEND</Badge>
                                        <Badge color="primary">{value.status_cnt2}</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>
                    ):null}
                    {/* BKG 컨펌단계 */}
                    {state.confirm?(
                        <Col style={{maxWidth:viewWidth}} className={value.status3===null?"step":"next"}>
                        {(value.user_no !== null&&value.res_bkg_no!==null&&value.res_confirm_date!=null&&value.status3!==null)? (
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/confirm`, state:{user_no:value.user_no, res_bkg_no:value.res_bkg_no, res_confirm_date:value.res_confirm_date}}}>
                                            <i className={
                                                value.status_name3==="Confirm"?"fa fa-check text-primary fa-3x"
                                                :value.status_name3==="Reject"?"fa fa-ban text-danger fa-3x"
                                                :value.status_name3==="Cancel"?"fa fa-ban text-danger fa-3x"
                                                :"fa fa-ellipsis-h fa-3x text-secondary"}/>
                                        </Link> 
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/confirm`, state:{user_no:value.user_no, res_bkg_no:value.res_bkg_no, res_confirm_date:value.res_confirm_date}}}>
                                            <Badge color="primary">{value.status_name3}</Badge>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/confirm`, state:{user_no:value.user_no, res_bkg_no:value.res_bkg_no, res_confirm_date:value.res_confirm_date}}}>
                                            <span style={styles.progressText}>{value.res_bkg_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/confirm`, state:{user_no:value.user_no, res_bkg_no:value.res_bkg_no, res_confirm_date:value.res_confirm_date}}}>
                                            <span style={styles.progressText}>
                                                {value.res_confirm_date!==null?validation.YMDFormatter(value.res_confirm_date):""} 
                                            </span>
                                        </Link>
                                    </Col>
                                </Row>
                                {value.status_name3==="Confirm"?(
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.user_no, res_bkg_no:value.res_bkg_no, confirm_yn:'Y'}}}><Badge className="ml-2 mr-2" color="primary">SR작성</Badge>
                                        </Link>
                                    </Col>
                                </Row>):null}
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className="fa fa-ellipsis-h fa-3x text-secondary"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge color="primary">WAITING FOR CONFIRM</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>
                    ):null}
                    {/* PICK UP 단계 */}
                    {state.pickup?(
                    <Col style={{maxWidth:viewWidth}} className={value.pick_up_time===null?"step":"next"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.pick_up_time===null?"fa fa-truck fa-3x text-secondary":"fa fa-truck fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">EMPTY PICK UP</Badge>
                                    </Col>
                                </Row>
                                {(value.pick_up_time!==null)?(
                                <Row>
                                    <Col className="text-center">
                                        <span style={styles.progressText}>{value.pick_up_time}</span>
                                    </Col>
                                </Row>):(null)}
                            </Col>
                        </Row>    
                    </Col>
                    ):null}
                    {/* DROP OFF 단계 */}
                    {state.drop?(
                    <Col style={{maxWidth:viewWidth}} className={value.drop_off_time===null?"step":"next"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.drop_off_time===null?"fa fa-ship fa-3x text-secondary":"fa fa-ship fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">DROP OFF</Badge>
                                    </Col>
                                </Row>
                                {(value.drop_off_time!==null)?(
                                <Row>
                                    <Col className="text-center">
                                        <span style={styles.progressText}>{value.drop_off_time}</span>
                                    </Col>
                                </Row>):(null)}
                            </Col>
                        </Row>
                    </Col>
                    ):null}
                    {/* SR단계 */}
                    {state.sr?(
                    <Col style={{maxWidth:viewWidth}} className={value.status4===null?"step":"next"}>
                        {(value.user_no !== null&&value.sr_no!==null&&value.sr_date!=null&&value.status4!==null)?(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.user_no, sr_no:value.sr_no, sr_date:value.sr_date}}}>
                                            <i className={value.status4===null?"fa fa-file-text-o fa-3x text-secondary":"fa fa-file-text-o fa-3x text-primary"}/>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.user_no, sr_no:value.sr_no, sr_date:value.sr_date}}}>
                                            <Badge className="ml-2 mr-2" color="primary">SR</Badge><Badge color="primary">{value.status_cnt4}</Badge>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.user_no, sr_no:value.sr_no, sr_date:value.sr_date}}}>
                                            <span style={styles.progressText}>{value.sr_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/srnew`, state:{user_no:value.user_no, sr_no:value.sr_no, sr_date:value.sr_date}}}>
                                            <span style={styles.progressText}>
                                                {value.sr_date!==null?validation.YMDFormatter(value.sr_date):""} 
                                            </span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={value.status4===null?"fa fa-file-text-o fa-3x text-secondary":"fa fa-file-text-o fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">SR</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>
                    ):null}
                    {/* BL단계 */}
                    {state.bl?(
                    <Col style={{maxWidth:viewWidth}} className={value.status5===null?"step nowrap":"next nowrap"}>
                    {(value.user_no !== null&&value.mbl_no!==null&&value.issue_date!=null&&value.status5!==null)?(
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <Link to={{pathname: `/bl`, state: {user_no:value.user_no, mbl_no:value.mbl_no, issue_date:value.issue_date}}}>
                                            <i className={value.status5===null?"fa fa-ellipsis-h fa-3x text-secondary":"fa fa-check fa-3x text-primary"}/>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/bl`, state: {user_no:value.user_no, mbl_no:value.mbl_no, issue_date:value.issue_date}}}>
                                            <Badge className="ml-2" color="primary">BL</Badge>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/bl`, state: {user_no:value.user_no, mbl_no:value.mbl_no, issue_date:value.issue_date}}}>
                                            <span style={styles.progressText}>{value.mbl_no}</span>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to={{pathname: `/bl`, state: {user_no:value.user_no, mbl_no:value.mbl_no, issue_date:value.issue_date}}}>
                                            <span style={styles.progressText}>
                                                {value.issue_date!==null?validation.YMDFormatter(value.issue_date):""} 
                                            </span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>):(
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <i className={value.status5===null?"fa fa-ellipsis-h fa-3x text-secondary":"fa fa-check fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Badge className="ml-2" color="primary">BL</Badge>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)}
                    </Col>
                    ):null}
                   {/*mfcs단계 */}
                   {state.mfcs?(
                    <Col style={{maxWidth:viewWidth}} className={dptDate===""?"laststep":"lastnext"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="text-center" style={{marginRight:'18px'}}>
                                        <i className={dptDate===""?"fa fa-clipboard fa-3x text-secondary":"fa fa-clipboard fa-3x text-primary"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Badge className="ml-2 mr-2" color="primary">MFCS</Badge>
                                    </Col>
                                </Row>
                                {(dptDate!=="")?(
                                <Row>
                                    <Col className="text-center">
                                        <span style={styles.progressText}>{validation.YMDFormatter(dptDate)}</span>
                                    </Col>
                                </Row>):(null)}
                                {(statusName!=="")?(
                                <Row>
                                    <Col>
                                        <span style={styles.progressText}>{statusName}</span>
                                    </Col>
                                </Row>):(null)}
                            </Col>
                        </Row>
                    </Col>
                   ):null}
                </Row>
            </Card>
        </Row>
    )
}
