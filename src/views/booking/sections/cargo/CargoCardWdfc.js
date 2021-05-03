/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button,Input, Card, FormGroup, Label} from "reactstrap";
import CargoWdfc from "./CargoWdfc.js";
import CargoBookmarkWdfc from "./CargoBookmarkWdfc.js";
import axios from "axios";
import Select from "react-select";
import GoodsWdfc from './GoodsWdfc.js';
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

const CargoCardWdfc = (props) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Cargo
    const [booking, setBooking] = useState({});
    // Cargo
    const [cargo, setCargo] = useState({});
    // Cargo Bookmark 목록
    const [cargoBookmarkList, setCargoBookmarkList] = useState([]);
    // Goods Bookmark 목록
    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    // Goods 입력
    const [goodsRelationList, setGoodsRelationList] = useState([]);
    // 콤보박스
    const [cargoTypeList, setCargoTypeList] = useState([]);
    const [cargoPackTypeList, setCargoPackTypeList] = useState([]);
    const {user, dangerTrue} = props;

    useEffect(() => {
        if( user && user.user_no ) {
            selectBookingCargoGoodsBookmark();
            // Cargo Type 및 Pack Type 조회
            let params = {
                line_code: 'WDFC'
            }
            selectLineCodeCargoType(params);
            selectLineCodeCargoPackType(params);
        }
    },[user]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    // 20210305 Card 내에서의 저장행위는 중지 하도록 한다.
    useEffect(() => {
        // 초기 Seq와 현재 seq 다른 경우
        // console.log(cargo.init_cargo_bookmark_seq, cargo.cargo_bookmark_seq)
        // Cargo 정보는 shp_bkg_cargo 테이블로 관리함.
        // init_cargo_seq 없는 경우 신규 입력.
        // if( !cargo.cargo_seq && ( "Y" === cargo.cargo_selected_yn )) {
        //     // console.log("계속 호출됨")
        //     insertCargoOfBooking();
        // } else {
        //     if( cargo.cargo_seq && ( "Y" === cargo.cargo_selected_yn )) {
        //         // Cargo Bookmark로 booking의 Cargo 입력하기
        //         updateCargoOfBooking();
        //     }
        // }
        // props.fncCargoParent(booking);
    },[booking]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        if( props.booking.bkg_no ) {
            // console.log(props.booking.bookmark_yn, props.booking.bookmark_seq)
            // 전체북마크로 수정하는 경우
            if( "Y" === props.booking.bookmark_yn && props.booking.bookmark_seq ) {
                if( props.booking.cargo_bookmark_seq ) {
                    setBooking(props.booking);
                    setCargo(props.booking);
                    props.fncCargoParent(props.booking);
                    selectBookingCargoBookmarkRelation( props.booking );
                } else {
                    setCargo({});
                    props.fncCargoParent({});
                    setGoodsRelationList([]);
                    props.fncGoodsParent([]);
                }
            } else {
                if( props.booking.bkg_no != booking.bkg_no ) {
                    selectCargoOfBooking(props.booking);
                    setBooking(props.booking);
                }
            }
        }
    },[props.booking]);
    useEffect(()=>{
        setCargoBookmarkList(props.cargoBookmarkList);
    },[props.cargoBookmarkList]);

    useEffect(()=>{
        // props.fncGoodsParent(goodsRelationList);
    }, [goodsRelationList]);

    // Cargo Bookmark 선택
    const fncSelectCargo=(e)=>{
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            cargoBookmarkList.map((element, key)=>{
            if( e.value == element.cargo_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                let cargo_type_name = '';
                cargoTypeList.map((row, i ) => {
                    if( element.cargo_type == row.cargo_type ) {
                        cargo_type_name = "["+row.cargo_type_kr_desc+"]"+row.cargo_type_desc;
                    }
                });
                let cargo_pack_type_name = '';
                cargoPackTypeList.map((row, i ) => {
                    if( element.cargo_pack_type == row.cargo_pack_type ) {
                        cargo_pack_type_name = row.cargo_pack_type_desc;
                    }
                });



                setCargo({...cargo
                    ,'cargo_bookmark_seq':element.cargo_bookmark_seq
                    ,'cargo_bookmark_name':element.cargo_bookmark_name
                    ,'cargo_name':element.cargo_name
                    ,'cargo_hs_code':element.cargo_hs_code
                    ,'cargo_pack_qty':element.cargo_pack_qty
                    ,'cargo_pack_type':element.cargo_pack_type
                    ,'cargo_pack_type_name' :cargo_pack_type_name
                    ,'cargo_remark':element.cargo_remark
                    ,'cargo_total_volume':element.cargo_total_volume
                    ,'cargo_total_weight':element.cargo_total_weight
                    ,'cargo_type':element.cargo_type
                    ,'cargo_type_name' :cargo_type_name
                    ,'cargo_weight':element.cargo_weight
                    // ,'cargo_selected_yn':'Y'
                });

                props.fncCargoParent({...cargo
                    ,'cargo_bookmark_seq':element.cargo_bookmark_seq
                    ,'cargo_bookmark_name':element.cargo_bookmark_name
                    ,'cargo_name':element.cargo_name
                    ,'cargo_hs_code':element.cargo_hs_code
                    ,'cargo_pack_qty':element.cargo_pack_qty
                    ,'cargo_pack_type':element.cargo_pack_type
                    ,'cargo_pack_type_name' :cargo_pack_type_name
                    ,'cargo_remark':element.cargo_remark
                    ,'cargo_total_volume':element.cargo_total_volume
                    ,'cargo_total_weight':element.cargo_total_weight
                    ,'cargo_type':element.cargo_type
                    ,'cargo_type_name' :cargo_type_name
                    ,'cargo_weight':element.cargo_weight
                    // ,'cargo_selected_yn':'Y'
                });

                selectBookingCargoBookmarkRelation( element );
                
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // CargoOfBooking
    const selectCargoGoodsOfBooking = (booking) => {
        axios.post(
            "/shipper/selectCargoGoodsOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => {
                setGoodsRelationList(res.data);
                props.fncGoodsParent(res.data);
            }
        );
    }

    // CargoOfBooking
    const selectCargoOfBooking = ( booking ) => {
        axios.post(
            "/shipper/selectCargoOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => {
                setCargo(res.data[0]);
                props.fncCargoParent(res.data[0]);
                selectCargoGoodsOfBooking(res.data[0]);
            }
        );
    }

    // Cargo Bookmark 조회
    const selectBookingCargoGoodsBookmark = () => {
        axios.post(
            "/shipper/selectBookingCargoGoodsBookmark"
            ,{ user_no: user?user.user_no:null }
            ,{}
        ).then(
            res => {
                setGoodsBookmarkList(res.data);
            }
        );
    }

    const insertCargoOfBooking = () => {
        axios.post(
            "/shipper/insertCargoOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
                , goodsRelationList
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setCargo({...booking, 'cargo_seq':res.data.rows[0].cargo_seq});
                // onDismiss("success", "정상 처리되었습니다.");
                selectCargoGoodsOfBooking(booking);
            }
        );
    }
    const updateCargoOfBooking = () => {
        axios.post(
            "/shipper/updateCargoOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
                , goodsRelationList
            }
            ,{}
        ).then(
            
        ).then(
            res => {
                setCargo({...booking, 'cargo_selected_yn':'N'});
                // onDismiss("success", "정상 처리되었습니다.");
                selectCargoGoodsOfBooking(booking);
            }
        );
    }
    // Cargo Type 목록조회
    const selectLineCodeCargoType = (params) => {
        axios.post(
            "/shipper/selectLineCodeCargoType"
            ,{ params }
            ,{}
        ).then(res=>{
            setCargoTypeList(res.data);
            if( !cargo.cargo_type ) {
                setCargo({...booking, ['cargo_type']:res.data[0].cargo_type});
            }
        });
    }
    // Cargo Pack Type 목록조회
    const selectLineCodeCargoPackType = (params) => {
        axios.post(
            "/shipper/selectLineCodeCargoPackType"
            ,{ params }
            ,{}
        ).then(res=>{
            setCargoPackTypeList(res.data);
            if( !cargo.cargo_pack_type ) {
                setCargo({...booking, ['cargo_pack_type']:res.data[0].cargo_pack_type});
            }
        });
    }

    // Cargo Bookmark 조회
    const selectBookingCargoBookmarkRelation = ( cargo ) => {
        axios.post(
            "/shipper/selectBookingCargoBookmarkRelation"
            ,{ 
            user_no: user?user.user_no:null,
            cargo
        }
            ,{}
        ).then(
            res => {
                setGoodsRelationList(res.data);
                props.fncGoodsParent(res.data);
            }
        );
    }

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('');
        setOpen(!open);
    }

    const fncOnBlur = (cargo) => {
        setCargo(cargo);
        props.fncCargoParent( cargo );
    }
    const fncOnBlurGoodsRelation = (goodsRelationList) => {
        props.fncCargoParent( cargo );
        setGoodsRelationList(goodsRelationList);
        props.fncGoodsParent(goodsRelationList);
    }
    // 수정된 내용은 cargo 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setCargo({...cargo, [key]:e.target.value.toUpperCase()});
    }
    // 수정된 내용은 Cargo 저장
    const fncOnChangeSelect = ( e, key ) => {

        // e.preventDefault();
        if( 'cargo_type' === key ) {
            if( "WDFC"=== booking.line_code && ("3" === e.target.value || "4" === e.target.value) ) {
                props.onAlert("danger", "위험물 또는 OOG 부킹은 별도 문의 바랍니다.");
                return false;
            }
            // 20210426 DG 화물도 OOG 와 같이 별도로 문의
            // if( "WDFC"=== booking.line_code && "3" === e.target.value && false === dangerTrue ) {
            //     props.onAlert("danger", "위험물의 경우 인천(KRINC)->청도(CNTAO) 운행구간만 허용 됩니다.");
            //     return false;
            // }
            cargoTypeList.map((element, key ) => {
                if( e.target.value == element.cargo_type ) {
                    setCargo({...cargo, 'cargo_type':e.target.value, 'cargo_type_name':"["+element.cargo_type_kr_desc+"]"+element.cargo_type_desc});
                    props.fncCargoParent({...cargo, 'cargo_type':e.target.value, 'cargo_type_name':"["+element.cargo_type_kr_desc+"]"+element.cargo_type_desc});
                    // setBooking({...booking, ['sch_pol']:e.target.value , ['sch_pol_name']:element.port_name});
                }
            });
        }
        if( 'cargo_pack_type' === key ) {
            cargoPackTypeList.map((element, key ) => {
                if( e.target.value == element.cargo_pack_type ) {
                    setCargo({...cargo, 'cargo_pack_type':e.target.value, 'cargo_pack_type_name':element.cargo_pack_type_desc});
                    props.fncCargoParent({...cargo, 'cargo_type':e.target.value, 'cargo_type_name':"["+element.cargo_type_kr_desc+"]"+element.cargo_type_desc});
                    // setBooking({...booking, ['sch_pol']:e.target.value , ['sch_pol_name']:element.port_name});
                }
            });
        }
    }
  return (
    <>
        <Row id="Cargo">
            <Col xl="12" lg="12">
                <Card style={{zIndex:'65'}}>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CARGO
                                <Button className="pl-1" color="link" id="lineview" onClick={toggle.bind(this, 'S')}><i className="fa fa-pencil-square-o fa-2x"/></Button>
                                <UncontrolledTooltip delay={0} target="lineview">Input</UncontrolledTooltip>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="col-10 pr-0">
                                        <Select
                                            className="react-select react-select-primary"
                                            classNamePrefix="react-select"
                                            name="cargoBookmark"
                                            value={{
                                                value:cargo.cargo_bookmark_seq?cargo.cargo_bookmark_seq:'',
                                                label:cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:'선택'
                                            }}
                                            onChange={(e)=>fncSelectCargo(e?e:null)}
                                            options={cargoBookmarkList}
                                            placeholder={"선택"}
                                        />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <CargoBookmarkWdfc
                                            cargoBookmarkList={cargoBookmarkList}
                                            goodsBookmarkList={goodsBookmarkList}
                                            selectBookingCargoBookmark={props.selectBookingCargoBookmark}
                                            selectBookingCargoGoodsBookmark={selectBookingCargoGoodsBookmark}
                                            cargoTypeList={cargoTypeList}
                                            cargoPackTypeList={cargoPackTypeList}
                                            onAlert={props.onAlert}
                                            {...props}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Collapse isOpen={coll}>
                            <hr className="mt-0"/>
                            <Row>
                                <Col xl="6" lg="6" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Type</Label></Col>
                                            <Col>
                                            <Input type="select" name="cargo_type" id="cargo_type"
                                                bsSize="sm"
                                                className="pt-0 pb-0"
                                                placeholder=""
                                                maxLength="2"
                                                value={cargo.cargo_type?cargo.cargo_type:''}
                                                onChange={(e) => {
                                                    fncOnChangeSelect(e, 'cargo_type');
                                                }}
                                                onBlur={() => {props.fncCargoParent(cargo)}}
                                                // invalid={cargo.cargo_type?false:true}
                                                >
                                                <option key={0} value={'0'}>
                                                    선택
                                                </option>
                                                {(cargoTypeList.length>0)?cargoTypeList.map((element,key)=>{
                                                    
                                                    return(
                                                        <option key={key} value={element.cargo_type}>
                                                            {"["+element.cargo_type_kr_desc+"]"+element.cargo_type_desc}
                                                        </option>
                                                    )
                                                }):<></>}
                                            </Input>
                                            {/* <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="6" lg="6" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">PackType</Label></Col>
                                            <Col>
                                            <Input type="select" name="cargo_pack_type" id="cargo_pack_type"
                                                bsSize="sm"
                                                className="pt-0 pb-0"
                                                placeholder=""
                                                value={cargo.cargo_pack_type?cargo.cargo_pack_type:''}
                                                onBlur={() => {props.fncCargoParent(cargo)}}
                                                onChange={(e) => {
                                                    fncOnChangeSelect(e, 'cargo_pack_type');
                                                }}
                                                // invalid={cargo.cargo_pack_type?false:true}
                                                >
                                                <option key={0} value={'0'}>
                                                    선택
                                                </option>
                                                {(cargoPackTypeList.length>0)?cargoPackTypeList.map((element,key)=>{
                                                    return(
                                                        <option key={key} value={element.cargo_pack_type}>
                                                            {element.cargo_pack_type_desc}
                                                        </option>
                                                    )
                                                }):<></>}
                                            </Input>
                                            {/* <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="6" lg="6" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">PackQty</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="cargo_pack_qty" id="cargo_pack_qty"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="4"
                                                value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
                                                onChange={(e)=>fncOnChange(e, 'cargo_pack_qty')}
                                                onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                /> */}
                                            <InputValid 
                                                type="text"
                                                name="cargo_pack_qty"
                                                id="cargo_pack_qty"
                                                placeholder=""
                                                maxLength="4"
                                                bsSize="sm"
                                                value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
                                                onChange={(e)=>fncOnChange(e, 'cargo_pack_qty')}
                                                onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="cargo"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="6" lg="6" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Weight</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="cargo_weight" id="cargo_weight"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="10"
                                                value={cargo.cargo_weight?cargo.cargo_weight:''}
                                                onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                                                onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                /> */}
                                            <InputValid 
                                                type="number"
                                                name="cargo_weight"
                                                id="cargo_weight"
                                                placeholder=""
                                                maxLength="10"
                                                bsSize="sm"
                                                value={cargo.cargo_weight?cargo.cargo_weight:''}
                                                onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                                                onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="cargo"
                                                inputgrouptext="kg"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col xl="6" lg="6" md="12">
                                    <FormGroup className="mb-1">
                                        <Row>
                                            <Col className="pr-0 pt-1 col-2"><Label className="mb-0">Volume</Label></Col>
                                            <Col>
                                            {/* <Input type="text" name="cargo_total_volume" id="cargo_total_volume"
                                                bsSize="sm"
                                                placeholder=""
                                                maxLength="10"
                                                value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                                                onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                                                onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                /> */}
                                            <InputValid 
                                                type="number"
                                                name="cargo_total_volume"
                                                id="cargo_total_volume"
                                                placeholder=""
                                                maxLength="10"
                                                bsSize="sm"
                                                value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                                                onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                                                onBlur={(e) => {props.fncCargoParent(cargo)}}
                                                validtype="text"
                                                required={false} 
                                                feedid="cargo"
                                                inputgrouptext="CBM"
                                            />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr />
                            <GoodsWdfc
                                cargo={booking}
                                goodsBookmarkList={goodsBookmarkList}
                                goodsRelationList={goodsRelationList}
                                fncOnBlur={fncOnBlur}
                                fncOnBlurGoodsRelation={fncOnBlurGoodsRelation}
                                openType="MAIN"
                                {...props}/>
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
            <ModalHeader toggle={toggle}>Cargo</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody className="pt-2 pb-2 bg-white">
                        <CargoWdfc
                            cargo={cargo}
                            fncOnBlur={fncOnBlur}
                            openType={"CARD"}
                            cargoTypeList={cargoTypeList}
                            cargoPackTypeList={cargoPackTypeList}
                            {...props}/>
                        <hr className="border-secondary"/>
                        <GoodsWdfc
                            cargo={booking}
                            goodsBookmarkList={goodsBookmarkList}
                            goodsRelationList={goodsRelationList}
                            fncOnBlur={fncOnBlur}
                            fncOnBlurGoodsRelation={fncOnBlurGoodsRelation}
                            openType="CARD"
                            {...props}/>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={(e)=>updateCargoOfBooking()}>Save</Button>{' '} */}
                <Button color="primary" onClick={(e)=>toggle}>Apply</Button>{' '}
                {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
            </ModalFooter>
        </Modal>
    </>
    );
}

export default CargoCardWdfc;