/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, CardBody, Collapse, Button,FormGroup,Label,Input, Card,UncontrolledTooltip,FormFeedback,CardHeader,InputGroupAddon,InputGroupText,InputGroup } from "reactstrap";
import * as validation from 'components/common/validation.js';
import axios from 'axios';
import Moment from 'moment';
import ReactDatetime from "react-datetime";
import Select from "react-select";
import InputValid from "components/CustomInput/InputValid.js";
export default function Declare(props) {
	const {loadFormData,codelist,size,view,checked} = props;

  useEffect(() => {
	  setDeclare({...loadFormData,'bookmark_checked':loadFormData.bookmark_checked?loadFormData.bookmark_checked:props.checked?'Y':'N'});
  },[loadFormData]);
  

  const [declare, setDeclare] = useState({});
  
 const onHandleReturnVal = (event,name) => {
	 if(!validation.validationHangle(event.target.value.toUpperCase())) {
	  let list = {...declare, [name]:event.target.value.toUpperCase()};
	  setDeclare(list);	
	 }
  }
 
 const onHandleCheckReturnVal2 = (data,name) => {
	  let list = {...declare, [name]:data};
	  setDeclare(list);
	  props.propsData(list); 
 }
 
 const onHandleCheckReturnVal = (event,name) => {
	  
	  let list = {...declare, [name]:event.target.value};
	  setDeclare(list);
	  props.propsData(list);  
 }
 const onHandleReturnDate = (date) => {
	  let list = {...declare, 'declare_customs_date':Moment(date).format('YYYYMMDD')};
	  setDeclare(list); 
	  props.propsData(list);
 }
  
  const onPropsReturn = ()=> {
	 props.propsData(declare);
  }
  
  const onDeleteDeclare =(data) => {
	  props.deleteRow(data);
  }
  
  const onChangeDeclare=(value)=>{
	  let list = {...declare, ...value};
	  setDeclare(list);
	  props.propsData(list);
  }
  
  return (

    <Card className="no-transition mb-2" style={{border:'1px solid silver',zIndex:props.zindex}}> 	   
          	    <CardBody className="pt-0 pb-0">
			      <Row>
			      	<Col>
				      	<button
			              className="close mt-1"
			              type="button"
			              onClick={(declare) => onDeleteDeclare(declare)}
			            >×</button>
			      </Col>
			      </Row>
 		         <Row>
			        <Col xl="0" className="col-0 pl-2 mt-auto mb-auto">
		              <FormGroup check style={{height:'69px'}}>
		                <Label check>
		                  <Input defaultValue="" type="checkbox"  checked={declare.bookmark_checked==="Y"?true:false} 
		                  onChange = {()=>onHandleCheckReturnVal2(declare.bookmark_checked==="Y"?"N":"Y",'bookmark_checked')}
		                	  />
		                  <span className="form-check-sign" />
		                </Label>
		              </FormGroup>
			        </Col>
                    <Col>
                    <Row>
	                        <Col xl="4" className="col-12 pr-0">
			               		<Select 
							        className={size?"customSelect react-select-primary":"react-select react-select-primary"}
							        classNamePrefix={size?"customSelect":"react-select"}
							        name="declarebookmark"
							        value={{value:declare.declare_bookmark_seq?declare.declare_bookmark_seq:'',label:declare.declare_bookmark_name?declare.declare_bookmark_name:'선택'}}
							        onChange={(value)=>onChangeDeclare(value)}
							        options={props.bookmark}
							        placeholder={"선택"}
			               		  
						        />
	               			</Col>
	               		</Row>
                    	<Row>
	 		        <Col xl="3" className="col-12">
				      <FormGroup className="mb-0">
				      	<Label className="mb-0">수출면장번호</Label>
				      	<InputValid 
		                    type="text"
		                    name="declare_num"
		                    id="declare_num"
		                    placeholder=""
		                    maxLength="19"
		                    bsSize={size}
		                    value={declare.declare_num?declare.declare_num:''}
		                    onChange={(e)=>onHandleReturnVal(e, 'declare_num')}
		                    onBlur={onPropsReturn}
		                    validtype="text"
		                    required={false} 
		                    feedid="declare"
		                />
	                    {/*<Input type="text" bsSize={size} name="declare_num" id="declare_num" placeholder="" value={declare.declare_num?declare.declare_num:''} maxLength="19"
						 onChange = {(event)=>onHandleReturnVal(event,'declare_num')}  onBlur={onPropsReturn} 
	    	        	 invalid={!declare.declare_num?true:false}/>
			      	<FormFeedback>{validation.REQ_MSG}</FormFeedback>*/}
			      	</FormGroup>	
		          </Col>
	 		      <Col xl="2" className="col-6">
		 				<FormGroup>
		 		        	<Label className="mb-0">분할선적여부</Label>
		 		        	<Input className="pl-2" type="select" bsSize={size} value={declare.declare_div_load_yn?declare.declare_div_load_yn:''} onChange = {(event)=>onHandleCheckReturnVal(event,'declare_div_load_yn')}>
		 		        	    <option value="">선택</option>
		 			      		<option value="N">N</option>
		 			      		<option value="Y">Y</option>
		 			          </Input>
		 		        </FormGroup>		
		 	      </Col>
				  <Col xl="2" className="col-6">
						<FormGroup>
						 	<Label className="mb-0">분할선적차수</Label>
					      	<InputValid 
	                            type="text"
	                            name="declare_div_load_no"
	                            id="declare_div_load_no"
	                            placeholder=""
	                            maxLength="2"
	                            bsSize={size}
	                            value={declare.declare_div_load_no?declare.declare_div_load_no:''}
	                            onChange={(e)=>onHandleReturnVal(e, 'declare_div_load_no')}
	                            onBlur={onPropsReturn}
	                            validtype="number"
	                            required={declare.declare_div_load_yn && declare.declare_div_load_yn ==='Y'?true:false} 
	                            feedid="declare"
	                        />
	                            {/*<Input className="pl-1 pr-1" bsSize={size} type="text" name="declare_div_load_no" id="declare_div_load_no" placeholder="" maxLength="2"
						 		value={declare.declare_div_load_no?declare.declare_div_load_no:''}
						 		onChange = {(event)=>onHandleReturnVal(event,'declare_div_load_no')}  onBlur={onPropsReturn}
						 	/>*/}
						 </FormGroup>		
				  </Col>
		 	      <Col xl="2" lg="2" md="12">
						<FormGroup>
					       	<Label className="mb-0">동시포장코드</Label>
					      	<InputValid 
	                            type="text"
	                            name="declare_pack_set_code"
	                            id="declare_pack_set_code"
	                            placeholder=""
	                            maxLength="1"
	                            bsSize={size}
	                            value={declare.declare_pack_set_code?declare.declare_pack_set_code:''}
	                            onChange={(e)=>onHandleReturnVal(e, 'declare_pack_set_code')}
	                            onBlur={onPropsReturn}
	                            validtype="english"
	                            required={false} 
	                            feedid="declare"
	                        />
	                            {/* 	<Input className="pl-1 pr-1" bsSize={size} type="text" name="declare_pack_set_code" id="declare_pack_set_code" placeholder="" maxLength="1"
					       		value={declare.declare_pack_set_code?declare.declare_pack_set_code:''}
						 		onChange = {(event)=>onHandleReturnVal(event,'declare_pack_set_code')}  onBlur={onPropsReturn}
						 	/>*/}
				        </FormGroup>		
			       </Col> 
					<Col xl="3" lg="3" md="12">
						<FormGroup>
					    <Label className="mb-0">동시포장유형,개수</Label>
					    <Row>
					    	<Col className="col-8 pr-1">
						    	<Input type="select" bsSize={size} value={declare.declare_pack_set_type?declare.declare_pack_set_type:''} onChange = {(event)=>onHandleCheckReturnVal(event,'declare_pack_set_type')}
						    	value={declare.declare_pack_set_type?declare.declare_pack_set_type:''}
						        >
						      		<option value="">선택</option>
						      		{codelist.length>0?codelist.map((data,key) => <option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
						          </Input>
						 
					    	</Col>
					    	<Col className="col-4 pl-1">
						      	<InputValid 
	                                type="text"
	                                name="declare_pack_set_num"
	                                id="declare_pack_set_num"
	                                placeholder=""
	                                maxLength="8"
	                                bsSize={size}
	                                value={declare.declare_pack_set_num?declare.declare_pack_set_num:''}
	                                onChange={(e)=>onHandleReturnVal(e, 'declare_pack_set_num')}
	                                onBlur={onPropsReturn}
	                                validtype="number"
	                                required={declare.declare_pack_set_code?true:false} 
	                                feedid="declare"
	                            />
						    	{/*<Input type="text" name="declare_pack_set_num" id="declare_pack_set_num" placeholder="" bsSize={size} maxLength="8"
						    		value={declare.declare_pack_set_num?declare.declare_pack_set_num:''}
						    		onChange = {(event)=>onHandleReturnVal(event,'declare_pack_set_num')}  onBlur={onPropsReturn}
						    	/>*/}
						    	
					    	</Col>
					    </Row>
					</FormGroup>
				</Col>
				
			       <Col xl="2" lg="2" md="12">
						<FormGroup>
				       	<Label className="mb-0">중량</Label>
				       	<InputGroup >
				       	<Input type="text" name="declare_weight" id="declare_weight" placeholder="" bsSize={size} maxLength="18"
				       		value={declare.declare_weight?declare.declare_weight:''}
				       		onChange = {(event)=>onHandleReturnVal(event,'declare_weight')}  onBlur={onPropsReturn}
				       		/>
				       		<InputGroupAddon addonType="append">
	                            <InputGroupText className="p-1">kg</InputGroupText>
	                          </InputGroupAddon>
				       		</InputGroup>
				       </FormGroup>		
				  </Col>
				 <Col xl="3" lg="3" md="12">
				 <FormGroup>
				    <Label className="mb-0">포장유형,개수</Label>
				    <Row>
				    	<Col className="col-8 pr-1">
					    	<Input type="select" bsSize={size} value={declare.declare_pack_type?declare.declare_pack_type:''} onChange = {(event)=>onHandleCheckReturnVal(event,'declare_pack_type')}
					    	value={declare.declare_pack_type?declare.declare_pack_type:''}
					        >
					      		<option value="">선택</option>
					      		{codelist.length>0?codelist.map((data,key) => <option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
					          </Input>
					  
				    	</Col>
				    	<Col className="col-4 pl-1">
					      	<InputValid 
	                            type="text"
	                            name="declare_pack_num"
	                            id="declare_pack_num"
	                            placeholder=""
	                            maxLength="4"
	                            bsSize={size}
	                            value={declare.declare_pack_num?declare.declare_pack_num:''}
	                            onChange={(e)=>onHandleReturnVal(e, 'declare_pack_num')}
	                            onBlur={onPropsReturn}
	                            validtype="number"
	                            required={false} 
	                            feedid="declare"
	                        />
	                            {/*<Input type="text" name="declare_pack_num" id="declare_pack_num" placeholder=""  bsSize={size} maxLength="4"
					    		value={declare.declare_pack_num?declare.declare_pack_num:''}
					    		onChange = {(event)=>onHandleReturnVal(event,'declare_pack_num')}  onBlur={onPropsReturn}
					    	/>*/}
					    
				    	</Col>
				    </Row>
				</FormGroup>
					</Col>
					
					<Col xl="5" lg="5" md="12">
					<FormGroup>
					 	<Label className="mb-0">품명</Label>
				      	<InputValid 
	                        type="text"
	                        name="declare_goods_desc"
	                        id="declare_goods_desc"
	                        placeholder=""
	                        maxLength="35"
	                        bsSize={size}
	                        value={declare.declare_goods_desc?declare.declare_goods_desc:''}
	                        onChange={(e)=>onHandleReturnVal(e, 'declare_goods_desc')}
	                        onBlur={onPropsReturn}
	                        validtype="text"
	                        required={false} 
	                        feedid="declare"
	                    />
					 	{/*<Input bsSize={size} type="text" name="declare_goods_desc" id="declare_goods_desc" placeholder="" maxLength="35"
					 		value={declare.declare_goods_desc?declare.declare_goods_desc:''}
					 		onChange = {(event)=>onHandleReturnVal(event,'declare_goods_desc')}  onBlur={onPropsReturn}
					 	/>*/}
					 </FormGroup>		
					</Col>
					</Row>
					</Col>
 		    	</Row>
              	</CardBody>
    	</Card>
    );
}
