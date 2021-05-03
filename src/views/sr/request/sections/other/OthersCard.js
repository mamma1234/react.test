/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
     Button,FormGroup,Label,Input, Card, UncontrolledTooltip,FormText,FormFeedback} from "reactstrap";
import Select from "react-select";
import OthersBookmark from './OthersBookmark.js';
import Others from './Others.js';
import axios from 'axios';
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

let othersData = {};

const OthersCard = (props) => { 
   const {bookmark,loadData,openWindow} = props;
   const [others, setOthers] = useState([]);
   const [propsData, setPropsData] = useState({});
   const [bkgData, setBkgData] = useState([]);
   const [bookmarkView, setBookmarkView] = useState(false);
   const [modalTitle, setModalTitle] = useState("Booking Info");
   const [coll, setColl] = useState(false);
   const [open, setOpen] = useState(false);
   const [serviceList, setServiceList] = useState([]);
   
  useEffect(() => {
	    setOthers(loadData); 
	    if(props.user) {
	        axios.post(
	            "/shipper/selectLineCodeServiceType"
	            ,{ params:{
	                line_code:'WDFC'
	            } }
	        ).then(res => setServiceList(res.data));
	    }   
  },[loadData]);
  
  useEffect(() => {
	    setColl(openWindow);
	  },[openWindow]);
  
const toggle = (params) => {
  
  if(params==='B') {
	  setModalTitle("Booking BookMark");
	  props.onLoadData("ot");
	  setPropsData({'other_bookmark_name':'','other_bookmark_seq':'','sc_no':'',
			'document_no':'',
			'trans_service_code':'',
			'bl_type':'',
			'line_payment_type':'',
			'hbl_yn':'N',
			'remark1':'',
			'remark2':''});
	  othersData=loadData;
	  setBookmarkView(true);
  } else {
	  setModalTitle("Booking Info");
	  setPropsData(loadData);
	  othersData=loadData;
	  setBookmarkView(false);
	  getUserBookingList(loadData);
  }
  setOpen(!open);
}
  
  // 전체화면 css 적용을 위한 state
  
  const getUserBookingList = (data) => {

		axios.post("/shipper/getUserBookingInfo",{user_no:props.user?props.user.user_no:'',bkg_no:''},{})								
	  	.then(res => { setBkgData(res.data);
	  	});
		
	}
  
  const onInitData = () => {

	  setPropsData({'other_bookmark_name':'','sc_no':'',
			//'document_no':'',
			'trans_service_code':'',
			'bl_type':'',
			'line_payment_type':'',
			'hbl_yn':'N'
			});
	 
	}
  
	const onBookMarkDelete = (data) => {

		axios.post("/shipper/setUserOtherBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
  	  				props.onLoadData("ot");
  	  				props.onAlert("success","선택한 BOOKMARK 가 삭제되었습니다.");
  	  	});
		
	}
	
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		othersData = data;
		
	}
	
	//const onApplyData = async ()=> {
	const onApplyData = ()=> {
	
		
	        let bkg_no;
			setOpen(!open);
			setOthers(othersData);
			props.mergeData(othersData);
			/*if(othersData.bkglist && othersData.bkglist.length > 0) {
				othersData.bkglist.map((data,key)=> {bkg_no=data.value});
				  if(bkg_no) {
					 await getBkgInfo(othersData,bkg_no,othersData.bkglist);
				  }	
			}*/
			setColl(true);	
	}
	
const onSaveBookmark =()=> {

		
		if(othersData.other_bookmark_name !==null && othersData.other_bookmark_name !=="") {

			axios.post("/shipper/setUserOthersBookmark",{user_no:props.user?props.user.user_no:'',data:othersData},{})								
	  	  	.then(res => {props.onLoadData("ot");
	  	  props.onAlert("success","작성한 BOOKMARK 가 저장되었습니다.");
	  	  	});
		} else {
			props.onAlert("error","other_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}

const onChangeOthers =(value)=> {

	setOthers({...others,'other_bookmark_seq':value.value,'other_bookmark_name':value.label});

	if(value.value > 0) {
		axios.post("/shipper/getUserOtherBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})								
		  	.then(res => {
		  				    const mergeData = Object.assign(others,res.data[0]);
		  				    setOthers(mergeData);
		  					props.mergeData(res.data[0]);
		  				    setColl(true);
		  	});
	}
}

	  const onHandleReturnVal = (event,name) => { 
	      if(validation.getByte(event.target.value) < 36) {
	    	  if(!validation.validationHangle(event.target.value.toUpperCase())) {
		    	  let list = {...others, [name]:event.target.value.toUpperCase()};
		    	  setOthers(list);
	    	  }
	      } else {
	    	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
	      }
	  }
	  
	  const onHandleSelectReturnVal = (event,name) => {
		  
		  let list = {...others, [name]:event.target.value};
		  setOthers(list);	  
		  props.mergeData(list);
	 }
	
	  const onPropsReturn = ()=> {
		  props.mergeData(others);
	  }

	  
	  const onBlurBooking = () => {  
		  if(loadData.res_bkg_no != others.res_bkg_no) {
			  getBkgInfo();
		  }
	  }  
	  
	  const getBkgInfo=(list,bkgNo,bkglist)=>{
		  axios.post("/shipper/getUserBookingInfo",{user_no:props.user?props.user.user_no:'',bkg_no:bkgNo},{})								
	      .then(res => { 
		  		if(res.data.length > 0 ) { 
		  		    let cons = {};
		  		    
		  		    if(props.samec) {
		  		    	
		  		    	cons = {'noti_name1':res.data[0].cons_name1,'noti_name2':res.data[0].cons_name2,'noti_address1':res.data[0].cons_address1,
		  		    			    'noti_address2':res.data[0].cons_address2,'noti_address3':res.data[0].cons_address3,
		  				            'noti_address4':res.data[0].cons_address4,'noti_address5':res.data[0].cons_address5};
		  		    }
		  	         
		  		    let data = {...list,...res.data[0],'sch_srd':res.data[0].sch_etd,'bk_link':'Y','bkglist':bkglist,...cons};
		  			setOthers(data);	
		  			props.mergeData(data);
		  		} else {
		  			let data = {...list,'res_bkg_no':bkgNo,'bk_link':'N','bkglist':bkglist};
		  			setOthers(data);	
		  			props.mergeData(data);
		  		}
		  }); 
	  }
	  
	  const onChangeBookings = async(value)=>{
		  let bkg_no;
		  let list;
		  if(value) {
			  
		      if(value.length>0) {
		    	  value.map((data,key)=> {bkg_no=data.value});
		    	  list = value;
		      } else {
		    	  list = [value];
		    	  bkg_no = value.res_bkg_no;
		      }
			  if(bkg_no) {
				  await getBkgInfo(others,bkg_no,list);
			  }	  	  
		  } else {
			  setOthers({...others,'bkglist':value});	
	  		  props.mergeData({...others,'bkglist':value});
		  }
	  }

	  
  return (
    <>
        <Row id="Others">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'10'}}>
	            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
	            <Row className="pb-2">
	               <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>BOOKING
	               <Button
		              className="pl-1"
			              color="link"
			              //outline
			              id="otview"
			              onClick={toggle.bind(this, 'S')}
			              //style={{position:'relative',backgroundColor:'white'}}
			          >
			          <i className="fa fa-pencil-square-o fa-2x"/>
			          </Button>
			          <UncontrolledTooltip delay={0} target="otview">Input</UncontrolledTooltip></Col>
                   <Col>
                   		<Row>
	                   		<Col className="col-10 pr-0">
							    <Select
							        className="react-select react-select-primary"
							        classNamePrefix="react-select"
							        name="bookingbookmark"
							        value={{value:others.other_bookmark_seq,label:others.other_bookmark_name}}
							        onChange={(value)=>onChangeOthers(value)}
							        options={bookmark}
							        placeholder={"선택"}
							    />
						 </Col>
						 <Col className="col-2 pl-auto pr-auto">
						 	<Button className="pl-0 pr-0" color="link" id="otbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
						    <UncontrolledTooltip delay={0} target="otbookmark">Bookmark</UncontrolledTooltip>
						  </Col>			
					   </Row>
	              </Col>
	              </Row>
	              <Collapse isOpen={coll}>
	              	   <hr className="mt-0"/>
                    <Row style={{fontSize:'12px'}}>
	                    <Col className="col-12">
		                    <FormGroup className="mb-1">
		                        <Row>
		                        	<Col xl="1" className="col-2" style={{marginRight:'6px'}}><Label className="mb-0">Bkg&nbsp;No</Label></Col>
		                        	<Col>
			                        	<Select
			                                    className="customSelect react-select-primary"
			                                    classNamePrefix="customSelect"
			                                    //className="react-select react-select-primary"
			                                    //classNamePrefix="react-select"
			                                    name="bkg_no"
			                                    placeholder=""
			                                    value={others.bkglist}
			                        	        onChange={(value)=>onChangeBookings(value)}                          
			                                    options={bkgData}
					                        	 styles={{
					                        		    control: provided => ({...provided,border:!others.res_bkg_no?'1px solid red':'' }),
													     indicatorContainer: provided => ({...provided,color:''})
											        }}
			                                />
		                       { /*		<Select
										    className="react-select"
										        //isMulti
										        options={bkgData}
										        placeholder="BKG NUMBER"
										        value={others.bkglist}	
										        //closeMenuOnSelect={false}
		                        		        onChange={(value)=>onChangeBookings(value)}
										        styles={{
										          menu: provided => ({...provided, zIndex:9999}),
													 control: provided => ({...provided,minHeight:'31px' }),
												     indicatorsContainer: provided => ({...provided,height:'31px'})
										        }}
										      />
*/}		                            	{others.bk_link === 'Y'?<FormText className="text-success">Booking Data Linked...</FormText>:<></>} 
										{!others.res_bkg_no?<FormText className="text-danger">필수</FormText>:<></>}  
		                            </Col>
		                        </Row>
		                     </FormGroup>
		                </Col>
		                <Col>
	                    <FormGroup className="mb-1">
	                        <Row>
	                        	<Col xl="2" className="col-2 pr-0"><Label className="mb-0">CS No</Label></Col>
	                        	<Col>
	                            	{/*<Input type="text" bsSize="sm" name="sc_no" id="sc_no" placeholder=""
		                        	  invalid={!others.sc_no?true:false}
		                        	  value={others.sc_no?others.sc_no:''} 
	                            	  onChange = {(event)=>onHandleReturnVal(event,'sc_no')} 
		                        	  onBlur={onPropsReturn}
		                        	/>
	                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	*/}
	                            <InputValid 
		                            type="text"
		                            bsSize="sm"
		                            name="sc_no"
		                            id="sc_no"
		                            placeholder=""
		                            maxLength="15"
		                            value={others.sc_no?others.sc_no:''}
		                            onChange={(e)=>onHandleReturnVal(e, 'sc_no')}
		                            onBlur={onPropsReturn}
		                            validtype="text" 
		                            required={false}
	                                feedid="booking"
		                        />
	                            </Col>
	                        </Row>
	                     </FormGroup>
	                </Col>
	                
		                <Col xl="5" lg="12" md="12">
		                    <FormGroup className="mb-1">
		                        <Row>
		                        	<Col xl="3" className="pr-0 pt-1 col-2"><Label className="mb-0">BL&nbsp;Type</Label></Col>
		                        	<Col>
			                        	<Input type="select"  bsSize="sm" className="pt-0 pb-0" value={others.bl_type?others.bl_type:''} onChange = {(event)=>onHandleSelectReturnVal(event,'bl_type')}
			                        	invalid={!others.bl_type?true:false}
			                        	>
								      		<option value="">선택</option>
								      		<option value="1">Ocean B/L</option>
								      		<option value="2">Seaway B/L</option>
								          </Input>
		                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
		                            </Col>
		                        </Row>
		                     </FormGroup>
		                </Col>
		                
		            	<Col xl="7" lg="12" md="12">
			                    <FormGroup className="mb-1">
		                        <Row>
		                        	<Col xl="2" className="pr-0 pt-1 col-2"><Label className="mb-0">Term</Label></Col>
		                        	<Col>
		                        	<Input bsSize="sm" className="pt-0 pb-0" type="select" value={others.trans_service_code?others.trans_service_code:''} onChange = {(event)=>onHandleSelectReturnVal(event,'trans_service_code')}
		                        	invalid={!others.trans_service_code?true:false}>
								      		<option value="">선택</option>
								      		{(serviceList.length>0)?serviceList.map((element,key)=>{
					                            return(
					                                <option key={key} value={element.service_code}>
					                                    {element.service_type}
					                                </option>
					                            )
					                        })
					                        :<></>}
								          </Input>
		                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
		                            </Col>
		                        </Row>
		                     </FormGroup>
		                </Col>		 
		              	
		                <Col xl="5" lg="12" md="12">
		                    <FormGroup className="mb-1">
		                        <Row>
		                        	<Col xl="3" className="pr-0 pt-1 col-2"><Label className="mb-0">H-BL</Label></Col>
		                        	<Col>
		                        	 <Input type="select"  bsSize="sm" className="pt-0 pb-0" value={others.hbl_yn?others.hbl_yn:''} onChange = {(event)=>onHandleSelectReturnVal(event,'hbl_yn')}
		                        	 invalid={!others.hbl_yn?true:false} >
		                        	    <option value="">선택</option>
			 			                <option value="N">No</option>
			 				      		<option value="Y">Yes</option>
			 				         </Input>
		                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
		                            </Col>
		                        </Row>
		                     </FormGroup>
		                </Col>
		                <Col xl="7" lg="12" md="12">
		                    <FormGroup className="mb-1">
		                        <Row>
		                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Ocean Freight</Label></Col>
		                        	<Col>
			                        	<Input type="select"  bsSize="sm" className="pt-0 pb-0" value={others.line_payment_type?others.line_payment_type:''} 
			                        			onChange = {(event)=>onHandleSelectReturnVal(event,'line_payment_type')}
			                        	        invalid={!others.line_payment_type?true:false}
			                        	>
							                <option value="">선택</option>
							                <option value="P">PREPAID</option>
								      		<option value="C">COLLECTED</option>
								         </Input>
		                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
		                            </Col>
		                        </Row>
		                     </FormGroup>
		                </Col>	          
	              	</Row>   	
		          </Collapse>
		          <div className="text-center" onClick={() => {getUserBookingList(loadData);setColl(!coll);}}>
	              	<div>         
	                    <Button
			              className="p-0"
			              color="link"
			              //outline
			              id="otmore"
			              onClick={() => {getUserBookingList(loadData);setColl(!coll);}}
			              style={{height:'21px'}}
			          >
	                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
			          </Button>
			          <UncontrolledTooltip delay={0} target="otmore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
                		<OthersBookmark bookmark={bookmark} loadFormData={propsData} onPropsOtBookmark={onBookMarkData} onPropsOtDeleteBookmark={onBookMarkDelete} term = {serviceList} {...props} />	
                	    :
                        <Others type="I" loadFormData={propsData} bkgData={bkgData} propsData={onBookMarkData} term = {serviceList} {...props} />
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

export default OthersCard;