/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup, Label,Input, Card, CardHeader, CardTitle, CardText,FormFeedback,InputGroup,InputGroupAddon,InputGroupText,UncontrolledTooltip} from "reactstrap";
import * as validation from 'components/common/validation.js';
import TitleBookmark from './TitleBookmark.js';
import axios from "axios";
import moment from 'moment';
import ReactDatetime from "react-datetime";
import Select from "react-select";
var bookmark = {}; 

const SRTItleCard = (props) => {
	
  const {loadData,bookmark} = props;	

  // modal 창을 위한 state
  const [coll, setColl] = useState(true);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState("success");
  const [message, setMessage] = useState("정상 처리되었습니다.");
  const [sr, setSr] = useState([]);
  const [modalTitle, setModalTitle] = useState("SR Bookmark");
  const [propsData, setPropsData] = useState({}); 
  const [bookmarkData,setBookmarkData] =useState({});
  
  useEffect(() => {
	  setSr(loadData);
	  },[loadData]);
  
  
 const toggle = (params) => {
	      setBookmarkData({});
	      onInitData();
		  props.onLoadData("tt");
          setOpen(!open);
  }
 
   
  const fncOnChange = (e, key) => {
        e.preventDefault();
        let list = {...sr, [key]:e.target.value};
        setSr(list);      
  }

  const fncOnKeyPressSR = (e) => {
     if( "Enter" === e.key  && (loadData.sr_no != sr.sr_no)) {
    	 getSRInfo();
     }
  }
  
  const fncOnBlur =(e)=> {
		  props.mergeData(sr);  
  }
  
  const getSRInfo=()=> {
	  axios.post("/shipper/getUserSrDataList",{user_no : props.user?props.user.user_no:'',data:{'sr_no':sr.sr_no},link:'N',list:'N'},{}
      ).then(res => {
                     setSr(res.data);
                     props.mergeData(res.data);
      }
      );
  }
  
  const onChangeTitle =(data)=>{
	  setSr({...sr,'bookmark_seq':data.value,'bookmark_name':data.label});
	  
	  axios.post("/shipper/setUserSrBookmarkDataList",{user_no : props.user?props.user.user_no:'',seq:data.value},{}
      ).then(res => props.mergeData({...sr,...res.data,'bookmark_seq':data.value,'bookmark_name':data.label}));	  
  }
  
  const onInitData = () => {
	  setPropsData({'bookmark_name':'','booking_label':'선택','booking_value':'','schedule_label':'선택','schedule_value':'',
		            'carrier_label':'선택','carrier_value':'','shipper_label':'선택','shipper_value':'','consignee_label':'선택',
		            'consignee_value':'','notify_label':'선택','notify_value':'','cargo_label':'선택','cargo_value':''});		
	}

  
  //선택
  const onSelectProps = (data)=> {
	  axios.post("/shipper/getSRbookmarkRelation",{user_no: props.user?props.user.user_no:'',seq: data.bookmark_seq})
	  .then(res=>{
		         var list =data;
		  		  res.data.map((data)=>{
		  			  if(data.reference_type === 'BOOKING'){
		  				  list = {...list,'booking_label':data.label,'booking_value':data.reference_seq};
		  			  } else if(data.reference_type === 'SCHEDULE'){
		  				  list = {...list,'schedule_label':data.label,'schedule_value':data.reference_seq};
		  			  } else if(data.reference_type === 'CARRIER'){
		  				list = {...list,'carrier_label':data.label,'carrier_value':data.reference_seq};
		  			  } else if(data.reference_type === 'SHIPPER'){
		  				list = {...list,'shipper_label':data.label,'shipper_value':data.reference_seq};
		  			  } else if(data.reference_type === 'CONSIGNEE'){
		  				list = {...list,'consignee_label':data.label,'consignee_value':data.reference_seq};
		  			  } else if(data.reference_type === 'NOTIFY'){
		  				list = {...list,'notify_label':data.label,'notify_value':data.reference_seq};
		  			  } else if(data.reference_type === 'CARGO'){
		  				list = {...list,'cargo_label':data.label,'cargo_value':data.reference_seq};
		  			  }		
		  		  });
		  		setPropsData(list);
	  });
  }
  //북마크 등록
  const onInsertProps = (data) => { 
	  setBookmarkData(data);
  }
  //북마크 삭제
  const onDeleteProps = (data)=> {
	  axios.post("/shipper/setUserTitleBookmarkDel",{user_no:props.user?props.user.user_no:'',seq: data.bookmark_seq})
	  .then(res=>{ onInitData(); 
		           props.onLoadData("tt");
			       props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
		           
	  });
  }
  //북마크 DB 등록
  const onInsertBookmark =()=>{
	  //console.log(bookmarkData);
     if(bookmarkData && (bookmarkData.bookmark_name !== undefined && bookmarkData.bookmark_name !== '')) {
		  axios.post("/shipper/setUserTitleBookmark",{user_no:props.user?props.user.user_no:'',data: bookmarkData})
		  .then(res=>{  props.onLoadData("tt");
	                    props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");          
		  });
     } /*else {
    	 props.onAlert("error","[Bookmark Name]"+validation.REQ_MSG);   
     }*/
  }
  
  return (
    <>
              <Row>
               
              	<Col xl="3" lg="3" md="12">
              		<FormGroup>
              			<Label className="mb-0">SR Number</Label>
                        <Input type="text" name="sr_no" id="sr_no" placeholder="" value={sr.sr_no?sr.sr_no:''} maxLength="15"
                	       invalid={!sr.sr_no?true:false}
                          onChange={(e)=>fncOnChange(e, 'sr_no')}
	  	                  onBlur={(e)=>fncOnBlur(e)}
                          disabled
                        />   
                        <FormFeedback>{validation.REQ_MSG}</FormFeedback>
                    </FormGroup>
                </Col>  
              	<Col xl="2" lg="2" md="12">
	              	 <FormGroup>
		    	        <Label className="mb-0">SR Date</Label>
		    	        <InputGroup className="date" id="etd">
			    	        <Input type="text" name="sr_date" id="sr_date"
			    	        value={sr.sr_date?moment(sr.sr_date).format('YYYY-MM-DD'):moment(new Date()).format('YYYY-MM-DD')}
			                       disabled
			                     />
		    	            <InputGroupAddon addonType="append">
		    	                <InputGroupText>
		    	                    <span className="glyphicon glyphicon-calendar">
		    	                    <i className="fa fa-calendar" />
		    	                    </span>
		    	                </InputGroupText>
		    	            </InputGroupAddon>
		    	        </InputGroup>
		    	        <FormFeedback>{validation.REQ_MSG}</FormFeedback>
		    	    </FormGroup>
	            </Col>
	            
                       {sr.status_cus?
                        <Col xl="2" lg="2" md="12" className="mr-auto">
                        <FormGroup>
                            <Label className="mb-0">Status</Label>
                            <Input type="select" name="status_cus" id="status_cus" placeholder="현재 상태"
                                value={sr.status_cus?sr.status_cus:''}
                                readOnly>
                                <option value="NO">현재상태</option>
                                <option value="S0">저장</option>
                                <option value="S9">전송</option>
                                <option value="S4">정정전송</option>
                                <option value="S1">취소전송</option>
                                <option value="BC">승인</option>
                                <option value="RJ">거절</option>
                                <option value="CC">취소승인</option>
                                <option value="RC">승인취소</option>
                            </Input>
                        </FormGroup>
                    </Col>:null}
                    <Col xl="4" className="col-8 ml-auto mr-0 mb-3">
	       		       	<Row>
			           		<Col className="col-10 pr-0 ml-auto"   style={{zIndex:'13'}}>
			           	    	<Label className="mb-0"/>
			               		<Select 
							        className="react-select react-select-primary"
							        classNamePrefix="react-select"
							        name="all_bookmark"
							        value={{value:sr.bookmark_seq,label:sr.bookmark_name}}
							        onChange={(value)=>onChangeTitle(value)}
							        options={bookmark}
							        placeholder={"선택"}
						        />
							 </Col>
							 <Col className="col-2 pl-auto pr-auto pt-3">
							 	<Button className="pl-0 pr-0" color="link" id="Allbookmark" onClick={toggle}><i className="fa fa-bookmark-o fa-2x" /></Button>
							    <UncontrolledTooltip delay={0} target="Allbookmark">Bookmark</UncontrolledTooltip>
							  </Col>			
					   </Row>
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
                               	<TitleBookmark 
                                               titleProps={propsData} 
                                               selectProps={(data)=>onSelectProps(data)}
                                               insertProps={(data)=>onInsertProps(data)}
                               	               deleteProps={(data)=>onDeleteProps(data)}
                                               {...props} 
                                 />
                           </ModalBody>
                       <ModalFooter>
	                       <Button color="secondary" onClick={onInitData}>NEW</Button>{' '}
	                       <Button color="primary" onClick={onInsertBookmark}>SAVE</Button>{' '}
	                       <Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
                       </ModalFooter>
                   </Modal>
               
    </>
    );
}

export default SRTItleCard;