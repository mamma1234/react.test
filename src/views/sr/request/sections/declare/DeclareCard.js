/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, Table,CardTitle,CardFooter, Badge,UncontrolledTooltip,CustomInput,FormText,FormFeedback} from "reactstrap";
import Switch from "react-bootstrap-switch";
import Declare from "./Declare.js";
import DeclareBookmark from "./DeclareBookmark.js";
import axios from 'axios';
import { ExcelRenderer } from "react-excel-renderer";
import * as validation from 'components/common/validation.js';
import Select from "react-select";
import Moment from 'moment';

let cntr;

const ContainerCard = (props) => {  
  const {bookmark,loadData,openWindow} = props;
  
  // Collapse Flag
  const [coll, setColl] = useState(false);

  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const [cntrSztp,setCntrSztp] = React.useState([]);
  const [cntrCnt,setCntrCnt] = React.useState([]);
  const [bkgNo,setBkgNo] = React.useState("");
  const [declareBookmark,setDeclareBookmark] = React.useState([]);
  const [declare,setDeclare] = React.useState([]);
  const [declareInput,setDeclareInput] = React.useState([{}]);
  
  const [packCodeList,setPackCodeList] = React.useState([]);
  
  const [bookmarkView, setBookmarkView] = useState(false);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [modalTitle, setModalTitle] = useState("Declare Info");
  const [switchVal,setSwitchVal] =React.useState(true);
  const [selectVal,setSelectVal] =React.useState({'value':'','label':'선택'});
  const [allCheck,setAllCheck] = React.useState(true);
  const [allCheckI,setAllCheckI] = React.useState(true);
  
  const [openSpecial, setOpenSpecial] = useState(false);
  const [deceBookmark, setDeceBookmark] = useState({});
  const toggleSpecial = () => setOpenSpecial(!openSpecial);

  const [cntrList, setCntrList] = useState([]);
  const [cntrSingleList, setCntrSingleList] = useState([]); //single window
  // 전체화면 css 적용을 위한 state
  const [cntrBookmark, setCntrBookmark] = useState([]);
  
  useEffect(() => {

	    //setDeclare(loadData.declarelist?loadData.declarelist.length>0?loadData.declarelist:[{}]:[{}]);
	    
	    if(loadData.declarelist && loadData.declarelist.length>0) { 
	    	setDeclare(loadData.declarelist);
	    } else {
	    	setDeclare([{'bookmark_checked':'Y'}]);
	    }
	    
	  },[loadData]);
  
	  useEffect(() => {
		    setColl(openWindow);
		  },[openWindow]);
	  
	  useEffect(() => {
		    if(props.user) {codePackage();}
		  },[props.user]);
	  
  const toggle = (params) => {

	  if(params==='B') {
		  setModalTitle("Declare BookMark");
		  setBookmarkData({'declare_bookmark_name':'','declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'',
	          'declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'',
	          'declare_pack_set_type':'','declare_customs_date':Moment(new Date()).format('YYYYMMDD')});
		  props.onLoadData("ct");
		  setBookmarkView(true);
	  } else {
		  setModalTitle("Declare Info");
		  setDeclareInput([...declare]);
		  setAllCheckI(allCheck);
		  props.onLoadData("ct");
		  setBookmarkView(false);
	  }
	  setOpen(!open);
  }

  
  const onInitData = () => {
	  //setDeclareInput([{}]);
	  setBookmarkData({'declare_bookmark_name':'','declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'',
          'declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'',
          'declare_pack_set_type':'','declare_customs_date':Moment(new Date()).format('YYYYMMDD')});
	}
  
  const codePackage =()=> {
		axios.post("/shipper/selectLineCodeCargoPackType",{params:{'line_code':'WDFC'}},{})								
	  	.then(res => {setPackCodeList(res.data)});	
	}
 
  
  // bookmark insert
  const onSaveBookmark =() =>{
	  
	  //console.log("data:",bookmarkData);
	  if(bookmarkData.declare_bookmark_name != null && bookmarkData.declare_bookmark_name !='') {
	  axios.post("/shipper/setUserDeclareBookmark",{user_no:props.user?props.user.user_no:'',data:bookmarkData},{})								
	  	.then(res => {
	  		          props.onLoadData("dc");
	  		          props.onAlert("success","작성한 BOOKMARK가 저장 되었습니다.");
	  	});
	  }
  }
  //main View
  const onDeclareList =(key,data) => { 
	  let list = declare;
	  list[key] = data; 
	  setDeclare(list); 
	  props.mergeData({'declarelist':list});
  }
  
  const onAddCntr =()=> {
	  setDeclare([...declare,{'bookmark_checked':allCheck?'Y':'N'}]);
  }
  
  const onDeleteRow =(key,data) => { 
		if(declare.length > 1) {
			let list = declare;
			if(key > -1) {list.splice(key,1);} else {console.log(">>>>",key);} 
			setDeclare([...list]);
            props.mergeData({'declarelist':list});
	    } else {
	        let list ={'declare_seq':1,'declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'','declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'','declare_pack_set_type':'','declare_customs_date':''};
	        setDeclare([list]);
	    	props.mergeData({'declarelist':list});
	    }
  }
  
  // single View
  const onCntrSingleList =(key,data) => { 
	  let list = declareInput;
	  list[key] = data;
	  setDeclareInput(list); 
  }
  const onAddSingleCntr =()=> {
	  setDeclareInput([...declareInput,{'declare_seq':declareInput.length}]);
  }
  const onDeleteSingleRow =(key,data) => {
		if(declareInput.length > 1) {
			let list = declareInput;
			if(key > -1) {list.splice(key,1);} else {console.log(">>>>",key);} 
			setDeclareInput([...list]);
	    } else {
	        let list ={'declare_seq':1,'declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'','declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'','declare_pack_set_type':'','declare_customs_date':''};
	        setDeclareInput([list]);
	    }
 }
  
  // apply button event
  const onApplyData = ()=> { 
	  props.mergeData({'declarelist':declareInput});
	  setAllCheck(allCheckI);
	  setDeclare(declareInput);
	  setOpen(!open);
	  setColl(true);
  }

	  
	  const onView=()=>{
		  setColl(!coll);
	  }
	  
	  
	  const onBookMarkData = (data) => {
           setBookmarkData(data);
		}
	  

  // Cancle window	  
  const onCancleWindow =()=>{ 
	  setSelectVal({'value':'','label':'선택'});
	  if(!bookmarkView){
		  setDeclareInput(declare);
	  }
	  setOpen(!open);  
  }
  
  const onBookDeclareDelete = (data) => {
	 
		axios.post("/shipper/setUserDeclareBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
	  	.then(res => {
	  	props.onLoadData("dc");
	    props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
	  	});	
	}
  
  const onChangeDeclare = (value,name) =>{
	  //setSelectVal({'value':value.value,'label':value.label});
	  //console.log("declare:",declare);
	  //1. 선택값 전달 
	  setDeclareBookmark({'value':value.value,'label':value.label});
	  //2. 선택값 체크 
	  var view ='N';
	  if(name === 'card') {
		  if(declare.length > 0 && value.value !== '0') { 
			  declare.map((data)=> 
                  {
				  if((allCheck && !data.bookmark_checked) || (allCheck && data.bookmark_checked === 'Y')) {
					  view = 'Y';
				  }});
			  
			  if( view === 'Y') {
				  axios.post("/shipper/getUserDeclareBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})								
			  	  	.then(res => { 
			  	  		            let declare_data_merge = declare;
			  	  				    declare.map((data,key) => {
				  	  					if((allCheck && !data.bookmark_checked) || (allCheck && data.bookmark_checked === 'Y')) {
				  	  						declare_data_merge[key] = {...data[key],'bookmark_checked':'Y','declare_num':res.data[0].declare_num,
				  	  								'declare_div_load_yn':res.data[0].declare_div_load_yn,'declare_pack_set_code':res.data[0].declare_pack_set_code,
				  	  								'declare_div_load_no':res.data[0].declare_div_load_no,'declare_goods_desc':res.data[0].declare_goods_desc,
				  	  								'declare_pack_num':res.data[0].declare_pack_num,'declare_pack_type':res.data[0].declare_pack_type,
				  	  								'declare_weight':res.data[0].declare_weight,'declare_weight':res.data[0].declare_weight,
				  	  								'declare_pack_set_num':res.data[0].declare_pack_set_num,'declare_pack_set_type':res.data[0].declare_pack_set_type,
				  	  								'declare_customs_date':res.data[0].declare_customs_date}
				  	  					}
	
			  	  				     });
			  	  				    props.mergeData({'declarelist':declare});
			  	  				    setDeclare(declare_data_merge);
			  	  				    setColl(true);		    
			  	  	});
			  } else {
				  setDeclareBookmark({'value':'0','label':''});
				  props.onAlert("error","BookMark 적용 할 대상을 선택해주세요.");
			  }
		  } 
	  } else {
		  if(declareInput.length>0 && value.value !== '0') {
			  declareInput.map((data)=> {
				  if((allCheckI && !data.bookmark_checked) || (allCheckI && data.bookmark_checked === 'Y')) {
				  view = 'Y';
			  }});
			  if( view === 'Y') {
				  axios.post("/shipper/getUserDeclareBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})								
			  	  	.then(res => { 
			  	  		            let declare_data_merge = declareInput;
			  	  		        declareInput.map((data,key) => {
				  	  					if((allCheckI && !data.bookmark_checked) || (allCheckI && data.bookmark_checked === 'Y')) {
				  	  						declare_data_merge[key] = {...data[key],'bookmark_checked':'Y','declare_num':res.data[0].declare_num,
				  	  								'declare_div_load_yn':res.data[0].declare_div_load_yn,'declare_pack_set_code':res.data[0].declare_pack_set_code,
				  	  								'declare_div_load_no':res.data[0].declare_div_load_no,'declare_goods_desc':res.data[0].declare_goods_desc,
				  	  								'declare_pack_num':res.data[0].declare_pack_num,'declare_pack_type':res.data[0].declare_pack_type,
				  	  								'declare_weight':res.data[0].declare_weight,'declare_weight':res.data[0].declare_weight,
				  	  								'declare_pack_set_num':res.data[0].declare_pack_set_num,'declare_pack_set_type':res.data[0].declare_pack_set_type,
				  	  								'declare_customs_date':res.data[0].declare_customs_date}
				  	  					}
	
			  	  				     });
			  	  				    //props.mergeData({'declarelist':declare});
			  	  		        	setDeclareInput(declare_data_merge);
			  	  				    //setColl(true);		    
			  	  	});
			  } else {
				  //setDeclareBookmark({'value':'0','label':''});
				  props.onAlert("error","BookMark 적용 할 대상을 선택해주세요.");
			  }
		  } 
	  }
	 
	  //3 선택값 DB 조회 
  }
  
  const onAllCheck =()=> { 
	  let list = declare;
	  var vVal = 'N';
	  if(allCheck) {
		  vVal = 'N';
	  } else {
		  vVal = 'Y';
	  }
	  declare.map((data,key)=>
	  list[key] = {...data,'bookmark_checked':vVal});
	  setDeclare(list);
	  setAllCheck(!allCheck);
  }
  const onAllCheckI =()=> { 
	  let list = declareInput;
	  var vVal = 'N';
	  if(allCheckI) {
		  vVal = 'N';
	  } else {
		  vVal = 'Y';
	  }
	  declareInput.map((data,key)=>
	  list[key] = {...data,'bookmark_checked':vVal});
	  setDeclareInput(list);
	  setAllCheckI(!allCheckI);
  }
    
  return (
    <>
	    <Row id="Declare">
		    <Col xl="12" lg="12">
		        <Card style={{zIndex:'2'}}>
		        <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
		        <Row className="pb-2">
		           <Col xl="8" className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>DECLARE
		           <Button className="pl-1" color="link" id="declareview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
		            <UncontrolledTooltip delay={0} target="declareview">Input</UncontrolledTooltip>
		         </Col>
		       <Col>
		       	<Row>
		           		<Col className="col-10 pr-0">
		               		<Select 
						        className="react-select react-select-primary"
						        classNamePrefix="react-select"
						        name="declarebookmark"
						        value={{value:declareBookmark.value,label:declareBookmark.label}}
						        onChange={(value)=>onChangeDeclare(value,'card')}
						        options={bookmark}
						        placeholder={"선택"}
		           				style={{zIndex:'100'}}
		               		  
					        />
					 </Col>
					 <Col className="col-2 pl-auto pr-auto">
					 	<Button className="pl-0 pr-0" color="link" id="declarebookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
					    <UncontrolledTooltip delay={0} target="declarebookmark">Bookmark</UncontrolledTooltip>
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
						                  onChange = {()=>onAllCheck()}
						                	/>전체
						                  <span className="form-check-sign" />
						                </Label>
						              </FormGroup>
						            </Col>
					    	  	  <Col xl="8" className="col-8 pr-0">
							    	  	<FormGroup className="mb-0">
				                 		<CustomInput type="file" id="fileupload" name="fileupload" //onChange={(event)=>onFileupload(event,'MAIN')}
				                 			/>
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
		      		 {declare.length>0?declare.map((element, key)=>{
         	              return (
         	            		  <Declare key={key} zindex={declare.length-key}
             	            		  codelist={packCodeList}
         	            		      size="sm"
              	            		  view="Y"
              	            		  checked={allCheck}
         	            		      loadFormData={element}
             	            		  deleteRow={(data)=>onDeleteRow(key,data)} 
             	            		  propsData={(data)=>onDeclareList(key,data)} {...props} />
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
                    	<DeclareBookmark 
                    		bookmark = {bookmark} 
                            loadFormData={bookmarkData} 
                            code={cntrSztp} 
                            pack={packCodeList}
                            propsData = {onBookMarkData}
                            onPropsDeclarebookmarkDelete={onBookDeclareDelete} {...props}
                         />
                    :<>
                     <Row  className="mb-2">
     		                		  <Col xl="4" className="ml-auto col-12 pr-0">
     				               		<Select 
     							        className="react-select react-select-primary"
     							        classNamePrefix="react-select"
     							        name="declarebookmark"
     							        //value={{value:declareBookmark.value,label:declareBookmark.label}}
     							        onChange={(value)=>onChangeDeclare(value,'input')}
     							        options={bookmark}
     							        placeholder={"선택"}
     			           				style={{zIndex:'100'}}
     			               		  
     						        />
     						        </Col>
     		            </Row>
		            	<Row>
						      <Col xl="6" className="mr-auto mb-2 col-12">
					    	  	<Row>
						    	  	<Col xl="2" className="col-3 ml-2 mr-0 pr-0">
						              <FormGroup check className="mt-2">
						                <Label check>
						                <Input defaultValue="" type="checkbox"  checked={allCheck} 
						                  onChange = {()=>onAllCheckI()}
						                	/>전체
						                  <span className="form-check-sign" />
						                </Label>
						              </FormGroup>
						            </Col>
					    	  	  <Col xl="8" className="col-8 pr-0">
							    	  	<FormGroup className="mb-0">
				                 		<CustomInput type="file" id="fileupload" name="fileupload" //onChange={(event)=>onFileupload(event,'MAIN')}
				                 			/>
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
		                     {declareInput.length>0?declareInput.map((element, key)=>{
		              	              return (
		              	            		  <Declare key={key} zindex={declareInput.length-key}
		              	            		      size=""
		              	            		      checked={allCheck}
			              	            		  codelist={packCodeList}
		              	            		      loadFormData={element}
			              	            		  deleteRow={(data)=>onDeleteSingleRow(key,data)} 
			              	            		  propsData={(data)=>onCntrSingleList(key,data)} 
		              	            		  {...props}/>
		              	            		  );
		              	          }):<></>	              	          
                             } 
                        </Row>
                   </>}
                	 
                </ModalBody>
               
            <ModalFooter>
            <Button color="secondary" onClick={onInitData}>NEW</Button>{' '}
            {bookmarkView?<Button color="primary" onClick={onSaveBookmark}>SAVE</Button>:<Button color="primary" onClick={()=>onApplyData()}>APPLY</Button>}{' '}
                <Button color="secondary" onClick={onCancleWindow}>CANCLE</Button>
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ContainerCard;