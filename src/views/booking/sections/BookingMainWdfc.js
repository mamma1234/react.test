import React , { useState, useEffect } from "react";
import {Row,Col,CardBody,UncontrolledTooltip,Container,Form,Button,
    Card, Collapse} from "reactstrap";
import ScheduleCardWdfc from './schedule/ScheduleCardWdfc.js';
import CarrierCardWdfc from './carrier/CarrierCardWdfc.js';
import ShipperCardWdfc from './shipper/ShipperCardWdfc.js';
import ForwarderCardWdfc from "./forwarder/ForwarderCardWdfc.js";
import ConsigneeCardWdfc from "./consignee/ConsigneeCardWdfc.js";
import TransportCardWdfc from "./transport/TransportCardWdfc.js";
import CargoCardWdfc from "./cargo/CargoCardWdfc.js";
import ContainerCardWdfc from "./container/ContainerCardWdfc.js";
import BookingCardWdfc from "./booking/BookingCardWdfc.js";
import BookingTitleCardWdfc from "./booking/BookingTitleCardWdfc.js";
import 'assets/css/App.css';
import axios from 'axios';
import * as validation from 'components/common/validation.js';
import Confirm from 'components/Confirm/Confirm.js';
import Switch from "react-bootstrap-switch";
import InputValid from 'components/CustomInput/InputValid.js';
import $ from 'jquery';
import { Redirect } from "react-router-dom";

function BookingWeidongMain( props ) {
    const [booking, setBooking] = useState({});
    const [allOpen, setAllOpen] = useState(false);
    const [openSchedule, setOpenSchedule] = useState(false);
    const [openShipper, setOpenShipper] = useState(false);
    const [openForwarder, setOpenForwarder] = useState(false);
    const [openCarrier, setOpenCarrier] = useState(false);
    const [openCargo, setOpenCargo] = useState(false);
    const [openTrans, setOpenTrans] = useState(false);
    const [openBooking, setOpenBooking] = useState(false);
    const [openContainer, setOpenContainer] = useState(false);
    const [openConsignee, setOpenConsignee] = useState(false);
    // Container Send 전 필수체크를 위한 정보
    const [containerList, setContainerList] = useState([]);
    // Container Special List 
    const [containerSpecialList, setContainerSpecialList] = useState([]);
    // Cargo
    const [cargo, setCargo] = useState({});
    // Cargo Goods
    const [goodsRelationList, setGoodsRelationList] = useState([]);

    // 채번
    const [autoSelf, setAutoSelf] = useState(true);
    const [bkgNoDupCheck, setBkgNoDupCheck] = useState(false);
    const [params, setParams] = useState({
        new_yn: props.location.state && props.location.state.new_yn ? props.location.state.new_yn || '' : null,
        user_no: props.location.state && props.location.state.user_no  ?  props.location.state.user_no || '' : null, 
        bkg_no: props.location.state && props.location.state.bkg_no  ? props.location.state.bkg_no || '' : null,  
        bkg_date: props.location.state && props.location.state.bkg_date ? props.location.state.bkg_date || '' : null,
        sch_vessel_name: props.location.state && props.location.state.sch_vessel_name ? props.location.state.sch_vessel_name || '' : null,
        sch_vessel_voyage: props.location.state && props.location.state.sch_vessel_voyage ? props.location.state.sch_vessel_voyage || '' : null,
        sch_pol: props.location.state && props.location.state.sch_pol ? props.location.state.sch_pol || '' : null,
        sch_pod: props.location.state && props.location.state.sch_pod ? props.location.state.sch_pod || '' : null,
        schedule_yn: props.location.state && props.location.state.schedule_yn ? props.location.state.schedule_yn || '' : null,
        line_code: props.location.state && props.location.state.line_code ? props.location.state.line_code || '' : null,
        sch_etd: props.location.state && props.location.state.sch_etd ? props.location.state.sch_etd || '' : null,
        sch_eta: props.location.state && props.location.state.sch_eta ? props.location.state.sch_eta || '' : null,
        vsl_type: props.location.state && props.location.state.vsl_type ? props.location.state.vsl_type || '' : null
    });
    const [newBkgNo, setNewBkgNo] = useState(null);

    // other Bookmark
    const [otherList, setOtherList] = useState([]);
    // schedule Bookmark
    const [scheduleList, setScheduleList] = useState([]);
    // line Bookmark
    const [lineList, setLineList] = useState([]);
    // shipper Bookmark
    const [shipperList, setShipperList] = useState([]);
    // consignee Bookmark
    const [consigneeList, setConsigneeList] = useState([]);
    // Forwarder Bookmark
    const [forwarderList, setForwarderList] = useState([]);
    // Transport Bookmark
    const [transportList, setTransportList] = useState([]);
    // Cargo Bookmark
    const [cargoBookmarkList, setCargoBookmarkList] = useState([]);
    // Container Bookmark
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Bookmark Seq
    const [bookmarkSeq, setBookmarkSeq] = useState({});
    // Booking Bookmark 전체 적용정보
    const [relationList, setRelationList] = useState([]);
    const {user} = props;
    // 위험물인 경우 dangerTrue = True
    const [dangerTrue, setDangerTrue] = useState(false);

    useEffect(()=> {
        // console.log(user);
        if( user && user.user_no ) {
            // Other Bookmark 조회
            selectBookingOtherBookmark();
            // Schedule Bookmark 조회
            selectBookingScheduleBookmark();
            // Line(Carrier) Bookmark 조회
            selectBookingLineBookmark();
            // Shipper Bookmark 조회
            selectBookingShipperBookmark();
            // Consignee Bookmark 조회
            selectBookingConsigneeBookmark();
            // Forwarder Bookmark 조회
            selectBookingForwarderBookmark();
            // Transport Bookmark 조회
            selectBookingTransportBookmark();
            // Cargo Bookmark 조회
            selectBookingCargoBookmark();
            // Container Bookmark 조회
            selectBookingContainerBookmark();
        }
    },[user]);

    useEffect(()=>{
        
        if( params.bkg_no ) {
            // Dash 보드 및 일반 파라미터에서 넘어온 경우
            selectBookingParams();
        } else {
            if( "Y" === params.schedule_yn || "Y" === params.new_yn ) {
                
                // 스케줄에서 넘어온 경우
                insertBooking();
            }
        }
    },[params]);


    useEffect(()=>{
        setOpenSchedule(allOpen);
        setOpenShipper(allOpen);
        setOpenForwarder(allOpen);
        setOpenCarrier(allOpen);
        setOpenCargo(allOpen);
        setOpenTrans(allOpen);
        setOpenBooking(allOpen);
        setOpenContainer(allOpen);
        setOpenConsignee(allOpen);
    },[allOpen]);

    useEffect(()=>{
        if( bkgNoDupCheck ) {
            insertBooking();
        }
    },[bkgNoDupCheck]);

    // 전체 Bookmark 조회
    useEffect(()=>{
        if( bookmarkSeq && bookmarkSeq.bookmark_seq) {
            selectBookingBkgBookmarkRelation();
        }
    }, [bookmarkSeq])
    // Booking Bookmark 전체 적용
    useEffect(()=>{
        // console.log("=============relation===========");
        // console.log(booking);
        // console.log(relationList);
        // console.log("=============relation===========");
        let isBooking, isSchedule, isCarrier, isShipper, isConsignee
        , isForwarder, isTransport, isCargo, isContainer = false;
        let obj = Object();
        obj.bookmark_seq = bookmarkSeq.bookmark_seq;
        obj.bookmark_yn = 'Y';
        if( relationList.length > 0 ) {
            relationList.forEach( function( element ) {
                if( 'BOOKING' === element.reference_type ) {
                    obj.other_bookmark_name = element.bookmark_name;
                    obj.other_bookmark_seq = element.reference_seq;
                    
                    // Other Bookmark 상세내용
                    let row = otherList.find( function( item ) {
                        return item.other_bookmark_seq == element.reference_seq;
                    });
                    
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.other_bookmark_name = null;
                        obj.other_bookmark_seq = null;
                        obj.other_bookmark_seq = null;
                        obj.other_bookmark_name = null;
                        obj.sc_no = null;
                        obj.remark1 = null;
                        obj.remark2 = null;
                        obj.trans_service_code = null;
                    }
                    // 부킹 Bookmark 있군요
                    isBooking = true;
                }
                if( 'SCHEDULE' === element.reference_type ) {
                    obj.schedule_bookmark_name = element.bookmark_name;
                    obj.schedule_bookmark_seq = element.reference_seq;

                    // Schedule Bookmark 상세내용
                    let row = scheduleList.find( function( item ) {
                        return item.schedule_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.schedule_bookmark_seq = null;
                        obj.schedule_bookmark_name = null;
                        obj.sch_vessel_name = null;
                        obj.sch_vessel_code = null;
                        obj.sch_pol = null;
                        obj.sch_pol_name = null;
                        obj.sch_pod = null;
                        obj.sch_pod_name = null;
                        obj.sch_por = null;
                        obj.sch_por_name = null;
                        obj.sch_pld = null;
                        obj.sch_pld_name = null;
                        obj.sch_etd = null;
                        obj.sch_eta = null;
                        obj.sch_fdp = null;
                        obj.sch_fdp_name = null;
                    }
                    // Schedule Bookmark 있군요
                    isSchedule = true;
                }
                if( 'CARRIER' === element.reference_type ) {
                    obj.line_bookmark_name = element.bookmark_name;
                    obj.line_bookmark_seq = element.reference_seq;

                    // Carrier Bookmark 상세내용
                    let row = lineList.find( function( item ) {
                        return item.line_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.line_bookmark_seq = null;
                        obj.line_bookmark_name = null;
                        obj.line_name1 = null;
                        obj.line_name2 = null;
                        obj.line_code = null;
                        obj.line_user_email = null;
                        obj.line_user_fax = null;
                        obj.line_user_name = null;
                        obj.line_user_tel = null;
                        obj.line_user_dept = null;
                        obj.line_address1 = null;
                        obj.line_address2 = null;
                        obj.line_address3 = null;
                        obj.line_address4 = null;
                        obj.line_address5 = null;
                    }
                    // Carrier Bookmark 존재
                    isCarrier = true;

                }
                if( 'SHIPPER' === element.reference_type ) {
                    obj.shipper_bookmark_name = element.bookmark_name;
                    obj.shipper_bookmark_seq = element.reference_seq;

                    // Shipper Bookmark 상세내용
                    let row = shipperList.find( function( item ) {
                        return item.shipper_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.shipper_bookmark_seq = null;
                        obj.shipper_bookmark_name= null;
                        obj.shp_name1= null;
                        obj.shp_name2= null;
                        obj.shp_code= null;
                        obj.shp_user_name= null;
                        obj.shp_user_tel= null;
                        obj.shp_user_email= null;
                        obj.shp_address1= null;
                        obj.shp_address2= null;
                        obj.shp_address3= null;
                        obj.shp_address4= null;
                        obj.shp_address5= null;
                        obj.shp_user_dept= null;
                        obj.shp_user_fax= null;
                        obj.shp_payment_type= null;
                    }
                    // Shipper Bookmark 존재
                    isShipper = true;
                }
                if( 'CONSIGNEE' === element.reference_type ) {
                    obj.consignee_bookmark_name = element.bookmark_name;
                    obj.consignee_bookmark_seq = element.reference_seq;

                    // Consignee Bookmark 상세내용
                    let row = consigneeList.find( function( item ) {
                        return item.consignee_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.consignee_bookmark_seq = null;
                        obj.consignee_bookmark_name = null;
                        obj.cons_name1 = null;
                        obj.cons_name2 = null;
                        obj.cons_code = null;
                        obj.cons_user_email = null;
                        obj.cons_user_fax = null;
                        obj.cons_user_name = null;
                        obj.cons_user_tel = null;
                        obj.cons_user_dept = null;
                        obj.cons_address1 = null;
                        obj.cons_address2 = null;
                        obj.cons_address3 = null;
                        obj.cons_address4 = null;
                        obj.cons_address5 = null;
                    }
                    // Consignee Bookmark 있음
                    isConsignee = true;
                }
                if( 'FORWARDER' === element.reference_type ) {
                    obj.forwarder_bookmark_name = element.bookmark_name;
                    obj.forwarder_bookmark_seq = element.reference_seq;

                    // Forwarder Bookmark 상세내용
                    let row = forwarderList.find( function( item ) {
                        return item.forwarder_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.forwarder_bookmark_seq = null;
                        obj.forwarder_bookmark_name = null;
                        obj.fwd_name1 = null;
                        obj.fwd_name2 = null;
                        obj.fwd_code = null;
                        obj.fwd_user_email = null;
                        obj.fwd_user_fax = null;
                        obj.fwd_user_name = null;
                        obj.fwd_user_tel = null;
                        obj.fwd_user_dept = null;
                        obj.fwd_address1 = null;
                        obj.fwd_address2 = null;
                        obj.fwd_address3 = null;
                        obj.fwd_address4 = null;
                        obj.fwd_address5 = null;
                    }
                    // Forwarder Bookmark 있음
                    isForwarder = true;
                }
                if( 'TRANSPORT' === element.reference_type ) {
                    obj.transport_bookmark_name = element.bookmark_name;
                    obj.transport_bookmark_seq = element.reference_seq;

                    // Transport Bookmark 상세내용
                    let row = transportList.find( function( item ) {
                        return item.transport_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.transport_bookmark_seq = null;
                        obj.transport_bookmark_name = null;
                        obj.trans_name1 = null;
                        obj.trans_name2 = null;
                        obj.trans_code = null;
                        obj.trans_self_yn = null;
                        obj.trans_user_fax = null;
                        obj.trans_user_name = null;
                        obj.trans_user_tel = null;
                        obj.trans_user_email = null;
                        obj.trans_fac_name = null;
                        obj.trans_fac_area_name = null;
                        obj.trans_remark = null;
                    }
                }
                if( 'CARGO' === element.reference_type ) {
                    obj.cargo_bookmark_name = element.bookmark_name;
                    obj.cargo_bookmark_seq = element.reference_seq;
                    // obj.cargo_selected_yn = 'Y'
                    // Cargo Bookmark 상세내용
                    let row = cargoBookmarkList.find( function( item ) {
                        return item.cargo_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.cargo_bookmark_seq = null;
                        obj.cargo_bookmark_name = null;
                        obj.cargo_name = null;
                        obj.cargo_hs_code = null;
                        obj.cargo_pack_qty = null;
                        obj.cargo_pack_type = null;
                        obj.cargo_pack_type_name = null;
                        obj.cargo_remark = null;
                        obj.cargo_total_volume = null;
                        obj.cargo_total_weight = null;
                        obj.cargo_type = null;
                        obj.cargo_type_name = null;
                        obj.cargo_weight = null;
                    }
                    // Cargo Bookmark 있음
                    isCargo = true;
                }
                if( 'CONTAINER' === element.reference_type ) {
                    obj.container_bookmark_name = element.bookmark_name;
                    obj.container_bookmark_seq = element.reference_seq;

                    // Container Bookmark 상세내용
                    let row = containerBookmarkList.find( function( item ) {
                        return item.container_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    }
                    // Container Bookmark 있음
                    isContainer = true;
                }
            });

            // 없는 Bookmark 들 정리
            if( !isBooking ) {
                obj.other_bookmark_name = null;
                obj.other_bookmark_seq = null;
                obj.other_bookmark_seq = null;
                obj.other_bookmark_name = null;
                obj.sc_no = null;
                obj.remark1 = null;
                obj.remark2 = null;
                obj.trans_service_code = null;
            }
            if( !isSchedule ) {
                obj.schedule_bookmark_seq = null;
                obj.schedule_bookmark_name = null;
                obj.sch_vessel_name = null;
                obj.sch_vessel_code = null;
                obj.sch_pol = null;
                obj.sch_pol_name = null;
                obj.sch_pod = null;
                obj.sch_pod_name = null;
                obj.sch_por = null;
                obj.sch_por_name = null;
                obj.sch_pld = null;
                obj.sch_pld_name = null;
                obj.sch_etd = null;
                obj.sch_eta = null;
                obj.sch_fdp = null;
                obj.sch_fdp_name = null;
            }
            if( !isCarrier ) {
                obj.line_bookmark_seq = null;
                obj.line_bookmark_name = null;
                obj.line_name1 = null;
                obj.line_name2 = null;
                obj.line_code = null;
                obj.line_user_email = null;
                obj.line_user_fax = null;
                obj.line_user_name = null;
                obj.line_user_tel = null;
                obj.line_user_dept = null;
                obj.line_address1 = null;
                obj.line_address2 = null;
                obj.line_address3 = null;
                obj.line_address4 = null;
                obj.line_address5 = null;
            }
            if( !isShipper ) {
                obj.shipper_bookmark_seq = null;
                obj.shipper_bookmark_name= null;
                obj.shp_name1= null;
                obj.shp_name2= null;
                obj.shp_code= null;
                obj.shp_user_name= null;
                obj.shp_user_tel= null;
                obj.shp_user_email= null;
                obj.shp_address1= null;
                obj.shp_address2= null;
                obj.shp_address3= null;
                obj.shp_address4= null;
                obj.shp_address5= null;
                obj.shp_user_dept= null;
                obj.shp_user_fax= null;
                obj.shp_payment_type= null;
            }
            if( !isConsignee ) {
                obj.consignee_bookmark_seq = null;
                obj.consignee_bookmark_name = null;
                obj.cons_name1 = null;
                obj.cons_name2 = null;
                obj.cons_code = null;
                obj.cons_user_email = null;
                obj.cons_user_fax = null;
                obj.cons_user_name = null;
                obj.cons_user_tel = null;
                obj.cons_user_dept = null;
                obj.cons_address1 = null;
                obj.cons_address2 = null;
                obj.cons_address3 = null;
                obj.cons_address4 = null;
                obj.cons_address5 = null;
            }
            if( !isForwarder ) {
                obj.forwarder_bookmark_seq = null;
                obj.forwarder_bookmark_name = null;
                obj.fwd_name1 = null;
                obj.fwd_name2 = null;
                obj.fwd_code = null;
                obj.fwd_user_email = null;
                obj.fwd_user_fax = null;
                obj.fwd_user_name = null;
                obj.fwd_user_tel = null;
                obj.fwd_user_dept = null;
                obj.fwd_address1 = null;
                obj.fwd_address2 = null;
                obj.fwd_address3 = null;
                obj.fwd_address4 = null;
                obj.fwd_address5 = null;
            }
            if( !isTransport ) {
                obj.transport_bookmark_seq = null;
                obj.transport_bookmark_name = null;
                obj.trans_name1 = null;
                obj.trans_name2 = null;
                obj.trans_code = null;
                obj.trans_self_yn = null;
                obj.trans_user_fax = null;
                obj.trans_user_name = null;
                obj.trans_user_tel = null;
                obj.trans_user_email = null;
                obj.trans_fac_name = null;
                obj.trans_fac_area_name = null;
                obj.trans_remark = null;
            }
            if( !isCargo ) {
                obj.cargo_bookmark_seq = null;
                obj.cargo_bookmark_name = null;
                obj.cargo_name = null;
                obj.cargo_hs_code = null;
                obj.cargo_pack_qty = null;
                obj.cargo_pack_type = null;
                obj.cargo_pack_type_name = null;
                obj.cargo_remark = null;
                obj.cargo_total_volume = null;
                obj.cargo_total_weight = null;
                obj.cargo_type = null;
                obj.cargo_type_name = null;
                obj.cargo_weight = null;
            }
            if( !isContainer ) {
                obj.container_bookmark_seq = null;
                obj.container_bookmark_name = null;
            }

            let merge = Object.assign(booking, obj);
            // console.log("merge : ",merge)
            setBooking({...merge});
        }

        
    },[relationList]);
    // 조회
    // const selectBookingBookmarkOfBooking = () => {
    //     const body =
    //     axios.post(
    //         "/shipper/selectBookingBookmarkOfBooking"
    //         ,{
    //             user_no : 'M000002',
    //             booking:{
    //                 bkg_no : params.bkg_no,
    //                 bkg_date : params.bkg_date,
    //             }
    //         }
    //         ,{}
    //     ).then(
    //         // props.onAlert("success", "정상 조회 되었습니다.")
    //     ).then(
    //         // INSERT 결과값 넣기
    //         res => {
    //             const result =  res.data;
    //             // console.log(result[0])
    //             if( 0 < result.length ) {
    //                 setBooking(result[0]);
    //             } else {
    //                 setBooking({});
    //             }
    //         }   
    //     ).catch(err => {
    //         if(err.response.status === 403||err.response.status === 401) {
    //             // props.onAlert("danger",validation.ERR_MSG)
    //         }
    //     });
    // }

    // WEIDONG 위험물 여부 판단
    // 위험물의 경우 운행구간과 vsl_type 정보로 판단한다.
    // 20210427 위험물은 위동에서 전화로 처리한다
    // useEffect(()=>{
    //     if( booking ) {
    //         if( "WDFC" === booking.line_code 
    //             && (booking.sch_vessel_name && booking.sch_pol && booking.sch_pod)) {
    //             validation.fncWeidongDangerCheck(booking.line_code, booking.sch_pol, booking.sch_pod, booking.sch_vessel_name,
    //                 function(result){
    //                     setDangerTrue(result);
    //                 }
    //             );
    //         }
    //     }
    // },[booking.sch_vessel_name , booking.sch_pol , booking.sch_pod , booking.sch_vsl_type]);

    // 조회
    const selectBookingParams = () => {
        // console.log(booking)
        if( !(params.user_no && params.bkg_no && params.bkg_date) ) {
            return false;
        }
        const body =
        axios.post(
            "/shipper/selectBooking"
            ,{
                user_no : params.user_no,
                params
            }
            ,{}
        ).then(
            // props.onAlert("success", "정상 조회 되었습니다.")
        ).then(
            res => {
                const result =  res.data;
                if( 0 < result.length ) {
                    setBooking(result[0]);
                    // validation.fncWeidongDangerCheck(result[0].line_code, result[0].sch_pol, result[0].sch_pod, result[0].sch_vessel_name,
                    //     function(result){
                    //         setDangerTrue(result);
                    //     }
                    // );
                } else {
                    setBooking({});
                }
            }   
        );
    }

    // 조회
    // const selectBookingBkgNo = () => {
    //     console.log(booking.bkg_no)
    //     let params = {
    //         bkg_no: booking.bkg_no
    //     }
    //     const body =
    //     axios.post(
    //         "/shipper/selectBooking"
    //         ,{
    //             user_no : 'M000002',
    //             params
    //         }
    //         ,{}
    //     ).then(
    //         // props.onAlert("success", "정상 조회 되었습니다.")
    //     ).then(
    //         res => {
    //             const result =  res.data;
    //             if( 0 < result.length ) {
    //                 setBooking(result[0]);
    //             } else {
    //                 setBooking({});
    //             }
    //         }   
    //     ).catch(err => {
    //         if(err.response.status === 403||err.response.status === 401) {
    //             // props.onAlert("danger",validation.ERR_MSG)
    //         }
    //     });
    // }

    // Booking 정보 취합
    const fncBookingParent = (booking) => {
        // 전체북마크는 초기화 해줘야함 그래야 재 호출이 되지 않아요
        let merge = Object.assign(booking, {'bookmark_yn':'N'});
        setBooking({...merge});
    }

    // 컨테이너 정보 취합
    const fncContainerParent =(containerList)=>{
        setContainerList( containerList );
    }
    // 컨테이너 Special 정보 취합
    const fncContainerSpecialParent =(containerSpecialList)=>{
        setContainerSpecialList( containerSpecialList );
    }
    // Cargo 정보 취합
    const fncCargoParent =(cargo)=> {
        setCargo( cargo );
    }
    // Cargo Goods 정보 취합
    const fncGoodsParent = (goodsRelationList)=> {
        setGoodsRelationList( goodsRelationList );
    }

    // 입력
    const insertBooking = () => {
    // console.log(booking)
        // e.preventDefault();
        // console.log( autoSelf, bkgNoDupCheck );
        
        if( !user ) {
            props.onAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        if( !user.bkg_recipient ) {
            props.onAlert("error", validation.NO_BKG_RECIPIENT);
            return false;
        }
        if( !autoSelf && !bkgNoDupCheck ) {
            props.onAlert("error",validation.NO_DUP_CHECK_MSG);
            return false;
        }

        const body =
        axios.post(
            "/shipper/insertBooking"
            ,{
            user_no: user?user.user_no:null,
            newBkgNo: newBkgNo,
            booking,
            params
            }
            ,{}
        ).then(
            // INSERT 결과값 넣기
            res => {
                let data = res.data.rows[0];
                setParams({data,
                    'schedule_yn':'N',
                    'new_yn':'N',
                });
                // console.log(">>>>>>>>>>>>>>>>", data);
                setBooking(res.data.rows[0]);
                // fncBookingParent(res.data.rows[0]);
                // props.onAlert("success","부킹(이)가 새로 생성되었습니다.");
                // SELF 부킹 입력화면 닫아주고
                if( !autoSelf ) {
                    setAutoSelf(!autoSelf);
                }
                // SELF 부킹화면 입력 되어 있으면 없애주자
                setNewBkgNo(null);
                // 닫혀 있으면 열어주자
                if( !allOpen ) {
                    setAllOpen(!allOpen);
                }
                // check 정보도 초기화
                if( bkgNoDupCheck ) {
                    setBkgNoDupCheck(!bkgNoDupCheck);
                }
                props.onAlert("success",validation.NEW_MSG);
            }   
        );
    }

    const fncValidation=()=>{
        // console.log(booking);
        // if( !booking.bkg_no ) return false;
        // if( !booking.sc_no ) return false;
        // if( !booking.sch_vessel_name ) return false;
        // if( !booking.sch_vessel_voyage ) return false;
        // if( !booking.sch_pol ) return false;
        // if( !booking.sch_pod ) return false;
        // if( !booking.shp_code ) return false;
        // if( !booking.shp_name1) return false;
        // if( !booking.shp_user_tel) return false;
        // if( !booking.shp_address1 ) return false;
        // if( !validation.validationEmail(booking.shp_user_email) ) return false;

        let check = true;
        // if( containerList.length === 0 ) {
        //     return false;
        // }
        // for( let i=0; i<containerList.length; i++ ) {
        //     let row = containerList[i];
        //     if( !row.cntr_code || !row.cntr_pick_up_cy_code || !row.cntr_pick_up_cy_date ||!row.cntr_qty ) {
        //         check = false;
        //         break;
        //     }
        // }
        let feedback = $('.invalid-feedback');
        feedback.each(function(i, item){
            // console.log(i, item)
            if( 'block' === $(item).css('display') &&
                'deny' !== $(item).attr('feedid') ) {
                check = false;
            }
            // break;
        });
        return check;
    }
    const fncOpenCardInvalid =()=>{
        // let feedback = $('.invalid-feedback');
        // let schedule, bkgCheck, carrier, shipper, consignee, forwarder, transport, cargo, container = false;
        // feedback.each(function(i, item){
        //     if( 'block' === $(item).css('display')&&
        //         'deny' !== $(item).attr('feedid')) {
        //         if( "booking" ===  $(item).attr("feedid") ) {
        //             bkgCheck = true;
        //         }
        //         if( "schedule" ===  $(item).attr("feedid") ) {
        //             schedule = true;
        //         }
        //         if( "carrier" ===  $(item).attr("feedid") ) {
        //             carrier = true;
        //         }
        //         if( "shipper" ===  $(item).attr("feedid") ) {
        //             shipper = true;
        //         }
        //         if( "consignee" ===  $(item).attr("feedid") ) {
        //             consignee = true;
        //         }
        //         if( "forwarder" ===  $(item).attr("feedid") ) {
        //             forwarder = true;
        //         }
        //         if( "transport" ===  $(item).attr("feedid") ) {
        //             transport = true;
        //         }
        //         if( "cargo" ===  $(item).attr("feedid") ) {
        //             cargo = true;
        //         }
        //         if( "container" ===  $(item).attr("feedid") ) {
        //             container = true;
        //         }
        //     }
        // });
        if( validation.fncFeedIdInvalid('booking') ) {
            setOpenBooking(true);
        }

        if( validation.fncFeedIdInvalid('schedule') ) {
            setOpenSchedule(true);
        }
        if( validation.fncFeedIdInvalid('carrier') ) {
            setOpenCarrier(true);
        }
        if( validation.fncFeedIdInvalid('shipper') ) {
            setOpenShipper(true);
        }
        if( validation.fncFeedIdInvalid('consignee') ) {
            setOpenConsignee(true);
        }
        if( validation.fncFeedIdInvalid('forwarder') ) {
            setOpenForwarder(true);
        }
        if( validation.fncFeedIdInvalid('transport') ) {
            setOpenTrans(true);
        }
        if( validation.fncFeedIdInvalid('cargo') ) {
            setOpenCargo(true);
        }
        if( containerList.length ===0 ) {
            setOpenContainer(true);
        }
        if( validation.fncFeedIdInvalid('container') ) {
            setOpenContainer(true);
        }
        // for( let i=0; i<containerList.length; i++ ) {
        //     let row = containerList[i];
        //     if( !row.cntr_code || !row.cntr_pick_up_cy_code || !row.cntr_pick_up_cy_date ||!row.cntr_qty ) {
        //         // console.log("Container 필수체크")
                
        //     }
        // }
    }
    // SEND
    const sendBooking = async(status)=> {
        if( !user ) {
            props.onAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        if( !user.bkg_recipient ) {
            props.onAlert("error", validation.NO_BKG_RECIPIENT);
            return false;
        }

        if( status === 'SEND' ) {
            if( !('NO' === booking.status_cus || 'S0' === booking.status_cus || 'EC' === booking.status_cus) ) {
                props.onAlert("error","부킹전송은 저장 또는 취소승인 인 경우에만 가능합니다.");
                return false;
            }
        } else {
            if( !('RA' === booking.status_cus) ) {
                props.onAlert("error","부킹취소는 승인 인 경우에만 가능합니다.");
                return false;
            }
        }


        if( !booking.bkg_no ) return false;
        setAllOpen(false);
        let statusName = (status==='CANCEL')?'CANCEL':'SEND';
        // booking의 document 정보와 다르면 Confirm 메세지 
        let title = "["+booking.bkg_no+"]" ;
        let message = "["+ booking.bkg_no+"] Booking 을(를) "+statusName+" 하시겠습니까?";
        let result = await Confirm({
            title: title,
            message: message,
            confirmText: "SEND",
            cancleText: 'Cancel',
        });
        if ( true === result ) {
            if( !validation.fncValidation() ) {
                fncOpenCardInvalid();
                props.onAlert("danger","필수값 또는 입력가능을(를) 확인 후 다시 "+statusName+" 하세요.")
                return false;
            };

            // SEND 할때 최종 확인 절차
            // if( !fncCustomRequired() )


            // console.log( booking.status_cus , "aa")
            if( status === 'SEND' ) {

                axios.post(
                    "/shipper/updateAllBooking"
                    ,{
                        user_no: user?user.user_no:null,
                        booking ,
                        containerList,
                        containerSpecialList,
                        cargo,
                        goodsRelationList,
                        dangerTrue,
                    }
                    ,{}
                ).then(
                    // INSERT 결과값 넣기
                    res => {
                        // setBooking(res.data.rows[0]);
                        // fncBookingPrarms(res.data.rows[0]);
                        // props.onAlert("success",validation.SAVE_MSG);
                        // setParams(booking);
                        // selectBookingParams();
                        axios.post(
                            "/shipper/sendBooking"
                            ,{
                            user_no : user?user.user_no:null,
                            status : status,
                            booking,
                            cargo,
                            containerList,
                            containerSpecialList,
                            dangerTrue,
                            }
                            ,{}
                        ).then(
                            res => {
                                props.onAlert("success",validation.SEND_MSG);
                                // setParams({...params,
                                //     'schedule_yn':'N',
                                //     'new_yn':'N',
                                // });
                            }   
                        ).catch(
                            error=>{
                                const data = error.response.data;
                                let message = null;
                                if( data.service_code ) {
                                    setOpenBooking(true);
                                    message += data.service_code;
                                }
                                if( data.vessel_name || data.route) {
                                    setOpenSchedule(true);
                                    if( data.vessel_name )
                                        message += "\n"+data.vessel_name;
                                    if( data.route )
                                        message += "\n"+data.route;
                                }
                                if( data.cargo_pack_type ) {
                                    setOpenCargo(true);
                                    message = "\n"+data.cargo_pack_type;
                                }
                                if( data.cntr_sztp || data.pick_up || data.danger ) {
                                    setOpenContainer(true);
                                    if( data.cntr_sztp )
                                        message += "\n"+data.cntr_sztp;
                                    if( data.pick_up )
                                        message += "\n"+data.pick_up;
                                    if( data.danger )
                                        message += "\n"+data.danger;
                                }

                                if( message ) {
                                    props.onAlert('danger', message );
                                    return false;
                                }
                            }
                        );
                    }   
                );
            } else {

                // 취소인 경우
                axios.post(
                    "/shipper/sendBooking"
                    ,{
                    user_no : user?user.user_no:null,
                    status : status,
                    booking
                    }
                    ,{}
                ).then(
                    // INSERT 결과값 넣기
                    res => {
                        props.onAlert("success",validation.SEND_MSG);
                        setParams({...params,
                            'schedule_yn':'N',
                            'new_yn':'N',
                        });
                    }   
                );

            }

        }

    }


    /**
     * SEND 전 최종 확인. 위동 전용.
     * 1. 스케줄
     *  1.1. 인천-청도 화물선에 대해서만 DG선택
     *  -> 현재는 IMDG, UNDG(Class) 입력 가능하도록 처리 (필수인가?)
     *  1.2. 운행 구간이 스케줄과 일치 여부
     *  1.3. OOG 선택되었는가? -> "OOG 부킹은 별도 문의 바랍니다."
     * 2. 컨테이너
     *  2.1. SIZE/TYPE 20 REEFER, 40 REEFER, 40 REFFER HIGHCUBIC 선택시에만 Frozen tmp 입력 가능 (필수인가?)
     *  2.2. 그 외 입력의 경우 Frozen tmp 데이터 삭제 처리
     *  2.3. UNDG, IMDG(Class) 항목 코드 일치 여부 확인
     * 3. CARGO
     *  3.1. CARGO TYPE DG 인 경우에만 UNDG, IMDG(Class) 입력 > 사업팀 확인 후 진행.
     */
    const fncCustomRequired =()=> {
        if( !"WDFC" === booking.line_code ) {
            return true;
        }
        // 1. 스케줄
        // 1.1. 인천-청도 화물선에 대해서만 DG선택
        if( "KRINC" === booking.sch_pol && "CNTAO" === booking.sch_pod && "41" === booking.vsl_type ) {

        }
    }


    const fncOpenCardInvalidMaxLength =()=>{
        if( validation.fncFeedIdInvalidMaxLength('booking') ) {
            setOpenBooking(true);
        }

        if( validation.fncFeedIdInvalidMaxLength('schedule') ) {
            setOpenSchedule(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('carrier') ) {
            setOpenCarrier(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('shipper') ) {
            setOpenShipper(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('consignee') ) {
            setOpenConsignee(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('forwarder') ) {
            setOpenForwarder(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('transport') ) {
            setOpenTrans(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('cargo') ) {
            setOpenCargo(true);
        }
        if( containerList.length ===0 ) {
            setOpenContainer(true);
        }
        if( validation.fncFeedIdInvalidMaxLength('container') ) {
            setOpenContainer(true);
        }
    }
    const updateAllBooking = async(e)=> {
        if( !validation.fncValidationMaxLength() ) {
            fncOpenCardInvalidMaxLength();
            props.onAlert("info","입력가능을(를) 확인 후 다시 저장 하세요.");
            return false;
        };

        if( !booking.bkg_no ) return false;
        if( !user ) {
            props.onAlert("error",validation.NOTLOGIN_MSG);   
            return false;
        }
        setAllOpen(false);
        axios.post(
            "/shipper/updateAllBooking"
            ,{
                user_no : user?user.user_no:null,
                booking ,
                containerList,
                containerSpecialList,
                cargo,
                goodsRelationList,
                dangerTrue,
            }
            ,{}
        ).then(
            res => {
                props.onAlert("success",validation.SAVE_MSG);
                // setParams(booking);
                setParams({...params,
                    'schedule_yn':'N',
                    'new_yn':'N',
                });
            }   
        );

    }

    const fncOnChangeNewBkgNo =(e)=>{
        setNewBkgNo( e.target.value.toUpperCase() );
        // fncDupCheckBkgNo(e.target.value);
    }

    const fncDupCheckBkgNo = (e)=>{
        if( !newBkgNo ) {
            props.onAlert("danger",validation.NO_NULL_MSG);
            return false;
        }
        if( !validation.validationNo(newBkgNo) ) {
            props.onAlert("danger",validation.NO_CHECK_MSG);
            return false;
        }
        axios.post(
            "/shipper/selectDupCheckBkgNo"
            ,{
                user_no : user?user.user_no:null,
                newBkgNo
            }
            ,{}
        ).then(
            res => {
                if( res.data.length ) {
                    if( res.data[0].bkg_no ) {
                        props.onAlert("danger","Booking 번호 중복입니다. 다시 입력하세요.");
                    }
                } else {
                    fncSelfNewBkgNoCheck();
                }
            }   
        );
    }

    const fncSelfNewBkgNoCheck = async()=>{
        let title = "["+newBkgNo+"] 사용 가능" ;
        let message = "["+ newBkgNo+"] Booking "+validation.NO_MAKE_MSG;
        let result = await Confirm({
            title: title,
            message: message,
            confirmText: "SEND",
            cancleText: 'Cancle',
        });
        if ( true === result ) {
            if( !bkgNoDupCheck ) {
                setBkgNoDupCheck(!bkgNoDupCheck);
            }
        } else {
            setNewBkgNo(null);
            setAutoSelf(!autoSelf);
        }
    }

    const fncGetBkgNo =( bkgNo )=> {
        setBooking({...booking, 'bkg_no':bkgNo, 'bkg_date':null});
    }

    const fncReportViewer=()=> {

        if( !(booking.user_no && booking.bkg_date && booking.bkg_no ) ) {
            props.onAlert("danger","Booking 먼저 조회 하세요.");
            return false;
        }
        var obj = new Object();
        obj.user_no = booking.user_no;
        obj.bkg_date = booking.bkg_date;
        obj.bkg_no = booking.bkg_no;
        var json = JSON.stringify(obj);

        let form = document.reportForm;
        form.action = '/reportView';
        form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
        form.file_id.value = 'SEAWAYBILL';
        form.file_path.value = 'TEST_REVIEW';
        form.name.value = 'FILENAME';
        form.connection.value = 'pgsql';
        form.parameters.value = json;
        window.open('', 'popReport', 'width=1050px, height=850px');
        form.submit();
    }


    // Bookmark 목록 조회
    // OTHER 조회
    const selectBookingOtherBookmark = () => {
        axios.post(
            "/shipper/selectBookingOtherBookmark"
            ,{ user_no: user?user.user_no:null
            ,booking }
            ,{}
        ).then(
            res => {
                setOtherList(res.data);
                // onDismiss("success", "정상 처리 되었습니다.");
            }
        );
    }
    // SCHEDULE BOOKMARK 조회
    const selectBookingScheduleBookmark = () => {
        axios.post(
            "/shipper/selectBookingScheduleBookmark"
            ,{ user_no: user?user.user_no:null }
            ,{}
        ).then(
            setScheduleList([])
        ).then(
            res => setScheduleList(res.data)
        );
    }
    // Line Bookmark 조회
    const selectBookingLineBookmark = () => {
        axios.post(
            "/shipper/selectBookingLineBookmark"
            ,{ user_no: user?user.user_no:null }
            ,{}
        ).then(
            res => {
                setLineList(res.data);
            }
        );
    }
    // SHipper Bookmark 조회
    const selectBookingShipperBookmark = () => {
        axios.post(
            "/shipper/selectBookingShipperBookmark"
            ,{ user_no: user?user.user_no:null }
            ,{}
        ).then(
            setShipperList([])
        ).then(
            res => setShipperList(res.data)
        );
    }
    // Consignee Bookmark 조회
    const selectBookingConsigneeBookmark = () => {
        axios.post(
            "/shipper/selectBookingConsigneeBookmark"
            ,{ user_no: user?user.user_no:null }
            ,{}
        ).then(
            res => {
                setConsigneeList(res.data);
            }
        );
    }
    // Forwarder Bookmark 조회
    const selectBookingForwarderBookmark = () => {
        axios.post(
            "/shipper/selectBookingForwarderBookmark"
            ,{ user_no: user?user.user_no:null}
            ,{}
        ).then(
            res => {
                setForwarderList(res.data);
            }
        );
    }
    // Transport Bookmark 조회
    const selectBookingTransportBookmark = () => {
        axios.post(
            "/shipper/selectBookingTransportBookmark"
            ,{ user_no: user?user.user_no:null }
            ,{}
        ).then(
            res => {
                setTransportList(res.data);
            }
        );
    }
    // Cargo Bookmark 조회
    const selectBookingCargoBookmark = () => {
        axios.post(
            "/shipper/selectBookingCargoBookmark"
            ,{ user_no: user?user.user_no:null
                ,line_code: 'WDFC' }
        ).then(
            res => {
                setCargoBookmarkList(res.data);
            }
        );
    }
    // Container Bookmark 조회
    const selectBookingContainerBookmark=()=>{
        axios.post(
            "/shipper/selectBookingContainerBookmark"
            ,{ 
                user_no: user?user.user_no:null
            }
            ,{}
        ).then(
            res => {
                setContainerBookmarkList(res.data);
            }
        );
    }

    const fncBookmarkParent =(e)=> {
        let obj = Object();
        obj.bookmark_seq = e.value
        setBooking({...booking, ['bookmark_seq']:e.value, ['bookmark_name']:e.label})
        setBookmarkSeq(obj);
    }
    const selectBookingBkgBookmarkRelation =()=>{
        const body =
        axios.post(
            "/shipper/selectBookingBkgBookmarkRelation"
            ,{
                user_no: user?user.user_no:null,
                bookmark: bookmarkSeq,
            }
            ,{}
        ).then(
            res=>{
                setRelationList(res.data);
                // fncGetRelation();
            }
        );
    }

    // 삭제
    const deleteBooking = async() => {
        if( !booking.bkg_no ) return false;

        let title = "["+booking.bkg_no+"]" ;
        let message = "["+ booking.bkg_no+"] Booking 을(를) 삭제 하시겠습니까? 삭제한 경우 재 조회가 불가합니다.";
        let result = await Confirm({
            title: title,
            message: message,
            confirmText: "DELETE",
            cancleText: 'Cancel',
        });
        if ( true === result ) {
            const body =
            axios.post(
                "/shipper/deleteBooking"
                ,{
                user_no : user?user.user_no:null,
                booking
                }
                ,{}
            ).then(
                res=>{
                    // setBooking({});
                    props.onAlert("success", validation.DEL_MSG);
                    // selectBookingParams();
                    window.location.href="/bookinglist"
                }
            ).then(
                
            );
        }
    }

    return (
        <div className="section section-white">
            <Form>
                <Container>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <Row>
                            <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
                                <h4 className="mt-1 text-center">
                                    <small>Booking</small>
                                </h4>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="text-right">
                                <label className="mt-2 mb-0 mr-2" >
                                    <Switch onColor="info" offColor="success"
                                    onText="AUTO"
                                    offText="SELF" 
                                    defaultValue={true} 
                                    //value={switchVal} 
                                    onChange={(e)=>setAutoSelf(!autoSelf)} 
                                    />
                                </label>
                                <Button id="bkg_new" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>insertBooking()}>NEW</Button>
                                <UncontrolledTooltip delay={0} target="bkg_new">Booking 신규 생성</UncontrolledTooltip>
                                <Button id="report" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>fncReportViewer()}>REPORT</Button>
                                <UncontrolledTooltip delay={0} target="report">Report View</UncontrolledTooltip>
                                <Button id="bkg_save" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>updateAllBooking(e)}>SAVE</Button>
                                <UncontrolledTooltip delay={0} target="bkg_save">임시저장</UncontrolledTooltip>
                                <Button id="bkg_send" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>sendBooking('SEND')}>SEND</Button>
                                <UncontrolledTooltip delay={0} target="bkg_send">Booking문서 전송</UncontrolledTooltip>
                                <Button id="bkg_cancel" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>sendBooking('CANCEL')}>CANCEL</Button>
                                <UncontrolledTooltip delay={0} target="bkg_cancel">취소문서 전송</UncontrolledTooltip>
                                <Button id="bkg_delete" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>deleteBooking()}>DELETE</Button>
                                <UncontrolledTooltip delay={0} target="bkg_delete">Booking문서 삭제</UncontrolledTooltip>
                                {/* <Button id="bkg_cancel" color="default" outline type="button" className="mr-1"
                                    onClick={(e)=>selectBookingBkgNo()}>SEARCH</Button>
                                <UncontrolledTooltip delay={0} target="bkg_cancel">검색</UncontrolledTooltip> */}
                            </Col>
                        </Row>
                        <Collapse isOpen={!autoSelf}>
                            <Row className="mt-2">
                                <Col xl="4" lg="4" md="4" className="col-12 ml-auto">
                                    <Row className="mt-2">
                                        <Col xl="8" lg="8" md="8" className="col-8 pr-0 ml-auto ">
                                            {/* <Input type="text" name="bkg_no" id="bkg_no"
                                                maxLength="15"
                                                placeholder="직접 생성할 부킹번호 입력"
                                                value={newBkgNo?newBkgNo:''}
                                                onChange={(e)=>fncOnChangeNewBkgNo(e)}
                                                />
                                            <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                                            <InputValid 
                                                type="text"
                                                name="bkg_no"
                                                id="bkg_no"
                                                placeholder="직접 생성할 부킹번호 입력"
                                                maxLength="15"
                                                value={newBkgNo?newBkgNo:''}
                                                onChange={(e)=>fncOnChangeNewBkgNo(e)}
                                                validtype="text"
                                                required={true} 
                                                feedid="deny"
                                            />
                                        </Col>
                                        <Col xl="4" lg="4" md="4" className="col-4">
                                            <Button
                                                color="danger" outline type="button" className="mr-1" 
                                                onClick={()=>fncDupCheckBkgNo()}
                                            >중복확인
                                            </Button>
                                        </Col>
                                    </Row>
                            </Col>
                        </Row>
                        </Collapse>
                        <Row>

                            <Card className="no-transition mb-0 rounded-0" style={{zIndex:'88888',position:'fixed',right:'0.5%',top:'25%'}}>
                                <CardBody className="pl-1 pr-1 pt-2 pb-0 text-center"> 
                                    <Button
                                        color="link"
                                        size="sm"
                                        type="button" className="pl-1 pr-1"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // console.log("aaaaa")
                                            sendBooking('SEND');
                                        }}
                                    >
                                        SEND
                                    </Button><hr className="m-0 " />
                                    <Button
                                        color="link"
                                        size="sm"
                                        type="button" className="pl-1 pr-1"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateAllBooking();
                                        }}
                                        >
                                        SAVE
                                        </Button><hr className="m-0" />
                                        <Button
                                        color="link"
                                        size="sm"
                                        type="button" className="pl-1 pr-1"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setAllOpen(!allOpen);
                                        }}
                                    >
                                        {allOpen?'Close':'Open'}
                                    </Button>
                                </CardBody>
                            </Card>


	                        <Row style={{zIndex:'200'}}>
                                <nav id="cd-vertical-nav">
                                    <ul>
                                        {/* <li>
                                            <a href="#!"
                                            data-number="102"
                                            //href="#headers"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // console.log("aaaaa")
                                                sendBooking('SEND');
                                            }}
                                            >
                                            <span className="cd-dot bg-danger" />
                                            <span className="cd-label bg-danger"><i className="fa fa-paper-plane-o"/>SEND</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="10"
                                            //href="#headers"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateAllBooking();
                                            }}
                                            >
                                            <span className="cd-dot bg-primary" />
                                            <span className="cd-label bg-primary"><i className="fa fa-window-restore"/>SAVE</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="10"
                                            //href="#headers"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAllOpen(!allOpen);
                                                // setCarrierOpen(!allOpen);
                                                // setShpOpen(!allOpen);
                                                // setConsOpen(!allOpen);
                                                // setNotiOpen(!allOpen);
                                                // setOtherOpen(!allOpen);
                                                // setCargoOpen(!allOpen);
                                                // setSchOpen(!allOpen);
                                                // setCntrOpen(!allOpen);
                                            }}
                                            >
                                            <span className="cd-dot bg-success" />
                                            <span className="cd-label bg-success"><i className="fa fa-window-restore"/>Open All</span>
                                            </a>
                                        </li> */}
                                        <li>
                                            <a href="#!"
                                            data-number="1"
                                            //href="#headers"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById("General").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">TOP</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="6"
                                            //href="#projects"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenBooking(true);
                                                document.getElementById("Booking").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Booking</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="7"
                                            //href="#projects"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenSchedule(true);
                                                document.getElementById("Schedule").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Schedule</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="2"
                                            //href="#features"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenCarrier(true);
                                                document.getElementById("Carrier").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Carrier</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="3"
                                            //href="#features"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenShipper(true);
                                                document.getElementById("Shipper").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Shipper</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="4"
                                            //href="#features"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenConsignee(true);
                                                document.getElementById("Consignee").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Consignee</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="5"
                                            //href="#teams"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenForwarder(true);
                                                document.getElementById("Forwarder").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });

                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Forwarder</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="6"
                                            //href="#projects"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenTrans(true);
                                                document.getElementById("Transport").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Transport</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="6"
                                            //href="#projects"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenCargo(true);
                                                document.getElementById("Cargo").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Cargo</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!"
                                            data-number="7"
                                            //href="#projects"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenContainer(true);
                                                document.getElementById("Container").scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                                inline: "nearest",
                                                });
                                            }}
                                            >
                                            <span className="cd-dot bg-secondary" />
                                            <span className="cd-label">Container</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </Row>
                        </Row>
                        <hr className="mt-2"/>
                        <Row id="cardList">
                            <Col xl="12" lg="12" className="pl-4 pr-4">
                                <BookingTitleCardWdfc
                                    booking={booking}
                                    // fncBookingParent={fncBookingParent}
                                    fncGetBkgNo={fncGetBkgNo}
                                    otherList={otherList}
                                    scheduleList={scheduleList}
                                    lineList={lineList}
                                    shipperList={shipperList}
                                    consigneeList={consigneeList}
                                    forwarderList={forwarderList}
                                    transportList={transportList}
                                    cargoBookmarkList={cargoBookmarkList}
                                    containerBookmarkList={containerBookmarkList}
                                    fncBookmarkParent={fncBookmarkParent}
                                    {...props}
                                    />
                            </Col>
                            <Col xl="6" lg="6">
                                <BookingCardWdfc
                                    openWindow={openBooking}
                                    booking={booking}
                                    otherList={otherList}
                                    selectBookingOtherBookmark={selectBookingOtherBookmark}
                                    fncBookingParent={fncBookingParent}
                                    {...props}
                                    />
                            </Col> 
                             <Col xl="6" lg="6">
                                <ScheduleCardWdfc
                                    openWindow={openSchedule}
                                    booking={booking}
                                    fncBookingParent={fncBookingParent}
                                    scheduleList={scheduleList}
                                    selectBookingScheduleBookmark={selectBookingScheduleBookmark}
                                    {...props}
                                    />
                            </Col>
                            {/* <Col xl="6" lg="6">
                                <CarrierCardWdfc
                                    openWindow={openCarrier}
                                    booking={booking}
                                    fncBookingParent={fncBookingParent}
                                    lineList={lineList}
                                    selectBookingLineBookmark={selectBookingLineBookmark}
                                    {...props}
                                    />
                            </Col> */}
                            <Col xl="6" lg="6">
                                <ShipperCardWdfc
                                    openWindow={openShipper}
                                    booking={booking}
                                    fncBookingParent={fncBookingParent}
                                    shipperList={shipperList}
                                    selectBookingShipperBookmark={selectBookingShipperBookmark}
                                    {...props}
                                    />
                            </Col>
                            <Col xl="6" lg="6">
                                <ConsigneeCardWdfc
                                    openWindow={openConsignee}
                                    booking={booking}
                                    fncBookingParent={fncBookingParent}
                                    consigneeList={consigneeList}
                                    selectBookingConsigneeBookmark={selectBookingConsigneeBookmark}
                                    {...props}
                                    />
                            </Col>
                             <Col xl="6" lg="6">
                                <ForwarderCardWdfc
                                    openWindow={openForwarder}
                                    booking={booking}
                                    fncBookingParent={fncBookingParent}
                                    forwarderList={forwarderList}
                                    selectBookingForwarderBookmark={selectBookingForwarderBookmark}
                                    {...props}
                                    />
                            </Col>
                            <Col xl="6" lg="6">
                                <TransportCardWdfc
                                    openWindow={openTrans}
                                    booking={booking}
                                    fncBookingParent={fncBookingParent}
                                    transportList={transportList}
                                    selectBookingTransportBookmark={selectBookingTransportBookmark}
                                    {...props}
                                    />
                            </Col>

                            <Col xl="12" lg="12">
                                <CargoCardWdfc
                                    openWindow={openCargo}
                                    booking={booking}
                                    fncCargoParent={fncCargoParent}
                                    fncGoodsParent={fncGoodsParent}
                                    cargoBookmarkList={cargoBookmarkList}
                                    selectBookingCargoBookmark={selectBookingCargoBookmark}
                                    dangerTrue={dangerTrue}
                                    {...props}
                                    />
                            </Col>
                            <Col xl="12" lg="12">
                                <ContainerCardWdfc
                                    openWindow={openContainer}
                                    booking={booking}
                                    fncBookingParent={fncBookingParent}
                                    fncContainerParent={fncContainerParent}
                                    fncContainerSpecialParent={fncContainerSpecialParent}
                                    containerBookmarkList={containerBookmarkList}
                                    selectBookingContainerBookmark={selectBookingContainerBookmark}
                                    dangerTrue={dangerTrue}
                                    {...props}
                                    />
                            </Col>

                            {/*<Col xl="6" lg="6">
                                <DocumentCard
                                    booking={booking}/>
                            </Col>*/}

                        </Row>
                    </CardBody>
                </Container>
            </Form>
            <form id="reportForm" name="reportForm" >
                <input type="hidden" name="system_id"   value="plismplus" />
                <input type="hidden" name="user_id"     value="M000008" />
                <input type="hidden" name="file_type"   value="pdf" />
                <input type="hidden" name="file_id"     value="" />
                <input type="hidden" name="file_path"   value="" />
                <input type="hidden" name="name"        value="" />
                <input type="hidden" name="connection"  value="pgsql" />
                <input type="hidden" name="parameters" id="parameters"/>
            </form>
        </div>
    )
}

export default BookingWeidongMain;