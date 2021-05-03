/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, CardBody, Collapse, Button,FormGroup,Label,Input, Card,UncontrolledTooltip,FormFeedback,CardHeader,
	InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import * as validation from 'components/common/validation.js';
import axios from 'axios';
import Select from "react-select";
import InputValid from "components/CustomInput/InputValid.js";
export default function Container(props) {
	const {cntrData,codelist,size,switchProps,bkgdata,checked} = props;
	const [selectVal,setSelectVal] =React.useState("");
	  const [cntr, setCntr] = useState({});
	  const [bkgNo, setBkgNo] = useState("");
	  
  useEffect(() => {
    setCntr({...cntrData,'cntr_res_bkg_no':cntrData.cntr_res_bkg_no?cntrData.cntr_res_bkg_no:props.bkgdata,
    		'cntr_yn':cntrData.cntr_yn?cntrData.cntr_yn:props.checked?'Y':'N'});
  },[cntrData]);
  
  useEffect(() => {
	    //setCntr({...cntr,'cntr_res_bkg_no':props.bkgdata});
	    props.propsData({...cntrData,'cntr_res_bkg_no':props.bkgdata});
	  },[bkgdata]); 
  
  useEffect(() => {
	    //setCntr({...cntr,'cntr_res_bkg_no':props.bkgdata});
	    props.propsData({...cntrData,'cntr_yn':props.checked?'Y':'N'});
	  },[checked]); 
  
  
  



  
 const onHandleReturnValHan = (event,name) => {
	 if(!validation.validationHangle(event.target.value.toUpperCase())) {
	  let list = {...cntr, [name]:event.target.value.toUpperCase()};
	  setCntr(list);	
	 }
  }
 
 const onHandleReturnVal = (event,name) => {
	  let list = {...cntr, [name]:event.target.value};
	  setCntr(list);	
  }
 
 const onHandleCheckReturnVal = (data,name) => {
	  let list = {...cntr, [name]:data.toUpperCase()};
	  setCntr(list);
	  props.propsData(list); 
 }
 
 const onChangeCntrReturnVal = (event,name) => {
	  
	  let list = {...cntr, [name]:event.target.value};
	  setCntr(list);
	  props.propsData(list);  
 }
  
  const onPropsReturn = ()=> {
	 props.propsData(cntr);
  }
  
  const onDeleteCntr =(data) => {
	  props.deleteRow(data);
  }
  
  const fncOnKeyPressCntr = (e) => {
	     if( "Enter" === e.key ) {
	    	 getCntrWeightInfo();
	     }
	  }

	  
	  const getCntrWeightInfo=()=> {
		  if(cntr.cntr_no) {
			  axios.post("/shipper/getUserCntrWeightInfo",{user_no:props.user?props.user.user_no:'',line_code:'WDFC',cntr_no:cntr.cntr_no},{})								
		      .then(res => { 
			  		if(res.data) {  
			  		    let list = {...cntr,...res.data,'cntr_res_bkg_no':bkgNo};
			  			setCntr(list);	
			  			props.propsData(list);
			  		} else {	
			  			props.propsData({...cntr,'cntr_res_bkg_no':bkgNo});
			  		}
			  }); 
		  }
	  }
	  
	  const onChangeCntrBookmark = (event) =>{
		  setSelectVal(event.target.value);
		  axios.post("/shipper/getUserCntrBookmark",{user_no:props.user?props.user.user_no:'',seq:event.target.value})								
	  	  	.then(res => {  setCntr({...res.data[0],'cntr_yn':cntr.cntr_yn?cntr.cntr_yn:checked?'Y':'N'}); props.propsData({...res.data[0],'cntr_yn':cntr.cntr_yn?cntr.cntr_yn:checked?'Y':'N'});
	  	  		            	    
	  	  	});
		  
		 
	  }
	  

  
  return (
		    <Card className="no-transition mb-2" style={{border:'1px solid silver',zIndex:props.zindex}}> 	   
	      	    <CardBody className="pt-0 pb-0">
			      <Row>
			      	<Col className="pb-2 pr-2">
				     	<button
			              className="close mt-1"
			              type="button"
			              onClick={(cntr) => onDeleteCntr(cntr)}
			            >×</button>
			      </Col>
			      </Row>
			      <Row>
				     <Col xl="0" className="col-0 pl-2 mt-auto mb-auto">
			              <FormGroup check style={{height:'69px'}}>
			                <Label check>
			                <Input defaultValue="" type="checkbox"  checked={cntr.cntr_yn==="Y"?true:false} onChange = {()=>onHandleCheckReturnVal(cntr.cntr_yn==="Y"?"N":"Y",'cntr_yn')}/>
			                  <span className="form-check-sign" />
			                </Label>
			              </FormGroup>
				      </Col>
				      <Col>
					     <Row>
			                 <Col xl="4" lg="4" md="6">
				        		<FormGroup>
						        	<Input type="select" bsSize={size} value={selectVal}
									    onChange={(event)=>onChangeCntrBookmark(event)}>
										//invalid={!cntr.cntr_code?true:false}
									<option value="">선택</option>
									{props.bookmarkoption && props.bookmarkoption.length >0?
											props.bookmarkoption.map((data,key)=>
											<option key={"bk_"+key} value={data.value}>{data.label}</option>
											):<></>}
								  </Input>
							          <FormFeedback>{validation.REQ_MSG}</FormFeedback>
							     </FormGroup>	
				              </Col>
				         </Row>
                    	<Row>
			             <Col xl="3" className="col-12">
						      <FormGroup className="mb-0">
						      	<Label className="mb-0">Container No</Label>
						      	<InputValid 
	                                type="text"
	                                name="cntr_no"
	                                id="cntr_no"
	                                placeholder=""
	                                maxLength="11"
	                                bsSize={size}
	                                value={cntr.cntr_no?cntr.cntr_no:''}
	                                onChange={(e)=>onHandleReturnVal(e, 'cntr_no')}
	                                onBlur={getCntrWeightInfo}
	                                validtype="text"
	                                required={true} 
	                                feedid="container"
	                            />
						      	</FormGroup>	
			             </Col>
			             <Col xl="2" className="col-12">
			        		<FormGroup>
					        	<Label className="mb-0">Seal No</Label>
					        	<InputValid 
                             type="text"
                             name="cntr_seal"
                             id="cntr_seal"
                             placeholder=""
                             maxLength="30"
                             bsSize={size}
                             value={cntr.cntr_seal?cntr.cntr_seal:''}
                             onChange={(e)=>onHandleReturnVal(e, 'cntr_seal')}
                             onBlur={getCntrWeightInfo}
                             validtype="text"
                             required={false} 
                             feedid="container"
                         />
						    </FormGroup>
		        		</Col>
		        		 <Col xl="3" className="col-12">
				        		<FormGroup>
					        	<Label className="mb-0">Size/Type</Label>
					        	<Input type="select" bsSize={size} value={cntr.cntr_code?cntr.cntr_code:''}
								    onChange={(event)=>onChangeCntrReturnVal(event,'cntr_code')}
									invalid={!cntr.cntr_code?true:false}>
								<option value="">선택</option>
								{codelist.length>0?codelist.map((data,key)=>
									<option key={key} value={data.cntr_code}>{data.cntr_code_name}</option>
								):<></>}
							  </Input>
						          <FormFeedback>{validation.REQ_MSG}</FormFeedback>
						     </FormGroup>	
				        </Col>
		        		<Col xl="2" className="col-6">
			        		<FormGroup>
					        	<Label className="mb-0">Weight</Label>
					        	<InputGroup >
						        	<Input type="number" bsSize={size} name="cntr_total_weight" id="cntr_total_weight" placeholder="" value={cntr.cntr_total_weight?cntr.cntr_total_weight:''}
										onChange = {(event)=>onHandleReturnValHan(event,'cntr_total_weight')}
								    onBlur={onPropsReturn} invalid={!cntr.cntr_total_weight?true:false} maxLength="18"/>
					    	 		<InputGroupAddon addonType="append">
			                        <InputGroupText className="p-1" style={{border:!cntr.cntr_total_weight?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>kg</InputGroupText>
			                        </InputGroupAddon>
						        	<FormFeedback>{validation.REQ_MSG}</FormFeedback>
					        	</InputGroup>
					        </FormGroup>	
		        		</Col>
		        		<Col xl="2"  className="col-6">
			        		<FormGroup>
					    		<Label className="mb-0">Volume</Label>
					    		<InputGroup >
						    		<Input type="number" bsSize={size} name="cntr_total_volume" id="cntr_total_volume" placeholder="" value={cntr.cntr_total_volume?cntr.cntr_total_volume:''}
										onChange = {(event)=>onHandleReturnValHan(event,'cntr_total_volume')}
								    onBlur={onPropsReturn} invalid={!cntr.cntr_total_volume?true:false} maxLength="18"/>
						    	    <InputGroupAddon addonType="append">
			                        <InputGroupText className="p-1" style={{border:!cntr.cntr_total_volume?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>CBM</InputGroupText>
			                        </InputGroupAddon>
							    	<FormFeedback>{validation.REQ_MSG}</FormFeedback>
							     </InputGroup>
			               </FormGroup>
		        		</Col>	
		        		 <Col xl="4" className="col-12">
							<FormGroup>
		                        	<Label className="mb-0">Package</Label>
									    <Row>
									    	<Col className="col-8 pr-1">
										    	<Input type="select" bsSize="sm" className="pt-0 pb-0" value={cntr.cntr_carton_code?cntr.cntr_carton_code:''} 
										    	//onChange = {(event)=>onChangeReturnVal2(event,'cntr_carton_code')}
										    	invalid={(!cntr.cntr_carton_qty || !cntr.cntr_carton_qty)?true:false} >
										      		<option value="">선택</option>
										      		{/*{packCodeList.length>0?packCodeList.map((data,key) => <option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}*/}
										          </Input>
										          <FormFeedback>{validation.REQ_MSG}</FormFeedback>
									    	</Col>
									    	<Col className="col-4 pl-1">
										      	<InputValid 
							                        type="text"
							                        name="cntr_carton_qty"
							                        id="cntr_carton_qty"
							                        placeholder=""
							                        maxLength="8"
							                        bsSize="sm"
							                        value={cntr.cntr_carton_qty?cntr.cntr_carton_qty:''}
							                       // onChange={(e)=>onChangeReturnVal(e, 'cntr_carton_qty')}
							                        onBlur={onPropsReturn}
							                        validtype="number"
							                        required={true} 
							                        feedid="container"
							                    />
									    		{/*<Input type="number" bsSize="sm" name="cargo_pack_qty" id="cargo_pack_qty" placeholder="" value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
											    onChange = {(event)=>onChangeReturnVal(event,'cargo_pack_qty')} onBlur={onPropsReturn} invalid={!cargo.cargo_pack_qty?true:false}
									    	    maxLength="8"
										    		/>*/}
									    	</Col>
									    </Row>
							</FormGroup>
						</Col>
		        		{props.loadData.vsl_type && props.loadData.vsl_type === '41'?
		        		<Col xl="8" lg="8" md="12" className="col-12">
		        				<Row>
		        					<Col xl="1"><Label className="mb-0">VGM</Label></Col>
		        					<Col className="border border-2 border-info rounded rounded-2 ml-3 mb-3">
					        			<Row>
					        				<Col xl="4">
					        					<FormGroup>
							        				<Label className="mb-0">BkgNo</Label>
								        				<InputValid 
							                                type="text"
							                                name="cntr_res_bkg_no"
							                                id="cntr_res_bkg_no"
							                                placeholder=""
							                                maxLength="35"
							                                bsSize={size}
							                                value={cntr.cntr_res_bkg_no?cntr.cntr_res_bkg_no:''}
							                                onChange={(e)=>onHandleReturnVal(e, 'cntr_res_bkg_no')}
							                                onBlur={getCntrWeightInfo}
							                                validtype="text"
							                                required={false} 
							                                feedid="container"
							                            />
								        		</FormGroup>
							                </Col>
							                <Col xl="4">
								                <FormGroup>
						        				<Label className="mb-0">PIC Name</Label>
								        				<InputValid 
								                            type="text"
								                            name="cntr_auth_user_name"
								                            id="cntr_auth_user_name"
								                            placeholder=""
								                            maxLength="35"
								                            bsSize={size}
								                            value={cntr.cntr_auth_user_name?cntr.cntr_auth_user_name:''}
								                            onChange={(e)=>onHandleReturnVal(e, 'cntr_auth_user_name')}
								                            onBlur={getCntrWeightInfo}
								                            validtype="text"
								                            required={false} 
								                            feedid="container"
								                        />
								                </FormGroup>
							                </Col>
							                <Col xl="4">
								                <FormGroup>
						        				<Label className="mb-0">Weight</Label>
								        				<InputGroup >
										   	        	<Input type="number" bsSize={size} name="cntr_weight" id="cntr_weight" placeholder="" value={cntr.cntr_weight?cntr.cntr_weight:''}
															 onChange = {(event)=>onHandleReturnValHan(event,'cntr_weight')}
														     onBlur={onPropsReturn}  invalid={!cntr.cntr_weight?true:false} maxLength="18"/>
														    	  <InputGroupAddon addonType="append">
									                            <InputGroupText className="p-1" style={{border:!cntr.cntr_weight?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>kg</InputGroupText>
									                          </InputGroupAddon>
										   	        	     <FormFeedback>{validation.REQ_MSG}</FormFeedback>
										   	        	  </InputGroup>
							                    </FormGroup>
							                </Col>
					        			</Row>
					        	    </Col>
					        </Row>
		        		</Col>:<></>}
			    </Row>	
			    </Col>
			    	</Row>
	          	</CardBody>
	</Card>
    );
}
