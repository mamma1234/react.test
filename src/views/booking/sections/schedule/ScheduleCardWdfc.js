/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    Button,FormGroup,Label,Input, Card, FormFeedback, Form,
    InputGroup, InputGroupAddon, InputGroupText, UncontrolledTooltip} from "reactstrap";
import ReactDatetime from "react-datetime";
import axios from "axios";
import Select from "react-select";
import ScheduleWdfc from "./ScheduleWdfc.js";
import ScheduleBookmarkWdfc from "./ScheduleBookmarkWdfc.js";
// Calendar
import {Calendar,momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Moment from 'moment';
import * as validation from 'components/common/validation.js';
// import StyledContentLoader from 'styled-content-loader';
import InputValid from "components/CustomInput/InputValid.js";

const ScheduleCardWdfc = (props) => {
    
    const localizer = momentLocalizer(Moment);
    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // ScheduleBookmark
    const [scheduleList, setScheduleList] = useState([]);
    // Booking의 Schedule 정보
    const [booking, setBooking] = useState({});
    const [pureBooking, setPureBooking] = useState({});
    // Canlendar
    const [calendarData,setCalendarData] = useState([]);
    // OUT LINE PORT
    const [outLinePortList, setOutLinePortList] = useState([]);
    // IN LINE PORT
    const [inLinePortList, setInLinePortList] = useState([]);
    const [lineVesselList ,setLineVesselList] = useState([]);
    // Open Type
    const [openType, setOpenType] = useState("");
    const {user} = props;
    const [selectButton, setSelectButton] = React.useState("");
    const [routePort,setRoutePort] = React.useState([]);

    useEffect(() => {
        // 스케줄 Bookmark 목록조회
        // selectBookingScheduleBookmark();
        // 위동 PORT 목록조회
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
        selectLineCodeVesselName(params);

        axios.post("/shipper/getLineRoute",{ line_code:'WDFC'})
	    .then(res => setRoutePort(res.data));   
    },[]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    useEffect(()=>{  
        if( "CARD" != openType )
            setPureBooking(booking);
    },[booking]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        // setLoading(true);
        if( props.booking.bkg_no ) {
            // // console.log("props:",props.booking);
            // let bkg_no = props.booking.bkg_no;
            // let bkg_date = props.booking.bkg_date;
            // let status_cus = props.booking.status_cus;
            // let sc_no = props.booking.sc_no;
            // let user_no = props.booking.user_no;

            // // Schedule Bookmark seq
            // let schedule_bookmark_seq = props.booking.schedule_bookmark_seq;
            // let init_schedule_bookmark_seq = props.booking.init_schedule_bookmark_seq;
            setBooking(props.booking); // 초기화 bookmark seq 값
            // 최초 조회하기
            // selectScheduleOfBooking(props.booking);

            // setTimeout(function(){
                // },1000);
        }
        return ()=>{        
        }
        // setLoading(false);
    },[props.booking]);
    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        setScheduleList(props.scheduleList);
    },[props.scheduleList]);

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }
  
    const selectBookingScheduleBookmark = () => {
        props.selectBookingScheduleBookmark();
    }

    const selectScheduleOfBooking = (booking) => {
        axios.post(
            "/shipper/selectScheduleOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            // setScheduleList([])
        ).then(
            res => setBooking(res.data[0])
        );
    }

    const updateScheduleBookmarkOfBooking = () => {
        axios.post(
            "/shipper/updateScheduleBookmarkOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setBooking({...booking, 'selected_yn':'N'});
                // onDismiss("success", "정상 처리되었습니다.");
            }
        );
    }

    const fncValidation=()=>{
        if( !booking.sch_vessel_name ) return false;
        if( !booking.sch_vessel_voyage ) return false;
        if( !booking.sch_pol ) return false;
        if( !booking.sch_pod ) return false;
        return true;
    }

    const fncUpdateScheduleOfBooking = (e) => {
        if( !fncValidation() ) return;
        e.preventDefault();
        axios.post(
            "/shipper/updateScheduleOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => {
                // onDismiss("success", "정상 처리되었습니다.");
                // setOpen(!open);
                setBooking({...booking, 'selected_yn':'N'});
            }
        );
    }

    // Doucment select 선택할때
    const fncSelectSchedule = (e) => {
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            scheduleList.map((element, key)=>{
            if( e.value == element.schedule_bookmark_seq) {
                axios.post("/shipper/getWdSchCal",{ 
                    sch_vessel_name:element.sch_vessel_name,
                    startport:element.sch_pol,
                    endport:element.sch_pod,
                    eta:Moment(new Date()).format('YYYYMMDD'),week:'3 week',
                    limit_yn:'Y'
                }
                ).then(res => {
                    setColl(true);
                    if(res.data && res.data.length > 0) {
                        // select로 새로운 document를 세팅한다
                        // 기존 Booking 정보
                        let sch = res.data[0];
                        setBooking({...booking
                            ,'schedule_bookmark_seq':element.schedule_bookmark_seq
                            ,'schedule_bookmark_name':element.schedule_bookmark_name
                            ,'sch_vessel_name':sch.sch_vessel_name?sch.sch_vessel_name:null
                            ,'sch_vessel_code':sch.sch_vessel_code?sch.sch_vessel_code:null
                            ,'sch_vessel_voyage':sch.sch_vessel_voyage?sch.sch_vessel_voyage:null
                            ,'sch_call_sign':sch.sch_call_sign?sch.sch_call_sign:null
                            ,'sch_pol':sch.sch_pol?sch.sch_pol:null
                            ,'sch_pol_name':sch.sch_pol_name?sch.sch_pol_name:null
                            ,'sch_pod':sch.sch_pod?sch.sch_pod:null
                            ,'sch_pod_name':sch.sch_pod_name
                            ,'sch_por':element.sch_por
                            ,'sch_por_name':element.sch_por_name
                            ,'sch_pld':element.sch_pld
                            ,'sch_pld_name':element.sch_pld_name
                            ,'sch_etd':sch.sch_etd
                            ,'sch_eta':sch.sch_eta
                            ,'sch_fdp':element.sch_fdp
                            ,'sch_fdp_name':element.sch_fdp_name
                            ,'selected_yn':'Y'
                            ,'vsl_type': sch.vsl_type
                        });
                        props.fncBookingParent({...booking
                            ,'schedule_bookmark_seq':element.schedule_bookmark_seq
                            ,'schedule_bookmark_name':element.schedule_bookmark_name
                            ,'sch_vessel_name':sch.sch_vessel_name?sch.sch_vessel_name:null
                            ,'sch_vessel_code':sch.sch_vessel_code?sch.sch_vessel_code:null
                            ,'sch_vessel_voyage':sch.sch_vessel_voyage?sch.sch_vessel_voyage:null
                            ,'sch_call_sign':sch.sch_call_sign?sch.sch_call_sign:null
                            ,'sch_pol':sch.sch_pol?sch.sch_pol:null
                            ,'sch_pol_name':sch.sch_pol_name?sch.sch_pol_name:null
                            ,'sch_pod':sch.sch_pod?sch.sch_pod:null
                            ,'sch_pod_name':sch.sch_pod_name
                            ,'sch_por':element.sch_por
                            ,'sch_por_name':element.sch_por_name
                            ,'sch_pld':element.sch_pld
                            ,'sch_pld_name':element.sch_pld_name
                            ,'sch_etd':element.sch_etd
                            ,'sch_eta':sch.sch_eta
                            ,'sch_fdp':sch.sch_fdp
                            ,'sch_fdp_name':element.sch_fdp_name
                            ,'selected_yn':'Y'
                            ,'vsl_type': sch.vsl_type
                        });
                    } else {
                        // 기존 Booking 정보
                        setBooking({...booking
                            ,'schedule_bookmark_seq':element.schedule_bookmark_seq
                            ,'schedule_bookmark_name':element.schedule_bookmark_name
                            ,'sch_vessel_name':element.sch_vessel_name
                            ,'sch_vessel_code':element.sch_vessel_code
                            ,'sch_pol':element.sch_pol
                            ,'sch_pol_name':element.sch_pol_name
                            ,'sch_pod':element.sch_pod
                            ,'sch_pod_name':element.sch_pod_name
                            ,'sch_por':element.sch_por
                            ,'sch_por_name':element.sch_por_name
                            ,'sch_pld':element.sch_pld
                            ,'sch_pld_name':element.sch_pld_name
                            ,'sch_etd':element.sch_etd
                            ,'sch_eta':element.sch_eta
                            ,'sch_fdp':element.sch_fdp
                            ,'sch_fdp_name':element.sch_fdp_name
                            ,'selected_yn':'Y'
                            ,'vsl_type': element.vsl_type
                        });
                        props.fncBookingParent({...booking
                            ,'schedule_bookmark_seq':element.schedule_bookmark_seq
                            ,'schedule_bookmark_name':element.schedule_bookmark_name
                            ,'sch_vessel_name':element.sch_vessel_name
                            ,'sch_vessel_code':element.sch_vessel_code
                            ,'sch_pol':element.sch_pol
                            ,'sch_pol_name':element.sch_pol_name
                            ,'sch_pod':element.sch_pod
                            ,'sch_pod_name':element.sch_pod_name
                            ,'sch_por':element.sch_por
                            ,'sch_por_name':element.sch_por_name
                            ,'sch_pld':element.sch_pld
                            ,'sch_pld_name':element.sch_pld_name
                            ,'sch_etd':element.sch_etd
                            ,'sch_eta':element.sch_eta
                            ,'sch_fdp':element.sch_fdp
                            ,'sch_fdp_name':element.sch_fdp_name
                            ,'selected_yn':'Y'
                            ,'vsl_type': element.vsl_type
                        });
                    }
                });
                
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // 입력값 적용
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setBooking({...booking, [key]:e.target.value.toUpperCase()});
    }
    const fncOnBlurSchedule = (schedule) => {
        setBooking(schedule);
        props.fncBookingParent(schedule);
    }
    // date type 처리
    const fncOnChangeDate = (value, key) => {
        // Object > Date 객체로변환

        let date = new Date(value);
        console.log(date, key)
        // Date 객체에서 정보 추출
        let yyyy=date.getFullYear();
        let mon = date.getMonth()+1;
        let day = date.getDate();
        mon = mon > 9 ? mon : "0" + mon;
        day = day > 9 ? day : "0" + day;
        setBooking({...booking, [key]:yyyy+'-'+mon+'-'+day});
        props.fncBookingParent({...booking, [key]:yyyy+'-'+mon+'-'+day});
    }
    const fncOnChangeDateTime = (value, key) => {
        // Object > Date 객체로변환
        let date = new Date(value);
        // Date 객체에서 정보 추출
        let yyyy=date.getFullYear();
        let mon = date.getMonth()+1;
        let day = date.getDate();
        mon = mon > 9 ? mon : "0" + mon;
        day = day > 9 ? day : "0" + day;
        setBooking({...booking, [key]:yyyy+'-'+mon+'-'+day});
        props.fncBookingParent({...booking, [key]:yyyy+'-'+mon+'-'+day});
    }

    // const onHandleStartDate = (value) => { 
    //     let start = "";
    //     let end= "";
        
    //     if(value === "1") {
    //         start="KRINC";
    //         end="CNWEI";
    //     } else if(value === "2") {
    //         start="KRINC";
    //         end="CNTAO";
    //     } else if(value === "3") {
    //         start="KRPTK";
    //         end="CNTAO";
    //     } else if(value === "4") {
    //         start="KRGIN";
    //         end="CNTSN";
    //     } else if(value === "5") {
    //         start="KRINC";
    //         end="CNZIG";
    //     } else {
    //         start="KRINC";
    //         end="CNTAG";
    //     }
        
    //     axios.post("/shipper/getWdSchCal",{ 
    //         startport:start,
    //         endport:end,
    //         eta:Moment(new Date()).format('YYYYMMDD'),week:'3 week'},
    //         {}
    //     ).then(res => {
    //         setCalColl(true);
    //         if(res.data && res.data.length > 0) {
    //             setCalendarData(res.data);
    //         } else {
    //             setCalendarData([]);
    //         }
    //     });
    // }

    // Calendar click event
    const selectedEventCalendar = (event,e) => {
        // console.log(event);
        // let list = {...booking,...event};
        let user_no = booking.user_no;
        let bkg_no = booking.bkg_no;
        let bkg_date = booking.bkg_date;
        let owner_no = booking.owner_no;
        
        setBooking({...booking,'user_no':user_no,'bkg_no':bkg_no,'bkg_date':bkg_date, 'owner_no':owner_no, ...event});
        props.fncBookingParent( {...booking,'user_no':user_no,'bkg_no':bkg_no,'bkg_date':bkg_date, 'owner_no':owner_no, ...event} );
        setColl(false);
    };

    const fncOnChangeSelect = ( e, key ) => {
        // console.log(key)
        e.preventDefault();
        if( 'sch_pol' === key ) {
            outLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setBooking({...booking, ['sch_pol']:e.target.value , ['sch_pol_name']:element.port_name});
                }
            });
        }
        if( 'sch_por' === key ) {
            outLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setBooking({...booking, ['sch_por']:e.target.value , ['sch_por_name']:element.port_name});
                }
            });
        }
        if( 'sch_pod' === key ) {
            inLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setBooking({...booking, ['sch_pod']:e.target.value , ['sch_pod_name']:element.port_name});
                }
            });
        }
        if( 'sch_pld' === key ) {
            inLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setBooking({...booking, ['sch_pld']:e.target.value , ['sch_pld_name']:element.port_name});
                }
            });
        }
        if( 'sch_fdp' === key ) {
            inLinePortList.map((element, key ) => {
                if( e.target.value == element.port_code ) {
                    setBooking({...booking, ['sch_fdp']:e.target.value , ['sch_fdp_name']:element.port_name});
                }
            });
        }
        
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

    const fncCacelModal =()=>{
        setBooking( pureBooking );
        props.fncBookingParent( pureBooking );
        toggle();
        if( !coll ) {
            setColl( !coll );
        }
    }

    const fncOpenType =(openType)=> {
        setOpenType(openType);
    }

    const fncApply =(e)=>{
        // e.preventDefault();
        // props.fncBookingParent( booking );
        toggle();
        if( !coll ) {
            setColl( !coll );
        }
    }

    const onHandleStartDate = (start,end) => { 
        var startVal;
        var endVal;
        if(start && end) {
            startVal = start;
            endVal = end;
            setSelectButton(startVal+endVal);
        } else {
            startVal =null;
            endVal =null;
             setSelectButton("ALL");
        }

         axios.post("/shipper/getWdSchCal"
            ,{ 
             startport:startVal,endport:endVal
             ,eta:Moment(new Date()).format('YYYYMMDD'),week:'4 week'}
            ).then(res => {
             setColl(true);
             console.log(res.data.length);
             if(res.data && res.data.length > 0) {
                 setCalendarData(res.data);
             } else {
                 setCalendarData([]);
             }
           
         });	
         
     }
  return (
    <>
    <Row id="Schedule">
        <Col xl="12" lg="12">
            
            <Card style={{zIndex:'95'}}>
                <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                    <Row className="pb-2">
                        <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>SCHEDULE
                            <Button className="pl-1" color="link" id="lineview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
                            <UncontrolledTooltip delay={0} target="lineview">Input</UncontrolledTooltip>
                        </Col>
                        <Col>
                            <Row>
                                <Col className="col-10 pr-0">
                                {/* <StyledContentLoader
                            isLoading={loading}> */}
                                    <Select
                                        className="react-select react-select-primary"
                                        classNamePrefix="react-select"
                                        name="schedule_bookmark_seq"
                                        value={{value:booking.schedule_bookmark_seq?booking.schedule_bookmark_seq:''
                                        ,label:booking.schedule_bookmark_name?booking.schedule_bookmark_name:'선택'}}
                                        onChange={(e)=>fncSelectSchedule(e?e:null)}
                                        options={scheduleList}
                                        placeholder={"선택"}
                                    />
                                    {/* </StyledContentLoader> */}
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <ScheduleBookmarkWdfc
                                            scheduleList={scheduleList}
                                            selectBookingScheduleBookmark={selectBookingScheduleBookmark}
                                            outLinePortList={outLinePortList}
                                            inLinePortList={inLinePortList}
                                            onAlert={props.onAlert}
                                            lineVesselList={lineVesselList}
                                            {...props}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        
                        <Collapse isOpen={coll}>
                        <hr className="mt-0"/>
                        
                        <Row>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Vessel/Voy</Label></Col>
                                        <Col>
                                            <Row>
                                                <Col className="col-7 pr-1">
                                                    {/* <InputValid 
                                                        type="text"
                                                        name="sch_vessel_name"
                                                        id="sch_vessel_name"
                                                        placeholder=""
                                                        maxLength="35"
                                                        bsSize="sm"
                                                        value={booking.sch_vessel_name?booking.sch_vessel_name:''}
                                                        onChange={(e)=>fncOnChange(e, 'sch_vessel_name')}
                                                        onBlur={(e) => {props.fncBookingParent(booking)}}
                                                        validtype="text"
                                                        required={true} 
                                                        feedid="schedule"
                                                    /> */}
                                                    <Select
                                                        className="customSelect react-select-primary"
                                                        classNamePrefix="customSelect"
                                                        //className="react-select react-select-primary"
                                                        //classNamePrefix="react-select"
                                                        name="sch_vessel_name"
                                                        bsSize="sm"
                                                        value={{
                                                            value:booking.sch_vessel_name?booking.sch_vessel_name:null,
                                                            label:booking.sch_vessel_name?booking.sch_vessel_name:'선택'
                                                        }}
                                                        onChange={(value)=>setBooking({...booking,'sch_vessel_name':value.value,'vsl_type':value.vsl_type})}
                                                        options={lineVesselList}
                                                        onBlur={(e)=>props.fncBookingParent(booking)}
                                                        // placeholder={placeholder}
                                                        />
                                                    <InputValid
                                                        hidden
                                                        type="text"
                                                        name="sch_vessel_name"
                                                        id="sch_vessel_name"
                                                        placeholder=""
                                                        maxLength="35"
                                                        value={booking.sch_vessel_name?booking.sch_vessel_name:''}
                                                        validtype="text"
                                                        required={true} 
                                                    />
                                                </Col>
                                                <Col className="text-center pl-0 pr-0 pt-1">/</Col>
                                                <Col className="col-4 pl-1">
                                                    <InputValid 
                                                        type="text"
                                                        name="sch_vessel_voyage"
                                                        id="sch_vessel_voyage"
                                                        placeholder=""
                                                        maxLength="17"
                                                        bsSize="sm"
                                                        value={booking.sch_vessel_voyage?booking.sch_vessel_voyage:''}
                                                        onChange={(e)=>fncOnChange(e, 'sch_vessel_voyage')}
                                                        onBlur={(e) => {props.fncBookingParent(booking)}}
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
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Voyage</Label></Col>
                                        <Col>
                                        <InputValid 
                                            type="text"
                                            name="sch_vessel_voyage"
                                            id="sch_vessel_voyage"
                                            placeholder=""
                                            maxLength="17"
                                            bsSize="sm"
                                            value={booking.sch_vessel_voyage?booking.sch_vessel_voyage:''}
                                            onChange={(e)=>fncOnChange(e, 'sch_vessel_voyage')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="text"
                                            required={true} 
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col> */}
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Call Sign</Label></Col>
                                        <Col>
                                        <InputValid 
                                            type="text"
                                            name="sch_call_sign"
                                            id="sch_call_sign"
                                            placeholder=""
                                            maxLength="9"
                                            bsSize="sm"
                                            value={booking.sch_call_sign?booking.sch_call_sign:''}
                                            onChange={(e)=>fncOnChange(e, 'sch_call_sign')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            validtype="text"
                                            required={false} 
                                            feedid="schedule"
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            {/* <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">On Board</Label></Col>
                                        <Col>
                                        <InputGroup className="date" id="sch_srd">
                                            <ReactDatetime
                                                inputProps={{
                                                    className: "form-control form-control-sm",
                                                    placeholder: "Datetime Picker Here",
                                                }}
                                                dateFormat="YYYY-MM-DD"
                                                timeFormat={false}
                                                closeOnSelect={true}
                                                bsSize="sm"
                                                value={booking.sch_srd?Moment(booking.sch_srd).format('YYYY-MM-DD'):''}
                                                onChange={(e)=>fncOnChangeDate(e,'sch_srd')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText>
                                                    <span className="glyphicon glyphicon-calendar">
                                                    <i className="fa fa-calendar" />
                                                    </span>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <Input hidden
                                            id="temp_sch_srd"
                                            invalid={booking.sch_srd?false:true}
                                        />
                                        <FormFeedback feedid="schedule">{validation.REQ_MSG}</FormFeedback>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col> */}
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">POL</Label></Col>
                                        <Col xl="3"  lg="3" md="3" sm="3" className="col-2 pr-1">
                                            <Input type="select" 
                                                bsSize="sm"
                                                name="sch_pol"
                                                id="sch_pol"
                                                placeholder=""
                                                className="pt-0 pb-0"
                                                value={booking.sch_pol?booking.sch_pol:''}
                                                onChange={(e)=>fncOnChangeSelect(e, 'sch_pol')}
                                                invalid={booking.sch_pol?false:true}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                >
                                                <option key={0} value={0}>선택</option>
                                                {outLinePortList.length > 0 ?outLinePortList.map((element,key)=>{
                                                    return(
                                                        <option key={key} value={element.port_code}>
                                                            {element.port_code}
                                                        </option>
                                                    )
                                                })
                                                :<></>}
                                            </Input>
                                            <FormFeedback feedid="schedule">{validation.REQ_MSG}</FormFeedback>
                                        </Col>
                                        <Col xl="5" lg="5" md="5" sm="5" className="col-5 pl-1">
                                            <InputValid 
                                                type="text"
                                                name="sch_pol_name"
                                                id="sch_pol_name"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.sch_pol_name?booking.sch_pol_name:''}
                                                onChange={(e)=>fncOnChange(e, 'sch_pol_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="schedule"
                                            />
                                        </Col>
                                        <Col xl="2" className="col-2 pl-1">
                                            <Label className="mt-2">{booking.sch_etd?Moment(booking.sch_etd).format('MM-DD'):''}</Label>
		                                </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">POD</Label></Col>
                                        <Col xl="3" lg="3" md="3" sm="3" className="col-2 pr-1">
                                            <Input type="select"
                                                bsSize="sm"
                                                name="sch_pod"
                                                id="sch_pod"
                                                placeholder=""
                                                className="pt-0 pb-0"
                                                value={booking.sch_pod?booking.sch_pod:''}
                                                onChange={(e)=>fncOnChangeSelect(e,'sch_pod')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                invalid={booking.sch_pod?false:true}
                                                >
                                                    <option key={0} value={0}>선택</option>
                                                {inLinePortList.length > 0 ?inLinePortList.map((element,key)=>{
                                                    return(
                                                        <option key={key} value={element.port_code}>
                                                            {element.port_code}
                                                        </option>
                                                    )
                                                })
                                                :<></>}
                                            </Input>
                                            <FormFeedback feedid="schedule">{validation.REQ_MSG}</FormFeedback>
                                        </Col>
                                        <Col xl="5" lg="5" md="5" sm="5" className="col-5 pl-1">
                                            <InputValid 
                                                type="text"
                                                name="sch_pod_name"
                                                id="sch_pod_name"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.sch_pod_name?booking.sch_pod_name:''}
                                                onChange={(e)=>fncOnChange(e, 'sch_pod_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="schedule"
                                            />
                                        </Col>
                                        <Col xl="2" className="col-2 pl-1">
                                            <Label className="mt-2">{booking.sch_eta?Moment(booking.sch_eta).format('MM-DD'):''}</Label>
		                                </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">POR</Label></Col>
                                        <Col xl="3" lg="3" md="3" sm="3" className="col-4 pr-1">
                                            <Input type="select"
                                                bsSize="sm"
                                                name="sch_por"
                                                id="sch_por"
                                                placeholder=""
                                                className="pt-0 pb-0"
                                                value={booking.sch_por?booking.sch_por:''}
                                                onChange={(e)=>fncOnChangeSelect(e,'sch_por')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                >
                                                <option key={0} value={0}>선택</option>
                                                {outLinePortList.length > 0 ?outLinePortList.map((element,key)=>{
                                                    return(
                                                        <option key={key} value={element.port_code}>
                                                            {element.port_code}
                                                        </option>
                                                    )
                                                })
                                                :<></>}
                                            </Input>
                                        </Col>
                                        <Col xl="7" lg="7" md="7" sm="7" className="col-8 pl-1">
                                            <InputValid 
                                                type="text"
                                                name="sch_por_name"
                                                id="sch_por_name"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.sch_por_name?booking.sch_por_name:''}
                                                onChange={(e)=>fncOnChange(e, 'sch_por_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="schedule"
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">PLD</Label></Col>
                                        <Col xl="3" lg="3" md="3" sm="3" className="col-4 pr-1">
                                            <Input type="select"
                                                bsSize="sm"
                                                name="sch_pld"
                                                id="sch_pld"
                                                placeholder=""
                                                className="pt-0 pb-0"
                                                value={booking.sch_pld?booking.sch_pld:''}
                                                onChange={(e)=>fncOnChangeSelect(e,'sch_pld')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                >
                                                    <option key={0} value={0}>선택</option>
                                                {inLinePortList.length > 0 ?inLinePortList.map((element,key)=>{
                                                    return(
                                                        <option key={key} value={element.port_code}>
                                                            {element.port_code}
                                                        </option>
                                                    )
                                                })
                                                :<></>}
                                            </Input>
                                        </Col>
                                        <Col xl="7" lg="7" md="7" sm="7" className="col-8 pl-1">
                                            <InputValid 
                                                type="text"
                                                name="sch_pld_name"
                                                id="sch_pld_name"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.sch_pld_name?booking.sch_pld_name:''}
                                                onChange={(e)=>fncOnChange(e, 'sch_pld_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="schedule"
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">FDP</Label></Col>
                                        <Col xl="3" lg="3" md="3" sm="3" className="col-3 pr-1">
                                            <Input type="select"
                                                bsSize="sm"
                                                name="sch_fdp"
                                                id="sch_fdp"
                                                placeholder=""
                                                className="pt-0 pb-0"
                                                value={booking.sch_fdp?booking.sch_fdp:''}
                                                onChange={(e)=>fncOnChangeSelect(e,'sch_fdp')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                                >
                                                    <option key={0} value={0}>선택</option>
                                                {inLinePortList.length > 0 ?inLinePortList.map((element,key)=>{
                                                    return(
                                                        <option key={key} value={element.port_code}>
                                                            {element.port_code}
                                                        </option>
                                                    )
                                                })
                                                :<></>}
                                            </Input>
                                        </Col>
                                        <Col xl="7" lg="7" md="7" sm="7" className="col-9 pl-1">
                                            <InputValid 
                                                type="text"
                                                name="sch_fdp_name"
                                                id="sch_fdp_name"
                                                placeholder=""
                                                maxLength="35"
                                                bsSize="sm"
                                                value={booking.sch_fdp_name?booking.sch_fdp_name:''}
                                                onChange={(e)=>fncOnChange(e, 'sch_fdp_name')}
                                                onBlur={(e) => {props.fncBookingParent(booking)}}
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
                            <Button className="p-0" color="link" id="linemore" onClick={() => setColl(!coll)} style={{height:'21px'}}>
                                {coll?<i className="fa fa-caret-up fa-2x" />:<i className="fa fa-caret-down fa-2x" />}
                            </Button>
                            <UncontrolledTooltip delay={0} target="linemore">{coll?'Close':'Open'}</UncontrolledTooltip>
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
    <Modal isOpen={open} toggle={toggle} className="pt-0" className={clsNm} size="xl">
        <ModalHeader toggle={toggle}>Schedule</ModalHeader>
        <ModalBody className={clsNm}>
            <CardBody>
            <Row>
                {/* <Col className="col-12 mb-2">
                    <div className="text-center">
                        <Button className="mt-1 mr-1 p-0" color="default" type="button" onClick={()=>onHandleStartDate('1')}>인천->위해</Button>
                        <Button className="mt-1 mr-1 p-0" color="default" type="button" onClick={()=>onHandleStartDate('2')}>인천->청도</Button>
                        <Button className="mt-1 mr-1 p-0" color="default" type="button" onClick={()=>onHandleStartDate('3')}>평택->청도</Button>
                        <Button className="mt-1 mr-1 p-0" color="default" type="button" onClick={()=>onHandleStartDate('4')}>경인->천진</Button>
                        <Button className="mt-1 mr-1 p-0" color="default" type="button" onClick={()=>onHandleStartDate('5')}>인천->장기항</Button>
                        <Button className="mt-1 mr-1 p-0" color="default" type="button" onClick={()=>onHandleStartDate('6')}>인천->태창</Button>
                    </div>
                </Col> */}
                <Col className="col-12 mb-2">
                    <div className="text-center">

                        <Button className="mt-1 mr-1 p-0" color={selectButton==="ALL"?"info":"default"} type="button" onClick={()=>onHandleStartDate('','')}>전체{' '}</Button>
                        {routePort.length>0?
                                routePort.map((data,key)=>
                                    <Button key={"sch_"+key} className="mt-1 mr-1 p-0" color={selectButton===data.start_port_code+data.end_port_code?"info":"default"} type="button" 
                                        onClick={()=>onHandleStartDate(data.start_port_code,data.end_port_code)}>{data.start_port_kr_name}->{data.end_port_kr_name+' '}</Button>
                                ):<></>
                        }
                        
                    </div>
                </Col>
                <Col className="col-12 mb-2">
                    <Collapse isOpen={coll}>
                    {calendarData.length>0?
                            <Calendar
                                selectable
                                popup
                                localizer={localizer}
                                events={calendarData}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 370 }}
                                showAllEvents="true"
                                defaultDate={new Date()}
                                views={["month"]}
                                onSelectEvent={(event,e) => selectedEventCalendar(event,e)}
                                eventPropGetter={(event)=>{
                                    if(event && event.vsl_type === '41') {
                                        return {className:"bg-warning",style:{fontSize:'1px',paddingTop:'0',paddingBottom:'0'}}
                                    } else {
                                        return {className:"bg-info",style:{fontSize:'1px',paddingTop:'0',paddingBottom:'0'}}
                                    }
                                }}
                            />:<div className="text-center">스케줄이 존재하지 않습니다.</div>}
                    </Collapse>
                </Col>
            </Row>
                {/* <Row className="mb-3">
                    <Col className="col-12" xl="12" lg="12" sm="12">
                        <h5 className="mb-0">Vessel / Voyage Info</h5>
                    </Col>
                </Row> */}
                <Row className="mb-3">
                    <Col xl="6" lg="6" md="12">
                        <FormGroup>
                            <Label className="mb-0">VESSEL</Label>
                            <Select
                                className="react-select react-select-primary"
                                classNamePrefix="react-select"
                                name="sch_vessel_name"
                                value={{
                                    value:booking.sch_vessel_name?booking.sch_vessel_name:null,
                                    label:booking.sch_vessel_name?booking.sch_vessel_name:'선택'
                                }}
                                onChange={(value)=>setBooking({...booking,'sch_vessel_name':value.value})}
                                options={lineVesselList}
                                invalid={booking.sch_vessel_name?false:true}
                                onBlur={(e)=>props.fncBookingParent(booking)}
                                // placeholder={placeholder}
                            />
                            <InputValid 
                                hidden
                                type="text"
                                name="sch_vessel_name"
                                id="sch_vessel_name"
                                placeholder=""
                                maxLength="35"
                                value={booking.sch_vessel_name?booking.sch_vessel_name:''}
                                onChange={(e)=>fncOnChange(e, 'sch_vessel_name')}
                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                validtype="text"
                                required={true} 
                            />
                        </FormGroup>
                    </Col>
                    <Col xl="6" lg="6" md="12">
                        <FormGroup>
                            <Label className="mb-0">VOYAGE</Label>
                            <InputValid 
                                type="text"
                                name="sch_vessel_voyage"
                                id="sch_vessel_voyage"
                                placeholder=""
                                maxLength="17"
                                value={booking.sch_vessel_voyage?booking.sch_vessel_voyage:''}
                                onChange={(e)=>fncOnChange(e, 'sch_vessel_voyage')}
                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                validtype="text"
                                required={true} 
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xl="6" lg="6" md="12">
                        <FormGroup>
                            <Label className="mb-0">CALL SIGN</Label>
                            {/* <Input type="text"
                                name="sch_call_sign"
                                id="sch_call_sign"
                                placeholder=""
                                maxLength="9"
                                value={booking.sch_call_sign?booking.sch_call_sign:''}
                                onChange={(e)=>fncOnChange(e, 'sch_call_sign')}
                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                /> */}
                            <InputValid 
                                type="text"
                                name="sch_call_sign"
                                id="sch_call_sign"
                                placeholder=""
                                maxLength="9"
                                value={booking.sch_call_sign?booking.sch_call_sign:''}
                                onChange={(e)=>fncOnChange(e, 'sch_call_sign')}
                                onBlur={(e) => {props.fncBookingParent(booking)}}
                                validtype="text"
                                required={false} 
                            />
                        </FormGroup>
                    </Col>
                    {/* <Col xl="6" lg="6" md="12">
                        <FormGroup>
                            <Label className="mb-0">On Board</Label>
                            <InputGroup className="date" id="sch_srd">
                                <ReactDatetime
                                    inputProps={{
                                    className: "form-control",
                                    placeholder: "Datetime Picker Here",
                                    }}
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat={false}
                                    closeOnSelect={true}
                                    value={booking.sch_srd?Moment(booking.sch_srd).format('YYYY-MM-DD'):null}
                                    onChange={(e)=>fncOnChangeDate(e,'sch_srd')}
                                    onBlur={(e) => {props.fncBookingParent(booking)}}
                                    // invalid={booking.sch_srd?false:true}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <span className="glyphicon glyphicon-calendar">
                                        <i className="fa fa-calendar" />
                                        </span>
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <Input hidden id="sch_srd1"
                                invalid={booking.sch_srd?false:('CARD'===openType||'MAIN'===openType?true:false)}
                                />
                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>
                        </FormGroup>
                    </Col> */}
                </Row>
                <Row className="mb-3">
                    <Col className="col-12" xl="12" lg="12" sm="12">
                        <h5 className="mb-0">Schedule Info</h5>
                    </Col>
                </Row>
                <ScheduleWdfc
                    schedule={booking}
                    fncOnBlurSchedule={fncOnBlurSchedule}
                    openType={'CARD'}
                    outLinePortList={outLinePortList}
                    inLinePortList={inLinePortList}
                    fncOpenType={fncOpenType}
                    lineVesselList={lineVesselList}
                    {...props}/>
            </CardBody>
        </ModalBody>
        <ModalFooter>
            {/* <Button color="primary" onClick={(e)=>fncUpdateScheduleOfBooking(e)}>Save</Button> */}
            <Button color="primary" onClick={(e)=>fncApply()}>Apply</Button>
            <Button color="secondary" onClick={fncCacelModal}>Cancel</Button>
        </ModalFooter>
    </Modal>
    </>
    );
}

export default ScheduleCardWdfc;