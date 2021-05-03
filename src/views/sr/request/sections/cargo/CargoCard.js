/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, CardTitle, CardText,CardFooter, Badge,UncontrolledTooltip,FormFeedback,UncontrolledPopover,
    InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import Select from "react-select";
import AlertModal from 'components/Modals/Alert.js';
import CargoBookmark from './CargoBookmark.js';
import HsCode from './HsCodePopup.js';
import Cargo from './Cargo.js';
import Mark from './Mark.js';
import Goods from './Goods.js';
import axios from 'axios';
import InputValid from "components/CustomInput/InputValid.js";
let cargoData = {};
let markData = {};
let goodsData = {};


const CargoCard = (props) => {

   const {bookmark,loadData,bookmark2,bookmark3,openWindow,validation} = props;
   const [cargo, setCargo] = useState([]);
   const [propsData, setPropsData] = useState([]);
   // Collapse Flag
   const [coll, setColl] = useState(false);
   // modal 창을 위한 state
   const [open, setOpen] = useState(false);
   const [modalTitle, setModalTitle] = useState("Cargo Info");
   const [markList,setMarkList] = React.useState([]);
   const [goodsList,setGoodsList] = React.useState([]);
   const [packCodeList,setPackCodeList] = React.useState([]);
   
   // 전체화면 css 적용을 위한 state
   const [bookmarkView, setBookmarkView] = useState(false);
   const [bookmarkList, setBookmarkList] = useState([]);
   const [hsCodeList,setHsCodeList] = useState([]);
   const [tap, setTap] = React.useState("1");
   
  useEffect(() => { 
    setCargo(loadData);
    setMarkList(loadData.marklist?loadData.marklist.length>0?loadData.marklist:[{}]:[{}]);
    setGoodsList(loadData.goodlist?loadData.goodlist.length>0?loadData.goodlist:[{}]:[{}]);
  },[loadData]);
  
  useEffect(() => {
	    setColl(openWindow);
	  },[openWindow]);
  
  useEffect(() => {
	  
       if(props.user) {
    	   codePackage();
    	   hsCodeSearch();
       }
	  },[props.user]);


  
  const toggle = (params) => {
    		  
    		  if(params==='B') {
    			  setModalTitle("Cargo BookMark");
    			  props.onLoadData("cg");
    			  setPropsData({...loadData,'cargo_bookmark_name':'','cargo_bookmark_seq':'','cargo_pack_qty':'','cargo_pack_type':'','cargo_hs_code':'',
    				                        'cargo_total_weight':'','cargo_total_volume':'',
    				                        'marklist':{},
    				                        'goodlist':{}});
    			  cargoData=loadData;
    			  setBookmarkView(true);
    		  } else {
    			  setModalTitle("Cargo Info");
    			  setPropsData(loadData);
    			  cargoData=loadData;
    			  setBookmarkView(false);
    		  }
      
      setOpen(!open);
  }
  
  const codePackage =()=> {
		axios.post("/shipper/selectLineCodeCargoPackType",{params:{'line_code':'WDFC'}},{})								
	  	.then(res => {setPackCodeList(res.data)});	
	}

  const hsCodeSearch=()=>{
 	 axios.post("/shipper/getHsCodeGroupInfo")
	  .then(res =>setHsCodeList(res.data));
  }

  
  const onInitData = () => {
     if(bookmarkView) {
      setPropsData({...propsData,'cargo_bookmark_name':'','cargo_bookmark_seq':'','cargo_pack_qty':'','cargo_pack_type':'',
		  'cargo_hs_code':'','cargo_total_weight':'','cargo_total_volume':'',
		  'marklist':{'cargo_mark_bookmark_name':'','cargo_mark_bookmark_seq':'','mark_desc1':'','mark_desc2':'','mark_desc3':'','mark_desc4':'','mark_desc5':''},
		  'goodlist':{'cargo_goods_bookmark_name':'','cargo_goods_bookmark_seq':'','goods_desc1':'','goods_desc2':'','goods_desc3':'','goods_desc4':'','goods_desc5':''}});
     } else {
    	 setPropsData({...propsData,'cargo_bookmark_name':'','cargo_bookmark_seq':'','cargo_pack_qty':'','cargo_pack_type':'',
   		  'cargo_hs_code':'','cargo_total_weight':'','cargo_total_volume':'',
   		  'marklist':[{'cargo_mark_bookmark_seq':'','mark_desc1':'','mark_desc2':'','mark_desc3':'','mark_desc4':'','mark_desc5':''}],
   		  'goodlist':[{'cargo_goods_bookmark_seq':'','goods_desc1':'','goods_desc2':'','goods_desc3':'','goods_desc4':'','goods_desc5':''}]});
     }
	}
  
  const onSaveBookmark =()=> {

		if(tap === "1") {
			if(cargoData.cargo_bookmark_name !=null && cargoData.cargo_bookmark_name !="") {	
	            
				axios.post("/shipper/setUserCargoBookmark",{user_no:props.user?props.user.user_no:'',data:cargoData},{})								
		  	  	.then(res => {
		  	  	              props.onLoadData("cg");
		  	  	              props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
		  	  	});
			}/* else {
				props.onAlert("error","cargo_bookmark_name 는 필수 입력항목 입니다.");
			}*/
		} else if (tap === "2") {
			
			if(markData.cargo_mark_bookmark_name !=null && markData.cargo_mark_bookmark_name !="") {
				
				axios.post("/shipper/setUserMarkBookmark",{user_no:props.user?props.user.user_no:'',data:markData},{})								
		  	  	.then(res => {
		  	  	              props.onLoadData("mk");
		  	  	          props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
		  	  	});
			}/* else {
				props.onAlert("error","cargo_mark_bookmark_name 는 필수 입력항목 입니다.");
			}*/
		} else if( tap === "3") {
			if(goodsData.cargo_goods_bookmark_name !=null && goodsData.cargo_goods_bookmark_name !="") {
				
				axios.post("/shipper/setUserGoodsBookmark",{user_no:props.user?props.user.user_no:'',data:goodsData},{})								
		  	  	.then(res => {
		  	  	              props.onLoadData("gs");
		  	  	          props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");
		  	  	});
			}/* else {
				props.onAlert("error","cargo_goods_bookmark_name 는 필수 입력항목 입니다.");
			}*/
		} else {
			console.log("ERROR");
		}
	}

  
  const onChangeTap = (tap)=> {
	  if(tap ==="1") {
		  setTap("1");
		  props.onLoadData("cg");
	  } else if(tap ==="2"){
		  setTap("2");
		  props.onLoadData("mk");
	  } else {
		  setTap("3");
		  props.onLoadData("gs");
	  }
  }
  
 	
	const onBookMarkCargoDelete = (data) => {

		axios.post("/shipper/setUserCargoBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
  	  				  props.onLoadData("cg");
  	  				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
  	  	});
		
	}

	const onBookMarkMarkDelete = (data) => {

		axios.post("/shipper/setUserMarkBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
  	  				  props.onLoadData("mk");
  	  				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
  	  	});
		
	}
	const onBookMarkGoodsDelete = (data) => {

		axios.post("/shipper/setUserGoodsBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
  	  				  props.onLoadData("gs");
  	  				props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
  	  	});
		
	}
	
	const onChangeCargo =(value)=> {

		setCargo({...cargo,'cargo_bookmark_seq':value.value,'cargo_bookmark_name':value.label});
		if(value.value > 0) {
			axios.post("/shipper/getUserCargoBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})								
	  	  	.then(res => {  
	  	  				    setCargo({...cargo,...res.data});
						  	setMarkList(res.data.marklist?res.data.marklist.length>0?res.data.marklist:[{}]:[{}]);
						    setGoodsList(res.data.goodlist?res.data.goodlist.length>0?res.data.goodlist:[{}]:[{}]);
						    props.mergeData({...cargo,...res.data});
						    setColl(true);
	  	  	});
		}
	}	
	  // 자식의 Data 적용
  const onBookMarkData = (step,data) => { console.log("gb:",step,"Data:",data);
  
      if(step === "1") {
    	  cargoData = data;	
      } else if(step === "2") {
    	  markData = data;
      } else {
    	  goodsData = data;
      }
	  
  }
  
  //button event
  const onApplyData = ()=> {
		setOpen(!open);
		const mergeData = Object.assign(cargo,cargoData);
		setCargo(mergeData);
		props.mergeData(mergeData);
  }
  // onChange evnet
  const onChangeReturnVal = (event,name) => {
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
  const onChangeReturnVal2 = (event,name) => { 
  	  let list = {...cargo, [name]:event.target.value};
  	  setCargo(list);
  	  props.mergeData(list);
  }
  // onBlur event 
  const onPropsReturn = ()=> {
	    props.mergeData(cargo);
  }
  // detail onBlur event
  const onDataMerge =(key,name,data) => { //console.log(">>>>>>name:",name,key,data);
	    let list;
        if(name === "mark") {
        	list = markList;
        	list[key] = data;
    		//const mergeData = Object.assign(cargo,{'marklist':list});
    		
    		setMarkList(list);
    		setCargo({...cargo,'marklist':list});
    		props.mergeData({...cargo,'marklist':list});
    		
        } else {
        	list = goodsList;
        	list[key] = data;
        	//const mergeData = Object.assign(cargo,{'goodlist':list});
        	setGoodsList(list);
        	setCargo({...cargo,'goodlist':list});
        	props.mergeData({...cargo,'goodlist':list});
        }
	 
  }
  //detail onClick event
  const onDataDelete =(key,name) => {
	    let list;
      if(name === "mark") {
    	  if(markList.length>1) {
			list = markList;
		    if(key > -1) {list.splice(key,1);} else {console.log("error:",key);} 
		      setMarkList([...list]);     
		  } else {
			  setMarkList([{'cargo_mark_bookmark_seq':'','cargo_seq':cargo.cargo_seq,'mark_seq':'1','mark_desc1':'','mark_desc2':'','mark_desc3':'','mark_desc4':'','mark_desc5':''}]);
		  }
      	
      } else {
    	  if(goodsList.length>1) {
  			list = goodsList;
  		    if(key > -1) {list.splice(key,1);} else {console.log("error:",key);} 
  		      setGoodsList([...list]);     
  		  } else {
  			setGoodsList([{'cargo_goods_bookmark_seq':'','cargo_seq':cargo.cargo_seq,'goods_seq':'1','goods_desc1':'','goods_desc2':'','goods_desc3':'','goods_desc4':'','goods_desc5':''}]);
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
        <Row id="Cargo">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'4'}}>
	            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
	            <Row className="pb-2">
	               <Col xl="8" className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARGO
	               <Button className="pl-1" color="link" id="cargoview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
		            <UncontrolledTooltip delay={0} target="cargoview">Input</UncontrolledTooltip>
		         </Col>
               <Col>
               	<Row>
                   		<Col className="col-10 pr-0">
	                   		<Select
						        className="react-select react-select-primary"
						        classNamePrefix="react-select"
						        name="carrierbookmark"
						        value={{value:cargo.cargo_bookmark_seq,label:cargo.cargo_bookmark_name}}
						        onChange={(value)=>onChangeCargo(value)}
						        options={bookmark}
						        placeholder={"선택"}
					        />
					 </Col>
					 <Col className="col-2 pl-auto pr-auto">
					 	<Button className="pl-0 pr-0" color="link" id="cargobookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
					    <UncontrolledTooltip delay={0} target="cargobookmark">Bookmark</UncontrolledTooltip>
					  </Col>
					  
				   </Row>
              </Col>
           </Row>
	              <Collapse isOpen={coll} className="mb-1">
	              	<hr className="mt-0"/>
	              		<Row style={{fontSize:'12px'}}>
			              	<Col xl="3" lg="12" md="12">
			                    <FormGroup className="mb-1">
			                        <Row>
			                        	<Col xl="4" className="pr-0 pt-1 col-3"><Label className="mb-0">HS CODE</Label></Col>
			                        	<Col>
			                        	<InputGroup>
			                            	<Input type="text" bsSize="sm" name="cargo_hs_code" id="cargo_hs_code"
			                            		invalid={!cargo.cargo_hs_code?true:false}
				                        	    value={cargo.cargo_hs_code?cargo.cargo_hs_code:''} onChange = {(event)=>onChangeReturnVal(event,'cargo_hs_code')} 
				                        	    onBlur={onPropsReturn}
				                        	/>
			                            	<InputGroupAddon addonType="append">
			                                <InputGroupText id= "hscode" className="pl-1 pr-1" style={{border:!cargo.cargo_hs_code?'1px solid red':'',borderRadius:'0 4px 4px 0'}}><i className="fa fa-search fa-2X" /></InputGroupText>
			                              </InputGroupAddon>
			                              <FormFeedback>{validation.REQ_MSG}</FormFeedback>
			                            </InputGroup>
				                        	<UncontrolledPopover className="popover-container" trigger="legacy" placement="right-start" target="hscode" style={{zIndex:'9999'}}>
				                    			<HsCode onHsCodeData={hsCodeList} onSetHsCode={(data)=>{setCargo({...cargo, 'cargo_hs_code':data}); props.mergeData({...cargo, 'cargo_hs_code':data});}} {...props}/>
				                    		</UncontrolledPopover>  
			                            </Col>
			                        </Row>
			                     </FormGroup>
			                </Col>

			                <Col xl="4" lg="12" md="12">
								<FormGroup>
									 <Row>
			                        	<Col xl="2" className="pr-0 pt-1 col-3"><Label className="mb-0">Package</Label></Col>
			                        	<Col>
										    <Row>
										    	<Col className="col-8 pr-1">
											    	<Input type="select" bsSize="sm" className="pt-0 pb-0" value={cargo.cargo_pack_type?cargo.cargo_pack_type:''} onChange = {(event)=>onChangeReturnVal2(event,'cargo_pack_type')}
											    	invalid={(!cargo.cargo_pack_type || !cargo.cargo_pack_qty)?true:false} >
											      		<option value="">선택</option>
											      		{packCodeList.length>0?packCodeList.map((data,key) => <option key={key} value={data.cargo_pack_type}>{data.cargo_pack_type_desc+" ["+data.cargo_pack_type+"]"}</option>):<></>}
											          </Input>
											          <FormFeedback>{validation.REQ_MSG}</FormFeedback>
										    	</Col>
										    	<Col className="col-4 pl-1">
											      	<InputValid 
								                        type="text"
								                        name="cargo_pack_qty"
								                        id="cargo_pack_qty"
								                        placeholder=""
								                        maxLength="8"
								                        bsSize="sm"
								                        value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
								                        onChange={(e)=>onChangeReturnVal(e, 'cargo_pack_qty')}
								                        onBlur={onPropsReturn}
								                        validtype="number"
								                        required={true} 
								                        feedid="cargo"
								                    />
										    		{/*<Input type="number" bsSize="sm" name="cargo_pack_qty" id="cargo_pack_qty" placeholder="" value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
												    onChange = {(event)=>onChangeReturnVal(event,'cargo_pack_qty')} onBlur={onPropsReturn} invalid={!cargo.cargo_pack_qty?true:false}
										    	    maxLength="8"
											    		/>*/}
										    	</Col>
										    </Row>
										 </Col>
								       </Row>
								</FormGroup>
							</Col>
			                <Col xl="5" lg="12" md="12">
			                	<Row>
			                		<Col xl="6" className="col-12">
				                		 <FormGroup className="mb-1">
					                        <Row>
					                        	<Col xl="4" className="pr-0 pt-1 col-3"><Label className="mb-0">Volume</Label></Col>
					                        	<Col>
					                        	<InputGroup >
					                            	<Input type="number" bsSize="sm" name="cargo_total_volume" id="cargo_total_volume" placeholder=""
					                            		invalid={!cargo.cargo_total_volume?true:false}
						                        	value={cargo.cargo_total_volume?cargo.cargo_total_volume:''} onChange = {(event)=>onChangeReturnVal(event,'cargo_total_volume')} 
						                        	onBlur={onPropsReturn} maxLength="18"
						                        	/>
						                        	   	<InputGroupAddon addonType="append">
							                              <InputGroupText className="p-1" style={{border:!cargo.cargo_total_volume?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>CBM</InputGroupText>
							                            </InputGroupAddon>
						                        	<FormFeedback>{validation.REQ_MSG}</FormFeedback>	
						                        	</InputGroup>
					                            </Col>
					                            
					                        </Row>
					                     </FormGroup>
			                		</Col>
			                		<Col xl="6" className="col-12">
					                		<FormGroup className="mb-1">
					                        <Row>
					                        	<Col xl="4" className="pr-0 pt-1 col-3"><Label className="mb-0">Weight</Label></Col>
					                        	<Col>
					                        	<InputGroup >
					                            	<Input type="number" bsSize="sm" name="cargo_total_weight" id="cargo_total_weight" placeholder=""
					                                invalid={!cargo.cargo_total_weight?true:false}
						                        	value={cargo.cargo_total_weight?cargo.cargo_total_weight:''} onChange = {(event)=>onChangeReturnVal(event,'cargo_total_weight')} 
						                        	onBlur={onPropsReturn} maxLength="18"
						                        	/>
						                        	<InputGroupAddon addonType="append">
					                              <InputGroupText className="p-1" style={{border:!cargo.cargo_total_weight?'1px solid red':'',borderRadius:'0 4px 4px 0'}}>kg</InputGroupText>
					                            </InputGroupAddon>
					                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>	
					                          </InputGroup>
						                        	
					                            </Col>
					                        </Row>
					                     </FormGroup>
			                		</Col>
			                	</Row>  
			                </Col>  
			               
		              	</Row>
		              	<hr className="mt-0" />
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
					              					<Mark key={key} loadData={element} bookmark={bookmark2} 
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
				              					<Goods key={key} loadData={element} bookmark={bookmark3} 
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
		              	
		              	
		              	
		              	
		          </Collapse>
		          <div className="text-center" onClick={() => setColl(!coll)}>
	              	<div>         
	                    <Button
			              className="p-0"
			              color="link"
			              id="cargomore"
			              onClick={() => setColl(!coll)}
			              style={{height:'21px'}}
			          >
	                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
			          </Button>
			          <UncontrolledTooltip delay={0} target="cargomore">{coll?'Close':'Open'}</UncontrolledTooltip>
		            </div>
	            </div>
	            </CardBody>
	          </Card>
            </Col>
        </Row>


        {/* 모달 팝업 영역 
        xs : 한 줄
        sm : 576px 에서 다음 줄로 넘어감
        md : 768px
        lg : 992px
        xl : 1200px
        fluid : 뷰포트 전체의 너비
        */}
        <Modal isOpen={open} toggle={toggle} className="pt-0" size="lg">
            <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody className="pt-0 pb-0">
                    <CardBody className="p-0 bg-white">

                     {bookmarkView?
                    	<CargoBookmark 
                     
                     				   pack={packCodeList}
                                       bookmarkProps={propsData} 
                                       view={bookmarkView}
                                       onHsCodeData={hsCodeList}
                                       onChangeTap={onChangeTap} 
                                       onPropsCargoBookmark={(step,data)=>onBookMarkData(step,data)} 
                                       onPropsCargoDeleteBookmark={onBookMarkCargoDelete}
				                       onPropsMarkDeleteBookmark={onBookMarkMarkDelete}
				                       onPropsGoodsDeleteBookmark={onBookMarkGoodsDelete}
                                      {...props}
                     />
                    :
                        <Cargo cargoProps={propsData} onHsCodeData={hsCodeList} propsData={(data)=>onBookMarkData("1",data)} pack={packCodeList} view ={bookmarkView}  {...props} />
                     } 
                    </CardBody>
                </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={onInitData}>NEW</Button>{' '}
            {bookmarkView?<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>:<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
                <Button color="secondary" onClick={()=>setOpen(!open)}>CANCLE</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default CargoCard;