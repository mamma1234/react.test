/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText,Badge,CardFooter,UncontrolledTooltip,FormText,FormFeedback,Form} from "reactstrap";
import Select from "react-select";
import ShipperBookmark from './ShipperBookmark.js';
import Shipper from './Shipper.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
let shipperData = {};

const ShipperCard = (props) => {

  const {bookmark,loadData,openWindow,validation} = props;

  // Collapse Flag
  const [coll, setColl] = useState(false);
  const [bookmarkView, setBookmarkView] = useState(false);
  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [color, setColor] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [shipper, setShipper] = useState([]);
  const [propsData, setPropsData] = useState([]);
  const [modalTitle, setModalTitle] = useState("Shipper Info");
  
  
	  useEffect(() => {
		    setShipper(loadData);
		  },[loadData]);
	  
	  useEffect(() => {
		    setColl(openWindow);
		  },[openWindow]);
	  
  const toggle = (params) => {
      
	  if(params==='B') {
		  setModalTitle("Shipper BookMark");
		  props.onLoadData("sh");
		  setPropsData({...loadData,'shipper_bookmark_seq':'','shipper_bookmark_name':'','shp_code':'','shp_name1':'',
				'shp_name2':'',
				'shp_address1':'',
				'shp_address2':'',
				'shp_address3':'',
				'shp_address4':'',
				'shp_address5':'',
				'shp_user_name':'',
				'shp_user_tel':'',
				'sch_user_fax':'',
				'sch_user_dep1':'',
				'sch_user_email':''});
		  shipperData=loadData;
		  setBookmarkView(true);
	  } else {
		  setModalTitle("Shipper Info");
		  setPropsData(loadData);
		  shipperData=loadData;
		  setBookmarkView(false);
	  }
      setOpen(!open);
  }
  
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		shipperData = data;
		
	}
	
	const onApplyData = ()=> {
		
		//if(shipperValidation(shipperData)) {
			setOpen(!open);
			setShipper(shipperData);
			props.mergeData(shipperData);
			setColl(true);	
		//}	
	}

	
	const onSaveBookmark =()=> {

		
		if(shipperData.shipper_bookmark_name !=null && shipperData.shipper_bookmark_name !="") {

			axios.post("/shipper/setUserShpBookmark",{user_no:props.user?props.user.user_no:'',data:shipperData},{})								
	  	  	.then(res => {
	  	  	              props.onLoadData("sh");
	  	  	              props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
	  	  	});
		} else {
			props.onAlert("error","shipper_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}

	
	const onChangeShp =(value)=> {

		setShipper({...shipper,'shipper_bookmark_seq':value.value,'shipper_bookmark_name':value.label});
		
		if(value.value>0) {
			axios.post("/shipper/getUserShpBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})								
	  	  	.then(res => {
	  	  				    const mergeData = Object.assign(shipper,res.data[0]);
	  	  				    setShipper(mergeData);
	  	  					props.mergeData(res.data[0]);
	  	  				    setColl(true);
	  	  	});
		}
	}
	
	const onInitData = () => {
		
		shipperData= {...propsData,'shipper_bookmark_seq':'','shipper_bookmark_name':'','shp_code':'','shp_name1':'',
				'shp_name2':'',
				'shp_address1':'',
				'shp_address2':'',
				'shp_address3':'',
				'shp_address4':'',
				'shp_address5':'',
				'shp_user_name':'',
				'shp_user_tel':'',
				'sch_user_fax':'',
				'sch_user_dep1':'',
				'sch_user_email':''};
		setPropsData(shipperData);
	}
	
	
	const onBookMarkDelete = (data) => {

		axios.post("/shipper/setUserShpBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
  	  				  props.onLoadData("sh");
  	  				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
  	  	});
		
	}
	
	const onSaveData = () => {
		props.mergeData(shipper);
	}
	
	const onHandleReturnVal = (event,name) => {
	      if(validation.getByte(event.target.value) < 36) {
	    	  let list = {...shipper, [name]:event.target.value};
	    	  setShipper(list);
	      } else {
	    	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
	      }
	      
	  }
	
	
	const onPropsReturn = ()=> {
		props.mergeData(shipper);
	  }
	
  return (
    <>
        <Row id="Shipper">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'7'}}>
	            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                	<Row className="pb-4" style={{marginBottom:'5px'}}>
                		<Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SHIPPER
	                		<Button className="pl-1" color="link" id="shpview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
	  			            <UncontrolledTooltip delay={0} target="shpview">Input</UncontrolledTooltip>
	  			         </Col>
	                     <Col>
	                     	<Row>
	  	                   		<Col className="col-10 pr-0">
			  	                   	<Select
								        className="react-select react-select-primary"
								        classNamePrefix="react-select"
								        name="carrierbookmark"
								        value={{value:shipper.shipper_bookmark_seq,label:shipper.shipper_bookmark_name}}
								        onChange={(value)=>onChangeShp(value)}
								        options={bookmark}
								        placeholder={"선택"}
								    />
	  						 </Col>
	  						 <Col className="col-2 pl-auto pr-auto">
	  						 	<Button className="pl-0 pr-0" color="link" id="shpbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
	  						    <UncontrolledTooltip delay={0} target="shpbookmark">Bookmark</UncontrolledTooltip>
	  						  </Col>			
	  					   </Row>
	  	              </Col>
	  	           </Row>
				        <Collapse isOpen={coll} className="pb-1"> 
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
						         	                name="shp_name1"
						         	                id="shp_name1"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.shp_name1?shipper.shp_name1:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'shp_name1')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={true}
						         	            />
						         	               {/*	<Input type="text" bsSize="sm" name="shp_name1" id="shp_name1" placeholder=""
						                        	invalid={!shipper.shp_name1?true:false}
						                        	value={shipper.shp_name1?shipper.shp_name1:''} onChange = {(event)=>onHandleReturnVal(event,'shp_name1')} 
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
						         	                name="shp_name2"
						         	                id="shp_name2"
						         	                placeholder=""
						         	                maxLength="35"
						         	                value={shipper.shp_name2?shipper.shp_name2:''}
						         	                onChange={(e)=>onHandleReturnVal(e, 'shp_name2')}
						         	                onBlur={onPropsReturn}
						         	                validtype="text" 
						         	                required={false}
						         	            />
						         	               {/*	<Input type="text" bsSize="sm" name="shp_name2" id="shp_name2" placeholder=""
						                        	value={shipper.shp_name2?shipper.shp_name2:''} onChange = {(event)=>onHandleReturnVal(event,'shp_name2')} 
						                        	onBlur={onPropsReturn}
						                        	/>
					                         	*/}
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
								         	                name="shp_address1"
								         	                id="shp_address1"
								         	                placeholder=""
								         	                maxLength="35"
								         	                value={shipper.shp_address1?shipper.shp_address1:''}
								         	                onChange={(e)=>onHandleReturnVal(e, 'shp_address1')}
								         	                onBlur={onPropsReturn}
								         	                validtype="text" 
								         	                required={true}
								         	            />
								         	               {/*<Input bsSize="sm" type="text" name="shp_address1" id="shp_address1" placeholder=""
								    	                	//valid={carrierData.shp_address1?true:false}
								    	                    invalid={!shipper.shp_address1?true:false}
								    	                	value={shipper.shp_address1?shipper.shp_address1:''}  
							                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address1')} onBlur={onPropsReturn}
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
								         	                name="shp_address2"
								         	                id="shp_address2"
								         	                placeholder=""
								         	                maxLength="35"
								         	                value={shipper.shp_address2?shipper.shp_address2:''}
								         	                onChange={(e)=>onHandleReturnVal(e, 'shp_address2')}
								         	                onBlur={onPropsReturn}
								         	                validtype="text" 
								         	                required={false}
								         	            />
								         	               {/*<Input bsSize="sm" type="text" name="shp_address2" id="shp_address2" placeholder="" 
								    	                	value={shipper.shp_address2?shipper.shp_address2:''}  
							                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address2')} onBlur={onPropsReturn}	
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
								         	                name="shp_address3"
								         	                id="shp_address3"
								         	                placeholder=""
								         	                maxLength="35"
								         	                value={shipper.shp_address3?shipper.shp_address3:''}
								         	                onChange={(e)=>onHandleReturnVal(e, 'shp_address3')}
								         	                onBlur={onPropsReturn}
								         	                validtype="text" 
								         	                required={false}
								         	            />
								         	               {/*<Input bsSize="sm" type="text" name="shp_address3" id="shp_address3" placeholder="" 
								    	                	value={shipper.shp_address3?shipper.shp_address3:''}  
							                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address3')} onBlur={onPropsReturn}	
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
								         	                name="shp_address4"
								         	                id="shp_address4"
								         	                placeholder=""
								         	                maxLength="35"
								         	                value={shipper.shp_address4?shipper.shp_address4:''}
								         	                onChange={(e)=>onHandleReturnVal(e, 'shp_address4')}
								         	                onBlur={onPropsReturn}
								         	                validtype="text" 
								         	                required={false}
								         	            />
								         	               {/*<Input bsSize="sm" type="text" name="shp_address4" id="shp_address4" placeholder="" 
								    	                	value={shipper.shp_address4?shipper.shp_address4:''}  
							                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address4')} onBlur={onPropsReturn}	
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
								         	                name="shp_address5"
								         	                id="shp_address5"
								         	                placeholder=""
								         	                maxLength="35"
								         	                value={shipper.shp_address5?shipper.shp_address5:''}
								         	                onChange={(e)=>onHandleReturnVal(e, 'shp_address5')}
								         	                onBlur={onPropsReturn}
								         	                validtype="text" 
								         	                required={false}
								         	            />
							                        	{/*<Input bsSize="sm" type="text" name="shp_address5" id="shp_address5" placeholder="" 
								    	                	value={shipper.shp_address5?shipper.shp_address5:''}  
							                        	maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address5')} onBlur={onPropsReturn}	
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
					              id="shpmore"
					              onClick={() => setColl(!coll)}
					              style={{height:'21px'}}
					          >
			                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
					          </Button>
					          <UncontrolledTooltip delay={0} target="shpmore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
                    	<ShipperBookmark loadFormData={propsData} onPropsShBookmark={onBookMarkData} onPropsShDeleteBookmark={onBookMarkDelete}
                        {...props} />
                    :
                        <Shipper type="I" loadFormData={propsData} propsData={onBookMarkData} {...props} 
                    	/>
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

export default ShipperCard;



