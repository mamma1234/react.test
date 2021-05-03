/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    ButtonGroup, Button,FormGroup,Label,Input, Card, CardHeader, FormText,CardTitle, CardText,Badge,CardFooter,UncontrolledTooltip,InputGroupAddon,InputGroupText,InputGroup,FormFeedback} from "reactstrap";
import Select from "react-select";
import ScheduleBookmark from './ScheduleBookmark.js';
import Schedule from './Schedule.js';
import axios from 'axios';
import moment from 'moment';
import ReactDatetime from "react-datetime";
import InputValid from "components/CustomInput/InputValid.js";
let scheduleData = {};

const ScheduleCard = (props) => {

  const {bookmark,loadData,openWindow} = props;
  // Collapse Flag
  const [coll, setColl] = useState(false);
  const [bookmarkView, setBookmarkView] = useState(false);
  // modal 창을 위한 state
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState(props.loadData);
  const [propsData, setPropsData] = useState([]);
  const [startEnd,setStartEnd] = React.useState("default");
/*  const [sPort, setSPort] = React.useState([]);
  const [ePort, setEPort] = React.useState([]);*/
  const [getPort, setGetPort] = React.useState([]);
  const [modalTitle, setModalTitle] = useState("Schedule Info");
  const [lineVesselList ,setLineVesselList] = useState([]);
  const [outLinePortList, setOutLinePortList] = useState([]);
  // IN LINE PORT
  const [inLinePortList, setInLinePortList] = useState([]);
  
	  useEffect(() => {
		  
	      if(props.user) {
		    setSchedule({...loadData,'sch_bl_issue_name':loadData.sch_bl_issue_name?loadData.sch_bl_issue_name:'SEOUL, KOREA'});
		  /*   axios.post("/shipper/getLinePortCode",{ line:'WDFC',inyn:'N',outyn:'Y'},{})								
			  .then(res => setSPort(res.data)); 
		     
		     axios.post("/shipper/getLinePortCode",{ line:'WDFC',inyn:'Y',outyn:'N'},{})								
			  .then(res => setEPort(res.data));*/
		     
		    let params = {
		            line_code: 'WDFC',
		            key: 'out'
		        }
		        selectLinePort(params);
		        // 위동 PORT 목록조회
		        params = {
		            line_code: 'WDFC',
		            key: 'in'
		        }
		        selectLinePort(params);
		        
/*		     axios.post("/shipper/getLinePortCode",{ line:'WDFC'},{})								
			  .then(res => setGetPort(res.data));*/
		    // let params = { line_code: 'WDFC'}
		     selectLineCodeVesselName(params);
		         
		     
	      }
		     return () => {
			      console.log('cleanup');
			    };
		  },[loadData]);
	  
	 useEffect(() => {
		    setColl(openWindow);
		  },[openWindow]);
	  
  const toggle = (params) => {
      
	  if(params==='B') {
		  setModalTitle("Schedule BookMark");
		  setPropsData({...loadData,'schedule_bookmark_name':'','sch_vessel_name':'',
				'sch_vessel_code':'',
				'sch_vessel_voyage':'',
				'sch_pol':'',
				'sch_pol_name':'',
				'sch_pod':'',
				'sch_pod_name':'',
				'sch_pld':'',
				'sch_pld_name':'',
				'sch_bl_issue_name':'',
				'sch_por':'',
				'sch_por_name':'',
				'sch_fdp':'',
				'sch_fdp_name':'',
				'sch_srd':''});
		  scheduleData=loadData; console.log(loadData);
		  setBookmarkView(true);
	  } else {
		  setModalTitle("Schedule Info");
		  setPropsData(loadData);
		  scheduleData=loadData;
		  setBookmarkView(false);
	  }
      setOpen(!open);
  }

  const selectLinePort = (params) => {
      axios.post(
          "/shipper/selectLinePort"
          ,{ params }
          ,{}
      ).then(res=>{
          if( 'out' === params.key ) {
              setOutLinePortList(res.data);
          } else if ( 'in' === params.key ) {
              setInLinePortList(res.data);
          }
      });
  }
  
  const selectLineCodeVesselName = (params) => {
      axios.post(
          "/shipper/selectLineCodeVesselName"
          ,{ params }
          ,{}
      ).then(res=>{
          setLineVesselList(res.data);
      });
  }
  
    // 자식의 Data 적용
	const onBookMarkData = (data) => {
		scheduleData = data;
		
	}
	
	const onApplyData = ()=> {
			setOpen(!open);
			setSchedule(scheduleData);
			props.mergeData(scheduleData);
			setColl(true);
	}
	

	
	const onSaveBookmark =()=> {

		
		if(scheduleData.schedule_bookmark_name !=null && scheduleData.schedule_bookmark_name !="") {
			axios.post("/shipper/setUserSchBookmark",{user_no:props.user?props.user.user_no:'',data:scheduleData},{})								
	  	  	.then(res => {props.onLoadData("sc");props.onAlert("success","작성한 BOOKMARK 가 저장 되었습니다.");		  
	  	  	});
		} else {
			props.onAlert("error","schedule_bookmark_name 는 필수 입력 항목 입니다.");
		}
	}
	
	const onBookMarkDelete = (data) => {

		axios.post("/shipper/setUserSchBookmarkDel",{user_no:props.user?props.user.user_no:'',data:data},{})								
  	  	.then(res => {
  	  				  props.onLoadData("sc");
  	  			props.onAlert("success","선택한 BOOKMARK 가 삭제 되었습니다.");
  	  	});
		
	}
	
	const onChangeSchedule =(value)=> {
		
		setSchedule({...schedule,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label,...value});

		axios.post("/shipper/getUserSchBookmark",{user_no:props.user?props.user.user_no:'',seq:value.value},{})							
  	  	.then(res => { console.log("bookmark:",res.data[0]);
				  	  	axios.post("/shipper/getWdSchCal",{sch_vessel_name: res.data[0].sch_vessel_name, startport: res.data[0].sch_pol, endport:res.data[0].sch_pod, 
				  	  	 eta: res.data[0].sch_eta?res.data[0].sch_eta:moment(new Date()).format('YYYYMMDD') ,week:'1 week'},{})							
				  	  	.then(res => { 
				  	  	               if(res.data[0]) {
				  	  				    const mergeData = Object.assign(schedule,res.data[0]);
				  	  			        setSchedule({...mergeData,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label});
				  	  					props.mergeData({...mergeData,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label});
				  	  				    setColl(true);
				  	  	               } else {
				  	  	            	    props.mergeData({...schedule,'schedule_bookmark_seq':value.value,'schedule_bookmark_name':value.label,...value});
				  	  	            	    setColl(true);  
				  	  	               }
				  	  	});

  	  	});
	}
	
	const onInitData = () => {
		setPropsData({...propsData,'schedule_bookmark_name':'','sch_vessel_name':'',
			'sch_vessel_code':'',
			'sch_vessel_voyage':'',
			'sch_pol':'',
			'sch_pol_name':'',
			'sch_pod':'',
			'sch_pod_name':'',
			'sch_pld':'',
			'sch_pld_name':'',
			'sch_bl_issue_name':'',
			'sch_por':'',
			'sch_por_name':'',
			'sch_fdp':'',
			'sch_fdp_name':'',
			'sch_srd':''});
	}
	
	
	  const startData = [
		    {label:'인천 -> 위해',value:'1'},
		    {label:'인천 -> 청호',value:'2'},
		    {label:'평택 -> 청도',value:'3'},
		    {label:'경인 -> 천진',value:'4'},
		    {label:'인천 -> 장기항',value:'5'},
		    {label:'인천 -> 태창',value:'6'}
		  ];
	  
	  const onChangeVal =(label,event) => {

		  let code = event.target.value;
	
		 if(event.target.value) {
			 axios.post("/shipper/getLinePortCode",{ line:'WDFC',code:code},{})						
		  	  	.then(res => {		  	
		  	  		         if( res.data.length > 0 ) {
		  	  		            let list = {...schedule,[label]:code,[label+"_name"]:res.data[0].port_name};
		  	  			        setSchedule(list);
		  	  			        props.mergeData(list);
		  	  		         }
		  	  			
		  	  	});;
		 	}
	  }
	  
	  const onHandleReturnVal = (event,name) => {
		  let list = {...schedule, [name]:event.target.value};
		  setSchedule(list); 
	  }
	  
	  const onPropsReturn = ()=> {
		  props.mergeData(schedule);
	  }
	  
		const onSaveData = () => {
		    props.mergeData(schedule);
		}

/*		const onHandleReturnDate = (date) => {
			  let list = {...schedule, 'sch_srd':moment(date).format('YYYYMMDD')};
			  setSchedule(list);
			  props.mergeData(list);
		  }*/
	  
  return (
    <>
        <Row id="Schedule">
            <Col xl="12" lg="12">
	            <Card style={{zIndex:'9'}}>
	            	<CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
		                <Row className="pb-2">
		                   <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SCHEDULE
			                   <Button className="pl-1" color="link" id="shlview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
						       <UncontrolledTooltip delay={0} target="shlview">Input</UncontrolledTooltip>
					       </Col>
		                   <Col>
						        <Row>
					           		<Col className="col-10 pr-0">
							           	<Select
									        className="react-select react-select-primary"
									        classNamePrefix="react-select"
									        name="carrierbookmark"
									        value={{value:schedule.schedule_bookmark_seq,label:schedule.schedule_bookmark_name}}
									        onChange={(value)=>onChangeSchedule(value)}
									        options={bookmark}
									        placeholder={"선택"}
									    />
									 </Col>
									 <Col className="col-2 pl-auto pr-auto">
									 	<Button className="pl-0 pr-0" color="link" id="shlbookmark" onClick={toggle.bind(this, 'B')}><i className="fa fa-bookmark-o fa-2x" /></Button>
									    <UncontrolledTooltip delay={0} target="shlbookmark">Bookmark</UncontrolledTooltip>
									 </Col>		
							   </Row>
						    </Col>
						 </Row>
				        <Collapse isOpen={coll}>
				        {/* <div style={divider}/> */}
				            {/* 보이는 영역 */}
				                <hr className="mt-0"/>

				              <Row style={{fontSize:'12px'}}>
					              <Col xl="12" lg="12" md="12">
				                    <FormGroup>
				                    	<Row>
				                    	    <Col className="pr-0 pt-1 col-3"><Label className="mb-0">Vessel/Voy</Label></Col>
						            		<Col className="pl-0">
						            			<Row>
						            				<Col className="col-7 pr-1">
							            				<Select
	                                                        className="customSelect react-select-primary"
	                                                        classNamePrefix="customSelect"
	                                                        //className="react-select react-select-primary"
	                                                        //classNamePrefix="react-select"
	                                                        name="sch_vessel_name"
	                                                        value={{
	                                                            value:schedule.sch_vessel_name?schedule.sch_vessel_name:'',
	                                                            label:schedule.sch_vessel_name?schedule.sch_vessel_name:'선택'
	                                                        }}
	                                                        onChange={(value)=>{setSchedule({...schedule,'sch_vessel_name':value.value,'vsl_type':value.vsl_type});
	                                                                  props.mergeData({...schedule,'sch_vessel_name':value.value,'vsl_type':value.vsl_type});}}
	                                                        options={lineVesselList}
															styles={{
															    control: provided => ({...provided,border:!schedule.sch_vessel_name?'1px solid red':''}),
															    //indicatorsContainer: provided => ({...provided,height:'40px'})
															}}
                                                        />
							            				{!schedule.sch_vessel_name?<FormText className="text-danger">필수</FormText>:<></>} 
							    	                    </Col>
							            			<Col className="text-center pl-0 pr-0 pt-1">/
							            			</Col>
						            				<Col className="col-4 pl-1">
						            				 {/*<Input bsSize="sm" type="text" name="voyage" id="voyage" placeholder="" value={schedule.sch_vessel_voyage?schedule.sch_vessel_voyage:''}
							            				invalid={!schedule.sch_vessel_voyage?true:false}
							     		                onChange = {(event)=>onHandleReturnVal(event,'sch_vessel_voyage')}
							     		                onBlur={onPropsReturn}
						     		                />
						            				 <FormFeedback>{props.validation.REQ_MSG}</FormFeedback>*/}
						            				 <InputValid 
		                                                type="text"
		                                                name="sch_vessel_voyage"
		                                                id="sch_vessel_voyage"
		                                                placeholder=""
		                                                maxLength="17"
		                                                bsSize="sm"
		                                                value={schedule.sch_vessel_voyage?schedule.sch_vessel_voyage:''}
		                                                onChange={(e)=>onHandleReturnVal(e, 'sch_vessel_voyage')}
		                                                onBlur={onPropsReturn}
		                                                validtype="text"
		                                                required={true} 
		                                                feedid="schedule"
		                                            />
		                                            
						            				 </Col>
						            			</Row>
						            			
						            		</Col>
						                 </Row>
						             </FormGroup> 
						          </Col>
					               {/* <Col xl="12" lg="12" md="12">
					                    <FormGroup>
					                        <Row>
					                        	<Col className="pr-0 pt-1 col-3"><Label className="mb-0">On Board Date</Label></Col>
					                        	<Col className="pl-0">
									    	        <InputGroup className="date pl-0 pr-0" id="etd">
									    	            <ReactDatetime	
									    	                inputProps={{
									    	                className: "form-control form-control-sm",
									    	                //placeholder: "",
									    	                }}
									    	                dateFormat="YYYY-MM-DD"
									    	                timeFormat={false}
									    	                closeOnSelect={true}
									    	                //value={schedule.sch_srd?moment(schedule.sch_srd).format('YYYY-MM-DD'):new Date()}
									    	                value={schedule.sch_srd?moment(schedule.sch_srd).format('YYYY-MM-DD'):null}
									    	               // onChange={date=>setSchedule({...schedule,'sch_srd':Moment(date).format('YYYYMMDD')})}
									    	                onChange={date=>onHandleReturnDate(date)}
									    	                onBlur={onPropsReturn}
									    	            />
									    	            <InputGroupAddon addonType="append">
									    	                <InputGroupText>
									    	                    <span className="glyphicon glyphicon-calendar">
									    	                    <i className="fa fa-calendar" />
									    	                    </span>
									    	                </InputGroupText>
									    	            </InputGroupAddon>
									    	        </InputGroup>
					                            </Col>
					                        </Row>
					                     </FormGroup>
					                </Col> */}
						          <Col xl="12" lg="12" md="12">
				                    <FormGroup>
				                    	<Row>
				                    	    <Col className="pr-0 pt-1 col-3"><Label className="mb-0">POL</Label></Col>
						            		<Col className="pl-0">
							            		<Row>
										         <Col xl="4" className="col-4 pr-1">
											         <Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_pol?schedule.sch_pol:''}
											           onChange={(event)=>onChangeVal('sch_pol',event)}>
											      		  <option value="">선택</option>
											      		  {outLinePortList.length?outLinePortList.map((data,key) =>
											      		  	<option key={"s_"+key} value={data.port_code}>{data.port_code}</option>
											      		  ):<></>}
											      		  </Input>
									             </Col>
								                <Col xl="6" className="col-6 pl-1">
								                {/*<Input bsSize="sm" type="text" name="sch_por_name" id="sch_por_name" placeholder="" value={schedule.sch_pol_name?schedule.sch_pol_name:''} 
								                	invalid={!schedule.sch_pol_name?true:false}
								                	onChange = {(event)=>onHandleReturnVal(event,'sch_pol_name')} 
										            onBlur={onPropsReturn}
								                	/>*/}
								                	 <FormFeedback>{props.validation.REQ_MSG}</FormFeedback>
								                	 <InputValid 
		                                                type="text"
		                                                name="sch_pol_name"
		                                                id="sch_pol_name"
		                                                placeholder=""
		                                                maxLength="35"
		                                                bsSize="sm"
		                                                value={schedule.sch_pol_name?schedule.sch_pol_name:''}
		                                                onChange={(e)=>onHandleReturnVal(e, 'sch_pol_name')}
		                                                onBlur={onPropsReturn}
		                                                validtype="text"
		                                                required={true} 
		                                                feedid="schedule"
		                                            />
								                	</Col>
								                 <Col xl="2" className="col-2 pl-1"><Label className="mt-2">{schedule.sch_srd?moment(schedule.sch_srd).format('MM-DD'):''}</Label>
								                 </Col>
							                 </Row>
						            			
						            		</Col>
						                 </Row>
						             </FormGroup> 
						          </Col>
						          <Col xl="12" lg="12" md="12">
				                    <FormGroup>
				                    	<Row>
				                    	    <Col className="pr-0 pt-1 col-3"><Label className="mb-0">Place Of Receipt</Label></Col>
						            		<Col className="pl-0">
							            		<Row>
										         <Col xl="5" className="col-5 pr-1">
											         <Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_por?schedule.sch_por:''}
											         onChange={(event)=>onChangeVal('sch_por',event)}>
											      		  <option value="">선택</option>
											      		  {outLinePortList.length?outLinePortList.map((data,key) =>
											      		  	<option key={"s_"+key} value={data.port_code}>{data.port_code}</option>
											      		  ):<></>}
											      		  </Input>
									             </Col>
								                <Col xl="7" className="col-7 pl-1">
								                	{/*<Input bsSize="sm" type="text" name="sch_por_name" id="sch_por_name" placeholder="" value={schedule.sch_por_name?schedule.sch_por_name:''} 
								                	onChange = {(event)=>onHandleReturnVal(event,'sch_por_name')} 
										            onBlur={onPropsReturn}
								                	/>*/}
								                	<InputValid 
		                                                type="text"
		                                                name="sch_por_name"
		                                                id="sch_por_name"
		                                                placeholder=""
		                                                maxLength="35"
		                                                bsSize="sm"
		                                                value={schedule.sch_por_name?schedule.sch_por_name:''}
		                                                onChange={(e)=>onHandleReturnVal(e, 'sch_por_name')}
		                                                onBlur={onPropsReturn}
		                                                validtype="text"
		                                                required={false} 
		                                                feedid="schedule"
		                                            />
								                </Col>
							                 </Row>
						            			
						            		</Col>
						                 </Row>
						             </FormGroup> 
						          </Col>
						          <Col xl="12" lg="12" md="12">
				                    <FormGroup>
				                    	<Row>
				                    	    <Col className="pr-0 pt-1 col-3"><Label className="mb-0">POD</Label></Col>
						            		<Col className="pl-0">
							            		<Row>
										         <Col xl="4" className="col-4 pr-1">
											         <Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_pod?schedule.sch_pod:''}
											         onChange={(event)=>onChangeVal('sch_pod',event)}>
											      		  <option value="">선택</option>
											      		  {inLinePortList.length?inLinePortList.map((data,key) =>
											      		  	<option key={"s_"+key} value={data.port_code}>{data.port_code}</option>
											      		  ):<></>}
											      		  </Input>
									             </Col>
								                <Col xl="6" className="col-6 pl-1">
								                	{/*<Input bsSize="sm" type="text" name="sch_pod_name" id="sch_pod_name" placeholder="" value={schedule.sch_pod_name?schedule.sch_pod_name:''} 
								                	onChange = {(event)=>onHandleReturnVal(event,'sch_pod_name')} 
								                	invalid={!schedule.sch_pod_name?true:false}
										            onBlur={onPropsReturn}
								                	/>
								                	 <FormFeedback>{props.validation.REQ_MSG}</FormFeedback>*/}
								                	 <InputValid 
		                                                type="text"
		                                                name="sch_pod_name"
		                                                id="sch_pod_name"
		                                                placeholder=""
		                                                maxLength="35"
		                                                bsSize="sm"
		                                                value={schedule.sch_pod_name?schedule.sch_pod_name:''}
		                                                onChange={(e)=>onHandleReturnVal(e, 'sch_pod_name')}
		                                                onBlur={onPropsReturn}
		                                                validtype="text"
		                                                required={true} 
		                                                feedid="schedule"
		                                            />
								                	</Col>
									                 <Col xl="2" className="col-2 pl-1"><Label className="mt-2">{schedule.sch_eta?moment(schedule.sch_eta).format('MM-DD'):''}</Label>
									                 </Col>
							                 </Row>
						            			
						            		</Col>
						                 </Row>
						             </FormGroup> 
						          </Col>

						          <Col xl="12" lg="12" md="12">
				                    <FormGroup>
				                    	<Row>
				                    	    <Col className="pr-0 pt-1 col-3"><Label className="mb-0">Place Of Delivery</Label></Col>
						            		<Col className="pl-0">
							            		<Row>
										         <Col xl="5" className="col-5 pr-1">
										         <Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_pld?schedule.sch_pld:''}
										         onChange={(event)=>onChangeVal('sch_pld',event)}>
										      		  <option value="">선택</option>
										      		  {inLinePortList.length?inLinePortList.map((data,key) =>
										      		  	<option key={"s_"+key} value={data.port_code}>{data.port_code}</option>
										      		  ):<></>}
										      		  </Input>
									             </Col>
								                <Col xl="7" className="col-7 pl-1">
								                	{/*<Input bsSize="sm" type="text" name="sch_pld_name" id="sch_pld_name" placeholder="" value={schedule.sch_pld_name?schedule.sch_pld_name:''} 
								                	onChange = {(event)=>onHandleReturnVal(event,'sch_pld_name')} 
										            onBlur={onPropsReturn}
								                	/>*/}
								                	<InputValid 
		                                                type="text"
		                                                name="sch_pld_name"
		                                                id="sch_pld_name"
		                                                placeholder=""
		                                                maxLength="35"
		                                                bsSize="sm"
		                                                value={schedule.sch_pld_name?schedule.sch_pld_name:''}
		                                                onChange={(e)=>onHandleReturnVal(e, 'sch_pld_name')}
		                                                onBlur={onPropsReturn}
		                                                validtype="text"
		                                                required={false} 
		                                                feedid="schedule"
		                                            />
								                </Col>
							                 </Row>
						            			
						            		</Col>
						                 </Row>
						             </FormGroup> 
						          </Col>
						          <Col xl="12" lg="12" md="12">
				                    <FormGroup>
				                    	<Row>
				                    	    <Col className="pr-0 pt-1 col-3"><Label className="mb-0">Final Des</Label></Col>
						            		<Col className="pl-0">
							            		<Row>
										         <Col xl="5" className="col-5 pr-1">
										         <Input className="pt-0 pb-0" bsSize="sm" type="select"  value={schedule.sch_fdp?schedule.sch_fdp:''}
										         onChange={(event)=>onChangeVal('sch_fdp',event)}>
										      		  <option value="">선택</option>
										      		  {inLinePortList.length?inLinePortList.map((data,key) =>
										      		  	<option key={"f_"+key} value={data.port_code}>{data.port_code}</option>
										      		  ):<></>}
										      		 </Input>
									             </Col>
								                <Col xl="7" className="col-7 pl-1">
								                	{/*<Input bsSize="sm" type="text" name="sch_fdp_name" id="sch_fdp_name" placeholder="" value={schedule.sch_fdp_name?schedule.sch_fdp_name:''} 
								                	onChange = {(event)=>onHandleReturnVal(event,'sch_fdp_name')} 
										            onBlur={onPropsReturn}
								                	/>*/}
								                	<InputValid 
		                                                type="text"
		                                                name="sch_fdp_name"
		                                                id="sch_fdp_name"
		                                                placeholder=""
		                                                maxLength="35"
		                                                bsSize="sm"
		                                                value={schedule.sch_fdp_name?schedule.sch_fdp_name:''}
		                                                onChange={(e)=>onHandleReturnVal(e, 'sch_fdp_name')}
		                                                onBlur={onPropsReturn}
		                                                validtype="text"
		                                                required={false} 
		                                                feedid="schedule"
		                                            />
								                </Col>
							                 </Row>
						            			
						            		</Col>
						                 </Row>
						             </FormGroup> 
						          </Col>
						          <Col xl="12" lg="12" md="12">
				                    <FormGroup className="mb-1">
				                        <Row>
				                        	<Col xl="3" className="pr-0 pt-1 col-3"><Label className="mb-0" >Place Of B/L Issue</Label></Col>
				                        	<Col xl="9" className="pl-0 col-9">
				                            	{/*<Input  type="text" bsSize="sm" name="sch_bl_issue_name" id="sch_bl_issue_name" 
					                        	value={schedule.sch_bl_issue_name?schedule.sch_bl_issue_name:''} onChange={(event)=>onHandleReturnVal(event,'sch_bl_issue_name')} 
					                        	onBlur={onPropsReturn}
					                        	/>	*/}
					                        	<InputValid 
		                                                type="text"
		                                                name="sch_bl_issue_name"
		                                                id="sch_bl_issue_name"
		                                                placeholder=""
		                                                maxLength="35"
		                                                bsSize="sm"
		                                                value={schedule.sch_bl_issue_name?schedule.sch_bl_issue_name:''}
		                                                onChange={(e)=>onHandleReturnVal(e, 'sch_bl_issue_name')}
		                                                onBlur={onPropsReturn}
		                                                validtype="text"
		                                                required={false} 
		                                                feedid="schedule"
		                                            />
				                            </Col>
				                        </Row>
				                     </FormGroup>
				                </Col> 

			    	    	</Row>
				        </Collapse>
				        <div className="text-center" onClick={() => setColl(!coll)}>
			              	<div>         
			                    <Button
					              className="p-0"
					              color="link"
					              id="shlmore"
					              onClick={() => setColl(!coll)}
					              style={{height:'21px'}}
					          >
			                   {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
					          </Button>
					          <UncontrolledTooltip delay={0} target="shlmore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
            <ModalHeader toggle={toggle} className="pt-3 pb-3">{modalTitle}</ModalHeader>
                <ModalBody className="p-3">
                    {bookmarkView?
                    	<ScheduleBookmark bookmark={bookmark} loadData={propsData} onPropsSchBookmark={onBookMarkData} onPropsSchDeleteBookmark={onBookMarkDelete} getVsl={lineVesselList} 
                    outLinePortList={outLinePortList} inLinePortList={inLinePortList} onAlert={props.onAlert}/>
                    :
                        <Schedule
                            loadData={propsData} propsData={onBookMarkData}  outLinePortList={outLinePortList} inLinePortList={inLinePortList} getVsl={lineVesselList} onAlert={props.onAlert}/>
                     } 
                
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

export default ScheduleCard;



