/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, Card,CardBody, Button,FormGroup, Table,
    TabContent, TabPane, Nav, NavItem, NavLink,UncontrolledTooltip,Label,Input,UncontrolledPopover } from "reactstrap";
import Cargo from "./Cargo.js";
import axios from 'axios';
import HsCode from './HsCodePopup.js';

const CargoBookmark = (props) => {

	const {view,bookmark,bookmarkProps,bookmark2,bookmark3,pack,validation} =props;

  // modal 창을 위한 state
  const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('1');
  const [hTabs, setHTabs] = React.useState("1");
  
  const clickTab = (tab) => {
      if(activeTab !== tab ) setActiveTab(tab);
  }
  
  const toggle = (params) => {
      setOpen(!open);
  }
  const [forwarder, setForwarder] = useState({});

  // 전체화면 css 적용을 위한 state
  const [clsNm, setClsNm] = useState("");
  
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [cargo,setCargo] = React.useState({});
  const [mark,setMark] = React.useState({});
  const [goods,setGoods] = React.useState({});
  
  useEffect(() => {

	   
	  },[]);
  
  useEffect(() => {

	    setCargo(bookmarkProps);
	    setMark(bookmarkProps.marklist?bookmarkProps.marklist:{});
	    setGoods(bookmarkProps.marklist?bookmarkProps.goodlist:{});
	  },[bookmarkProps]);

	
  const onHandleSetTap = (data) => {
      if(data === "1") {
    	  setCargo(bookmarkProps);
      } else if(data === "2") {
    	  setMark({}); 
      } else {
    	  setGoods({});
      }
      
	  setHTabs(data);
	  props.onChangeTap(data);
  }
  
  const onClickSelected = (tap,data) => {

	  if(tap === "1") {

		  axios.post("/shipper/getUserCargoRelation",{user_no:props.user?props.user.user_no:'',seq:data.cargo_bookmark_seq},{})								
	  	  	.then(res => {
	  	                const mergeData = Object.assign(data,res.data);
	  	  				setCargo(mergeData);
	  	  			    props.onPropsCargoBookmark(tap,mergeData);
	  	  	});
		  
	  } else if( tap === "2") {
		  setMark(data);
	  } else {
		  setGoods(data);
	  } 
  }
  
  const onHandleReturnVal = (event,name) => { 
	 
	  	if(validation.getByte(event.target.value) < 36) {
	  		 if (hTabs === "2") {
		    	  let list = {...mark, [name]:event.target.value};
		    	  setMark(list);
	  		 } else {
	  			let list = {...goods, [name]:event.target.value};
		    	  setGoods(list);
	  		 }
	      } else {
	    	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
	      }  	
  }
  
  const onPropsCargoBookmark =(data) =>{
	  if( hTabs === "1") {
		  setCargo(data);
		  props.onPropsCargoBookmark(hTabs,data); 
	  } else if (hTabs === "2") {
		  props.onPropsCargoBookmark(hTabs,mark); 
	  } else if (hTabs ==="3") {
		  props.onPropsCargoBookmark(hTabs,goods); 
	  } else {
		  console.log("error");
	  }
	 
  }
  
  const onPropsCargoDeleteBookmark =(data) =>{	 
	  props.onPropsCargoDeleteBookmark(data);
  }
  
  const onPropsMarkDeleteBookmark =(data) =>{	 
	  props.onPropsMarkDeleteBookmark(data);
  }
  
  const onPropsGoodsDeleteBookmark =(data) =>{	 
	  props.onPropsGoodsDeleteBookmark(data);
  }

  return (
    <>
	    <div className="nav-tabs-navigation text-left mb-3">
		    <div className="nav-tabs-wrapper">
		      <Nav id="tabs" role="tablist" tabs>
		        <NavItem>
		          <NavLink
		            className={hTabs === "1" ? "active" : ""}
		            onClick={() => onHandleSetTap("1")}
		          >
		            Cargo
		          </NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink
		            className={hTabs === "2" ? "active" : ""}
		            onClick={() => onHandleSetTap("2")}
		          >
		            Mark
		          </NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink
		            className={hTabs === "3" ? "active" : ""}
		            onClick={() => onHandleSetTap("3")}
		          >
		            Goods
		          </NavLink>
		        </NavItem>
		      </Nav>
		    </div>
		  </div>
		  <TabContent activeTab={"hTabs" + hTabs}>
	          <TabPane tabId="hTabs1">
		          <Row className="m-0">
	              	<Col>Cargo BookMark List</Col>
	              </Row>
			      <Row className="m-0">
			          <Col xl="12" lg="12" md="12" className="p-0">
			              <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
			                  <Card className="card-raised card-form-horizontal no-transition mb-0">
			                      <CardBody className="bg-white p-0">
			                          <Table className="mb-0" responsive hover size="sm">
			                              <thead>
			                                  <tr>
			                                      <td className="p-2 text-primary" hover>No.</td>
			                                      <td className="p-2 text-primary">Bookmark Name</td>
			                                      <td className="p-2 text-primary">MARK</td>
			                                      <td className="p-2 text-primary">GOODS</td>
			                                      <td className="p-2 text-primary">Action</td>
			                                  </tr>
			                              </thead>
			                              <tbody>
			                              	{bookmark.length>0?bookmark.map((data,key) =>
			                              		<tr key={key} onClick={()=>onClickSelected("1",data)}>
			                              			<td className="p-1">{key+1}</td>
			                              			<td className="p-1">{data.cargo_bookmark_name}</td>
			                              			<td className="p-1">{data.mark_yn}</td>
			                              			<td className="p-1">{data.goods_yn}</td>
			                              			<td className="td-actions p-1">
			                                        <Button
			                                          className="btn-link"
			                                          color="danger"
			                                          data-toggle="tooltip"
			                                          id={"remove"+key}
			                                          size="sm"
			                                          type="button"
			                                          style={{marginBottom:'0'}}
			                                          onClick={()=>{onPropsCargoDeleteBookmark(data)}}
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
			                              	):<></>}
			                              	
			                              </tbody>
			                          </Table>
			                      </CardBody>
			                  </Card>
			              </FormGroup>
			          </Col>
			      </Row>
			      <hr/>
			      <Cargo cargoProps={cargo} view={view} propsData={onPropsCargoBookmark} pack={pack} {...props}/> 
	          </TabPane>
	          <TabPane tabId="hTabs2">
		          <Row className="m-0">
	              	<Col>Marks BookMark List</Col>
		          </Row>
		          {/* <CardBody className="pt-2 pb-2 bg-white"> */}
		          <Row className="m-0">
		              <Col xl="12" lg="12" md="12">
		                  <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
		                      <Card className="card-raised card-form-horizontal no-transition mb-0">
		                          <CardBody className="bg-white p-0">
		                              <Table className="mb-0" responsive size="sm">
		                                  <thead>
		                                      <tr>
		                                          <td className="p-2 text-primary">No.</td>
		                                          <td className="p-2 text-primary">Bookmark Name</td>
		                                          <td className="p-2 text-primary">Action</td>
		                                      </tr>
		                                  </thead>
		                                  <tbody>
				                                  {bookmark2.length>0?bookmark2.map((data,key) =>
				                              		<tr key={key} onClick={()=>onClickSelected("2",data)}>
				                              			<td className="p-1">{key+1}</td>
				                              			<td className="p-1">{data.cargo_mark_bookmark_name}</td>
				                              			<td className="td-actions p-1">
				                                        <Button
				                                          className="btn-link"
				                                          color="danger"
				                                          data-toggle="tooltip"
				                                          id={"remove"+key}
				                                          size="sm"
				                                          type="button"
				                                          style={{marginBottom:'0'}}
				                                          onClick={()=>{onPropsMarkDeleteBookmark(data)}}
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
				                              	):<></>}
		                                  </tbody>
		                              </Table>
		                          </CardBody>
		                      </Card>
		                  </FormGroup>
		              </Col>
		          </Row>
		          <hr/>
			        <Row>
					    <Col xl="5" lg="5" md="12">
					            <Label className="mb-0">Bookmark Name</Label>
					            <Input type="text" name="cargo_mark_bookmark_name" id="cargo_mark_bookmark_name" placeholder=""  className="mb-1"
					            invalid={!mark.cargo_mark_bookmark_name?true:false}
					            value={mark.cargo_mark_bookmark_name} 
					            onChange = {(event)=>onHandleReturnVal(event,'cargo_mark_bookmark_name')} onBlur={onPropsCargoBookmark}
					            />
					    </Col>
				    	<Col xl="12" lg="12" md="12">
					            <Label className="mb-0">Description 1</Label>
					            <Input type="text" name="mark_desc1" id="mark_desc1" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc1?mark.mark_desc1:''} 
					            onChange = {(event)=>onHandleReturnVal(event,'mark_desc1')} onBlur={onPropsCargoBookmark}/>
				        </Col>
				        <Col xl="12" lg="12" md="12">
					            <Label className="mb-0">Description 2</Label>
					            <Input type="text" name="mark_desc2" id="mark_desc2" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc2?mark.mark_desc2:''} 
					            onChange = {(event)=>onHandleReturnVal(event,'mark_desc2')} onBlur={onPropsCargoBookmark}/>
				        </Col>
				        <Col xl="12" lg="12" md="12">
					            <Label className="mb-0">Description 3</Label>
					            <Input type="text" name="mark_desc3" id="mark_desc3" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc3?mark.mark_desc3:''} 
					            onChange = {(event)=>onHandleReturnVal(event,'mark_desc3')} onBlur={onPropsCargoBookmark}/>
				        </Col>
				        <Col xl="12" lg="12" md="12">
					            <Label className="mb-0">Description 4</Label>
					            <Input type="text" name="mark_desc4" id="mark_desc4" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc4?mark.mark_desc4:''} 
					            onChange = {(event)=>onHandleReturnVal(event,'mark_desc4')} onBlur={onPropsCargoBookmark}/>
					    </Col>
					    <Col xl="12" lg="12" md="12">
						        <Label className="mb-0">Description 5</Label>
						        <Input type="text" name="mark_desc5" id="mark_desc5" placeholder=""  className="mb-1" rows={1} value={mark.mark_desc5?mark.mark_desc5:''} 
						        onChange = {(event)=>onHandleReturnVal(event,'mark_desc5')} onBlur={onPropsCargoBookmark}/>
					    </Col>		
			      </Row>

	          </TabPane>
	          <TabPane tabId="hTabs3">
		          <Row className="m-0">
	              	<Col>Goods BookMark List</Col>
		          </Row>
		          {/* <CardBody className="pt-2 pb-2 bg-white"> */}
		          <Row className="m-0">
		              <Col xl="12" lg="12" md="12">
		                  <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
		                      <Card className="card-raised card-form-horizontal no-transition mb-0">
		                          <CardBody className="bg-white p-0">
		                              <Table className="mb-0" responsive hover size="sm">
		                                  <thead>
		                                      <tr>
		                                          <td className="p-2 text-primary">No.</td>
		                                          <td className="p-2 text-primary">Bookmark Name</td>
		                                          <td className="p-2 text-primary">Action</td>
		                                      </tr>
		                                  </thead>
		                                  <tbody>
		                                  {bookmark3.length>0?bookmark3.map((data,key) =>
		                              		<tr key={key} onClick={()=>onClickSelected("3",data)}>
		                              			<td className="p-1">{key+1}</td>
		                              			<td className="p-1">{data.cargo_goods_bookmark_name}</td>
		                              			<td className="td-actions p-1">
		                                        <Button
		                                          className="btn-link"
		                                          color="danger"
		                                          data-toggle="tooltip"
		                                          id={"remove"+key}
		                                          size="sm"
		                                          type="button"
		                                          style={{marginBottom:'0'}}
		                                          onClick={()=>{onPropsGoodsDeleteBookmark(data)}}
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
		                              	):<></>}
		                                  </tbody>
		                              </Table>
		                          </CardBody>
		                      </Card>
		                  </FormGroup>
		              </Col>
		          </Row>
		          <hr/>
		          <Row>
			        <Col xl="5" lg="5" md="12">
			            <Label className="mb-0">Bookmark Name</Label>
			            <Input type="text" name="cargo_goods_bookmark_name" id="cargo_goods_bookmark_name" placeholder=""  className="mb-1" value={goods.cargo_goods_bookmark_name} 
			            onChange = {(event)=>onHandleReturnVal(event,'cargo_goods_bookmark_name')} onBlur={onPropsCargoBookmark} 
			            invalid={!goods.cargo_goods_bookmark_name?true:false}
			            />
			    </Col>
		    	<Col xl="12" lg="12" md="12">
			            <Label className="mb-0">Description 1</Label>
			            <Input type="text" name="goods_desc1" id="goods_desc1" placeholder=""  className="mb-1" value={goods.goods_desc1?goods.goods_desc1:''} 
			            onChange = {(event)=>onHandleReturnVal(event,'goods_desc1')} onBlur={onPropsCargoBookmark}/>
		        </Col>
		        <Col xl="12" lg="12" md="12">
			            <Label className="mb-0">Description 2</Label>
			            <Input type="text" name="goods_desc2" id="goods_desc2" placeholder=""  className="mb-1" value={goods.goods_desc2?goods.goods_desc2:''} 
			            onChange = {(event)=>onHandleReturnVal(event,'goods_desc2')} onBlur={onPropsCargoBookmark}/>
		        </Col>
		        <Col xl="12" lg="12" md="12">
			            <Label className="mb-0">Description 3</Label>
			            <Input type="text" name="goods_desc3" id="goods_desc3" placeholder=""  className="mb-1" value={goods.goods_desc3?goods.goods_desc3:''} 
			            onChange = {(event)=>onHandleReturnVal(event,'goods_desc3')} onBlur={onPropsCargoBookmark}/>
		        </Col>
		        <Col xl="12" lg="12" md="12">
			            <Label className="mb-0">Description 4</Label>
			            <Input type="text" name="goods_desc4" id="goods_desc4" placeholder=""  className="mb-1" value={goods.goods_desc4?goods.goods_desc4:''} 
			            onChange = {(event)=>onHandleReturnVal(event,'goods_desc4')} onBlur={onPropsCargoBookmark}/>
			    </Col>
			    <Col xl="12" lg="12" md="12">
				        <Label className="mb-0">Description 5</Label>
				        <Input type="text" name="goods_desc5" id="goods_desc5" placeholder=""  className="mb-1" value={goods.goods_desc5?goods.goods_desc5:''} 
				        onChange = {(event)=>onHandleReturnVal(event,'goods_desc5')} onBlur={onPropsCargoBookmark}/>
			    </Col>		
	      </Row> 
	          </TabPane>
	        </TabContent>
    </>
    );
}

export default CargoBookmark;