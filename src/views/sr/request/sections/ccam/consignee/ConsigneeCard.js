/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText,Badge,CardFooter,UncontrolledTooltip,FormFeedback} from "reactstrap";
import Select from "react-select";
import AlertModal from 'components/Modals/Alert.js';
import ConsigneeBookmark from '../../consignee/ConsigneeBookmark.js';
import Consignee from './Consignee.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
let consigneeData = {};

const ConsigneeCard = (props) => {

  const {bookmark,loadData,openWindow,validation,samec} = props;

  // Collapse Flag
  const [coll, setColl] = useState(false);
  const [bookmarkView, setBookmarkView] = useState(false);
  const [propsData, setPropsData] = useState([]);
  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const [consignee, setConsignee] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [conSamec, setConSamec] = useState(true);
  const [consBookMark, setConsBookMark] = useState([]);
  
  const [modalTitle, setModalTitle] = useState("Consignee Info");
  
	  useEffect(() => {
		    setConsignee(loadData);
		   // props.mergeData({'cons_samec':conSamec});
		  },[loadData]);
	  
	  useEffect(() => {
		    setColl(openWindow);
		  },[openWindow]);
/*	  useEffect(() => {
		  setConSamec(samec);
	  },[samec]);*/

  const toggle = (params) => {
      
	  if(params==='B') {
		  setClsNm('');
		  setModalTitle("Consignee BookMark");
		  props.onLoadData("cs");
		  setPropsData({...loadData,'cons2_bookmark_seq':'','consignee_bookmark_name':'','cons2_code':'','cons2_name1':'',
				'cons2_name1':'',
				'cons2_address1':'',
				'cons2_address2':'',
				'cons2_address3':'',
				'cons2_address4':'',
				'cons2_address5':'',
				'cons2_user_name':'',
				'cons2_user_tel':'',
				'cons2_user_fax':'',
				'cons2_user_dep1':''});
		  consigneeData=loadData;
		  setBookmarkView(true);
	  } else {
		  setClsNm('');
		  setModalTitle("Consignee Info");
		  setPropsData(loadData);
		  consigneeData=loadData;
		  setBookmarkView(false);
	  }
      setOpen(!open);
  }

  const [clsNm, setClsNm] = useState("");
  
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		consigneeData = data;
		
	}
	
	const onApplyData = ()=> {
			setOpen(!open);
			var data = consigneeData;
			if(props.samec) {
				var cons = {'noti2_name1':data.cons2_name1,'noti2_name2':data.cons2_name2,'noti2_address1':data.cons2_address1,
		    			    'noti2_address2':data.cons2_address2,'noti2_address3':data.cons2_address3,
				            'noti2_address4':data.cons2_address4,'noti2_address5':data.cons2_address5};
				data = {...consigneeData,...cons};
			}
			setConsignee(data);
			props.mergeData(data);
			setColl(true);	
	}


	const onSaveBookmark =()=> {

		
		if((consigneeData.consignee_bookmark_name !=null && consigneeData.consignee_bookmark_name !="") ) {

			axios.post("/shipper/setUserConsBookmark",{user_no:props.user?props.user.user_no:'',data:consigneeData},{})								
	  	  	.then(res => {
	  	                  props.onLoadData("cs");
	  	                  props.onAlert("success","작성한 BOOKMARK 가 등록 되었습니다.");
	  	                 
	  	  	});
		} /*else {
			props.onAlert("error","consignee_bookmark_name 는 필수 입력 항목 입니다.");
		}*/
	}
	
	const onChangeConsignee =(value)=> {

		setConsignee({...consignee,'consignee_bookmark_seq':value.value,'consignee_bookmark_name':value.label});
		if(value.value>0){
			axios.post("/shipper/getUserConsBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})								
	  	  	.then(res => {
	  	  				    const mergeData = Object.assign(consignee,res.data[0]);
	  	  			        setConsignee(mergeData);
	  	  					props.mergeData(res.data[0]);	
	  	  				    setColl(true);
	  	  	});
		}
	}
	
	
	const onInitData = () => {
		
		consigneeData ={...propsData,'cons2_bookmark_seq':'','consignee_bookmark_name':'','cons2_code':'','cons2_name1':'',
				'cons2_name1':'',
				'cons2_address1':'',
				'cons2_address2':'',
				'cons2_address3':'',
				'cons2_address4':'',
				'cons2_address5':'',
				'cons2_user_name':'',
				'cons2_user_tel':'',
				'cons2_user_fax':'',
				'cons2_user_dep1':''};
		setPropsData(consigneeData);
	}
	
	const onBookMarkDelete = (data) => {

		axios.post("/shipper/setUserConsBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
				  	  	props.onLoadData("cs");
				  	    props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
  	  	});
		
	}
	
	const onSaveData = () => {
		props.mergeData(consignee);
	}
	
	const onHandleReturnVal = (event,name) => {
		  let status;
		  if(event.target.value) {
			  status = 'success';
		  } else {
			  status = 'error';
		  }
		  let list = {...consignee, [name]:event.target.value, [name+'_status']:status};
		  setConsignee(list);  
	  }
	
	
	const onPropsReturn = ()=> {
		
		var data = consignee;
		if(props.samec) {
			var cons = {'noti2_name1':data.cons2_name1,'noti2_name2':data.cons2_name2,'noti2_address1':data.cons2_address1,
	    			    'noti2_address2':data.cons2_address2,'noti2_address3':data.cons2_address3,
			            'noti2_address4':data.cons2_address4,'noti2_address5':data.cons2_address5};
			data = {...consignee,...cons};
		}
		props.mergeData(data);
	  }
	
	const onConsSamec = ()=>{
		props.onSetSamec();
	}
	
  return (
    <>
        <Row id="Consignee">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'6'}}>
	            	<CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
	            	<Row>
		               <Col xl="6" className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONSIGNEE
		               <Button className="pl-1" color="link" id="consview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
 			            <UncontrolledTooltip delay={0} target="consview">Input</UncontrolledTooltip>
 			         </Col>
                    <Col>
                    	<Row>
 	                   		<Col className="col-10 pr-0">
		 	                   	<Select
							        className="react-select react-select-primary"
							        classNamePrefix="react-select"
							        name="carrierbookmark"
							        value={{value:consignee.consignee_bookmark_seq,label:consignee.consignee_bookmark_name}}
							        onChange={(value)=>onChangeConsignee(value)}
							        options={bookmark}
							        placeholder={"선택"}
							    />
 						 </Col>
 						 <Col className="col-2 pl-auto pr-auto">
 						 	<Button className="pl-0 pr-0" color="link" id="consbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
 						    <UncontrolledTooltip delay={0} target="consbookmark">Bookmark</UncontrolledTooltip>
 						  </Col>			
 					   </Row>
 	              </Col>
 	           </Row>
	    	    <Col className="col-12 text-right pr-0">
		    	    <FormGroup check className="mb-0">
	                <Label check className="p1-1">
	                	<Input type="checkbox" checked={props.samec}
	                      onChange = {()=>onConsSamec()}
	                	/> 	               
	                  <span className="form-check-sign" />
	                  		<Button className="btn-link pl-0 pr-0 pt-0 pb-0 border-0" color="info" type="button" size="sm" // onClick={onCopyData}
	                  			>same as notify</Button>
	                </Label>
	              </FormGroup>

	            </Col>
				        <Collapse isOpen={coll}>
				        {/* <div style={divider}/> */}
				            {/* 보이는 영역 */}
				            	<hr className="mt-0"/>
				            		<Row >
				        		<Col xl="12" lg="12" md="12">
				                    <FormGroup className="mb-1">
				                        <Row>
				                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Name</Label></Col>
				                        	<Col>
				                        	<InputValid 
					    		                type="text"
					    		                bsSize="sm"
					    		                name="cons2_name1"
					    		                id="cons2_name1"
					    		                placeholder=""
					    		                maxLength="35"
					    		                value={consignee.cons2_name1?consignee.cons2_name1:''}
					    		                onChange={(e)=>onHandleReturnVal(e, 'cons2_name1')}
					    		                onBlur={onPropsReturn}
					    		                validtype="text" 
					    		                required={true}
					    		            />
				                        	{/*	 	<Input type="text" bsSize="sm" name="cons_name1" id="cons_name1" placeholder=""
				                            		invalid={!consignee.cons_name1?true:false}
					                        		value={consignee.cons_name1?consignee.cons_name1:''} onChange = {(event)=>onHandleReturnVal(event,'cons_name1')} 
					                        		onBlur={onPropsReturn}
					                        	/>
				                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	*/}
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
						    		                name="cons2_name2"
						    		                id="cons2_name2"
						    		                placeholder=""
						    		                maxLength="35"
						    		                value={consignee.cons2_name2?consignee.cons2_name2:''}
						    		                onChange={(e)=>onHandleReturnVal(e, 'cons2_name2')}
						    		                onBlur={onPropsReturn}
						    		                validtype="text" 
						    		                required={false}
						    		            />
					                        	{/*	 	<Input type="text" bsSize="sm" name="cons_name2" id="cons_name2" placeholder=""
					                        	value={consignee.cons_name2?consignee.cons_name2:''} onChange = {(event)=>onHandleReturnVal(event,'cons_name2')} 
					                        	onBlur={onPropsReturn}
					                        	/>*/}
				                            </Col>
				                        </Row>
				                     </FormGroup>
				                </Col> 
					    	        <Col xl="12" lg="12" md="12">
					    	            <FormGroup className="mb-1">
						    	            <Row>
					                        	<Col className="pr-0 pt-1 col-2"><Label className="mb-0">Address</Label></Col>
					                        	<Col>
						                        	<InputValid 
							    		                type="text"
							    		                bsSize="sm"
							    		                name="cons2_address1"
							    		                id="cons2_address1"
							    		                placeholder=""
							    		                maxLength="35"
							    		                value={consignee.cons2_address1?consignee.cons2_address1:''}
							    		                onChange={(e)=>onHandleReturnVal(e, 'cons2_address1')}
							    		                onBlur={onPropsReturn}
							    		                validtype="text" 
							    		                required={true}
							    		            />
						                        	{/*		<Input bsSize="sm" type="text" name="cons_address1" id="cons_address1" placeholder=""
						                        		invalid={!consignee.cons_address1?true:false}
							    	                	value={consignee.cons_address1?consignee.cons_address1:''}  
						                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address1')} onBlur={onPropsReturn}
							    	                />
						                        	<FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
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
							    		                name="cons2_address2"
							    		                id="cons2_address2"
							    		                placeholder=""
							    		                maxLength="35"
							    		                value={consignee.cons2_address2?consignee.cons2_address2:''}
							    		                onChange={(e)=>onHandleReturnVal(e, 'cons2_address2')}
							    		                onBlur={onPropsReturn}
							    		                validtype="text" 
							    		                required={false}
							    		            />
						                        	{/*		<Input bsSize="sm" type="text" name="cons_address2" id="cons_address2" placeholder="" 
							    	                	value={consignee.cons_address2?consignee.cons_address2:''}  
						                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address2')} onBlur={onPropsReturn}	
							    	                />*/}
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
							    		                name="cons2_address3"
							    		                id="cons2_address3"
							    		                placeholder=""
							    		                maxLength="35"
							    		                value={consignee.cons2_address3?consignee.cons2_address3:''}
							    		                onChange={(e)=>onHandleReturnVal(e, 'cons2_address3')}
							    		                onBlur={onPropsReturn}
							    		                validtype="text" 
							    		                required={false}
							    		            />
						                        	{/*		<Input bsSize="sm" type="text" name="cons_address3" id="cons_address3" placeholder="" 
							    	                	value={consignee.cons_address3?consignee.cons_address3:''}  
						                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address3')} onBlur={onPropsReturn}	
							    	                />*/}
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
							    		                name="cons2_address4"
							    		                id="cons2_address4"
							    		                placeholder=""
							    		                maxLength="35"
							    		                value={consignee.cons2_address4?consignee.cons2_address4:''}
							    		                onChange={(e)=>onHandleReturnVal(e, 'cons2_address4')}
							    		                onBlur={onPropsReturn}
							    		                validtype="text" 
							    		                required={false}
							    		            />
						                        	{/*	<Input bsSize="sm" type="text" name="cons_address4" id="cons_address4" placeholder="" 
							    	                	value={consignee.cons_address4?consignee.cons_address4:''}  
						                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address4')} onBlur={onPropsReturn}	
							    	                />*/}
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
							    		                name="cons2_address5"
							    		                id="cons2_address5"
							    		                placeholder=""
							    		                maxLength="35"
							    		                value={consignee.cons2_address5?consignee.cons2_address5:''}
							    		                onChange={(e)=>onHandleReturnVal(e, 'cons2_address5')}
							    		                onBlur={onPropsReturn}
							    		                validtype="text" 
							    		                required={false}
							    		            />
						                        {/*	<Input bsSize="sm" type="text" name="cons_address5" id="cons_address5" placeholder="" 
							    	                	value={consignee.cons_address5?consignee.cons_address5:''}  
						                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'cons_address5')} onBlur={onPropsReturn}	
							    	                />*/}
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
					              id="consmore"
					              onClick={() => setColl(!coll)}
					              style={{height:'21px'}}
					          >
			                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
					          </Button>
					          <UncontrolledTooltip delay={0} target="consmore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg" className="pt-0">
            <ModalHeader toggle={toggle} className="pt-3 pb-3">{modalTitle}</ModalHeader>
                <ModalBody className={clsNm}>
                    {bookmarkView?
                    	<ConsigneeBookmark bookmark={bookmark} loadData={propsData} onPropsConsBookmark={onBookMarkData} onPropsConsDeleteBookmark={onBookMarkDelete} validation={validation}/>
                    :
                        <Consignee
                            loadData={propsData} propsData={onBookMarkData} validation={validation}/>
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

export default ConsigneeCard;



