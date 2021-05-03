/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText, Table,UncontrolledTooltip}
     from "reactstrap";
import axios from 'axios';
import Select from "react-select";

const Bookmark = (props) => {

  const {bookmark,titleProps,validation} = props;
  
  useEffect(() => {
	  	setTitleRelation(titleProps);
	  },[titleProps]);

  // modal 창을 위한 state
  const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);
  const [titleRelation, setTitleRelation] = useState({});

  const fncOnchangeRelation =(value,name)=> {
	  var list={};
	  if(name === 'BOOKING') {
		  list={...list,'booking_label':value.label,'booking_value':value.value};
	  } else if(name === 'SCHEDULE') {
		  list={...list,'schedule_label':value.label,'schedule_value':value.value};
	  } else if(name === 'CARRIER') {
		  list={...list,'carrier_label':value.label,'carrier_value':value.value};
	  } else if(name === 'SHIPPER') {
		  list={...list,'shipper_label':value.label,'shipper_value':value.value};
	  } else if(name === 'CONSIGNEE') {
		  list={...list,'consignee_label':value.label,'consignee_value':value.value};
	  } else if(name === 'NOTIFY') {
		  list={...list,'notify_label':value.label,'notify_value':value.value};
	  } else if(name === 'CARGO') {
		  list={...list,'cargo_label':value.label,'cargo_value':value.value};
	  }
	  setTitleRelation({...titleRelation,...list});
      props.insertProps({...titleRelation,...list});
  } 
  
  const fncOnChange = (value,name) => {
	  setTitleRelation({...titleRelation,[name]:value});
  }
 
  const fncSelectBookmark = (data)=> {
	  props.selectProps(data);
	  
  }
  
  const fncOnBlur =()=>{
	  props.insertProps(titleRelation);
  }
  
  const onPropsDelete=(data)=>{
	  props.deleteProps(data);
  }
  
  return (
		  <Row className="mb-3">
          	<Col xl="4" lg="4" md="12">
              <FormGroup style={{height:'400px',overflow:'auto'}} className="mb-0">
              <Label className="mb-0">Bookmark List</Label>
		      	<Card className="card-raised card-form-horizontal no-transition mb-0">
		      		<CardBody className="bg-white p-0">
				        <Table className="mb-0" responsive hover size="sm">
				            <thead>
				                <tr>
				                    <td className="p-2 bg-info">Name</td>
				                    <td className="p-2 bg-info">Action</td>
				                </tr>
				            </thead>
				            <tbody>
				            {(bookmark.length > 0)?bookmark.map((element,key)=>{
				                return(
				                    <tr scope="row" key={key} >
				                        <td onClick={()=>{fncSelectBookmark(element)}} >{element.bookmark_name}</td>
				                        <td className="td-actions p-1">
                                        <Button
                                          className="btn-link"
                                          color="danger"
                                          data-toggle="tooltip"
                                          id={"totremove"+key}
                                          size="sm"
                                          type="button"
                                          style={{marginBottom:'0'}}
                                          onClick={()=>{onPropsDelete(element)}}
                                        >
                                          <i className="fa fa-times" />
                                        </Button>
                                        <UncontrolledTooltip
                                          delay={0}
                                          placement="top"
                                          target={"totremove"+key}
                                        >
                                          Remove
                                        </UncontrolledTooltip>
                                      </td>
				                    </tr>
				                )
				            }):
				            <></>}
				            </tbody>
				        </Table>
				      </CardBody>
		           </Card>
                </FormGroup>
			</Col>
			<Col xl="8" lg="8" md="12">
			<Label className="mb-0">Bookmark</Label>
		    <Card style={{zIndex:'70'}} className="card-raised card-form-horizontal no-transition mb-0">
		        <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>
		            <Row className="pb-2">
		                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>Bookmark Name
		                </Col>
		                <Col>
		                    <Row>
		                        <Col className="col-10 pr-0">
		                            <Input
		                                type="text" name="bookmark_name" id="bookmark_name"
		                                placeholder=""
		                                maxLength="35"
		                                value={titleRelation.bookmark_name?titleRelation.bookmark_name:''}
		                                onChange={(e)=>fncOnChange(e.target.value, 'bookmark_name')}
		                                onBlur={()=>fncOnBlur()}
		                            />
		                        </Col>
		                    </Row>
		                </Col>
		            </Row>
		            <Row className="pb-2">
		                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>BOOKING
		                </Col>
		                <Col>
		                    <Row>
		                        <Col className="col-10 pr-0">
		                            <Select
		                                className="react-select react-select-primary"
		                                classNamePrefix="react-select"
		                                name="bookingbookmark"
		                               value={{
		                                    value:titleRelation.booking_value?titleRelation.booking_value:'',
		                                    label:titleRelation.booking_label?titleRelation.booking_label:'선택',
		                                }}
		                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'BOOKING')}
		                                options={props.booking}
		                                placeholder={"선택"}
		                            />
		                        </Col>
		                    </Row>
		                </Col>
		            </Row>
		            <Row className="pb-2">
		                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>SCHEDULE
		                </Col>
		                <Col>
		                    <Row>
		                        <Col className="col-10 pr-0">
		                            <Select
		                                className="react-select react-select-primary"
		                                classNamePrefix="react-select"
		                                name="schedulebookmark"
		                                value={{
		                                    value:titleRelation.schedule_value?titleRelation.schedule_value:'',
		                                    label:titleRelation.schedule_label?titleRelation.schedule_label:'선택',
		                                }}
		                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'SCHEDULE')}
		                                options={props.schedule}
		                                placeholder={"선택"}
		                            />
		                        </Col>
		                    </Row>
		                </Col>
		            </Row>
		            <Row className="pb-2">
		                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>CARRIER
		                </Col>
		                <Col>
		                    <Row>
		                        <Col className="col-10 pr-0">
		                            <Select
		                                className="react-select react-select-primary"
		                                classNamePrefix="react-select"
		                                name="carrierbookmark"
		                                value={{
		                                    value:titleRelation.carrier_value?titleRelation.carrier_value:'',
		                                    label:titleRelation.carrier_label?titleRelation.carrier_label:'선택',
		                                }}
		                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'CARRIER')}
		                                options={props.carrier}
		                                placeholder={"선택"}
		                            />
		                        </Col>
		                    </Row>
		                </Col>
		            </Row>
		            <Row className="pb-2">
		                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>SHIPPER
		                </Col>
		                <Col>
		                    <Row>
		                        <Col className="col-10 pr-0">
		                            <Select
		                                className="react-select react-select-primary"
		                                classNamePrefix="react-select"
		                                name="shipperbookmark"
		                                value={{
		                                    value:titleRelation.shipper_value?titleRelation.shipper_value:'',
		                                    label:titleRelation.shipper_label?titleRelation.shipper_label:'선택',
		                                }}
		                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'SHIPPER')}
		                                options={props.shipper}
		                                placeholder={"선택"}
		                            />
		                        </Col>
		                    </Row>
		                </Col>
		            </Row>
		            <Row className="pb-2">
		                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>CONSIGNEE
		                </Col>
		                <Col>
		                    <Row>
		                        <Col className="col-10 pr-0">
		                            <Select
		                                className="react-select react-select-primary"
		                                classNamePrefix="react-select"
		                                name="consigneebookmark"
		                                value={{
		                                    value:titleRelation.consignee_value?titleRelation.consignee_value:'',
		                                    label:titleRelation.consignee_label?titleRelation.consignee_label:'선택',
		                                }}
		                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'CONSIGNEE')}
		                                options={props.consignee}
		                                placeholder={"선택"}
		                            />
		                        </Col>
		                    </Row>
		                </Col>
		            </Row>
		            <Row className="pb-2">
		                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>NOTIFY
		                </Col>
		                <Col>
		                    <Row>
		                        <Col className="col-10 pr-0">
		                            <Select
		                                className="react-select react-select-primary"
		                                classNamePrefix="react-select"
		                                name="carrierbookmark"
		                                value={{
		                                    value:titleRelation.notify_value?titleRelation.notify_value:'',
		                                    label:titleRelation.notify_label?titleRelation.notify_label:'선택',
		                                }}
		                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'NOTIFY')}
		                                options={props.notify}
		                                placeholder={"선택"}
		                            />
		                        </Col>
		                    </Row>
		                </Col>
		            </Row>
		            <Row className="pb-2">
		                <Col className="mt-2 mb-0 col-5" style={{fontSize:'14px',color:'#696969',fontWeight:'500'}}>CARGO
		                </Col>
		                <Col>
		                    <Row>
		                        <Col className="col-10 pr-0">
		                            <Select
		                                className="react-select react-select-primary"
		                                classNamePrefix="react-select"
		                                name="transportbookmark"
		                                value={{
		                                    value:titleRelation.cargo_value?titleRelation.cargo_value:'',
		                                    label:titleRelation.cargo_label?titleRelation.cargo_label:'선택',
		                                }}
		                                onChange={(value)=>fncOnchangeRelation(value?value:null, 'CARGO')}
		                                options={props.cargo}
		                                placeholder={"선택"}
		                            />
		                        </Col>
		                    </Row>
		                </Col>
		            </Row>
		            
		        </CardBody>
		    </Card>
		  </Col>
    </Row>
    );
}

export default Bookmark;