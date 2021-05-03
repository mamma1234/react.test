import React from "react";
import {
  Row,
  Col,
//   Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  UncontrolledDropdown,
  ButtonGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,CardFooter,Button,UncontrolledTooltip,Modal,Collapse,Input,FormFeedback,Card
} from "reactstrap";
//import * as validation from 'components/common/validationation.js';

import ScheduleCard from './schedule/ScheduleCard.js';
import CarrierCard from './carrier/CarrierCard.js';
import ShipperCard from './shipper/ShipperCard.js';
import NotifyCard from "./notify/NotifyCard.js";
import ConsigneeCard from "./consignee/ConsigneeCard.js";
import CCAM_ShipperCard from './ccam/shipper/ShipperCard.js';
import CCAM_NotifyCard from "./ccam/notify/NotifyCard.js";
import CCAM_ConsigneeCard from "./ccam/consignee/ConsigneeCard.js";
import ContainerCard from "./container/ContainerCard.js";
import SrTitleCard from "./title/SrTitleCard.js";
import OthersCard from "./other/OthersCard.js";
import CargoCard from "./cargo/CargoCard.js";
import DeclareCard from "./declare/DeclareCard.js";
import Switch from "react-bootstrap-switch";
import queryString from 'query-string';
import axios from 'axios';

function SrRequest( props ) {    

	const {user,validation} = props;
	const query = queryString.parse(window.location.search);
	const [userTitleBookmarkList,setUserTitleBookmarkList] = React.useState([]);
	const [userLineBookmarkList,setUserLineBookmarkList] = React.useState([]);
	const [userShpBookmarkList,setUserShpBookmarkList] = React.useState([]);
	const [userConsBookmarkList,setUserConsBookmarkList] = React.useState([]);
	const [userNotiBookmarkList,setUserNotiBookmarkList] = React.useState([]);
	const [userSchBookmarkList,setUserSchBookmarkList] = React.useState([]);
	const [userCargoBookmarkList,setUserCargoBookmarkList] = React.useState([]);	
	const [userMarkBookmarkList,setUserMarkBookmarkList] = React.useState([]);
	const [userGoodsBookmarkList,setUserGoodsBookmarkList] = React.useState([]);
	const [userOtherBookmarkList,setUserOtherBookmarkList] = React.useState([]);
	const [userCntrBookmarkList,setUserCntrBookmarkList] = React.useState([]);
	const [userDeclareBookmarkList,setUserDeclareBookmarkList] = React.useState([]);
	

	//alert
	  const [modalMsg, setModalMsg] = React.useState("");
	  const [modalStats, setModalStats] = React.useState("");
	
	const [srData,setSrData] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [allOpen,setAllOpen] = React.useState(false);
	const [carrierOpen,setCarrierOpen] = React.useState(false);
	const [shpOpen,setShpOpen] = React.useState(false);
	const [consOpen,setConsOpen] = React.useState(false);
	const [notiOpen,setNotiOpen] = React.useState(false);
	const [otherOpen,setOtherOpen] = React.useState(false);
	const [cargoOpen,setCargoOpen] = React.useState(false);
	const [schOpen,setSchOpen] = React.useState(false);
	const [cntrOpen,setCntrOpen] = React.useState(false);
	const [autoSelf, setAutoSelf] = React.useState(true);
	const [dupYn, setDupYn] = React.useState(false);
	const [newSr, setNewSr] = React.useState("");
	const [newSrDupCheck, setNewSrDupCheck] = React.useState(false);
	const [topView, setTopView] = React.useState(false);
	const [conSamec, setConSamec] = React.useState(true);

	
	const [param, setParam] = React.useState({user_no: props.location.state && props.location.state.user_no  ?  props.location.state.user_no || '' : null, 
            sr_no: props.location.state && props.location.state.sr_no  ? props.location.state.sr_no || '' : null,  
            sr_date: props.location.state && props.location.state.issue_date ? props.location.state.issue_date || '' : null,
            doc_new: props.location.state && props.location.state.doc_new ? props.location.state.doc_new || '' : null,
            res_bkg_no: props.location.state && props.location.state.res_bkg_no?props.location.state.res_bkg_no || '':null,
            /*sch_vessel_name: props.location.state && props.location.state.sch_vessel_name?props.location.state.sch_vessel_name || '':null,
            sch_vessel_voyage: props.location.state && props.location.state.sch_vessel_voyage?props.location.state.sch_vessel_voyage || '':null,
            sch_pol: props.location.state && props.location.state.sch_pol?props.location.state.sch_pol || '':null,
            sch_pol_name: props.location.state && props.location.state.sch_pol_name?props.location.state.sch_pol_name || '':null,
            sch_pod: props.location.state && props.location.state.sch_pod?props.location.state.sch_pod || '':null,
            sch_pod_name: props.location.state && props.location.state.sch_pod_name?props.location.state.sch_pod_name || '':null,*/
            confirm_yn:props.location.state && props.location.state.confirm_yn?props.location.state.confirm_yn || '':null
	});
	
	const {srno} = query;  
	  React.useEffect(() => {

		  
		    const updateListData = () => {
		      let scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
		      //Scroll 화면 하단 Check 
		      if((Math.round(scrollTop) > 199)) {
		    	  setTopView(true);  
		      } else {
		    	  setTopView(false);
		      }
		    	
		    }
		      window.addEventListener("scroll", updateListData);
		      
		    return function cleanup() {
		      window.removeEventListener("scroll", updateListData);
		    };
		  });
	  
	React.useEffect(() => {

		if(user) { 

		onLoadTitleBookmark(); // title
		/*onLoadLineBookmark();
			onLoadShBookmark();
			onLoadConsBookmark();		
			onLoadNotiBookmark();
			onLoadCargobookmark();
			onLoadMarkbookmark();
			onLoadGoodsbookmark();
			onLoadOtherbookmark();
			onLoadSchedulebookmark();
			onLoadCntrbookmark();
			onLoadDecbookmark();*/
			onBookmark();
		}
	  },[user]);
	
	
React.useEffect(()=>{
	if (param && param.doc_new === 'Y') {
		autoSrNumberCreate(false);
	} else if (param && param.res_bkg_no && param.confirm_yn === 'Y') { //컴펌 링크
		axios.post("/shipper/getUserSrDocInit",{user_no : user?user.user_no:''})
	     .then(res => {var srnew = res.data;
	    	 			 axios.post("/shipper/getUserBookingInfo",{user_no:user?user.user_no:'',bkg_no:param.res_bkg_no})								
	    	 		      .then(res => { 
	    	 			  		    let cons = {};
	    	 			  		    if(conSamec) {
	    	 			  		    	
	    	 			  		    	cons = {'noti_name1':res.data[0].cons_name1,'noti_name2':res.data[0].cons_name2,'noti_address1':res.data[0].cons_address1,
	    	 			  		    			    'noti_address2':res.data[0].cons_address2,'noti_address3':res.data[0].cons_address3,
	    	 			  				            'noti_address4':res.data[0].cons_address4,'noti_address5':res.data[0].cons_address5};
	    	 			  		    }
	    	 			  	         
	    	 			  		    let data = {...srnew,...res.data[0],'bkglist':[{'value':res.data[0].res_bkg_no,'label':res.data[0].res_bkg_no}],
	    	 			  		    		    'sch_srd':res.data[0].sch_etd,'bk_link':'Y',...cons};
	    	 			  		     setSrData(data);
	    	 			  });
	     });
	} else if (param && param.sr_no && !param.doc_new) {
		getSRDataSelect(param);
	} /*else {
		getSRDataSelect();
	}*/
    },[param]);

    const onBookmark =()=>{
    	axios.post("/shipper/getUserBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {
  	  		setUserTitleBookmarkList(res.data.totalList);
  	  	    setUserLineBookmarkList(res.data.carrierList);
  	  	    setUserShpBookmarkList(res.data.shipperList);
  	  	    setUserConsBookmarkList(res.data.consList);
  	  	    setUserNotiBookmarkList(res.data.notiList);
  	  	    setUserCargoBookmarkList(res.data.cargoList);
  	  	    setUserOtherBookmarkList(res.data.bookingList);
  	  	    setUserSchBookmarkList(res.data.scheduleList);
  	  	    setUserCntrBookmarkList(res.data.cntrList);
  	  	    setUserDeclareBookmarkList(res.data.decList);
  	  	    setUserMarkBookmarkList(res.data.markList);
  	  	    setUserGoodsBookmarkList(res.data.goodsList);
  	  	});
    }

	const onLoadTitleBookmark =() => {
		axios.post("/shipper/getUserTitleBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserTitleBookmarkList(res.data)});			
    }
	
	const onLoadLineBookmark =() => {
			axios.post("/shipper/getUserLineBookmark",{user_no:user?user.user_no:''})								
	  	  	.then(res => {setUserLineBookmarkList(res.data)});			
	}
	
	const onLoadShBookmark =() => {
		

		axios.post("/shipper/getUserShpBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserShpBookmarkList(res.data)});		

	}
	
	const onLoadConsBookmark =() => {

		axios.post("/shipper/getUserConsBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserConsBookmarkList(res.data)});	
		
	}
	
	const onLoadNotiBookmark=()=>{

		axios.post("/shipper/getUserNotiBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserNotiBookmarkList(res.data)});	
		
	}
	
	const onLoadCargobookmark=()=>{
		axios.post("/shipper/getUserCargoBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserCargoBookmarkList(res.data)});	
	}
	
	const onLoadMarkbookmark=()=>{
		axios.post("/shipper/getUserMarkBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserMarkBookmarkList(res.data)});	
	}
	
	const onLoadGoodsbookmark=()=>{
		axios.post("/shipper/getUserGoodsBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserGoodsBookmarkList(res.data)});	
	}
	const onLoadOtherbookmark=()=>{
		axios.post("/shipper/getUserOtherBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserOtherBookmarkList(res.data)});	
	}
	const onLoadSchedulebookmark=()=>{
		axios.post("/shipper/getUserSchBookmark",{user_no:user?user.user_no:''})								
  	  	.then(res => {setUserSchBookmarkList(res.data)});	
	}	
	const onLoadCntrbookmark=()=>{
		axios.post("/shipper/getUserCntrBookmark",{user_no:user?user.user_no:''})								
	  	.then(res => setUserCntrBookmarkList(res.data));
	}	
	const onLoadDecbookmark=()=>{
		axios.post("/shipper/getUserDeclareBookmark",{user_no:user?user.user_no:''})								
	  	.then(res => setUserDeclareBookmarkList(res.data));
	}		
	

	const getSRDataSelect = (param) => {

        axios.post("/shipper/getUserSrDataList",{user_no :user?user.user_no:'',data:param,link:param?param.sr_no?'Y':'N':'N',list:'N'}
        ).then(res => {if(res.data) {setSrData(res.data);} else {setSrData([])} }   
        );
    }
	
	const dataHandler = (data) => {


		setSrData({...srData,...data});
        console.log("merge Data:",{...srData,...data});

	}
	// SR 저장 
	const dataSave = () => {
	// 1. 자리수 체크 
		if( !props.validation.fncValidationMaxLength() ) {
            fncOpenCardInvalidMaxLength();
            props.onAlert("info","입력가능을(를) 확인 후 다시 저장 하세요.");
            return false;
        }
    
		if(!srData.sr_no) {
    		props.onAlert("error","sr_no 는 필수 입력항목 입니다. New 버튼을 통해 신규 번호를 입력 하세요.");
		} else {
		 axios.post("/shipper/setUserSRDataList",{user_no:user?user.user_no:'',data:srData},{})								
	  	  	.then(res => props.onAlert("success","작성한 데이터가 저장 되었습니다."));	
		}
	}
	
	const onLoadBookmark=(gubun)=>{
		if(gubun === "sh") {
			onLoadShBookmark();
		} else if (gubun === "ca") {
			onLoadLineBookmark();
		} else if (gubun === "cs") {
			onLoadConsBookmark();
		} else if (gubun === "nt") {
			onLoadNotiBookmark();
		} else if (gubun === "cg") {
			onLoadCargobookmark();
		} else if (gubun === "mk") {
			onLoadMarkbookmark();
		} else if (gubun === "gs") {
			onLoadGoodsbookmark();
		} else if (gubun === "ot") {
			onLoadOtherbookmark();
		} else if (gubun === "sc") {
			onLoadSchedulebookmark();
		} else if (gubun === "ct") {
			onLoadCntrbookmark();
		} else if (gubun === "dc") {
			onLoadDecbookmark();
		}else if (gubun === "tt") {
			onLoadTitleBookmark();
		}
		
		
	}

	/* 저장 및 문서 전송 */
	const fncOnDocSend = () => {
	    
	    if(modalStats==="NORMAL") {
	    	axios.post("/shipper/getUserSrDocInit",{user_no :user?user.user_no:'',sr_no:newSr})
		     .then(res => {setSrData({...res.data,'bkglist':[]});setOpen(!open);});
	    } else {
			axios.post("/shipper/setUserSRDataList",{user_no:user?user.user_no:'',data:srData})								
	  	  	.then(res => {
		  	  	if(validationationFiled()) {	
					 axios.post("/shipper/setSendDocSr",{user_no:user?user.user_no:'',data:srData,status:modalStats})								
					  	  .then(res => {setOpen(!open);
					  	                 if(res.data === 'success' ) {
					  	                	props.onAlert("success",modalStats==="CANCEL"?"작성한 SR "+srData.sr_no+" 문서를 취소전송 하였습니다.":"작성한 SR "+srData.sr_no+" 문서를 전송 하였습니다.");
					  	                 } else {
					  	                	props.onAlert("error",res.data);
					  	                 }  
						})/*.catch(err => {
							 if(err.response.status === 500) {
								let url = "/error-500?message="+err.response.statusText;
								props.history.push(url);
							} else if(err.response.status === 419) {
						  		  //props.refresh();
							} else {
								console.log(err);	
							}
						})*/;
					} else {
						setOpen(!open);
					}		
	  	  	}
	  	  	);	
	    }
		
	}
	// 자리수 체크 
    const fncOpenCardInvalidMaxLength =()=>{
    	

       /* if( validation.fncFeedIdInvalidMaxLength('booking') ) {
        	setOtherOpen(true);
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
        }*/
    }
	
    function validationationFiled () {

    	//header
    	
    	let booking = 0; //booking card
    	let schedule = 0; //schedule card
    	let line = 0; //shipper card
    	let shipper = 0; //shipper card
    	let consignee = 0; //consignee card
    	let notify = 0; //notify card
    	let cargo = 0; //cargo card
    	let cntr = 0; //cntr card
    	//booking
    	
    	if(!srData.res_bkg_no) {
    		booking++;
    	}
    	if(!srData.sc_no) {
    		booking++;
    	}
    	if(!srData.bl_type) {
    		booking++;
    	}
    	if(!srData.trans_service_code) {
    		booking++;
    	}
    	if(!srData.hbl_yn) {
    		booking++;
    	}
    	//schedule
    	if(!srData.sch_vessel_name) {
    		schedule++;
    	}
    	if(!srData.sch_vessel_voyage) {
    		schedule++;
    	}
  /*  	if(!srData.sch_srd =='Invalidation date' || !srData.sch_srd) {
    		schedule++;
    	}*/
    	if(!srData.sch_pol_name) {
    		schedule++;
    	}
    	if(!srData.sch_pod_name) {
    		schedule++;
    	}
        //carrier
    	if(!srData.line_name1) {
    		line++;
    	}
    	if(!srData.line_payment_type) {
    		line++;
    	}
    	if(!srData.line_address1) {
    		line++;
    	}
    	
    	//shipper
    	if(!srData.shp_name1) {
    		shipper++;
    	}
    	if(!srData.shp_address1) {
    		shipper++;
    	}
    	//consignee
    	if(!srData.cons_name1) {
    		consignee++;
    	}
    	if(!srData.cons_address1) {
    		consignee++;
    	}
    	//notify
    	if(!srData.noti_name1) {
    		notify++;
    	}
    	if(!srData.noti_address1) {
    		notify++;
    	}
    	
    	//cargo
    	if(!srData.cargo_hs_code) {
    		cargo++;
    	}
    	if(!srData.cargo_total_volume) {
    		cargo++;
    	}
    	if(!srData.cargo_total_weight) {
    		cargo++;
    	}
    	if(!srData.cargo_pack_type) {
    		cargo++;
    	}
    	if(!srData.cargo_pack_qty) {
    		cargo++;
    	}
    	
    	if(!cargoDetail(srData.goodlist)) {
    		cargo++;
    	}
    	
    	if(srData.cntrlist && srData.cntrlist.length > 0) {
    		if(!cntrDetail(srData.cntrlist)){
    			cntr++;
    		}
    	} else {
    		cntr++;
    	}
    	
    	if(booking > 0) {
    		setOtherOpen(true);
    	}
    	if(schedule > 0) {
    		setSchOpen(true);
    	}
    	if(line > 0) {
    		setCarrierOpen(true);
    	}    	
    	if(shipper > 0) {
    		setShpOpen(true);
    	}
    	if(consignee > 0) {
    		setConsOpen(true);
    	}
    	if(notify > 0) {
    		setNotiOpen(true);
    	}
    	if(cargo > 0) {
    		setCargoOpen(true);
    	}
       	if(cntr > 0) {
       		setCntrOpen(true);
    	}   
       	
       	if(booking > 0 || schedule > 0 ||line > 0||shipper > 0||consignee > 0||notify > 0||cargo > 0||cntr > 0) {
       		
       	    console.log("booking:",booking,"schedule:",schedule,"line:",line,"shipper:",shipper,"consignee:",consignee,"notify:",notify,"cargo:","cntr:",cntr);
       		props.onAlert("error",validation.REQ_MSG);
       	    return false;	
       	} else {
       		return true;
       	}
    		
    }
    
    function cargoDetail(list) {
      if(list.length > 0) {
    	  for(let i=0; i<list.length; i++) { console.log("::",list[i].goods_desc1);
  			if(!list[i].goods_desc1 || list[i].goods_desc1 == "") {
    	  		return false;
    	  	}
    	  }
    	  return true;
      } else {
    	  return false;
      }
    	
    }
    function cntrDetail(list) {
        if(list.length > 0) {
        	for(let i=0; i<list.length; i++) {
  			  if(!list[i].cntr_no) {
  			  	    return false;
  			  	}
  			  	if(!list[i].cntr_code) {
  			  		 return false;
  				}
  			  	if(!list[i].cntr_total_weight) {
  			  		 return false;
  				}
  			  	if(!list[i].cntr_total_volume) {
  			  		 return false;
  				}
        	}
  			  	return true;
        } else {
      	  return false;
        }
      	
      }
	const autoSrNumberCreate =(msgyn) =>{ 
		if(user) {
			axios.post("/shipper/getUserSrDocInit",{user_no : user?user.user_no:''})
		     .then(res => {setSrData({...res.data,'bkglist':[]});
		     			if(msgyn) {props.onAlert("success","신규 SR번호를 생성하였습니다.");}});
		} else {
			return false;
		}
	}
	const resetShippingRequest=()=> {
		   if(autoSelf) {
			    //자동생성
			   autoSrNumberCreate(true);
		   } else { 
			  //수동생성
				if(!newSr) {
					  props.onAlert("error","직접 생성할 SR번호를 입력해주세요.");
					  return false;
				} else {
					
				   if(dupYn) {
					   selfSrNumberCreate();
				   } else {
					   props.onAlert("error","SR 중복확인 버튼을 눌러주세요.");
				   }
				}
		   }
	}
	
	const selfSrNumberCreate = () => {
		axios.post("/shipper/getUserNewSrDupCheck",{sr_no:newSr})
	     .then(res => {
		     if(!res.data) {
		    	setDupYn(true);
		 		setModalStats("NORMAL");
				setModalMsg("["+newSr+"] 신규번호로 작성하시겠습니까?");
				setOpen(!open);	
		     } else {
		    	 props.onAlert("error","["+newSr+"] 번호는 이미 사용중입니다. 다른번호를 입력 해주세요.");
		     }
	
	     });
	}
	
    function newSrNumDupCheck () {		  
		  if(newSrDupCheck) {
			  props.onAlert("error","중복체크는  필수 입니다.");
			  return false;
		  }
		  
		  return true;
    }
	
	const fncOnChangeNewSRNo = (e)=>{
		
	}
	
	const onDocSend = (name) => {
		let msg ="";
		
		if(!srData.sr_no) {
    		props.onAlert("error","sr_no 는 필수 입력항목 입니다. New 버튼을 통해 신규 번호를 입력 하세요.");
    	} else {
	
			if(name === "SEND") {
				msg= "작성한 SR ["+srData.sr_no+"] 을 전송 하시겠습니까?";
				setModalStats("SEND");
			} else {
				msg= "작성한 SR ["+srData.sr_no+"] 을 취소전송 하시겠습니까?";
				setModalStats("CANCEL");
			}
			setModalMsg(msg);
			setOpen(!open);
    	}
		
	}
	
	const fncDupCheckBkgNo = (e) => {

		if(!validation.validationHangle(e.target.value)) {
			if(validation.validationDigit(e.target.value,15)) {
				setNewSr(e.target.value);
				if(e.target.value){
					setDupYn(false);
				}
			} else {
				props.onAlert("error","SR 번호 입력 자리수 초과 하였습니다.(0~15)");
			}	
		}
	}

    return (
        <>
        
        	<div className="section section-white">	
        			<Container>
        				<CardBody className="pt-2 pb-2 bg-white">
		        			<Row>
					            <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
						            <h4 className="mt-1 text-center">
						            	<small>Shipping Request</small>
						            </h4>
					            </Col>
					         </Row>
				             <Row className="mt-3" >
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
						         	<Button id="srnew" color="default" outline type="button" className="mr-1" onClick={resetShippingRequest}>NEW</Button>
					         		<UncontrolledTooltip delay={0} target="srnew">새문서</UncontrolledTooltip>
						         	<Button id="srview" color="default" outline type="button" className="mr-1" onClick={dataSave}>SAVE</Button>
					         		<UncontrolledTooltip delay={0} target="srview">임시저장</UncontrolledTooltip>
					         		 <Button id="srsend" color="default" outline type="button" className="mr-1" onClick={()=>onDocSend('SEND')}>SEND</Button>
					                	<UncontrolledTooltip delay={0} target="srsend">SR문서 전송</UncontrolledTooltip>
		                                <Button id="bkg_cancel" color="default" outline type="button" className="mr-1"
		                                	onClick={()=>onDocSend('CANCEL')}>C-SEND</Button>
		                                <UncontrolledTooltip delay={0} target="bkg_cancel">취소전송</UncontrolledTooltip>
				                </Col>
				             </Row>
				             <Collapse isOpen={!autoSelf}>
		                        <Row className="mt-2">
	                            	<Col xl="4" lg="4" md="4" className="col-12 ml-auto">
	                                    <Row className="mt-2">
	                                        <Col xl="8" lg="8" md="8" className="col-8 pr-0 ml-auto ">
	                                            <Input type="text" name="bkg_no" id="bkg_no"
	                                                maxLength="15"
	                                                placeholder="직접 생성할 SR번호 입력"
	                                                value={newSr}
	                                                onChange={(e)=>fncDupCheckBkgNo(e)}
	                                                />
	                                            <FormFeedback>{validation.REQ_MSG}</FormFeedback>
	                                        </Col>
	                                        <Col xl="4" lg="4" md="4" className="col-4">
	                                        	<Button id="srNum" color="danger" outline type="button" className="mr-1" 
	                                        		onClick={selfSrNumberCreate}
	                                        		>중복확인</Button>
	                                        </Col>
	                                    </Row>
	                                
	                                </Col>
	                            </Row>
	                        </Collapse>
				            <hr className="mt-2"/>
					       
	                        <Row>
		                        <Col xl="12" lg="12" className="pl-4 pr-4">
		                            <SrTitleCard bookmark={userTitleBookmarkList} 
		                                         booking={userOtherBookmarkList}
		                                         schedule={userSchBookmarkList}
		                                         carrier={userLineBookmarkList}
		                            			 shipper={userShpBookmarkList}
		                                         consignee={userConsBookmarkList}
		                            			 notify={userNotiBookmarkList}
		                                         cargo={userCargoBookmarkList} 
		                                         loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} {...props}/>
		                        </Col>
	                        </Row>
	                        <Row>
	                        	<Col xl="6" className="col-12">
	                        		<OthersCard bookmark={userOtherBookmarkList}  loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={otherOpen} samec={conSamec} {...props}/>
	                        	</Col>
	                        	<Col xl="6" className="col-12">
	                        		<ScheduleCard bookmark={userSchBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={schOpen}  {...props}/>
	                        	</Col>	                        	
	                        </Row>
	                        <Row>
	                        	<Col xl="6" className="col-12">
	                        	{/*<CarrierCard bookmark={userLineBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={carrierOpen}  {...props}/>*/ }
	                        				<ShipperCard bookmark={userShpBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={shpOpen}  {...props}/>
	                        	</Col>
	                        	<Col xl="6" className="col-12">
	                        	
	                        		<ConsigneeCard bookmark={userConsBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={consOpen}  samec={conSamec} onSetSamec={()=>setConSamec(!conSamec)} {...props}/>
	                        	</Col>	                       	
                        	</Row>
	                        <Row>
	                        	<Col xl="6" className="col-12">
	                        	<NotifyCard bookmark={userNotiBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={notiOpen} {...props}/>
	                        	</Col>
	                        	{/*<Col xl="6" className="col-12">
	                        		
	                        	</Col>	 */}                       	
	                    	</Row>
	                        
			                <Row>
				                <Col>
					                <CargoCard  bookmark={userCargoBookmarkList} 
		            	                bookmark2={userMarkBookmarkList}
		            	                bookmark3={userGoodsBookmarkList} 
		            	                loadData={srData} 
		            	                mergeData={(data)=>dataHandler(data)} 
		            	                onLoadData={onLoadBookmark}
		            	    			openWindow={cargoOpen}  {...props}/>
				                </Col>
				            </Row>
			                <Row>
				                <Col>
				                	<ContainerCard  bookmark={userCntrBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={cntrOpen}  {...props} />
				                </Col>
				            </Row>
			                <Row>
			                {srData && srData.hbl_yn ==='N'?
			                <Col>
			                	<DeclareCard  bookmark={userDeclareBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={cntrOpen}  {...props} />
			                </Col>
			                :<></>}
			               
			            </Row>	
			            <Row>
				            <Col xl="12">
			                	<div>CCAM</div>
			                	<hr className="mt-1" />
			                	<Row>
			                		<Col xl="6">
			                			<CCAM_ShipperCard bookmark={userShpBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={shpOpen}  {...props}/>
			                		</Col>
			                		<Col xl="6">
			                			<CCAM_ConsigneeCard bookmark={userConsBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={consOpen}  samec={conSamec} onSetSamec={()=>setConSamec(!conSamec)} {...props}/>
			                		</Col>
			                		<Col xl="6">
			                			<CCAM_NotifyCard bookmark={userNotiBookmarkList} loadData={srData} mergeData={(data)=>dataHandler(data)} onLoadData={onLoadBookmark} openWindow={notiOpen} {...props}/>
			                		</Col>
			                	</Row>
			                </Col>
			            </Row>
	                        <Row>
	 
		                        <Card className="no-transition mb-0 rounded-0" style={{zIndex:'88888',position:'fixed',right:'0.5%',top:'25%'}}>
		    	            		<CardBody className="pl-1 pr-1 pt-2 pb-0 text-center"> 
				    	                    <Button
				    	                    color="link"
				    	                    size="sm"
				    	                    type="button" className="pl-1 pr-1"
				    	                    	onClick={(e)=>{e.preventDefault();
	                            				onDocSend('SEND');}}
				    	                  >
				    	                    SEND
				    	                  </Button><hr className="m-0 " />
				    	                    <Button
				    	                    color="link"
				    	                    size="sm"
				    	                    type="button" className="pl-1 pr-1"
				    	                    	 onClick={(e)=>{e.preventDefault();
		                                           dataSave();}}>
				    	                    SAVE
				    	                  </Button><hr className="m-0" />
				    	                    <Button
				    	                    color="link"
				    	                    size="sm"
				    	                    type="button" className="pl-1 pr-1"
				    	                    	onClick={(e) => {
				                                    e.preventDefault();
				                                    setAllOpen(!allOpen);
				        		    	            setCarrierOpen(!allOpen);
				    								setShpOpen(!allOpen);
				    								setConsOpen(!allOpen);
				    								setNotiOpen(!allOpen);
				    								setOtherOpen(!allOpen);
				    								setCargoOpen(!allOpen);
				    								setSchOpen(!allOpen);
				    								setCntrOpen(!allOpen);
				                                }}
				    	                  >
				    	                    {allOpen?'Close':'Open'}
				    	                  </Button>
		    	            		</CardBody>
		    	            	</Card>
	                                     
                            <nav id="cd-vertical-nav" style={{zIndex:'15'}}>
                            <ul>
                            <li>
	                            <a 
	                            data-number="1"
	                            //href="#projects"
	                            onClick={(e) => {
	                                e.preventDefault();
	                                setOtherOpen(!otherOpen);
	                                document.getElementById("Others").scrollIntoView({
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
	                            <a 
	                            data-number="2"
	                            //href="#projects"
	                            onClick={(e) => {
	                                e.preventDefault();
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
                                <a 
                                data-number="3"
                                //href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCarrierOpen(!carrierOpen);
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
                                <a 
                                data-number="4"
                                //href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShpOpen(!shpOpen);
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
                                <a 
                                data-number="5"
                                //href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
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
                                <a 
                                data-number="6"
                                //href="#teams"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("Notify").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest",
                                    });

                                }}
                                >
                                <span className="cd-dot bg-secondary" />
                                <span className="cd-label">Notify</span>
                                </a>
                            </li>
                            <li>
                                <a
                                data-number="7"
                                //href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
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
                                <a 
                                data-number="8"
                                //href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
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
                            <li>
                            <a 
                            data-number="9"
                            //href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("Declare").scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest",
                                });
                            }}
                            >
                            <span className="cd-dot bg-secondary" />
                            <span className="cd-label">Declare</span>
                            </a>
                        </li>
                            
                            </ul>
                        </nav>
                       {topView?
	    	                    <Button className="mb-1 pt-1 pb-1" style={{zIndex:'88888',position:'fixed',right:'3%',top:'86%'}}
	    	                    color="neutral" size="sm"
	    	                    //outline
	    	                    type="button" 
	    	                    onClick={(e) => {
	                                     e.preventDefault();
	                                     document.getElementById("General").scrollIntoView({
	                                     behavior: "smooth",
	                                     block: "start",
	                                     inline: "nearest",
	                                     });
	                                 }}
	    	                  >
	    	                    <i className="fa fa-angle-double-up fa-3x" /><br/><span style={{position:'absolute',top:'64%',right:'15%',fontSize:'1px'}}>Top</span>
	    	                  </Button> :<></>}
	                                     
                    </Row>
                        </CardBody>
                    </Container>
            </div>

            {/* 모달 팝업 영역 
                xs : 한 줄
                sm : 576px 에서 다음 줄로 넘어감
                md : 768px
                lg : 992px
                xl : 1200px
                fluid : 뷰포트 전체의 너비
                */}
            <Modal
            	size="sm"
            	isOpen={open}
             //toggle={() => setOpen(false)}
             >
            <div className="modal-header no-border-header">
              <button
                className="close"
                type="button"
                onClick={() => setOpen(false)}
              >×</button>
            </div>
            <div className="modal-body text-center pl-0 pr-0">
              <h5>{modalMsg}</h5>
            </div>
            <div className="modal-footer">
              <div className="left-side">
               <Button className="btn-link" color="danger" type="button" onClick={fncOnDocSend}>Yes</Button>
              </div>
              <div className="divider" />
              <div className="right-side">
	                 <Button
	                 className="btn-link"
	                 color="default"
	                 type="button"
	                 onClick={() => setOpen(false)}
	               >
	                 No
	               </Button>
              </div>
            </div>
          </Modal>
        </> 
    )
}

export default SrRequest;