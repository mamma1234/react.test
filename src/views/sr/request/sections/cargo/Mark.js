/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input,Card,ButtonGroup, Button,CardHeader,CardBody,Collapse } from "reactstrap";
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
const Mark = (props) => {
  const {loadData,bookmark,view,validation} = props;	

  useEffect(() => {
	  setMarkData({...loadData,'mark_desc1':loadData.mark_desc1?loadData.mark_desc1:'NO MARK'});
  },[loadData]);

  const [markData, setMarkData] = useState({});

  const onHandleReturnVal = (event,name) => { 
	 // if(validation.getByte(event.target.value) < 36) {
    	  let list = {...markData, [name]:event.target.value};
    	  setMarkData(list);
     // } else {
    //	  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
    //  }
	  
    }
  
  const onPropsReturn = ()=> {
  	  props.propsData(markData);
    }
  
  const onDeleteMark =(markData)=>{
	  props.propsDelete(markData);
  }
  
  const onChangeMark =(event)=> {
     // setMarkData({...markData,'cargo_mark_bookmark_seq':event.target.value})
      if(event.target.value > 0) {
			axios.post("/shipper/getUserMarkBookmark",{user_no:props.user?props.user.user_no:'',seq:event.target.value},{})								
		  	.then(res => {
		  		          setMarkData(res.data[0]);
		  		          props.propsData(res.data[0]);
		  	              });
      } else {
    	  setMarkData([]);
      }
  }
  
  return (
    <>
	    <Card className="no-transition mb-2" style={{border:'1px solid silver'}}>
		    <CardHeader className="pt-1 pb-1">
		      <Row>
		      	<Col className="col-6">
		      		<Input type="select" className="pt-0 pb-0" style={{height:'28px'}}
		      		  value={markData.cargo_mark_bookmark_seq?markData.cargo_mark_bookmark_seq:''} 
		      		  onChange={(event)=>onChangeMark(event)}>
		      		  <option value="">선택</option>
			      		{bookmark.length>0?bookmark.map((element,key)=>
			      			<option key={key} value={element.cargo_mark_bookmark_seq}>{element.cargo_mark_bookmark_name}</option>
			      		):<></>}
		      	    </Input>
		      	</Col>
		      	<Col><button
	        className="close"
	            type="button"
	            onClick={(markData)=>onDeleteMark(markData)}
	          >×</button></Col>
		      </Row>
		    </CardHeader>
	
			    <CardBody className="pt-0 pb-3">
			    <FormGroup className="mb-0">
	              <InputValid 
	              type="text"
	              name="mark_desc1"
	              id="mark_desc1"
	              placeholder=""
	              maxLength="35"
	              bsSize="sm"
	              value={markData.mark_desc1?markData.mark_desc1:''}
	              onChange={(e)=>onHandleReturnVal(e, 'mark_desc1')}
	              onBlur={onPropsReturn}
	              validtype="text"
	              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
	              required={false} 
	              feedid="cargo"
	              disabled={view?true:false}
	          />	</FormGroup>
				    <FormGroup className="mb-0">
		              <InputValid 
		              type="text"
		              name="mark_desc2"
		              id="mark_desc2"
		              placeholder=""
		              maxLength="35"
		              bsSize="sm"
		              value={markData.mark_desc2?markData.mark_desc2:''}
		              onChange={(e)=>onHandleReturnVal(e, 'mark_desc2')}
		              onBlur={onPropsReturn}
		              validtype="text"
		              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
		              required={false} 
		              feedid="cargo"
		              disabled={view?true:false}
		          />	</FormGroup>
					    <FormGroup className="mb-0">
			              <InputValid 
			              type="text"
			              name="mark_desc3"
			              id="mark_desc3"
			              placeholder=""
			              maxLength="35"
			              bsSize="sm"
			              value={markData.mark_desc3?markData.mark_desc3:''}
			              onChange={(e)=>onHandleReturnVal(e, 'mark_desc3')}
			              onBlur={onPropsReturn}
			              validtype="text"
			              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
			              required={false} 
			              feedid="cargo"
			              disabled={view?true:false}
			          />	</FormGroup>
						    <FormGroup className="mb-0">
				              <InputValid 
				              type="text"
				              name="mark_desc4"
				              id="mark_desc4"
				              placeholder=""
				              maxLength="35"
				              bsSize="sm"
				              value={markData.mark_desc4?markData.mark_desc4:''}
				              onChange={(e)=>onHandleReturnVal(e, 'mark_desc4')}
				              onBlur={onPropsReturn}
				              validtype="text"
				              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
				              required={false} 
				              feedid="cargo"
				              disabled={view?true:false}
				          />	</FormGroup>
							    <FormGroup className="mb-0">
					              <InputValid 
					              type="text"
					              name="mark_desc5"
					              id="mark_desc5"
					              placeholder=""
					              maxLength="35"
					              bsSize="sm"
					              value={markData.mark_desc5?markData.mark_desc5:''}
					              onChange={(e)=>onHandleReturnVal(e, 'mark_desc5')}
					              onBlur={onPropsReturn}
					              validtype="text"
					              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
					              required={false} 
					              feedid="cargo"
					              disabled={view?true:false}
					          />	</FormGroup>
		  	</CardBody>
	
	  </Card> 
    </>
    );
}

export default Mark;