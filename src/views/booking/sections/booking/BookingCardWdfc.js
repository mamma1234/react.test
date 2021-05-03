/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse,
    UncontrolledTooltip, Button,FormGroup, Label,Input, Card, FormFeedback} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import BookingWdfc from "./BookingWdfc.js";
import OtherBookmark from './OtherBookmark.js';
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";


const BookingCardWdfc = (props) => {

    // modal 창을 위한 state
    const [coll, setColl] = useState(false);
    const [open, setOpen] = useState(false);
    // 중요내용 부모/자식 공유를 위한 state
    const [booking, setBooking] = useState({});
    const [pureBooking, setPureBooking] = useState({});
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // SC NUMBER state
    const [otherList, setOtherList] = useState([]);
    // ServiceCode 공통코드
    const [serviceList, setServiceList] = useState([]);
    // Open Type
    const [openType, setOpenType] = useState("");
    const {user} = props;
    useEffect(()=>{
        selectLineCodeServiceType();
        // Bookmark 목록 조회
        // selectBookingOtherBookmark();
    },[]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            setBooking(props.booking);
        }
    },[props.booking]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        setOtherList(props.otherList);
    },[props.otherList]);

    // 20210305 Card 내에서의 저장행위는 중지 하도록 한다.
    useEffect(()=>{
        if( "CARD" != openType ) {
            setPureBooking( booking );
        }
    },[booking]);

    // 모달창 팝업
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // 자식에게 받은 Booking
    const fncOnBlurBooking = ( booking ) => {
        setBooking( booking );
        props.fncBookingParent( booking );
    }

    const fncOnKeyPressBkgNo = (e) => {
        // setBooking({...booking, ['bkg_date']:booking.bkg_no.substr(0, 8)});
        if( "Enter" === e.key ) {
            toggle();
        }
    }

    // Other select 선택할때
    const fncSelectOther = (e) => {
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            otherList.map((element, key)=>{
                if( e.value == element.other_bookmark_seq) {
                    // select로 새로운 document를 세팅한다
                    // 기존 Booking 정보

                    // Object.entries(element).map(([key, value]) => {
                    //     console.log(key, " : ", value);
                    // });

                    // 이렇게 해도 되긴하나 필요한 데이터만 처리가 불가
                    // Object.entries(element).map(([key, value]) =>(
                    //     (Object.assign(booking, {[key]:value}))
                    // ));
                    
                    setBooking({...booking
                        ,'other_bookmark_seq':element.other_bookmark_seq
                        ,'other_bookmark_name':element.other_bookmark_name
                        ,'sc_no':element.sc_no
                        ,'remark1':element.remark1
                        ,'remark2':element.remark2
                        ,'trans_service_code': element.trans_service_code
                        ,'shp_payment_type': element.shp_payment_type
                        ,'selected_yn':'Y'
                    });

                    props.fncBookingParent({...booking
                        ,'other_bookmark_seq':element.other_bookmark_seq
                        ,'other_bookmark_name':element.other_bookmark_name
                        ,'sc_no':element.sc_no
                        ,'remark1':element.remark1
                        ,'remark2':element.remark2
                        ,'trans_service_code': element.trans_service_code
                        ,'shp_payment_type': element.shp_payment_type
                        ,'selected_yn':'Y'
                    });
                }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // 조회
    const selectBookingDetail = (booking) => {
        axios.post(
            "/shipper/selectBookingDetail"
            ,{ 
                user_no: user?user.user_no:null,
                booking
            }
            ,{}
        ).then(
            res => {
                setOtherList(res.data);
            }
        );
    }

    // // 조회
    const selectBookingOtherBookmark = () => {
        props.selectBookingOtherBookmark();
    }

    // 입력
    const insertBooking = () => {
        // console.log(booking)
        const body =
        axios.post(
            "/shipper/insertBooking"
            ,{
            user_no : user?user.user_no:null,
            booking
            }
            ,{}
        ).then(
            // INSERT 결과값 넣기
            res => {
                setBooking(res.data.rows[0]);
                props.onAlert("success", validation.SAVE_MSG);
            }   
        );
    }

    // 수정
    const updateBooking = () => {
        const body =
        axios.post(
            "/shipper/updateBooking"
            ,{
            user_no : user?user.user_no:null,
            booking
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                setBooking({...booking, 'selected_yn':'N'});
            }
        );
    }

    // 수정 Booking other 정보로
    const updateOtherofBooking = () => {
        const body =
        axios.post(
            "/shipper/updateOtherofBooking"
            ,{
            user_no : user?user.user_no:null,
            booking
            }
            ,{}
        ).then(
            res=>{
                props.onAlert("success", validation.SAVE_MSG);
                setBooking({...booking, 'selected_yn':'N'});
            }
        );
    }

    // 수정된 내용은 Booking 저장
    const fncOnChange = ( e, key ) => {
        // e.preventDefault();
        let text = {...booking, [key]:e.target.value.toUpperCase()};
        setBooking(text);
    }

    const selectLineCodeServiceType = () => {
        axios.post(
            "/shipper/selectLineCodeServiceType"
            ,{ params:{
                line_code:'WDFC'
            } }
            ,{}
        ).then(
            setServiceList([])
        ).then(
            res => setServiceList(res.data)
        );
    }

    const fncOpenType = ( openType )=> {
        setOpenType(openType);
    }
    const fncCacelModal =()=>{
        setBooking( pureBooking );
        props.fncBookingParent( pureBooking );
        toggle();
    }

    const fncBookingParent =()=>{
        props.fncBookingParent(booking);
    }
  return (
    <>
    <Row id="Booking">
        <Col xl="12" lg="12">
            <Card style={{zIndex:'100'}}>
                <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                    <Row className="pb-2">
                        <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>BOOKING
                            <Button className="pl-1" color="link" id="lineview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
                            <UncontrolledTooltip delay={0} target="lineview">Input</UncontrolledTooltip>
                        </Col>
                        <Col>
                            <Row>
                                <Col className="col-10 pr-0">
                                    <Select
                                        className="react-select react-select-primary"
                                        classNamePrefix="react-select"
                                        name="bookingBookmark"
                                        value={{value:booking.other_bookmark_seq?booking.other_bookmark_seq:''
                                        ,label:booking.other_bookmark_name?booking.other_bookmark_name:'선택'}}
                                        onChange={(e)=>fncSelectOther(e?e:null)}
                                        options={otherList}
                                        placeholder={"선택"}
                                    />
                                </Col>
                                <Col className="col-2 pl-auto pr-auto">
                                    <OtherBookmark
                                        otherList={otherList}
                                        selectBookingOtherBookmark={selectBookingOtherBookmark}
                                        onAlert={props.onAlert}
                                        serviceList={serviceList}
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
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Request</Label></Col>
                                        <Col>
                                        {/* <Input type="text" name="bkg_no" id="bkg_no"
                                            bsSize="sm"
                                            placeholder=""
                                            maxLength="15"
                                            value={booking.bkg_no?booking.bkg_no:''}
                                            onChange={(e) => {fncOnChange( e, 'bkg_no' )}}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            invalid={booking.bkg_no?false:true}
                                            readOnly
                                            />
                                        <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="bkg_no"
                                            id="bkg_no"
                                            placeholder=""
                                            maxLength="15"
                                            value={booking.bkg_no?booking.bkg_no:''}
                                            onChange={(e)=>fncOnChange(e, 'bkg_no')}
                                            onBlur={fncBookingParent}
                                            validtype="text" 
                                            required={true}
                                            readOnly
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Contract</Label></Col>
                                        <Col>
                                        {/* <Input type="text" name="sc_no" id="sc_no" placeholder=""
                                            bsSize="sm"
                                            value={booking.sc_no?booking.sc_no:''}
                                            maxLength="20"
                                            onChange={(e) => {fncOnChange(e, 'sc_no')}}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            invalid={booking.sc_no?false:true}
                                            />
                                        <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="sc_no"
                                            id="sc_no"
                                            placeholder=""
                                            maxLength="20"
                                            value={booking.sc_no?booking.sc_no:''}
                                            onChange={(e)=>fncOnChange(e, 'sc_no')}
                                            onBlur={fncBookingParent}
                                            validtype="text" 
                                            required={false}
                                            feedid="booking"
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            {/* <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">BKG Date</Label></Col>
                                        <Col>
                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="bkg_date"
                                            id="bkg_date"
                                            placeholder=""
                                            maxLength="12"
                                            value={booking.bkg_date?booking.bkg_date:''}
                                            onChange={(e)=>fncOnChange(e, 'bkg_date')}
                                            onBlur={fncBookingParent}
                                            validtype="text" 
                                            required={false}
                                            readOnly
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col> */}
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Term</Label></Col>
                                        <Col>
                                        <Input type="select" name="trans_service_code" id="trans_service_code"
                                            bsSize="sm"
                                            placeholder=""
                                            className="pt-0 pb-0"
                                            value={booking.trans_service_code?booking.trans_service_code:''}
                                            onChange={(e)=>fncOnChange(e, 'trans_service_code')}
                                            onBlur={()=>props.fncBookingParent(booking)}>
                                            <option key={0} value={'0'}>
                                                선택
                                            </option>
                                            {(serviceList.length>0)?serviceList.map((element,key)=>{
                                                return(
                                                    <option key={key} value={element.service_code}>
                                                        {element.service_type}
                                                    </option>
                                                )
                                            })
                                            :<></>}
                                        </Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Payment</Label></Col>
                                        <Col>
                                        <Input type="select"
                                            bsSize="sm"
                                            name="shp_payment_type"
                                            id="shp_payment_type"
                                            placeholder=""
                                            className="pt-0 pb-0"
                                            value={booking.shp_payment_type?booking.shp_payment_type:''}
                                            onChange={(e)=>fncOnChange(e, 'shp_payment_type')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}>
                                            <option value="">선택</option>
                                            <option value="P">선불</option>
                                            <option value="C">후불</option>
                                        </Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Remark</Label></Col>
                                        <Col>
                                        {/* <Input type="text" name="remark1" id="remark1" placeholder=""
                                            bsSize="sm"
                                            maxLength="70"
                                            value={booking.remark1?booking.remark1:''}
                                            onChange={(e)=>fncOnChange(e, 'remark1')}
                                            onBlur={()=>props.fncBookingParent(booking)}
                                            /> */}
                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="remark1"
                                            id="remark1"
                                            placeholder=""
                                            maxLength="70"
                                            value={booking.remark1?booking.remark1:''}
                                            onChange={(e)=>fncOnChange(e, 'remark1')}
                                            onBlur={fncBookingParent}
                                            validtype="text" 
                                            required={false}
                                            feedid="booking"
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0"></Label></Col>
                                        <Col>
                                        {/* <Input type="text" name="remark2" id="remark2" placeholder=""
                                            bsSize="sm"
                                            maxLength="70"
                                            value={booking.remark2?booking.remark2:''}
                                            onChange={(e)=>fncOnChange(e, 'remark2')}
                                            onBlur={(e) => {props.fncBookingParent(booking)}}
                                            /> */}
                                        <InputValid 
                                            type="text"
                                            bsSize="sm"
                                            name="remark2"
                                            id="remark2"
                                            placeholder=""
                                            maxLength="70"
                                            value={booking.remark2?booking.remark2:''}
                                            onChange={(e)=>fncOnChange(e, 'remark2')}
                                            onBlur={fncBookingParent}
                                            validtype="text" 
                                            required={false}
                                            feedid="booking"
                                        />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            {/* <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Status</Label></Col>
                                        <Col>
                                        <Input type="select" name="status_cus" id="status_cus" placeholder=""
                                            bsSize="sm"
                                            className="pt-0 pb-0"
                                            value={booking.status_cus?booking.status_cus:'NO'}
                                            readOnly>
                                            <option value="NO">현재상태</option>
                                            <option value="S0">저장</option>
                                            <option value="S9">전송</option>
                                            <option value="S4">정정전송</option>
                                            <option value="S1">취소전송</option>
                                            <option value="BC">승인</option>
                                            <option value="RJ">거절</option>
                                            <option value="CC">취소승인</option>
                                            <option value="RC">승인취소</option>
                                        </Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col> */}
                            <Col xl="12" lg="12" md="12">
                                <FormGroup className="mb-1">
                                    <Row>
                                        <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Send Date</Label></Col>
                                        <Col>
                                        <Input type="text" name="send_date" id="send_date" placeholder=""
                                            bsSize="sm"
                                            defaultValue={booking.send_date?booking.send_date:''}
                                            readOnly/>
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
    <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
        <ModalHeader toggle={toggle}>BOOKING</ModalHeader>
            <ModalBody className={clsNm}>
                <CardBody className="pt-2 pb-2 bg-white">
                    <BookingWdfc
                        booking={booking}
                        fncOnBlurBooking={fncOnBlurBooking}
                        serviceList={serviceList}
                        openType={"CARD"}
                        // fncOpenType={fncOpenType}
                        {...props}
                        />
                </CardBody>
            </ModalBody>
        <ModalFooter>
            {/* <Button color="primary" onClick={insertBooking}>New</Button>{' '} */}
            {/* <Button color="primary" onClick={updateBooking}>Save</Button>{' '} */}
            <Button color="primary" onClick={toggle}>Apply</Button>{' '}
            <Button color="secondary" onClick={fncCacelModal}>Cancel</Button>
        </ModalFooter>
    </Modal>
    </>
    );
}

export default BookingCardWdfc;