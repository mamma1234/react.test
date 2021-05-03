/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, Table,CardTitle,CardFooter, Badge,UncontrolledTooltip,CustomInput,FormText,FormFeedback} from "reactstrap";
import Switch from "react-bootstrap-switch";
import Container from "./Container.js";
import ContainerBookmark from "./ContainerBookmark.js";
import axios from 'axios';
import { ExcelRenderer } from "react-excel-renderer";
import * as validation from 'components/common/validation.js';
import Select from "react-select";

let cntr;

const ContainerCard = (props) => {  console.log("props:",props)
  const {bookmark,loadData,openWindow} = props;
  useEffect(() => {
    //setCntrList(loadData.cntrlist?loadData.cntrlist.length>0?loadData.cntrlist:[{'cntr_yn':'Y'}]:[{'cntr_yn':'Y'}]);
    //setBkgNo(loadData.res_bkg_no?loadData.res_bkg_no:''); console.log(">>>>blg:",loadData.res_bkg_no);

    if(loadData.cntrlist && loadData.cntrlist.length>0) {
    	setCntrList(loadData.cntrlist);
    } else {
    	setCntrList([{'cntr_res_bkg_no':loadData.res_bkg_no?loadData.res_bkg_no:'','cntr_yn':'Y'}]);
    }
    
    if(loadData.res_bkg_no) {
    	setBkgNo(loadData.res_bkg_no);
    } else {
    	setBkgNo("");
    }
    
  },[loadData.cntrlist]);
  
  
  useEffect(() => {
		    
	    if(loadData.res_bkg_no) {
	    	setBkgNo(loadData.res_bkg_no);
	    } else {
	    	setBkgNo("");
	    }
	    
	  },[loadData.res_bkg_no]);
  
  
  useEffect(() => {
	    setColl(openWindow);
	  },[openWindow]);

  useEffect(() => {
	  
       if(props.user) {
	    cntrTypeSize();
       }
	  },[props.user]);
  
  const cntrTypeSize = ()=> {

	  axios.post("/shipper/selectLineCodeCntrSztp",{params:{'line_code':'WDFC'}},{})								
	  	.then(res => {
	  		setCntrSztp(res.data);
	  	});
	  
  }
  
  // Collapse Flag
  const [coll, setColl] = useState(false);

  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const [cntrSztp,setCntrSztp] = React.useState([]);
  const [cntrCnt,setCntrCnt] = React.useState([]);
  const [bkgNo,setBkgNo] = React.useState("");
  //const [cntr,setCntr] = React.useState([]);
  
  const [packCodeList,setPackCodeList] = React.useState([]);
  
  const [bookmarkView, setBookmarkView] = useState(false);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [modalTitle, setModalTitle] = useState("Container Info");
  const [switchVal,setSwitchVal] =React.useState(true);
  const [selectVal,setSelectVal] =React.useState({'value':'','label':''});
  const [allCheck,setAllCheck] = React.useState(true);
  
  const toggle = (params) => { 
	  //console.log(">>>>>>>BookmarkView:",bookmarkView,"/pram:",params,"open:",open);
	  
	  if(params==='B') {
		  setModalTitle("Container BookMark");
		  props.onLoadData("ct");
		  setBookmarkView(true);
		 
	  } else if (params==='S'){
		  setModalTitle("Container Info");
		  setCntrSingleList([...cntrList]);
		  props.onLoadData("ct");
		  setBookmarkView(false);
	  } else {
	      setOpen(false); 
	  }

	      if(!open) {
	    	  setOpen(!open);
	      }

	   
	  
  }
  
  const [openSpecial, setOpenSpecial] = useState(false);
  const toggleSpecial = () => setOpenSpecial(!openSpecial);

  const [cntrList, setCntrList] = useState([]);
  const [cntrSingleList, setCntrSingleList] = useState([]); //single window
  // 전체화면 css 적용을 위한 state
  const [cntrBookmark, setCntrBookmark] = useState([]);
  
  
  const onInitData = () => {
	  setCntrSingleList([{}]);
	}
  


  // bookmark detail select
  const getCntrBookmark = (seq,gubun)=> {

	  axios.post("/shipper/getUserCntrBookmark",{user_no:props.user?props.user.user_no:'',data:loadData,seq:seq},{})								
	  	.then(res => {
	  		let list;
	  	    if(gubun === "window"){
	  	    	list = cntrSingleList;
	  	    } else {
	  	    	list = cntrList;
	  	    }
	  		
	  		let listMerge=list;
	  		if(res.data) {
	  			list.map((data,key)=>{//console.log("LL:",res.data[0]);
                    if(data.cntr_yn === "Y") { 
		  			    if(res.data[0].cntr_code) {
		  			    	listMerge[key] = {...list[key],'cntr_code':res.data[0].cntr_code}
		  			    }
		  			    if(res.data[0].cntr_consolidated_yn) {
		  			    	listMerge[key] = {...list[key],'cntr_consolidated_yn':res.data[0].cntr_consolidated_yn}
		  			    }
		  		/*	  if(res.data[0].cntr_res_bkg_no) {
		  			    	listMerge[key] = {...list[key],'cntr_res_bkg_no':res.data[0].cntr_res_bkg_no}
		  			    }*/
		  			  if(res.data[0].cntr_truck_no) {
		  			    	listMerge[key] = {...list[key],'cntr_truck_no':res.data[0].cntr_truck_no}
		  			    }
		  			    if(res.data[0].cntr_seal) {
		  			    	listMerge[key] = {...list[key],'cntr_seal':res.data[0].cntr_seal}
		  			    }
		  			    if(res.data[0].cntr_total_volume) {
		  			    	listMerge[key] = {...list[key],'cntr_total_volume':res.data[0].cntr_total_volume}
		  			    }
		  			    if(res.data[0].cntr_total_weight) {
		  			    	listMerge[key] = {...list[key],'cntr_total_weight':res.data[0].cntr_total_weight}
		  			    }
		  			    if(res.data[0].cntr_weight) {
		  			    	listMerge[key] = {...list[key],'cntr_weight':res.data[0].cntr_weight}
		  			    } 
		  			    if(res.data[0].cntr_auth_user_name) {
		  			    	listMerge[key] = {...list[key],'cntr_auth_user_name':res.data[0].cntr_auth_user_name}
		  			    } 
		  			  
		  			    listMerge[key] = {...list[key],'container_bookmark_seq':res.data[0].container_bookmark_seq}
                    }
	  			}
	  			);
	  			 if(gubun === "window"){
	  				setCntrSingleList([]);
		  			setCntrSingleList(listMerge);
	 	  	    } else {
	 	  	    	props.mergeData({'cntrlist':listMerge});
	 	  	    }
	  		}
	  	}).catch(err => {
	 	  	if(err.response.status === 403) {
		  		   if(props.isAuth) {props.logOut();}
		      	   props.onAlert("error",validation.NOTLOGIN_MSG+"[code:"+err.response.status+"]");   
		         }
	    });
	  
  }
  
  const onGetUserCntrList = ()=> {

	  axios.post("/shipper/getUserCntrData",{user_no:props.user?props.user.user_no:'',data:loadData},{})								
	  	.then(res => {
	  					if(res.data.length> 0) {
	  						setCntrList(res.data);
	  					} else {
	  						setCntrList([{'cntr_seq':0}]);
	  					}
	  	}).catch(err => {
	 	  	if(err.response.status === 403) {
		  		   if(props.isAuth) {props.logOut();}
		      	   props.onAlert("error",validation.NOTLOGIN_MSG+"[code:"+err.response.status+"]");   
		         }
	    });
	  
  }
  
  const onGetUserCntrCnt = ()=> {

	  axios.post("/shipper/getUserCntrCount",{user_no:props.user?props.user.user_no:'',data:loadData},{})								
	  	.then(res => {
	  		setCntrCnt(res.data);
	  	}).catch(err => {
	 	  	if(err.response.status === 403) {
		  		   if(props.isAuth) {props.logOut();}
		      	   props.onAlert("error",validation.NOTLOGIN_MSG+"[code:"+err.response.status+"]");   
		         }
	    });
	  
  }

  
  
  // bookmark insert
  const onSaveBookmark =() =>{
	  
    if(bookmarkData.container_bookmark_name != null && bookmarkData.container_bookmark_name !='') {
	  axios.post("/shipper/setUserCntrBookmark",{user_no:props.user?props.user.user_no:'',data:bookmarkData},{})								
	  	.then(res => {
	  		          props.onLoadData("ct");
	  		          props.onAlert("success","작성한 BOOKMARK가 저장 되었습니다.");
	  	});
    }
  }
  //main View
  const onCntrList =(key,data) => {
	  let list = cntrList;
	  list[key] = data;
	  setCntrList(list);
	  props.mergeData({'cntrlist':list});
  }
  
  const onAddCntr =()=> { console.log("add",[...cntrList,{'cntr_yn':'Y'}]);
	    setCntrList([...cntrList,{'cntr_res_bkg_no':loadData.res_bkg_no?loadData.res_bkg_no:'','cntr_yn':'Y'}]);
  }
  
  const onDeleteRow =(key,data) => {
		if(cntrList.length > 1) {
			let list = cntrList;
			if(key > -1) {list.splice(key,1);} else {console.log(">>>>",key);} 
            setCntrList([...list]);
            props.mergeData({'cntrlist':list});
	    } else {
	        let list ={'cntr_seq':1,'cntr_no':'','res_bkg_no':'','cntr_code':'','cntr_truck_no':'','cntr_consolidated_yn':'','cntr_seal':'','cntr_total_weight':'','cntr_total_volume':'','cntr_res_bkg_no':bkgNo,'cntr_auth_user_name':'','cntr_weight':'','cntr_yn':'Y'};
	    	setCntrList([list]);
	    	props.mergeData({'cntrlist':list});
	    }
  }
  
  // single View
  const onCntrSingleList =(key,data) => { 
	  let list = cntrSingleList;
	  list[key] = data;
	  setCntrSingleList(list);
  }
  const onAddSingleCntr =()=> {
	    setCntrSingleList([...cntrSingleList,{'cntr_res_bkg_no':loadData.res_bkg_no?loadData.res_bkg_no:'','cntr_yn':'Y'}]);
  }
  const onDeleteSingleRow =(key,data) => {
		if(cntrSingleList.length > 1) {
			let list = cntrSingleList;
			if(key > -1) {list.splice(key,1);} else {console.log(">>>>",key);} 
			setCntrSingleList([...list]);
	    } else {
	        let list ={'cntr_seq':1,'cntr_no':'','cntr_code':'','cntr_truck_no':'','cntr_consolidated_yn':'','cntr_seal':'','cntr_total_weight':'','cntr_total_volume':'','cntr_res_bkg_no':bkgNo,'cntr_auth_user_name':'','cntr_weight':'','cntr_yn':''};
	    	setCntrSingleList([list]);
	    }
 }
  
  // apply button event
  const onApplyData = ()=> {
	  setSelectVal({'value':'','label':''});
	  props.mergeData({'cntrlist':cntrSingleList});
	  setCntrList(cntrSingleList);
	  setOpen(!open);
	  setColl(true);
  }

  const onFileupload = (event,name) => {
	
	    let fileObj = event.target.files[0]; 

	    if (!fileObj) {
	         props.onAlert("error","No file uploaded");
	         return false; 
	    }
	      
	    if (!(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) ) { 
	      props.onAlert("error","nknown file format. Only Excel files are uploaded!");
	       return false; 
	    }
	    
	    //just pass the fileObj as parameter 
	    ExcelRenderer(fileObj, (err, resp) => {

	      let newRows = [];
	      let ErrRows = [];
	        
	      if (err) { 
	        alert(err); 
	      } else {

		      if(resp.rows.slice(2).length > 0 && resp.rows.slice(2).length <= 999) {
		          resp.rows.slice(2).map((data,key)=> {
		        	  
		        	  if(data[0]!== undefined && data[1]!== undefined) {
		        		  newRows.push({'cntr_seq':key,'cntr_no':data[0].toUpperCase(),'cntr_code':data[1],'cntr_truck_no':data[2],'cntr_consolidated_yn':data[3],'cntr_seal':data[4],'cntr_total_weight':data[5],'cntr_total_volume':data[6],
		        			            'cntr_res_bkg_no':data[7],'cntr_auth_user_name':data[8],'cntr_weight':data[9],'cntr_yn':'Y'});
		        	  } else {
		        		  ErrRows.push({'cntr_seq':key,'cntr_no':data[0],'cntr_code':data[1],'cntr_truck_no':data[2],'cntr_consolidated_yn':data[3],'cntr_seal':data[4],'cntr_total_weight':data[5],'cntr_total_volume':data[6],
		        			             'cntr_res_bkg_no':data[7],'cntr_auth_user_name':data[8],'cntr_weight':data[9],'cntr_yn':'Y'});
		        	  }
			    	  
			      });
		          if(name ==='MAIN') {
		        	  setCntrList(newRows);
		        	  setColl(true);
		          } else {
		        	  setCntrSingleList(newRows);
		          } 
		          props.mergeData({'cntrlist':newRows});
 
		      } else {
		    	  props.onAlert("error","Row Data 가 존재 하지 않거나 갯수(999) 를 초과 하였습니다. ");
		      }
	       }

	    });

	  };  
	  
	  const onView=()=>{
		 /* if(!coll ) {
			  onGetUserCntrCnt();
		  }*/
		  setColl(!coll);
	  }
	  
	  
	  const onBookMarkData = (data) => {
           setBookmarkData(data);
		}

  // Cancle window	  
  const onCancleWindow =()=>{
	  setSelectVal({'value':'','label':''});
	  if(!bookmarkView){
		  setCntrSingleList(cntrList);
	  }
	  setOpen(!open);  
  }
  
  const onBookCntrDelete = (data) => {

		axios.post("/shipper/setUserCntrBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
	  	.then(res => {
	  	props.onLoadData("ct");
	    props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
	  	}).catch(err => {
	 	  	if(err.response.status === 403) {
		  		   if(props.isAuth) {props.logOut();}
		      	   props.onAlert("error",validation.NOTLOGIN_MSG+"[code:"+err.response.status+"]");   
		         }
	    });	
	}
  
  const onChangeCheckBox = (state) => { 
	  setSwitchVal(state.state.value);
	  setSelectVal({'value':'','label':''});
  }
  
  const onChangeCntr = (value,name) =>{
	  setSelectVal({'value':value.value,'label':value.label});
	  if(value.value && !cntrChecked(name==="window"?cntrSingleList:cntrList)) {
		  setSelectVal({'value':'','label':''});
		  props.onAlert("success","북마크 설정할 대상을 선택해주세요.");
	  } else {
		  //props.onAlert("success","설정한 북마크 DATA 로 설정 됩니다.");
		  getCntrBookmark(value.value,name);
	  }
	 
  }
  
  function cntrChecked (data) { 
	  let list = data;
	  let validation = "Y";
	  list.map ((data) =>{ 
		  if(data.cntr_yn && data.cntr_yn === "Y") {
		  	validation = "N";
		  }
		  });

	  if(validation === "Y") {
		  return false;
	  } else {
		  return true;
	  }
	 
  }
  
  const onContainerCheck =()=> {
	  let list = cntrList;
	  var vVal = 'N';
	  if(allCheck) {
		  vVal = 'N';
	  } else {
		  vVal = 'Y';
	  }
	  cntrList.map((data,key)=>
	  list[key] = {...data,'cntr_yn':vVal});
	  setCntrList(list);
	  setAllCheck(!allCheck);
  }
    
  return (
    <>
        <Row id="Container">
            <Col xl="12" lg="12">
            <Card  style={{zIndex:'3'}}>
            <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
	            <Row className="pb-2">
	                 <Col xl="8" className="mt-2 mb-0 col-6" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONTAINER
	                 <Button className="pl-1" color="link" id="cntrview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
			            <UncontrolledTooltip delay={0} target="cntrview">Input</UncontrolledTooltip>
			         </Col>
	                 <Col>
                  		<Row>
	                   		<Col className="col-10 pr-0">
	                   		<Select
						        className="react-select react-select-primary"
						        classNamePrefix="react-select"
						        name="cntrbookmark"
						        value={selectVal}
						        onChange={(value)=>onChangeCntr(value,'main')}
						        options={bookmark}
	                   		    placeholder={"선택"}
						    />
						 </Col>
						 <Col className="col-1 pl-auto pr-auto">
						 	<Button className="pl-0 pr-0" color="link" id="cargobookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
						    <UncontrolledTooltip delay={0} target="cargobookmark">Bookmark</UncontrolledTooltip>
						  </Col>			
					   </Row>
	              </Col>
	                
                </Row>
		        <Collapse isOpen={coll}>
		        {/* <div style={divider}/> */}
		            {/* 보이는 영역 */}
		            <hr className="mt-0"/>
		            	<Row>
						      <Col xl="6" className="mr-auto mb-2 col-12">
					    	  	<Row>
						    	  	<Col xl="2" className="col-3 ml-2 mr-0 pr-0">
						              <FormGroup check className="mt-2">
						                <Label check>
						                <Input defaultValue="" type="checkbox"  checked={allCheck} 
						                  onChange = {()=>onContainerCheck()}
						                	/>전체
						                  <span className="form-check-sign" />
						                </Label>
						              </FormGroup>
						            </Col>
					    	  	  <Col xl="8" className="col-8 pr-0">
							    	  	<FormGroup className="mb-0">
				                 		<CustomInput type="file" id="fileupload" name="fileupload" onChange={(event)=>onFileupload(event,'MAIN')}/>
				                 		<FormText>Excel File Upload (*.xlsx)</FormText>
				                 	    </FormGroup>
							       </Col>
								    	  	 
							        
					            </Row>
					          </Col>
			        <Col className="pt-0 pb-2">
		      		  <ButtonGroup className="pull-right">
		    	    		<Button className="pt-0 pb-0" color="default" outline size="sm" onClick={onAddCntr}>추가</Button>
		    			  </ButtonGroup>
		    		     </Col>
		    		</Row>

		      		<Row>
		      		  <Col>
		      		 {cntrList.length>0?cntrList.map((element, key)=>{
         	              return (
         	            		  <Container key={key} switchProps={switchVal}
             	            		  codelist={cntrSztp}
         	            		      size="sm"
         	            		      bookmarkoption={bookmark}
         	            		      checked={allCheck}
             	            	 	  cntrData={element}
         	            		      bkgdata={bkgNo}
             	            		  deleteRow={(data)=>onDeleteRow(key,data)} 
             	            		  propsData={(data)=>onCntrList(key,data)} user={props.user}
         	            		      {...props}
         	            		  />
         	            		  );
         	          }):<></>
         	          
                      } </Col>
		      		 </Row>
		           
		        </Collapse>
		        <div className="text-center" onClick={() => setColl(!coll)}>
	              	<div>         
	                    <Button
			              className="p-0"
			              color="link"
			              id="cntrmore"
			              onClick={() => setColl(!coll)}
			              style={{height:'21px'}}
			          >
	                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
			          </Button>
			          <UncontrolledTooltip delay={0} target="cntrmore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
        <Modal isOpen={open} toggle={toggle} size="xl">
        	<ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody >
                {bookmarkView?
                    	<ContainerBookmark 
                    		bookmark = {bookmark} 
                	        //propsData={loadData} 
                            code={cntrSztp} 
                            pack={packCodeList}
                            propsData = {onBookMarkData}
                            onPropsCntrbookmarkDelete={onBookCntrDelete}
                			{...props}
                         />
                    :<>
                	<Row  className="mb-2">
	                   <Col className="pl-0 pr-0">
		                		  <Row>
		                		  <Col xl="4" className="ml-auto col-12 pr-0">
					    	  	   <Select
								        className="react-select react-select-primary"
								        classNamePrefix="react-select"
								        name="cntrbookmark"
								        //value={{value:consignee.consignee_bookmark_seq,label:consignee.consignee_bookmark_name}}
								        onChange={(value)=>onChangeCntr(value,'window')}
								        	styles={{
													 control: provided => ({...provided,minHeight:'31px' }),
												     indicatorsContainer: provided => ({...provided,height:'31px'})
										        }}
								        options={bookmark}
								        placeholder={"선택"}
								    />
						        </Col>
						        {bookmarkView?
							    <Col className="col-1 pl-auto">
										 	<Button className="pl-0 pr-0" color="link" id="cargobookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
										    <UncontrolledTooltip delay={0} target="cargobookmark">Bookmark</UncontrolledTooltip>
								</Col>:<></>}
				            	    
				            	 </Row>
			            </Col>
		            </Row>
		            <Row>
						      <Col xl="6" className="mr-auto mb-2 col-12">
					    	  	<Row>
						    	  	<Col xl="2" className="col-3 ml-2 mr-0 pr-0">
						              <FormGroup check className="mt-2">
						                <Label check>
						                <Input defaultValue="" type="checkbox"  checked={allCheck} 
						                  onChange = {()=>onContainerCheck()}
						                	/>전체
						                  <span className="form-check-sign" />
						                </Label>
						              </FormGroup>
						            </Col>
					    	  	  <Col xl="8" className="col-8 pr-0">
							    	  	<FormGroup className="mb-0">
				                 		<CustomInput type="file" id="fileupload" name="fileupload" onChange={(event)=>onFileupload(event,'SUB')}/>
				                 		<FormText>Excel File Upload (*.xlsx)</FormText>
				                 	    </FormGroup>
							       </Col>
								    	  	 
							        
					            </Row>
					          </Col>
			        <Col className="pt-0 pb-2">
		      		  <ButtonGroup className="pull-right">
		    	    		<Button className="pt-0 pb-0" color="default" outline size="sm" onClick={onAddSingleCntr}>추가</Button>
		    			  </ButtonGroup>
		    		     </Col>
		    		</Row>		
		            	<Row>
		                     {cntrSingleList.length>0?cntrSingleList.map((element, key)=>{
		              	              return (
		              	            		  <Container key={key}
		              	            		      size=""
		              	            		      bookmarkoption={bookmark}
			              	            		  codelist={cntrSztp}
		              	            		      checked={allCheck}
			              	            		  cntrData={element} 
		              	            		      bkgdata={bkgNo}
			              	            		  deleteRow={(data)=>onDeleteSingleRow(key,data)} 
			              	            		  propsData={(data)=>onCntrSingleList(key,data)} {...props}/>
		              	            		  );
		              	          }):<></>	              	          
                             } 
                        </Row>
                   </>}
                	 
                </ModalBody>
               
            <ModalFooter>
            <Button color="secondary" onClick={onInitData}>NEW</Button>{' '}
            {bookmarkView?<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>:<Button color="primary" onClick={onApplyData}>APPLY</Button>}{' '}
                <Button color="secondary" onClick={onCancleWindow}>CANCLE</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ContainerCard;