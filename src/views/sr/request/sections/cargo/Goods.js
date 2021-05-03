/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input,Card,ButtonGroup, Button,CardHeader,CardBody,Collapse,FormFeedback } from "reactstrap";
//import AlertModal from 'components/Modals/Alert.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";

const Goods = (props) => {
	
  const {loadData,bookmark,view,validation} = props;	

  useEffect(() => {
	  setGoodsData(loadData);
  },[loadData]);

  const [goodsData, setGoodsData] = useState({});

  const onHandleReturnVal = (event,name) => { 
	  //if(validation.getByte(event.target.value) < 36) {
    	  let list = {...goodsData, [name]:event.target.value};
    	  setGoodsData(list);
     // } else {
    	//  props.onAlert("error",validation.EXCD_MSG+"(35 Byte)");
     // }
    }
  
  const onPropsReturn = ()=> {
  	  props.propsData(goodsData);
    }
  
  const onDeleteGoods =(goodsData)=>{
	  props.propsDelete(goodsData);
  }
  
  const onChangeGoods =(event)=> {

      if(event.target.value > 0) {
			axios.post("/shipper/getUserGoodsBookmark",{user_no:props.user?props.user.user_no:'',seq:event.target.value},{})								
		  	.then(res => { 
		  		          setGoodsData(res.data[0]);
		  		          props.propsData(res.data[0]);
		  	              });
      } else {
   
    	  setGoodsData([]);
      }
  }
  
  return (
    <>
	    <Card className="no-transition mb-2" style={{border:'1px solid silver'}}>
		    <CardHeader className="pt-1 pb-1">
		      <Row>
		      	<Col className="col-6">
			      	<Input type="select" className="pt-0 pb-0" style={{height:'28px'}}
		      		  value={goodsData.cargo_goods_bookmark_seq?goodsData.cargo_goods_bookmark_seq:''} 
			      	  onChange={(event)=>onChangeGoods(event)}>
		      		  <option value="">선택</option>
			      		{bookmark.length>0?bookmark.map((element,key)=>
			      			<option key={key} value={element.cargo_goods_bookmark_seq}>{element.cargo_goods_bookmark_name}</option>
			      		):<></>}
		      	    </Input>
	      	    </Col>
		      	<Col><button
	        className="close"
	            type="button"
	            	onClick={(goodsData)=>onDeleteGoods(goodsData)}
	          >×</button></Col>
		      </Row>
		    </CardHeader>
		 
		    <CardBody className="pt-0 pb-3">
		    {/*  <FormGroup className="mb-0">
			      <Input type="text" bsSize="sm" name="goods_desc1" id="goods_desc1" placeholder="" style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}} maxLength="35" disabled={view?true:false}
			    	invalid={!view&&!goodsData.goods_desc1?true:false} value={goodsData.goods_desc1?goodsData.goods_desc1:''}
				    onChange={(event)=>onHandleReturnVal(event,'goods_desc1')} onBlur={onPropsReturn}/>
			      <FormFeedback>{validation.REQ_MSG}</FormFeedback>
		      </FormGroup>*/}
		    <FormGroup className="mb-0">
		      <InputValid 
	              type="text"
	              name="goods_desc1"
	              id="goods_desc1"
	              placeholder=""
	              maxLength="35"
	              bsSize="sm"
	              value={goodsData.goods_desc1?goodsData.goods_desc1:''}
	              onChange={(e)=>onHandleReturnVal(e, 'goods_desc1')}
	              onBlur={onPropsReturn}
	              validtype="text"
	              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
	              required={!view?true:false} 
	              feedid="cargo"
	              disabled={view?true:false}
	          /></FormGroup>
		      <FormGroup className="mb-0">
		      <InputValid 
              type="text"
              name="goods_desc2"
              id="goods_desc2"
              placeholder=""
              maxLength="35"
              bsSize="sm"
              value={goodsData.goods_desc2?goodsData.goods_desc2:''}
              onChange={(e)=>onHandleReturnVal(e, 'goods_desc2')}
              onBlur={onPropsReturn}
              validtype="text"
              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
              required={false} 
              feedid="cargo"
              disabled={view?true:false}
          /></FormGroup>
		      <FormGroup className="mb-0">
          <InputValid 
	              type="text"
	              name="goods_desc3"
	              id="goods_desc3"
	              placeholder=""
	              maxLength="35"
	              bsSize="sm"
	              value={goodsData.goods_desc3?goodsData.goods_desc3:''}
	              onChange={(e)=>onHandleReturnVal(e, 'goods_desc3')}
	              onBlur={onPropsReturn}
	              validtype="text"
	              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
	              required={false} 
	              feedid="cargo"
	              disabled={view?true:false}
	          /></FormGroup>
          <FormGroup className="mb-0">
	          <InputValid 
              type="text"
              name="goods_desc4"
              id="goods_desc4"
              placeholder=""
              maxLength="35"
              bsSize="sm"
              value={goodsData.goods_desc4?goodsData.goods_desc4:''}
              onChange={(e)=>onHandleReturnVal(e, 'goods_desc4')}
              onBlur={onPropsReturn}
              validtype="text"
              style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
              required={false} 
              feedid="cargo"
              disabled={view?true:false}
          /></FormGroup>
	          <FormGroup className="mb-0">
              <InputValid 
              type="text"
              name="goods_desc5"
              id="goods_desc5"
              placeholder=""
              maxLength="35"
              bsSize="sm"
              value={goodsData.goods_desc5?goodsData.goods_desc5:''}
              onChange={(e)=>onHandleReturnVal(e, 'goods_desc5')}
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

export default Goods;