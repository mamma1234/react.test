/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText, Table,UncontrolledTooltip}
     from "reactstrap";
import Shipper from "./Shipper.js";
import axios from 'axios';


const ShipperBookmark = (props) => {
	
  const {bookmark,loadFormData,validation} = props;
  
  useEffect(() => {
	    setShipper(loadFormData);
	  },[loadFormData]);

  // modal 창을 위한 state
  const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);
  const [shipper, setShipper] = useState({});
  
  
  const onPropsShBookmark =(data) =>{
	  setShipper(data);
	  props.onPropsShBookmark(data);
  }
  
  const onPropsShDeleteBookmark =(data) =>{
	 
	  props.onPropsShDeleteBookmark(data);
  }
  
  return (
    <>
        <Row>
        	<Col>BookMark List</Col>
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
	                                                <td className="p-2 bg-info">Shipper Name</td>
	                                                <td className="p-2 bg-info">Action</td>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                        {bookmark.map((element,key)=>{
	                                            return(
	                                                <tr scope="row" key={key} onClick={()=>{onPropsShBookmark(element)}}>
	                                                    <td className="p-2">{key+1}</td>
	                                                    <td className="p-2">{element.shipper_bookmark_name}</td>
	                                                    <td className="p-2">{element.shp_name1}</td>
	                                                    <td className="td-actions p-1">
				                                        <Button
				                                          className="btn-link"
				                                          color="danger"
				                                          data-toggle="tooltip"
				                                          id={"remove"+key}
				                                          size="sm"
				                                          type="button"
				                                          style={{marginBottom:'0'}}
				                                          onClick={()=>{onPropsShDeleteBookmark(element)}}
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
            <Col>BookMark Input</Col>
       </Row>
       <hr className="m-2"/>
       <Shipper type="B" loadFormData={shipper} bookmark={bookmark} propsData={onPropsShBookmark} onAlert={props.onAlert}  validation={validation}/>
   </>
    );
}

export default ShipperBookmark;