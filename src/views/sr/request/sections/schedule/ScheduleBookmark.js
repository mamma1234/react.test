/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText, Table,UncontrolledTooltip}
     from "reactstrap";
import Schedule from "./Schedule.js";
import axios from 'axios';


const ScheduleBookmark = (props) => {
	
  const {bookmark,loadData,getPort,getVsl,outLinePortList,inLinePortList} = props;	

  useEffect(() => {
	    setSchedule(loadData);
	  },[loadData]);
  
  // modal 창을 위한 state
  const [coll, setColl] = useState(false);
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState({});
  
  const onPropsSchBookmark =(data) =>{
	  setSchedule(data);
	  props.onPropsSchBookmark(data);
  }
  
  
  const onPropsSchDeleteBookmark =(data) =>{
		 
	  props.onPropsSchDeleteBookmark(data);
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
	                                                <td className="p-2 bg-info">POL</td>
	                                                <td className="p-2 bg-info">POD</td>
	                                                <td className="p-2 bg-info">Action</td>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                        {bookmark.length>0?bookmark.map((element,key)=>{
	                                            return(
	                                                <tr scope="row" key={key} onClick={()=>{onPropsSchBookmark(element)}}>
	                                                    <td className="p-2">{key+1}</td>
	                                                    <td className="p-2">{element.schedule_bookmark_name}</td>
	                                                    <td className="p-2">{element.sch_pol}</td>
	                                                    <td className="p-2">{element.sch_pod}</td>
	                                                    <td className="td-actions p-1">
				                                        <Button
				                                          className="btn-link"
				                                          color="danger"
				                                          data-toggle="tooltip"
				                                          id={"remove"+key}
				                                          size="sm"
				                                          type="button"
				                                          style={{marginBottom:'0'}}
				                                          onClick={()=>{onPropsSchDeleteBookmark(element)}}
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
	                                        }):<></>}
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
       <Schedule loadData={schedule} bookmark={bookmark} propsData={onPropsSchBookmark} getVsl={getVsl} outLinePortList={outLinePortList} inLinePortList={inLinePortList} onAlert={props.onAlert}/>
   </>
    );
}

export default ScheduleBookmark;