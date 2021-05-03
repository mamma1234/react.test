/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText, Table,UncontrolledTooltip,ButtonGroup}
     from "reactstrap";
import Container from "./Container.js";
import { ExcelRenderer } from "react-excel-renderer";


const ContainerBookmark = (props) => {
	
  const {bookmark,code,pack} = props;

/*	useEffect(() => {
	    //console.log("ContainerbookmarkList 렌더링 될 때마다 수행",pack);
	   // setCntrList([{'cntr_seq':0}]);
	  },[loadData]);*/

  // modal 창을 위한 state
  const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);
  const [cntrList, setCntrList] = useState([]);

  const [bookmarkList, setBookmarkList] = useState({'container_bookmark_name':''});

  
const onHandleReturnVal = (event,name) => {
	  
	  let list = {...bookmarkList, [name]:event.target.value};
	  setBookmarkList(list);  
  }

const onHandleReturnValHan = (event,name) => {
	 if(!props.validation.validationHangle(event.target.value.toUpperCase())) {
	  let list = {...bookmarkList, [name]:event.target.value.toUpperCase()};
	  setBookmarkList(list);	
	 }
 }

const onChangeCntrReturnVal = (event,name) => {
	  
	  let list = {...bookmarkList, [name]:event.target.value};
	  setBookmarkList(list);
	  props.propsData(list);	  
}

const onPropsReturn = ()=> {
	  props.propsData(bookmarkList);
  }

  const onPropsbookmarkList =(data) =>{
	  setBookmarkList(data);
	  props.propsData(data);
  }
  
  const onPropsCntrbookmarkDelete =(data) =>{
		 
	 props.onPropsCntrbookmarkDelete(data);
  }

  return (
    <>
        <Row>
        	<Col>bookmarkList List</Col>
        </Row>
        <Row className="mb-3">
                        <Col xl="12" lg="12" md="12">
                            <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                            	<Card className="card-raised card-form-horizontal no-transition mb-0">
                            		<CardBody className="bg-white p-0">
	                                    <Table className="mb-0" responsive hover size="sm">
	                                        <thead>
	                                            <tr>
	                                                <td className="p-2 bg-info">No.</td>
	                                                <td className="p-2 bg-info">Bookmark Name</td>
	                                                <td className="p-2 bg-info">Action</td>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                        {bookmark.map((element,key)=>{
	                                            // console.log(cntrList, key, element)
	                                            return(
	                                                <tr scope="row" key={key} onClick={()=>{onPropsbookmarkList(element)}}>
	                                                    <td className="p-2">{key+1}</td>
	                                                    <td className="p-2">{element.container_bookmark_name}</td>
	                                                    <td className="td-actions p-1">
				                                        <Button
				                                          className="btn-link"
				                                          color="danger"
				                                          data-toggle="tooltip"
				                                          id={"remove"+key}
				                                          size="sm"
				                                          type="button"
				                                          style={{marginBottom:'0'}}
				                                          onClick={()=>{onPropsCntrbookmarkDelete(element)}}
				                                        >
				                                          <i className="fa fa-times" />
				                                        </Button>
				                                        <UncontrolledTooltip
				                                          delay={0}
				                                          placement="top"
				                                          target={"remove"+key}
				                                        >
				                                          Remove
				                                        </UncontrolledTooltip>
				                                      </td>
	                                                </tr>
	                                            )
	                                        })}
	                                        </tbody>
	                                    </Table>
	                               </CardBody>
                                </Card>
                            </FormGroup>
                        </Col>
                    </Row>
                    
       <Row>
            <Col>bookmarkList Input</Col>
       </Row>
       <hr className="m-2"/>

    	   <Row>
       
       <Col xl="3" lg="3" md="12">
		<FormGroup>
       	<Label className="mb-0">Bookmark Name</Label>
       	<Input type="text" name="container_bookmark_name" id="container_bookmark_name" placeholder=""  value={bookmarkList.container_bookmark_name?bookmarkList.container_bookmark_name:''}
       	    onChange = {(event)=>onHandleReturnVal(event,'container_bookmark_name')}
            onBlur={onPropsReturn}
       	/>
       </FormGroup>		
  </Col>

<Col xl="2" lg="2" md="12">
<FormGroup>
	<Label className="mb-0">PIC Name</Label>
	<Input type="text" name="cntr_auth_user_name" id="cntr_auth_user_name" placeholder="" value={bookmarkList.cntr_auth_user_name?bookmarkList.cntr_auth_user_name:''} 
	  onChange = {(event)=>onHandleReturnVal(event,'cntr_auth_user_name')}
     onBlur={onPropsReturn}
		/>
</FormGroup>		
</Col>
       <Col xl="3" lg="3" md="12">
			<FormGroup>
	        	<Label className="mb-0">Size/Type</Label>
	        	<Input type="select" 
		          value={bookmarkList.cntr_code?bookmarkList.cntr_code:''}
	              onChange={(event)=>onChangeCntrReturnVal(event,'cntr_code')}
		        >
		      		<option value="">선택</option>
		      		{code.length>0?code.map((data,key)=>
		      			<option value={data.cntr_code}>{data.cntr_code_name}</option>
		      		):<></>}
		          </Input>
	        </FormGroup>		
       </Col>
       <Col xl="2" lg="2" md="12">
			<FormGroup>
	       	<Label className="mb-0">Cntr Weight</Label>
	       	<Input type="text" name="cntr_weight" id="cntr_weight" placeholder="" value={bookmarkList.cntr_weight?bookmarkList.cntr_weight:''} 
	       	  onChange = {(event)=>onHandleReturnValHan(event,'cntr_weight')}
	             onBlur={onPropsReturn}
	       		/>
	       </FormGroup>		
	  </Col>
       <Col xl="2" lg="2" md="12">
			<FormGroup>
	        	<Label className="mb-0">Seal No</Label>
	        	<Input type="text" name="cntr_seal" id="cntr_seal" placeholder="" value={bookmarkList.cntr_seal?bookmarkList.cntr_seal:''} 
	        	  onChange = {(event)=>onHandleReturnValHan(event,'cntr_seal')}
                  onBlur={onPropsReturn}
	        		/>
	        </FormGroup>		
       </Col>
 {/* 		<Col xl="2" lg="2" md="2" className="col-6 pr-2">
		<FormGroup>
        	<Label className="mb-0">BkgNo</Label>
        	<Input type="text" name="cntr_res_bkg_no" id="cntr_res_bkg_no" placeholder="" value={bookmarkList.cntr_res_bkg_no?bookmarkList.cntr_res_bkg_no:''}
        	onChange = {(event)=>onHandleReturnValHan(event,'cntr_res_bkg_no')}
            onBlur={onPropsReturn}
        	/>
    	</FormGroup>	
	</Col>*/}
	
       <Col xl="4" lg="4" md="12">
       	<Row>
       		<Col xl="6" lg="6" md="6" className="col-6 pr-2">
	        		<FormGroup>
			        	<Label className="mb-0">Weight</Label>
			        	<Input type="number" name="cntr_total_weight" id="cntr_total_weight" placeholder="" value={bookmarkList.cntr_total_weight?bookmarkList.cntr_total_weight:''}
			        	onChange = {(event)=>onHandleReturnValHan(event,'cntr_total_weight')}
	                    onBlur={onPropsReturn}
			        	/>
		        	</FormGroup>	
       		</Col>
       		<Col xl="6" lg="6" md="6" className="col-6 pl-2">
	        		<FormGroup>
			    		<Label className="mb-0">Volume</Label>
			    		<Input type="number" name="cntr_total_volume" id="cntr_total_volume" placeholder="" value={bookmarkList.cntr_total_volume?bookmarkList.cntr_total_volume:''}
			    		onChange = {(event)=>onHandleReturnValHan(event,'cntr_total_volume')}
	                    onBlur={onPropsReturn}
			    			/>
			    	</FormGroup>
       		</Col>
       	</Row>	
	    </Col>
	   
        <Col xl="2" lg="2" md="12">
		<FormGroup>
        	<Label className="mb-0">Trucker No</Label>
        	<Input type="text" name="cntr_truck_no" id="cntr_truck_no" placeholder="" value={bookmarkList.cntr_truck_no?bookmarkList.cntr_truck_no:''} 
        	onChange = {(event)=>onHandleReturnVal(event,'cntr_truck_no')}
            onBlur={onPropsReturn}/>
        </FormGroup>		
    </Col>
    <Col xl="2" lg="2" md="12">
		<FormGroup>
        	<Label className="mb-0">Consilidation</Label>
        	<Input type="select" 
		        value={bookmarkList.cntr_consolidated_yn?bookmarkList.cntr_consolidated_yn:''}
	            onChange={(event)=>onChangeCntrReturnVal(event,'cntr_consolidated_yn')}
		        >
		      		<option value="">선택</option>
		      		<option value="Y">혼적</option>
		      		<option value="N">비혼적</option>
		      	</Input>	
        </FormGroup>		
    </Col>
	</Row>
   </>
    );
}

export default ContainerBookmark;