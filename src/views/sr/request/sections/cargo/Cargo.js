/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input,Card,ButtonGroup, Button ,
	TabContent, TabPane, Nav, NavItem, NavLink,CardBody,Table,Collapse,FormFeedback,UncontrolledPopover,InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import axios from 'axios';
import Mark from './Mark.js';
import Goods from './Goods.js';
import HsCode from './HsCodePopup.js';
import InputValid from "components/CustomInput/InputValid.js";
const Cargo = (props) => {

  const {view,cargoProps,active,bookmark,bookmark2,bookmark3,pack,validation,onHsCode} = props;	
  useEffect(() => {
      setCargo(cargoProps);
      setMarkList(cargoProps.marklist?cargoProps.marklist.length>0?cargoProps.marklist:[{}]:[{}]);
      setGoodsList(cargoProps.goodlist?cargoProps.goodlist.length>0?cargoProps.goodlist:[{}]:[{}]);
  },[cargoProps]);


  const [cargo,setCargo] = React.useState({});
  //remark
  const [markList,setMarkList] = React.useState([]);
  const [goodsList,setGoodsList] = React.useState([]);

  const [cargoDes, setCargoDes] = useState({});
  const [cargoDesDetail, setCargoDesDetail] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");

  

  const [coll,setColl] = React.useState(false);
  
	const onHandleReturnVal = (event,name) => { 
	    		  	  
		  if(name === 'cargo_hs_code') {
			  if(!validation.validationHangle(event.target.value.toUpperCase())) {
				  let list = {...cargo, [name]:event.target.value.toUpperCase()};
				  setCargo(list);
			  }
		  } else {
			  let list = {...cargo, [name]:event.target.value};
		  	  setCargo(list);
		  }	
	}
	  
	    
    const onPropsReturn = ()=> {
	     props.propsData(cargo);
	}
	//mark & goods onblur event    
	const onDataMerge =(key,name,data) => {
		    let list;
	        if(name === "mark") {
	        	list = markList;
	        	list[key] = data;
	        	const mergeData = Object.assign(cargo,{'marklist':list});
	        	setMarkList(list);
	        	setCargo(mergeData);
	        	props.propsData(mergeData);
	        } else {
	        	list = goodsList;
	        	list[key] = data;
	        	const mergeData = Object.assign(cargo,{'goodlist':list});
	        	setGoodsList(list);
	        	setCargo(mergeData);
	        	props.propsData(mergeData);
	        }	 
	  }
	  
	  const onDataDelete =(key,name) => {
		    let list;
	      if(name === "mark") {
	    	  if(markList.length>1) {
				list = markList;
			    if(key > -1) {list.splice(key,1);} else {console.log(">>>>",key);} 
			    const mergeData = Object.assign(cargo,{'marklist':list});
			      setMarkList([...list]); 
			      setCargo(mergeData);
			      props.propsData(mergeData);
			  } else {
				  let list = {'cargo_mark_bookmark_seq':'','cargo_seq':cargo.cargo_seq,'mark_seq':'1','mark_desc1':'','mark_desc2':'','mark_desc3':'','mark_desc4':'','mark_desc5':''};
			      const mergeData = Object.assign(cargo,{'marklist':list});  
				  setMarkList(list);
				  setCargo(mergeData);
			      props.propsData(mergeData);
			  }
	      	
	      } else {
	    	  if(goodsList.length>1) {
	  			list = goodsList;
	  		    if(key > -1) {list.splice(key,1);} else {console.log(">>>>",key);} 
	  		    const mergeData = Object.assign(cargo,{'goodlist':list});
	  		      setGoodsList([...list]);   
	  		      setCargo(mergeData);
	  		      props.propsData(mergeData);
	  		  } else {
	  			let list = {'cargo_goods_bookmark_seq':'','cargo_seq':cargo.cargo_seq,'goods_seq':'1','goods_desc1':'','goods_desc2':'','goods_desc3':'','goods_desc4':'','goods_desc5':''};
	  			const mergeData = Object.assign(cargo,{'goodlist':list});
	  			setGoodsList(list);
	  			 setCargo(mergeData);
	  		     props.propsData(mergeData);
	  		  }
	      }
		 
	  }
	  
	  const onAddMark =()=> {
		     setMarkList([...markList,{'mark_seq':markList.length>0?markList.length+1:markList.length}]);
	  }

	  const onAddGoods =()=> {
		  setGoodsList([...goodsList,{'goods_seq':goodsList.length>0?goodsList.length+1:goodsList.length}]);
	  }    

	
	   
  return (
    <>
        
        {view?
        		<Row>
		    <Col xl="4" lg="4" md="12">
		        <FormGroup>
		            <Label className="mb-0">Bookmark Name</Label>
		            <Input type="text" name="cargo_bookmark_name" id="cargo_bookmark_name" placeholder=""  value={cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:''} 
		            invalid={!cargo.cargo_bookmark_name?true:false}
		            onChange = {(event)=>onHandleReturnVal(event,'cargo_bookmark_name')} onBlur={onPropsReturn}/>
		            <FormFeedback>{validation.REQ_MSG}</FormFeedback>
		        </FormGroup>       
		    </Col></Row>:<></>}
        <Row>
	    	<Col xl="3" lg="2" md="12">
		        <FormGroup>
		            <Label className="mb-0">대표 HS Code</Label>
		            <InputGroup>
		            <Input type="text" name="cargo_hs_code" id="cargo_hs_code" placeholder="" value={cargo.cargo_hs_code?cargo.cargo_hs_code:''}
		            onChange = {(event)=>onHandleReturnVal(event,'cargo_hs_code')} onBlur={onPropsReturn}
		            invalid={!view&&!cargo.cargo_hs_code?true:false}/>
		            <InputGroupAddon addonType="append">
                    <InputGroupText id= "hscode" className="pl-1 pr-1" style={{border:!view&&!cargo.cargo_hs_code?'1px solid red':'',borderRadius:'0 4px 4px 0'}}><i className="fa fa-search fa-2X" /></InputGroupText>
                  </InputGroupAddon>
                  <FormFeedback>{validation.REQ_MSG}</FormFeedback>
                  </InputGroup>
                	<UncontrolledPopover className="popover-container" trigger="legacy" placement="right-center" target="hscode" style={{zIndex:'9999'}}>
        			<HsCode onHsCodeData={onHsCode} onSetHsCode={(data)=>{setCargo({...cargo, 'cargo_hs_code':data}); props.propsData({...cargo, 'cargo_hs_code':data});}} {...props}/>
        		</UncontrolledPopover>  
		        </FormGroup>
	        </Col>
			<Col xl="4" lg="4" md="12">
				<FormGroup>
				    <Label className="mb-0">PackType&Qty</Label>
				    <Row>
				    	<Col className="col-8 pr-1">
					    	<Input type="select" value={cargo.cargo_pack_type} onChange = {(event)=>onHandleReturnVal(event,'cargo_pack_type')}
					    	 invalid={!view && (!cargo.cargo_pack_type || !cargo.cargo_pack_qty)?true:false}
					        >
					      		<option value="">선택</option>
					      		{pack.length>0?pack.map((data,key) => <option value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
					          </Input>
					          <FormFeedback>{validation.REQ_MSG}</FormFeedback>
				    	</Col>
				    	<Col className="col-4 pl-1">
					      	<InputValid 
		                        type="text"
		                        name="cargo_pack_qty"
		                        id="cargo_pack_qty"
		                        placeholder=""
		                        maxLength="11"
		                        //bsSize={size}
		                        value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
		                        onChange={(e)=>onHandleReturnVal(e, 'cargo_pack_qty')}
		                        onBlur={onPropsReturn}
		                        validtype="number"
		                        required={!view?true:false} 
		                        feedid="cargo"
		                    />
					    	{/*<Input type="text" name="cargo_pack_qty" id="cargo_pack_qty" placeholder="" value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
						    onChange = {(event)=>onHandleReturnVal(event,'cargo_pack_qty')} onBlur={onPropsReturn} invalid={!view&&!cargo.cargo_pack_qty?true:false}/>*/}
					    	
				    	</Col>
				    </Row>
				</FormGroup>
			</Col>
			<Col xl="5" lg="5" md="12">
				<Row>
					<Col className="col-6">
					<FormGroup>
					    <Label className="mb-0">Volume</Label>
					    <InputGroup >
					    	 <Input type="text" name="cargo_total_volume" id="cargo_total_volume" placeholder="" value={cargo.cargo_total_volume?cargo.cargo_total_volume:''} 
							    onChange = {(event)=>onHandleReturnVal(event,'cargo_total_volume')} onBlur={onPropsReturn} invalid={!view&&!cargo.cargo_total_volume?true:false}/>
							    <InputGroupAddon addonType="append">
							                              <InputGroupText className="p-1" style={{border:!view&&!cargo.cargo_total_volume?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>CBM</InputGroupText>
							                            </InputGroupAddon>
					    	 <FormFeedback>{validation.REQ_MSG}</FormFeedback>
					    	 </InputGroup>
					</FormGroup>
					</Col>
					<Col className="col-6">
						<FormGroup>
							
						    <Label className="mb-0">Weight</Label>
						    <InputGroup >
						    <Input type="text" name="cargo_total_weight" id="cargo_total_weight" placeholder="" value={cargo.cargo_total_weight?cargo.cargo_total_weight:''}
						    onChange = {(event)=>onHandleReturnVal(event,'cargo_total_weight')} onBlur={onPropsReturn} invalid={!view&&!cargo.cargo_total_weight?true:false}/>
							    <InputGroupAddon addonType="append">
	                            <InputGroupText className="p-1" style={{border:!view&&!cargo.cargo_total_weight?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>kg</InputGroupText>
	                          </InputGroupAddon>
						<FormFeedback>{validation.REQ_MSG}</FormFeedback>
						</InputGroup>
						    </FormGroup>
				    </Col>
		         </Row>
		    </Col>
      </Row>

      <Row>
		<Col xl="6">
				<Row>
					<Col>
						<Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>Mark & No</Label>
			        </Col>
			        <Col>
	        		  <ButtonGroup className="pull-right pr-2">
	    	    		<Button
		      	            className="pt-0 pb-0"
		      	            color="default"
		      	            outline
		      	            size="sm"
		      	            onClick={onAddMark}
		      	        >추가
	    	            </Button>
	    			  </ButtonGroup>
	    		     </Col>
	    		</Row>
	    		<Row>
	    			<Col>
	            		{markList.length >0 ? 
	            				markList.map((element,key)=>
	            					<Mark key={key} loadData={element} bookmark={bookmark2}  view={view}
	            					 propsData={(data)=>onDataMerge(key,'mark',data)}
	            					 propsDelete={()=>onDataDelete(key,'mark')}
	            					 validation={validation}
	            					 onAlert={props.onAlert} user={props.user}
	            					/>):<></>
	            					}
	            	</Col>
	    	    </Row>
			</Col>
			<Col xl="6">
			<Row>
				<Col>
					<Label className="mt-2" style={{fontWeight:'bold',fontSize:'15px',color:'#696969'}}>Cargo Description</Label>
		        </Col>
		        <Col>
	    		  <ButtonGroup className="pull-right pr-2">
		    		<Button
	    	            className="pt-0 pb-0"
	    	            color="default"
	    	            outline
	    	            size="sm"
	    	            onClick={onAddGoods}
	    	        >추가
		            </Button>
				  </ButtonGroup>
			     </Col>
			</Row>
			<Row>
				<Col>
	    			{goodsList.length >0 ? 
	    					goodsList.map((element,key)=>
	        					<Goods key={key} loadData={element} bookmark={bookmark3}  view={view}
	        					 propsData={(data)=>onDataMerge(key,'goods',data)}
	        					 propsDelete={()=>onDataDelete(key,'goods')}
	        					 validation={validation}
	        					onAlert={props.onAlert} user={props.user}
	        					/>):<></>
	        					}
	        	    
	        	</Col>
		    </Row>
			</Col>
		</Row>
    </>
    );
}




export default Cargo;