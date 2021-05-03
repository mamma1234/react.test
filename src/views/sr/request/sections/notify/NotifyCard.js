/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText,Badge,CardFooter,UncontrolledTooltip,FormFeedback} from "reactstrap";
import Select from "react-select";
import NotifyBookmark from './NotifyBookmark.js';
import Notify from './Notify.js';
import axios from 'axios';
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

let notifyData = {};

const NotifyCard = (props) => {

  const {bookmark,loadData,openWindow} = props;

  // Collapse Flag
  const [coll, setColl] = useState(false);
  const [bookmarkView, setBookmarkView] = useState(false);
  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [notice, setNotice] = useState([]);
  const [notiBookMark, setNotiBookMark] = useState([]);
  const [propsData, setPropsData] = useState([]);
  const [modalTitle, setModalTitle] = useState("Notify Info");
  
	  useEffect(() => {
		    setNotice(loadData);
		  },[loadData]);
	  useEffect(() => {
		    setColl(openWindow);
		  },[openWindow]);
	  
  const toggle = (params) => {
      
	  if(params==='B') {
		  setModalTitle("Notify BookMark");
		  props.onLoadData("nt");
		  setPropsData({...loadData,'noti_bookmark_seq':'','notify_bookmark_name':'','noti_code':'','noti_name1':'',
				'noti_name2':'',
				'noti_address1':'',
				'noti_address2':'',
				'noti_address3':'',
				'noti_address4':'',
				'noti_address5':'',
				'noti_user_name':'',
				'noti_user_tel':'',
				'noti_user_fax':'',
				'noti_user_dep1':''});
		  notifyData=loadData;
		  setBookmarkView(true);
	  } else {
		  setModalTitle("Notify Info");
		  setPropsData(loadData);
		  notifyData=loadData;
		  setBookmarkView(false);
	  }
      setOpen(!open);
  }

    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		notifyData = data; 
		
	}
	
	const onApplyData = ()=> {
			setOpen(!open);
			setNotice(notifyData);
			props.mergeData(notifyData);
			setColl(true);

	}

	const onSaveBookmark =()=> {

		
		if(notifyData.noti_bookmark_name !=null && notifyData.noti_bookmark_name !="") {

			axios.post("/shipper/setUserNotiBookmark",{user_no:props.user?props.user.user_no:'',data:notifyData},{})								
	  	  	.then(res => {
						  	props.onLoadData("nt");
						  	props.onAlert("success","작성한 BOOKMARK 가 저장되었습니다.");
	  	  	});
		} else {
			props.onAlert("error","notify_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}
	
	const onChangeNoti =(value)=> {

		setNotice({...notice,'notify_bookmark_seq':value.value});
		if(value.value >0) {
			axios.post("/shipper/getUserNotiBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})								
	  	  	.then(res => {
	  	  				    const mergeData = Object.assign(notice,res.data[0]);
	  	  				    setNotice(mergeData);
	  	  					props.mergeData(res.data[0]);
	  	  					setColl(true);
	  	  	});
		}
	}
	
	
	const onInitData = () => {
		notifyData = {...propsData,'noti_bookmark_seq':'','notify_bookmark_name':'','noti_code':'','noti_name1':'',
				'noti_name2':'',
				'noti_address1':'',
				'noti_address2':'',
				'noti_address3':'',
				'noti_address4':'',
				'noti_address5':'',
				'noti_user_name':'',
				'noti_user_tel':'',
				'noti_user_fax':'',
				'noti_user_dep1':''};
		setPropsData(notifyData);
	}
	
	const onBookMarkDelete = (data) => {

		axios.post("/shipper/setUserNotiBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
  	  	              props.onLoadData("nt");
  	  				  props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
  	  	});
		
	}
	
	const onHandleReturnVal = (event,name) => {
		  if(validation.getByte(event.target.value) < 36) {
	    	  let list = {...notice, [name]:event.target.value};
	    	  setNotice(list);
	      } else {
	    	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
	      }
	  }
	
	
	const onPropsReturn = ()=> {
		props.mergeData(notice);
	  }
	
	const onSaveData = () => {
			props.mergeData(notice);
	}

	
	const onCopyData =()=> {
		if(loadData) {
			
		    var list = {...notice,'noti_name1':loadData.cons_name1,'noti_name2':loadData.cons_name2,'noti_address1':loadData.cons_address1,'noti_address2':loadData.cons_address2,'noti_address3':loadData.cons_address3,
			       'noti_address4':loadData.cons_address4,'noti_address5':loadData.cons_address5};
			setNotice(list);
			props.mergeData(list);
		}
	}
	
  return (
    <>
        <Row id="Notify">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'5'}}>
	            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}> 
	            <Row>
	               <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>NOTIFY
	               <Button className="pl-1" color="link" id="notiview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
			            <UncontrolledTooltip delay={0} target="notiview">Input</UncontrolledTooltip>
			         </Col>
                <Col>
                	<Row>
	                   		<Col className="col-10 pr-0">
		                   		<Select
							        className="react-select react-select-primary"
							        classNamePrefix="react-select"
							        name="carrierbookmark"
							        value={{value:notice.notify_bookmark_seq,label:notice.notify_bookmark_name}}
							        onChange={(value)=>onChangeNoti(value)}
							        options={bookmark}
							        placeholder={"선택"}
							    />
						 </Col>
						 <Col className="col-2 pl-auto pr-auto">
						 	<Button className="pl-0 pr-0" color="link" id="notibookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
						    <UncontrolledTooltip delay={0} target="notibookmark">Bookmark</UncontrolledTooltip>
						  </Col>			
					   </Row>
	              </Col>
	           </Row>
	    	    <Col className="col-12 text-right pr-0" style={{paddingTop:'3px'}}>
	                <Button className="btn-link pr-0 pt-0 pb-0 border-bottom-0" color="info" type="button" size="sm" onClick={onCopyData}>
	                same as consinee
	                </Button>
	            </Col>
				        <Collapse isOpen={coll}>
				        {/* <div style={divider}/> */}
				            {/* 보이는 영역 */}
				            	<hr className="mt-0"/>
				            		<Row style={{fontSize:'12px'}}>
						        		<Col xl="12" lg="12" md="12">
						                    <FormGroup className="mb-1">
						                        <Row>
						                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Name</Label></Col>
						                        	<Col>
						                        	<InputValid 
							        	                type="text"
							        	                bsSize="sm"
							        	                name="noti_name1"
							        	                id="noti_name1"
							        	                placeholder=""
							        	                maxLength="35"
							        	                value={notice.noti_name1?notice.noti_name1:''}
							        	                onChange={(e)=>onHandleReturnVal(e, 'noti_name1')}
							        	                onBlur={onPropsReturn}
							        	                validtype="text" 
							        	                required={true}
							        	            />
							        	                {/*<Input type="text" bsSize="sm" name="noti_name1" id="noti_name1" placeholder=""
						                            		invalid={!notice.noti_name1?true:false}
							                        	value={notice.noti_name1?notice.noti_name1:''} onChange = {(event)=>onHandleReturnVal(event,'noti_name1')} 
							                        	onBlur={onPropsReturn}
							                        	/>
						                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	 */ }
						                            </Col>
						                        </Row>
						                     </FormGroup>
						                </Col>
					                	<Col xl="12" lg="12" md="12">
						                    <FormGroup className="mb-1">
						                        <Row>
						                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
						                        	<Col>
							                        	<InputValid 
								        	                type="text"
								        	                bsSize="sm"
								        	                name="noti_name2"
								        	                id="noti_name2"
								        	                placeholder=""
								        	                maxLength="35"
								        	                value={notice.noti_name2?notice.noti_name2:''}
								        	                onChange={(e)=>onHandleReturnVal(e, 'noti_name2')}
								        	                onBlur={onPropsReturn}
								        	                validtype="text" 
								        	                required={false}
								        	            />
								        	                {/*<Input type="text" bsSize="sm" name="noti_name2" id="noti_name2" placeholder=""
							                        		value={notice.noti_name2?notice.noti_name2:''} onChange = {(event)=>onHandleReturnVal(event,'noti_name2')} 
							                        		onBlur={onPropsReturn}
							                        	/>
						                            <FormFeedback>{validation.REQ_MSG}</FormFeedback> */ }	
						                            </Col>
						                        </Row>
						                     </FormGroup>
						                </Col>
						              </Row>					                
						                <Row style={{fontSize:'12px'}}>
							    	    <Col xl="12" lg="12" md="12">
							    	            <FormGroup className="mb-1">
								    	            <Row>
							                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Address</Label></Col>
							                        	<Col>
								                        	<InputValid 
									        	                type="text"
									        	                bsSize="sm"
									        	                name="noti_address1"
									        	                id="noti_address1"
									        	                placeholder=""
									        	                maxLength="35"
									        	                value={notice.noti_address1?notice.noti_address1:''}
									        	                onChange={(e)=>onHandleReturnVal(e, 'noti_address1')}
									        	                onBlur={onPropsReturn}
									        	                validtype="text" 
									        	                required={true}
									        	            />
									        	                {/*<Input bsSize="sm" type="text" name="noti_address1" id="noti_address1" placeholder=""
								                        		invalid={!notice.noti_address1?true:false}
									    	                	value={notice.noti_address1?notice.noti_address1:''}  
								                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address1')} onBlur={onPropsReturn}
									    	                />
									    	                <FormFeedback>{validation.REQ_MSG}</FormFeedback> */ }
								                        </Col>
								                     </Row>
							    	            </FormGroup>
							    	        </Col>
							    	        <Col xl="12" lg="12" md="12">
							    	            <FormGroup className="mb-1">
								    	            <Row>
							                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
							                        	<Col>
								                        	<InputValid 
									        	                type="text"
									        	                bsSize="sm"
									        	                name="noti_address2"
									        	                id="noti_address2"
									        	                placeholder=""
									        	                maxLength="35"
									        	                value={notice.noti_address2?notice.noti_address2:''}
									        	                onChange={(e)=>onHandleReturnVal(e, 'noti_address2')}
									        	                onBlur={onPropsReturn}
									        	                validtype="text" 
									        	                required={false}
									        	            />
									        	                {/*<Input bsSize="sm" type="text" name="noti_address2" id="noti_address2" placeholder="" 
									    	                	value={notice.noti_address2?notice.noti_address2:''}  
								                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address2')} onBlur={onPropsReturn}	
									    	                /> */ }
								                        </Col>
								                     </Row>
							    	            </FormGroup>
							    	        </Col>
							    	        <Col xl="12" lg="12" md="12">
							    	            <FormGroup className="mb-1">
								    	            <Row>
							                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
							                        	<Col>
								                        	<InputValid 
									        	                type="text"
									        	                bsSize="sm"
									        	                name="noti_address3"
									        	                id="noti_address3"
									        	                placeholder=""
									        	                maxLength="35"
									        	                value={notice.noti_address3?notice.noti_address3:''}
									        	                onChange={(e)=>onHandleReturnVal(e, 'noti_address3')}
									        	                onBlur={onPropsReturn}
									        	                validtype="text" 
									        	                required={false}
									        	            />
									        	                {/*<Input bsSize="sm" type="text" name="noti_address3" id="noti_address3" placeholder="" 
									    	                	value={notice.noti_address3?notice.noti_address3:''}  
								                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address3')} onBlur={onPropsReturn}	
									    	                /> */ }
								                        </Col>
								                     </Row>
							    	            </FormGroup>
							    	        </Col>
							    	        <Col xl="12" lg="12" md="12">
							    	            <FormGroup className="mb-1">
								    	            <Row>
							                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
							                        	<Col>
								                        	<InputValid 
									        	                type="text"
									        	                bsSize="sm"
									        	                name="noti_address4"
									        	                id="noti_address4"
									        	                placeholder=""
									        	                maxLength="35"
									        	                value={notice.noti_address4?notice.noti_address4:''}
									        	                onChange={(e)=>onHandleReturnVal(e, 'noti_address4')}
									        	                onBlur={onPropsReturn}
									        	                validtype="text" 
									        	                required={false}
									        	            />
									        	                {/*<Input bsSize="sm" type="text" name="noti_address4" id="noti_address4" placeholder="" 
									    	                	value={notice.noti_address4?notice.noti_address4:''}  
								                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address4')} onBlur={onPropsReturn}	
									    	                /> */ }
								                        </Col>
								                     </Row>
							    	            </FormGroup>
							    	        </Col>
							    	        <Col xl="12" lg="12" md="12">
							    	            <FormGroup className="mb-1">
								    	            <Row>
							                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
							                        	<Col >
								                        	<InputValid 
									        	                type="text"
									        	                bsSize="sm"
									        	                name="noti_address5"
									        	                id="noti_address5"
									        	                placeholder=""
									        	                maxLength="35"
									        	                value={notice.noti_address5?notice.noti_address5:''}
									        	                onChange={(e)=>onHandleReturnVal(e, 'noti_address5')}
									        	                onBlur={onPropsReturn}
									        	                validtype="text" 
									        	                required={false}
									        	            />
									        	                {/*<Input bsSize="sm" type="text" name="noti_address5" id="noti_address5" placeholder="" 
									    	                	value={notice.noti_address5?notice.noti_address5:''}  
								                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'noti_address5')} onBlur={onPropsReturn}	
									    	                /> */ }
								                        </Col>
								                     </Row>
							    	            </FormGroup>
							    	        </Col>
							    	    </Row>
				        </Collapse>
				        <div className="text-center" onClick={() => setColl(!coll)}>
			              	<div>         
			                    <Button
					              className="p-0"
					              color="link"
					              id="notimore"
					              onClick={() => setColl(!coll)}
					              style={{height:'21px'}}
					          >
			                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
					          </Button>
					          <UncontrolledTooltip delay={0} target="notimore">{coll?'Close':'Open'}</UncontrolledTooltip>
				            </div>
			            </div> 
		            </CardBody>
		          </Card>    
            </Col>
        </Row>

        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className="pt-0" size="lg">
            <ModalHeader toggle={toggle} className="pt-3 pb-3">{modalTitle}</ModalHeader>
                <ModalBody className="p-3">
                    {bookmarkView?
                    	<NotifyBookmark loadFormData={propsData} onPropsNtBookmark={onBookMarkData} onPropsNtDeleteBookmark={onBookMarkDelete}  {...props}/>
                    :
                        <Notify type="I"
                        	loadFormData={propsData} propsData={onBookMarkData} {...props}/>
                     } 
                </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={onInitData}>NEW</Button>{' '}
            {bookmarkView?<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>:<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
                <Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default NotifyCard;



