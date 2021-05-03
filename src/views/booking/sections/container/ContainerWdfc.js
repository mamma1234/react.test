/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormFeedback, CardHeader, Collapse,FormGroup,Label,Input, Card,
    InputGroupAddon, InputGroupText, InputGroup, CardBody } from "reactstrap";
import ReactDatetime from "react-datetime";
import {SpecialWdfc} from './SpecialWdfc';
import axios from 'axios';
import Moment from 'moment';
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";


const ContainerWdfc = (props) => {
    const [index, setIndex] = useState('0');
    const [openSpecial, setOpenSpecial] = useState(false);
    const toggleSpecial = () => setOpenSpecial(!openSpecial);
    // Container 
    const [container, setContainer] = useState({});
    const [containerSpecialList, setContainerSpecialList] = useState([]);
    // Container Bookmark List  
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Special
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    // OPEN_TYPE CARD, BOOK
    const [openType, setOpenType] = useState("");
    const {dangerTrue} = props;

    useEffect(() => {

    },[]);
    
    useEffect(() => {
        setContainer(props.container);
        setIndex(props.index);
        setContainerSpecialList(props.containerSpecialList);
        setSpecialBookmarkList(props.specialBookmarkList);
        setOpenType(props.openType);
        setContainerBookmarkList( props.containerBookmarkList);

        // if( "KRINC" === props.booking.sch_pol && "CNTAO" === props.booking.sch_pod ) {
        //     setDgYn(true);
        // } else {
        //     setDgYn(false);
        //     // setContainerSpecialList([{'key':1, 'cntr_seq':1}]);
        //     // props.fncOnBlurSpecialList([{'key':1, 'cntr_seq':1}]);
        // }
    },[props]);

    useEffect(()=>{
        // if( dangerTrue === false ) {
        //     containerSpecialList[index] = {'key':index, 'cntr_seq':container.cntr_seq};
        //     setContainerSpecialList([...containerSpecialList]);
        //     props.fncOnBlurSpecialList([...containerSpecialList]);
        // }
    },[dangerTrue]);

    const onAddSpecial=()=>{
        setContainerSpecialList([...containerSpecialList,{'key':2, 'cntr_seq':index+1}]);
        props.fncOnBlurSpecialList([...containerSpecialList,{'key':2, 'cntr_seq':index+1}]);
    }

    // Container 자식 부모 
    const fncOnBlur=(container)=>{
        setContainer(container);
        props.fncOnBlurContainer( index, container);
    }
    // Special 자식 부모 처리
    const fncOnBlurSpecial=(index, special)=>{
        containerSpecialList[index] = special;
        setContainerSpecialList([...containerSpecialList]);
        props.fncOnBlurSpecialList([...containerSpecialList]);
    }

    // 콤보박스에서 Special Bookmark 선택한 경우
    const fncSelectSpecialList=(e, i, cntr_seq)=>{
        // Special Bookmark 정보에 선택한 정보를 입력한다.
        containerSpecialList.map((element, key)=>{
            // Special Bookmark 동일한 콤보박스 위치를 찾는다.
            if( key == i ) {
                // Special Bookmark 목록을 뒤져서
                specialBookmarkList.map(( row, i )=> {
                    // 어느걸 선택했는지를 찾는다.
                    if( e.target.value == row.container_special_bookmark_seq ) {
                        // 찾은 row를 SpecialList 정보에 넣는다.
                        row.cntr_seq = cntr_seq;
                        containerSpecialList[key] = row;
                    } 
                });
                // 해당 정보를 Relation에 입력한다
                setContainerSpecialList([...containerSpecialList]);
                props.fncOnBlurSpecialList([...containerSpecialList]);
            }
        });
    }
    const onDelContainer = ()=>{
        props.onDelContainer(index);
    }
    const onDelSpecial=(special)=>{
        props.onDelSpecial(special);
    }
  return (
    <>
        <Col>
            <Card className="no-transition" style={{border:'1px solid silver'}}>
                <CardHeader className="pt-1 pb-1">
                    <Row>
                    <Col className="col-3">
                        <Label className="mb-0">Container</Label>
                        <Input type="select"
                            // style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                            onChange={(e) => {
                                props.fncSelectContainerList(e, index)
                            }}
                            bsSize={("MAIN"===openType)?'sm':null}
                            className={("MAIN"===openType)?"pt-0 pb-0":null}
                            value={container.container_bookmark_seq?container.container_bookmark_seq:'0'}>
                            <option key={0} value={'0'}>
                                선택
                            </option>
                            {(containerBookmarkList.length>0)?containerBookmarkList.map((row,i)=>{
                                return(
                                    <option key={i} value={row.container_bookmark_seq}>
                                        {row.container_bookmark_name}
                                    </option>
                                )
                            })
                            :<></>}
                        </Input>
                    </Col>
                    <Col>
                        <button
                            className="close pt-3"
                            type="button"
                            onClick={() => onDelContainer()}
                            >×</button>
                    </Col>
                    </Row>
                </CardHeader>
                <CardBody className="pt-0 pb-0">
                    <ContainerForm
                        container={container}
                        fncOnBlur={fncOnBlur}
                        openType={openType}
                        booking={props.booking}/>
                
                {/* <hr className="border-secondary"/> */}
                <Row>
                    <Col xl="12" lg="12">
                    {containerSpecialList.map((element, key)=>{
                        // Special 의 cntr_seq를 확인한다.
                        if( element.cntr_seq ) {
                            
                        } else {
                            // Special의 cntr_seq 없다면 현재 정보로 입력해준다.
                            element.cntr_seq = container.cntr_seq;
                        }

                        // Container와 Special 연결고리 cntr_seq로 정의한다.
                        // console.log( "SPECIAL CNT >>" , element.cntr_seq,container.cntr_seq )
                        if( element.cntr_seq == container.cntr_seq ) {
                            // console.log("SPECIAL  : ",dangerTrue, index)
                            return (
                                <Collapse isOpen={dangerTrue} key={index}>
                                <Row>
                                    <Col xl="4" lg="4">
                                    <FormGroup>
                                        <Label className="mb-0">SPECIAL</Label>
                                        <Input type="select" key={key}
                                            // style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                            onChange={(e) => {
                                                fncSelectSpecialList(e, key, container.cntr_seq)
                                            }}
                                            bsSize={("MAIN"===openType)?'sm':null}
                                            className={("MAIN"===openType)?"pt-0 pb-0":null}
                                            value={element.container_special_bookmark_seq?element.container_special_bookmark_seq:'0'}>
                                            <option key={0} value={'0'}>
                                                선택
                                            </option>
                                            {(specialBookmarkList.length>0)?specialBookmarkList.map((row,i)=>{
                                                return(
                                                    <option key={i} value={row.container_special_bookmark_seq}>
                                                        {row.container_special_bookmark_name}
                                                    </option>
                                                )
                                            })
                                            :<></>}
                                        </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xl="8" lg="8">
                                        <SpecialWdfc
                                            key={key}
                                            index={key}
                                            special={element}
                                            fncOnBlurSpecial={fncOnBlurSpecial}
                                            onDelSpecial={onDelSpecial}
                                            openType={openType}
                                        />
                                    </Col>
                                </Row>
                                </Collapse>
                            )
                        }
                    })}
                    </Col>
                </Row>
                </CardBody>
            </Card>
        </Col>
    </>
    );
}

const ContainerForm = (props) => {
    
    const [container, setContainer] = useState({});
    // CODE 조회 line_code_cntr_sztp
    const [lineCodeCntrSztp, setLineCodeCntrSztp] = useState([]);
    // CODE 조회 line_code_vessel_pickup
    const [lineCodeVesselPickup, setLineCodeVesselPickup] = useState([]);
    // openType CARD, BOOK
    const [openType, setOpenType] = useState("");
    const [cntrTypeReefer, setCntrTypeReefer] = useState( false );

    useEffect(() => {
        // Cargo Type 및 Pack Type 조회
        let params = {
            line_code: 'WDFC'
        }
        selectLineCodeCntrSztp(params);
    },[]);

    useEffect(() => {
      setContainer(props.container);
      setOpenType(props.openType);
    },[props]);
    
    useEffect(()=>{
        // console.log(props.booking);
        // Cargo Type 및 Pack Type 조회
        if( props.booking.sch_vessel_name ) {
            let params = {
                line_code: props.booking.line_code,
                sch_vessel_name: props.booking.sch_vessel_name
            }
            selectLineCodeVesselPickup(params);
        }
    }, [props.booking.sch_vessel_name]);
    
    // Container Size Type 목록조회
    const selectLineCodeCntrSztp = (params) => {
        axios.post(
            "/shipper/selectLineCodeCntrSztp"
            ,{ params }
            ,{}
        ).then(res=>{
            setLineCodeCntrSztp(res.data);
            // if( !container.cntr_code ) {
            //     setContainer({...container
            //         , ['cntr_code']:res.data[0].cntr_code
            //         , ['cntr_length']:res.data[0].cmt_length
            //         , ['cntr_height']:res.data[0].cmt_height
            //         , ['cntr_width']:res.data[0].cmt_width});
            // }
        });
    }

    // Container VESSEL PICKUP CY 목록조회
    const selectLineCodeVesselPickup = (params) => {
        axios.post(
            "/shipper/selectLineCodeVesselPickup"
            ,{ params }
            ,{}
        ).then(res=>{
            setLineCodeVesselPickup(res.data);
            // pickup cy 조회의 경우 Vessel 정보가 변경될때 같이 변경되어야 한다.
            // Vessel 정보가 변경될 경우 기존 코드값과 일치하는게 없으면
            // cntr_pick_up_cy_code 초기화
            if( res.data.length > 0 && container.cntr_pick_up_cy_code ) {
                
                let row = res.data.find( function( item ) {
                    return item.pickup_cy_code === container.cntr_pick_up_cy_code;
                });
                if( !row ) {
                    setContainer({...container, ['cntr_pick_up_cy_code']:null});
                    props.fncOnBlur({...container
                        , ['cntr_pick_up_cy_code']:null
                    });
                }
            }
        });
    }

    // 수정된 내용은 Cargo 저장
    const fncOnChangeSelect = ( e, key ) => {
        // console.log("ㅋㅋㅋㅋㅋㅋ : ")
        // e.preventDefault();
        if ( 'cntr_code' === key ) {
            let code = e.target.value;
            // lineCodeCntrSztp.map((row,key)=>{
            //     if( code == row.cntr_code ) {
            //         let length = row.cmt_length;
            //         let height = row.cmt_height;
            //         let width = row.cmt_width;
            //         setContainer({...container
            //             , ['cntr_code']:code
            //             // , ['cntr_length']:length
            //             // , ['cntr_height']:height
            //             // , ['cntr_width']:width
            //         });
            //         props.fncOnBlur({...container
            //             , ['cntr_code']:code
            //             // , ['cntr_length']:length
            //             // , ['cntr_height']:height
            //             // , ['cntr_width']:width
            //         });
            //     }
            // });

            // WDFC 인 경우 Size Type Reefer 인 경우 Frozen Tmp 입력하도록
            // console.log( props.booking.line_code, code, ("WDFC" === props.booking.line_cde 
            // && (code === '22RE' || code === '42RE' || code === '45RE')))
            if( "WDFC" === props.booking.line_code  && (code.indexOf("RE") !== -1 ) ) {
                setCntrTypeReefer( true );
                
                setContainer({...container, ['cntr_code']:code});
                props.fncOnBlur( {...container, ['cntr_code']:code} );
            } else {
                setCntrTypeReefer( false );
                // if( container.cntr_frozen_tmp) {
                    setContainer({...container, ['cntr_frozen_tmp']:null, ['cntr_frozen_tmp_unit']:null
                    , ['cntr_code']:code});
                    props.fncOnBlur( {...container, ['cntr_frozen_tmp']:null, ['cntr_frozen_tmp_unit']:null
                    , ['cntr_code']:code} );
                // }
                }
        }
        if ( 'cntr_pick_up_cy_code' === key ) {
            
            // own_line_code_vessel_pickup 테이블 정보로  세팅해준다.
            // cntr_pick_up_cy_code, cntr_pick_up_cy_name1, cntr_pick_up_cy_address1
            let row = lineCodeVesselPickup.find( function( item ) {
                return item.pickup_cy_code === e.target.value;
            });
            if( row ) {
                setContainer({...container
                    , ['cntr_pick_up_cy_code']:row.pickup_cy_code
                    , ['cntr_pick_up_cy_name1']:row.pickup_cy_name
                    , ['cntr_pick_up_cy_name2']:null
                    , ['cntr_pick_up_cy_address1']:row.pickup_cy_addr
                    , ['cntr_pick_up_cy_address2']:null
                    , ['cntr_pick_up_cy_address3']:null
                    , ['cntr_pick_up_cy_address4']:null
                    , ['cntr_pick_up_cy_address5']:null
                });
                props.fncOnBlur({...container
                    , ['cntr_pick_up_cy_code']:row.pickup_cy_code
                    , ['cntr_pick_up_cy_name1']:row.pickup_cy_name
                    , ['cntr_pick_up_cy_name2']:null
                    , ['cntr_pick_up_cy_address1']:row.pickup_cy_addr
                    , ['cntr_pick_up_cy_address2']:null
                    , ['cntr_pick_up_cy_address3']:null
                    , ['cntr_pick_up_cy_address4']:null
                    , ['cntr_pick_up_cy_address5']:null
                });
            }
        } else {
            setContainer({...container, [key]:e.target.value});
            props.fncOnBlur( {...container, [key]:e.target.value} );
        }
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( container );
    }
    // 수정된 내용은 container 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setContainer({...container, [key]:e.target.value.toUpperCase()});
    }
    // date type 처리
    const fncOnChangeDate = (value, key) => {
        // Object > Date 객체로변환
        let date = new Date(value);
        // Date 객체에서 정보 추출
        let yyyy=date.getFullYear();
        let mon = date.getMonth()+1;
        let day = date.getDate();
        mon = mon > 9 ? mon : "0" + mon;
        day = day > 9 ? day : "0" + day;
        setContainer({...container, [key]:yyyy+mon+day});
        props.fncOnBlur( {...container, [key]:yyyy+mon+day} );
    }
    return (
      <>
        {("BOOK" === openType)?<Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark Name</Label>
                    {/* <Input type="text" name="container_bookmark_name" id="container_bookmark_name"
                        maxLength="50"
                        value={container.container_bookmark_name?container.container_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'container_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={container.container_bookmark_name?false:('BOOK'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                    <InputValid 
                        type="text"
                        name="container_bookmark_name"
                        id="container_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={container.container_bookmark_name?container.container_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'container_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false} 
                    />
                </FormGroup>
            </Col>
        </Row>:<></>}
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Size / Type</Label>
                    <Input type="select" name="cntr_code" id="cntr_code"
                        placeholder=""
                        bsSize={("MAIN"===openType)?'sm':null}
                        className={("MAIN"===openType)?"pt-0 pb-0":null}
                        value={container.cntr_code?container.cntr_code:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_code');
                        }}
                        // onBlur={(e)=>fncOnBlur(e)}
                        invalid={container.cntr_code?false:('CARD'===openType||'MAIN'===openType?true:false)}
                        >
                        <option key={0} value={'0'}>선택</option>
                        {(lineCodeCntrSztp.length>0)?lineCodeCntrSztp.map((element,key)=>{
                            return(
                                <option key={key} value={element.cntr_code}>
                                    {element.cntr_code_name}
                                </option>
                            )
                        }):<></>}
                    </Input>
                    <FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback>
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Qty</Label>
                    {/* <Input type="text" placeholder=""
                        maxLength="4"
                        bsSize={("MAIN"===openType)?'sm':null}
                        value={container.cntr_qty?container.cntr_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_qty')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={container.cntr_qty?false:('CARD'===openType||'MAIN'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                    <InputValid 
                        type="text"
                        name="cntr_qty"
                        id="cntr_qty"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="4"
                        value={container.cntr_qty?container.cntr_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_qty')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'CARD'===openType||'MAIN'===openType?true:false} 
                        feedid="container"
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">SOC</Label>
                    <Input type="select" placeholder=""
                        bsSize={("MAIN"===openType)?'sm':null}
                        className={("MAIN"===openType)?"pt-0 pb-0":null}
                        value={container.cntr_soc_yn?container.cntr_soc_yn:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_soc_yn');
                        }}>
                        <option key="1">선택</option>
                        <option key="2">Y</option>
                        <option key="3">N</option>
                    </Input>
                </FormGroup>
            </Col>
        </Row>

        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Pick Up CY</Label>
                    <Input type="select" name="cntr_pick_up_cy_code" id="cntr_pick_up_cy_code"
                        placeholder=""
                        bsSize={("MAIN"===openType)?'sm':null}
                        className={("MAIN"===openType)?"pt-0 pb-0":null}
                        value={container.cntr_pick_up_cy_code?container.cntr_pick_up_cy_code:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cntr_pick_up_cy_code');
                        }}
                        // onBlur={(e)=>fncOnBlur(e)}
                        invalid={container.cntr_pick_up_cy_code?false:('CARD'===openType||'MAIN'===openType?true:false)}
                        >
                        <option key={0} value={'0'}>선택</option>
                        {(lineCodeVesselPickup.length>0)?lineCodeVesselPickup.map((element,key)=>{
                            return(
                                <option key={key} value={element.pickup_cy_code}>
                                    {element.pickup_cy_name}
                                </option>
                            )
                        }):<></>}
                    </Input>
                    <FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback>
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Pick Up Date</Label>
                    <InputGroup className="date" id="cntr_pick_up_cy_date">
                        <ReactDatetime
                            inputProps={{
                                className: "form-control",
                                placeholder: "Datetime Picker Here",
                            }}
                            dateFormat="YYYY-MM-DD"
                            timeFormat={false}
                            bsSize={("MAIN"===openType)?'sm':null}
                            value={container.cntr_pick_up_cy_date?Moment(container.cntr_pick_up_cy_date).format('YYYY-MM-DD'):''}
                            onChange={(e)=>fncOnChangeDate(e,'cntr_pick_up_cy_date')}
                            // invalid={container.cntr_pick_up_cy_date?false:('CARD'===openType?true:false)}
                            />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <span className="glyphicon glyphicon-calendar">
                                <i className="fa fa-calendar" />
                                </span>
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                        <Input hidden id="temp_cntr_pick_up_cy_date"
                        invalid={container.cntr_pick_up_cy_date?false:('CARD'===openType||'MAIN'===openType?true:false)}
                        />
                        <FormFeedback feedid="container">{validation.REQ_MSG}</FormFeedback>
                </FormGroup>
            </Col>
            {/* <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">CY Name</Label>
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_name1"
                        id="cntr_pick_up_cy_name1"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        value={container.cntr_pick_up_cy_name1?container.cntr_pick_up_cy_name1:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_name1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                </FormGroup>
            </Col> */}
            {/* <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0"></Label>
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_name2"
                        id="cntr_pick_up_cy_name2"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        value={container.cntr_pick_up_cy_name2?container.cntr_pick_up_cy_name2:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_name2')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                </FormGroup>
            </Col> */}
        </Row>
        <Row>
            <Col xl="4" lg="4" md="4">
                <Collapse isOpen={cntrTypeReefer}>
                    <FormGroup>
                        <Label className="mb-0">Frozen Tmp</Label>
                        <InputValid 
                            type="number"
                            name="cntr_frozen_tmp"
                            id="cntr_frozen_tmp"
                            bsSize={("MAIN"===openType)?'sm':null}
                            placeholder=""
                            maxLength="15"
                            value={container.cntr_frozen_tmp?container.cntr_frozen_tmp:''}
                            onChange={(e)=>fncOnChange(e, 'cntr_frozen_tmp')}
                            onBlur={(e) => {fncOnBlur(e)}}
                            validtype="text"
                            required={false} 
                            feedid="container"
                            inputgrouptext="&#8451;"
                        />
                    </FormGroup>
                </Collapse>
            </Col>
            {/* <Col xl="3" lg="3" md="6">
                <FormGroup>
                    <Label className="mb-0">Frozen Unit</Label>
                    <InputValid 
                        type="text"
                        name="cntr_frozen_tmp_unit"
                        id="cntr_frozen_tmp_unit"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="3"
                        value={container.cntr_frozen_tmp_unit?container.cntr_frozen_tmp_unit:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_frozen_tmp_unit')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                </FormGroup>
            </Col> */}
        </Row>

        {/* <Row>
            <Col xl="12" lg="12" md="12">
                <FormGroup className="mb-1">
                    <Label className="mb-0">Pick Up Cy Address</Label>
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_address1"
                        id="cntr_pick_up_cy_address1"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                        value={container.cntr_pick_up_cy_address1?container.cntr_pick_up_cy_address1:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_address1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_address2"
                        id="cntr_pick_up_cy_address2"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                        value={container.cntr_pick_up_cy_address2?container.cntr_pick_up_cy_address2:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_address2')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_address3"
                        id="cntr_pick_up_cy_address3"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                        value={container.cntr_pick_up_cy_address3?container.cntr_pick_up_cy_address3:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_address3')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_address4"
                        id="cntr_pick_up_cy_address4"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                        value={container.cntr_pick_up_cy_address4?container.cntr_pick_up_cy_address4:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_address4')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                    <InputValid 
                        type="text"
                        name="cntr_pick_up_cy_address5"
                        id="cntr_pick_up_cy_address5"
                        bsSize={("MAIN"===openType)?'sm':null}
                        placeholder=""
                        maxLength="35"
                        style={{borderWidth:'0 0 1px 0',borderRadius:'0',padding:'0'}}
                        value={container.cntr_pick_up_cy_address5?container.cntr_pick_up_cy_address5:''}
                        onChange={(e)=>fncOnChange(e, 'cntr_pick_up_cy_address5')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false}
                        feedid="container"
                    />
                </FormGroup>
            </Col>
        </Row> */}
      </>
    );
}

export {ContainerWdfc, ContainerForm};