import React from "react";
import ReactDatetime from "react-datetime";
// reactstrap components
import {
  FormGroup,Form,
  Card,CardBody,Label,Table ,Button,
  Row,TabContent,TabPane,Collapse,
  Col,Fade
  // UncontrolledTooltip,
} from "reactstrap";
import NoticeModal from 'components/Modals/Notice.js';
import {CustomSelect,CustomDatePicker} from 'components/CustomInput/CustomInput.js';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Link } from "react-router-dom";
// core components
const localizer = momentLocalizer(moment);

let curnum = 1;

function ScheduleTables(props) {

	
  const [listData,setListData] = React.useState([]);
  const [calendarData,setCalendarData] = React.useState([]);
  const [toDate,setToDate] = React.useState(new Date());
  const [startEnd,setStartEnd] = React.useState("default");
  const [publicDate,setPublicDate] = React.useState({label:'2 Week',value:'2 week'});
  const [activeTab,setActiveTab]  = React.useState("1");
  const [activeTitle,setActiveTitle]  = React.useState("List");
  const [activeClass,setActiveClass]  = React.useState("fa fa-list fa-lg");
  const [startPort,setStartPort] = React.useState("");
  const [endPort,setEndPort] = React.useState("");
  const [totalPage,setTotalPage] = React.useState("");
  const [open,setOpen] = React.useState(false);
  const [openNotice,setOpenNotice] = React.useState(false);
  const [message,setMessage] = React.useState("");
  const [fadeIn,setFadeIn] = React.useState(false);
  const [viewMsg,setViewMsg] = React.useState(false);
  const [detailParam, setDetailParam] = React.useState(null);
  const [selectButton, setSelectButton] = React.useState("");
  const [routePort,setRoutePort] = React.useState([]);
  
  
  React.useEffect(() => {
		if(props.user) {
			
              portlist();
			  calendarSql(startPort,endPort,toDate,publicDate.value); 
		}
  }, [props.user]);
  
  
  React.useEffect(() => {

	  
	    const updateListData = () => {
	    	
	      let scrollHeight = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
	      let scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
	      let clientHeight = document.documentElement.clientHeight;

	      //Scroll 화면 하단 Check 
	      if(activeTab === "2" && (Math.round(scrollTop+clientHeight) === scrollHeight)) {

	    	  if(listData.length > 0 && (totalPage != curnum)) {
		    	  curnum=curnum+1;
		    	  axios.post("/shipper/getWdSchList",{ startport:startPort,endport:endPort,eta:moment(toDate).format('YYYYMMDD'),week:publicDate.value,culnum:curnum},{})								
		    	  .then(res => setListData([...listData,...res.data]));
		       } else {
		    	   setFadeIn(false);
		       }
	    	  
	      }
	    	
	    }
	      window.addEventListener("scroll", updateListData);
	      
	    return function cleanup() {
	      window.removeEventListener("scroll", updateListData);
	    };
	  });
  
  const portlist =() =>{
	  axios.post("/shipper/getLineRoute",{ line_code:'WDFC'})								
	  .then(res => setRoutePort(res.data));  
  }

  const selectData = [
    {label:'2 Week',value:'2 week'},
    {label:'4 Week',value:'4 week'},
    {label:'6 Week',value:'6 week'},
    {label:'8 Week',value:'8 week'},
  
  
  ];

  const onChangeButton = ()=>{
	  
    if(activeTab === "1") {
      setActiveTab("2");
      setActiveTitle("Calendar");
      setActiveClass("fa fa-calendar fa-lg");
      
      if(calendarData) {
    	  curnum =1;
    	  listSql(startPort,endPort,toDate,publicDate.value);
      }

    } else {
      setActiveTab("1");
      setActiveTitle("List");
      setActiveClass("fa fa-list fa-lg");    

      if(listData) {
    	  calendarSql(startPort,endPort,toDate,publicDate.value);
      }
    }

  } 
  
  const onSubmit =(start,end)=>{
	 var startVal;
	 var endVal;
	 curnum=1;
	 if(start && end) {
		 startVal = start;
		 endVal = end;
		 setSelectButton(startVal+endVal);
	 } else {
		 startVal =null;
		 endVal =null;
		  setSelectButton("ALL");
	 }
	  setStartPort(startVal);
	  setEndPort(endVal);
	  
		if(activeTab === "1") {		  
			calendarSql(startVal,endVal,toDate,publicDate.value);
		} else {
			listSql(startVal,endVal,toDate,publicDate.value);
		}  
  }
  
  const onDateSubmit =(date) => {
	  setToDate(date)
      curnum=1; 
	  if(activeTab === "1") {		  
			calendarSql(startPort,endPort,date,publicDate.value);
		} else {
			listSql(startPort,endPort,date,publicDate.value);
		}  
  }
  
  const onWeekSubmit=(value)=>{
	  
	  curnum=1;
	  setPublicDate(value);
	  if(activeTab === "1") {		  
			calendarSql(startPort,endPort,toDate,value.value);
		} else {
			listSql(startPort,endPort,toDate,value.value);
		} 
  }

  
  const calendarSql = (start,end,etd,week) =>{
		  axios.post("/shipper/getWdSchCal",{ startport:start,endport:end,eta:moment(etd).format('YYYYMMDD'),week:publicDate.value},{})								
		  .then(res => { if(res.data !="") {setCalendarData(res.data);setViewMsg(false);}else{setCalendarData([]);setViewMsg(true);}});
  };
  
  const listSql = (start,end,etd,week) =>{
	  setViewMsg(false);
	  axios.post("/shipper/getWdSchList",{ startport:start,endport:end,eta:moment(etd).format('YYYYMMDD'),week:week,culnum:curnum},{})								
	  .then(setListData([]))
	  .then(res => {

		  if(res.data != "") {
			  setListData(res.data); 
			  setTotalPage(res.data[0].total_page);
			  
			  if(res.data[0].total_page != curnum) {
				  setFadeIn(true);
			  }
	  		} else { setListData([]); 
			    setTotalPage(0);
	  		}
	 });
};
 
  
  const selectedEvent = (event,e) => {
		setDetailParam(event);
		setOpenNotice(true);
	  };
	  
  const onNextPage = () => {

	  if(listData.length > 0 && (totalPage != curnum)) {
    	  curnum=curnum+1;
    	  axios.post("/api/getWdSchList",{ startport:startPort,endport:endPort,eta:moment(toDate).format('YYYYMMDD'),week:publicDate.value,culnum:curnum},{})								
    	  .then(res => setListData([...listData,...res.data]));
       } else {
    	   setFadeIn(false);
       }
  }

  return (
    <>
      <div className="section section-white">
      <h4 className="mb-1 text-center">
                <small>Ocean Schedule</small>
      </h4>
      <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
      <Card className="card-raised card-form-horizontal no-transition position-static">
                <CardBody >
                      <Row>
	                      <Col xl="7" className="col-12 pt-3 mt-1">
	              	        <div className="text-center">
	              	        <Label />
	              	        	<Button className="mr-1 mt-2 pl-4 pr-4" color={selectButton==="ALL"?"info":"default"} type="button" onClick={()=>onSubmit('','')}>전체{' '}</Button>
	              	        	{routePort.length>0?
	              	        			routePort.map((data,key)=>
	              	        				<Button key={"schedule_"+key} className="mr-1 mt-2 pl-1 pr-1" color={selectButton===data.start_port_code+data.end_port_code?"info":"default"} type="button" 
	              	        					onClick={()=>onSubmit(data.start_port_code,data.end_port_code)}>{data.start_port_kr_name}->{data.end_port_kr_name+' '}</Button>
	              	        			):<></>
	              	        	}
	              	    	</div>
	              	    </Col>
                      	<Col xl="5" className="ml-auto mr-auto">
                      		<Row>
			                    <Col xl="6" lg="3" sm="12" md="6">
				                                <FormGroup>
				                                  <CustomDatePicker
				                                    id="startDate"
				                                    title="출항일"
				                                    dateFormat="YYYY-MM-DD"
				                                    timeFormat={false}
				                                    value={toDate}
				                                    onChange={(date)=>onDateSubmit(date)}
				                                  />
				                                </FormGroup>
				                 </Col>
				                 <Col xl="6" lg="3" sm="12" md="6">
					                              <FormGroup>
					                                <CustomSelect 
					                                  id="selectDate"
					                                  name="selectDate"
					                                  title="조회기간"
					                                  placeholder="조회 기간을 선택해주세요."
					                                  optionData={selectData}
					                                  value={publicDate}
					                                  onChange={(value)=>onWeekSubmit(value)} 
					                                />
					                              </FormGroup>  
				                   </Col>
				               </Row>
				           </Col> 

                          </Row>
                      </CardBody>
                    </Card>
      </Col>
      {viewMsg && !calendarData.length > 0?
    		  <Col className="col-12  text-center"><Label className="mb-0 text-danger">Schedule Data Not Found.</Label></Col>:<></>
      }
      <Col className="ml-auto mr-auto mb-2 text-right" xl="10" lg="10" md="10" sm="10">
        <Button color="primary" size="sm" onClick={onChangeButton}>
          <i className={activeClass} aria-hidden="true"/> {activeTitle}
        </Button >
      </Col>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
            <Card className="card-raised card-form-horizontal no-transition">
              <CardBody className="pt-2 pb-2">
              <Calendar
                selectable
                popup
                localizer={localizer}
                events={calendarData}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 650 }}
                defaultDate={new Date()}
                //view="month"
                views={["month"]}
                onSelectEvent={(event,e) => selectedEvent(event,e)}
                //showAllEvents="true"
                eventPropGetter={(event)=>{
                                            if(event && event.vsl_type === '41') {
                                            	return {className:"bg-warning",style:{fontSize:'1px'}}
                                            } else {
                                            	return {className:"bg-info",style:{fontSize:'1px'}}
                                            }
                                 }}
              />
              </CardBody>  
            </Card>
        </Col>
        </TabPane>
        <TabPane tabId="2">
            <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
              <ScheduleList
	              listData={listData}
	              fadeIn={fadeIn}
                  curPage = {curnum}
                  totalPage = {totalPage}
	              nextPage = {onNextPage}
	            />
            </Col>
        </TabPane>
      </TabContent>
      <NoticeModal 
      	open={openNotice}
        setOpen={()=>setOpenNotice(false)}
        data = {detailParam}
        {...props}
      />
      
      </div>
    </>
  );
}

export default ScheduleTables;


function ScheduleList (props) {
  const {listData,fadeIn,curPage,totalPage} = props;

  return (
    <>
      <Card className="card-raised card-form-horizontal no-transition bg-info  mb-3">
        <CardBody className="pt-2 pb-2">
           <Row className="pt-2 pb-2" >
              <Col className="col-4 text-center" md="3" >Vessel Name</Col>
              <Col className="col-3 text-center pl-0 pr-0" md="2" >Voyage No</Col>
              <Col className="col-5 text-center" md="2" >Origin</Col>
              <Col className="col-5 text-center" md="2" >destination</Col>
              <Col className="col-3 text-center pl-0 pr-0" md="1" >T/Time</Col>
              <Col className="col-4 text-center" md="2" >Booking</Col>
          </Row>
        </CardBody>
      </Card>
    {listData.length>0?listData.map((data,key) => (
      <Rows key={key} rowdata={data} />
    )):<Col className="text-center"> Schedule Data Not Found. </Col>}
    {listData.length > 0 && totalPage > 1 && curPage!==totalPage?
    		
    <div className="text-center">
    <Button
	    className="btn-round"
	    color="info"
	    type="button"
	    	 onClick={props.nextPage}
	  >
    	<i class="fa fa-angle-double-down fa-2x mr-2" aria-hidden="true"/>다음페이지({curPage}/{totalPage}) 이동 시 Scroll Down 또는 클릭 해주세요.
	  </Button>
    </div>:null}

  </>

  );

}

function Rows(props) {
  const {rowdata} = props;
  const [open,setOpen] = React.useState(false);
  
  return (
    <>
      <Card className="card-raised card-form-horizontal no-transition bg-light mb-3">
        <CardBody className="pt-2 pb-2">
          <Row className="text-center">
            <Col className="col-4 mt-auto mb-auto text-center" md="3">{rowdata.vsl_name}</Col>
            <Col className="col-3 mt-auto mb-auto text-center" md="2" onClick={()=>setOpen(!open)} >{rowdata.voyage_no}</Col>
            <Col className="col-5 mt-auto mb-auto text-center" md="2" >{rowdata.start_port_name}<br/> ({rowdata.start_day})</Col>
            <Col className="col-5 mt-auto mb-auto text-center" md="2" >{rowdata.end_port_name}<br/> ({rowdata.end_day})</Col>
            <Col className="col-3 mt-auto mb-auto text-center pl-0 pr-0" md="1" >{rowdata.tt}</Col>
            <Col className="col-4 mt-auto mb-auto text-center" md="2" >
            <Link to={{pathname: `/booking`, state: {user_no:props.user_no,sch_vessel_name:rowdata?rowdata.vsl_name:null,
                                            sch_vessel_voyage:rowdata?rowdata.voyage_no:null
                                            ,sch_pol:rowdata?rowdata.start_port:null,
                                            sch_pod:rowdata?rowdata.end_port:null,schedule_yn:'Y',line_code:'WDFC',
                                            sch_etd:rowdata?rowdata.sch_etd:null, sch_eta:rowdata?rowdata.sch_eta:null,
                                            vsl_type:rowdata?rowdata.vsl_type:null  }}}>
    	      <Button
    	        className="btn-link"
    	        color="primary"
    	        type="button"
    	        	size="sm"
    	      >     
    		      Booking
    	      </Button>
        </Link>
        </Col>
          </Row>
          <Collapse isOpen={open}> 
            <Col className="ml-auto mr-auto bg-white" xs="12" md="12" sm="12">
              <Row>
                <Col xs="2" md="2" sm="2"> <img src={require("assets/img/carrier/WDF.gif")}/>
                </Col>
                <Col xs="10" md="10" sm="10">
                - Close Cargo : {rowdata?rowdata.cargo_closing_date:null}<br/>
                - Close Document :{rowdata?rowdata.doc_closing_date:null}<br/>
                </Col>
              </Row>     
            </Col>
          </Collapse>
      </CardBody>
    </Card>
    </>
  );

}