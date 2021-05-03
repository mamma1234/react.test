/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Table ,Col, FormGroup,Label,Input,FormFeedback } from "reactstrap";
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

const Shipper = (props) => {
 const {bookmark,loadFormData,type} = props;	
 const [shipperData,setShipperData] = React.useState([]);
 
  useEffect(() => {
    setShipperData(loadFormData);
  },[loadFormData]);


  const onHandleReturnVal = (event,name) => {
	  if(validation.getByte(event.target.value) < 36) {
    	  let list = {...shipperData, [name]:event.target.value};
    	  setShipperData(list);
      } else {
    	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
      }
  }
  
  const onPropsReturn = ()=> {
	  props.propsData(shipperData);
  }
  
  return (
    <>
    {type==="B"?<Row>
	        <Col xl="6" lg="6" md="12">
		        <FormGroup className="mb-2">
		            <Label className="mb-0">BookMark Name</Label>
		            <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="shipper_bookmark_name"
		                id="shipper_bookmark_name"
		                placeholder=""
		                maxLength="35"
		                value={shipperData.shipper_bookmark_name?shipperData.shipper_bookmark_name:''}
		                onChange={(e)=>onHandleReturnVal(e, 'shipper_bookmark_name')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={true}
		            />
		           {/* <Input type="text" name="shp_bookmark_name" id="shp_bookmark_name" placeholder="" 
                	    invalid={!shipperData.shipper_bookmark_name?true:false}
		            	value={shipperData.shipper_bookmark_name} 
		            onChange = {(event)=>onHandleReturnVal(event,'shipper_bookmark_name')} 
		            onBlur={onPropsReturn}
		            	/>
		            <FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
		        </FormGroup>
	        </Col>
	     </Row>:<></>}
        <Row>
	        <Col xl="5" lg="5" md="12">
		        <FormGroup className="mb-2">
		            <Label className="mb-0">Shipper Name1</Label>
		            <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="shp_name1"
		                id="shp_name1"
		                placeholder=""
		                maxLength="35"
		                value={shipperData.shp_name1?shipperData.shp_name1:''}
		                onChange={(e)=>onHandleReturnVal(e, 'shp_name1')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={type==="B"?false:true}
		            />
		            {/* <Input type="text" name="shp_name1" id="shp_name1" placeholder=""
		            	invalid={!bookmark&&!shipperData.shp_name1?true:false}
		            	value={shipperData.shp_name1} onChange = {(event)=>onHandleReturnVal(event,'shp_name1')} onBlur={onPropsReturn}
		            	/><FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
		            
		        </FormGroup>
		    </Col>
	        <Col xl="5" lg="5" md="12">
		        <FormGroup className="mb-2">
		            <Label className="mb-0">Shipper Name2</Label>
		            <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="shp_name2"
		                id="shp_name2"
		                placeholder=""
		                maxLength="35"
		                value={shipperData.shp_name2?shipperData.shp_name2:''}
		                onChange={(e)=>onHandleReturnVal(e, 'shp_name2')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
		            />
		            {/*   <Input type="text" name="shp_name2" id="shp_name2" placeholder=""
		            	value={shipperData.shp_name2} onChange = {(event)=>onHandleReturnVal(event,'shp_name2')} onBlur={onPropsReturn}
		            	/>*/}
		        </FormGroup>
		    </Col>
	    </Row>
	    <Row>
	        <Col xl="6" lg="6" md="6">
	            <FormGroup className="mb-2">
	                <Label className="mb-0">Address1</Label>
	                <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="shp_address1"
		                id="shp_address1"
		                placeholder=""
		                maxLength="35"
		                value={shipperData.shp_address1?shipperData.shp_address1:''}
		                onChange={(e)=>onHandleReturnVal(e, 'shp_address1')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={type==="B"?false:true}
		            />
	                {/* <Input type="text" name="shp_address1" id="shp_address1" placeholder=""
	                	invalid={!bookmark&&!shipperData.shp_address1?true:false}
	                	value={shipperData.shp_address1}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address1')} onBlur={onPropsReturn}
	                /><FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
	                
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
	            <FormGroup className="mb-2">
	                <Label className="mb-0">Address2</Label>
	                <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="shp_address2"
		                id="shp_address2"
		                placeholder=""
		                maxLength="35"
		                value={shipperData.shp_address2?shipperData.shp_address2:''}
		                onChange={(e)=>onHandleReturnVal(e, 'shp_address2')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
		            />
	                {/*<Input type="text" name="shp_address2" id="shp_address2" placeholder="" 
	                	value={shipperData.shp_address2}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address2')} onBlur={onPropsReturn}	
	                />*/}
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
	            <FormGroup>
	                <Label className="mb-0">Address3</Label>
	                <InputValid 
		                type="text"
		                //bsSize="sm"
		                name="shp_address3"
		                id="shp_address3"
		                placeholder=""
		                maxLength="35"
		                value={shipperData.shp_address3?shipperData.shp_address3:''}
		                onChange={(e)=>onHandleReturnVal(e, 'shp_address3')}
		                onBlur={onPropsReturn}
		                validtype="text" 
		                required={false}
		            />
	                {/* <Input type="text" name="shp_address3" id="shp_address3" placeholder="" 
	                	value={shipperData.shp_address3}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address3')} onBlur={onPropsReturn}	
	                />*/}
	            </FormGroup>
	        </Col>
	        <Col xl="6" lg="6" md="6">
	        <FormGroup className="mb-2">
	            <Label className="mb-0">Address4</Label>
	            <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="shp_address4"
	                id="shp_address4"
	                placeholder=""
	                maxLength="35"
	                value={shipperData.shp_address4?shipperData.shp_address4:''}
	                onChange={(e)=>onHandleReturnVal(e, 'shp_address4')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
	            />
	            {/* <Input type="text" name="shp_address4" id="shp_address4" placeholder="" 
	            	value={shipperData.shp_address4}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address4')} onBlur={onPropsReturn}	
	            />*/}
	        </FormGroup>
			    </Col>
			    <Col xl="6" lg="6" md="6">
			    <FormGroup className="mb-2">
			    <Label className="mb-0">Address5</Label>
			    <InputValid 
	                type="text"
	                //bsSize="sm"
	                name="shp_address5"
	                id="shp_address5"
	                placeholder=""
	                maxLength="35"
	                value={shipperData.shp_address5?shipperData.shp_address5:''}
	                onChange={(e)=>onHandleReturnVal(e, 'shp_address5')}
	                onBlur={onPropsReturn}
	                validtype="text" 
	                required={false}
	            />
			    {/*<Input type="text" name="shp_address5" id="shp_address5" placeholder="" 
			    	value={shipperData.shp_address5}  maxLength="50" onChange = {(event)=>onHandleReturnVal(event,'shp_address5')} onBlur={onPropsReturn}	
			    />*/}
			</FormGroup>
			</Col>
	    </Row>
    </>
    );
}

export default Shipper;