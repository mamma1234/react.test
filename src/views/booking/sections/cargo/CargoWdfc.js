/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col,FormGroup,Label,InputGroup, FormFeedback, InputGroupAddon, InputGroupText} from "reactstrap";
import * as validation from 'components/common/validation.js';
import { invalid } from 'moment';
import Select from "react-select";
import InputValid from "components/CustomInput/InputValid.js";

const CargoWdfc = (props) => {

    const [cargo, setCargo] = useState({});
    const [cargoTypeList, setCargoTypeList] = useState([]);
    const [cargoPackTypeList, setCargoPackTypeList] = useState([]);
    const [openType, setOpenType] = useState("");
    const {dangerTrue} = props;
    useEffect(() => {
        
    },[]);

    useEffect(() => {
        // console.log("CARGO : ",props.cargo);
        setOpenType(props.openType);
        setCargoTypeList(props.cargoTypeList);
        setCargoPackTypeList(props.cargoPackTypeList);
        setCargo(props.cargo);
        console.log(cargo)
    },[props]);

    // 수정된 내용은 cargo 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setCargo({...cargo, [key]:e.target.value.toUpperCase()});
    }
    // 수정된 내용은 Cargo 저장
    const fncOnChangeSelect = ( e, key ) => {
        // console.log(e.target.value)
        // e.preventDefault();
        setCargo({...cargo, [key]:e.target.value});
        props.fncOnBlur( {...cargo, [key]:e.target.value} );
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( cargo );
    }

    const fncCargoType =(value)=> {
        console.log( props.booking.line_code, value)
        if( "WDFC"=== props.booking.line_code && "4" === value.cargo_type ) {
            props.onAlert("danger", "OOG 부킹은 별도 문의 바랍니다.");
            return false;
        }
        if( "WDFC"=== props.booking.line_code && "3" === value.cargo_type && false === dangerTrue ) {
            props.onAlert("danger", "위험물의 경우 인천(KRINC)->청도(CNTAO) 운행구간만 허용 됩니다.");
            return false;
        }
        setCargo({...cargo,'cargo_type':value.cargo_type,'cargo_type_name':value.label})
    }

  return (
    <>
        <Row>
            {(openType === "BOOK")?
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    {/* <Input type="text" name="cargo_bookmark_name" id="cargo_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={cargo.cargo_bookmark_name?false:('BOOK'===openType?true:false)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cargo_bookmark_name"
                        id="cargo_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'goods_desc1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            :<></>}
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Cargo Type</Label>
                        <Select
                            className="react-select react-select-primary"
                            classNamePrefix="react-select"
                            name="cargo_type"
                            value={{value:cargo.cargo_type?cargo.cargo_type:''
                                ,label:cargo.cargo_type_name}}
                            onChange={(value)=> fncCargoType(value)}
                            // onChange={(value)=>fncOnChangeSelect(value, 'sch_pol')}
                            options={cargoTypeList}
                            invalid={cargo.cargo_type?false:('CARGO'===openType?true:false)}
                            onBlur={(e)=>fncOnBlur(e)}
                            // placeholder={placeholder}
                            />
                    {/* <Input type="select" name="cargo_type" id="cargo_type"
                        placeholder="Y"
                        maxLength="2"
                        value={cargo.cargo_type?cargo.cargo_type:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cargo_type');
                        }}
                        invalid={cargo.cargo_type?false:('CARGO'===openType?true:false)}
                        >
                        {(cargoTypeList.length>0)?cargoTypeList.map((element,key)=>{
                            return(
                                <option key={key} value={element.cargo_type}>
                                    {"["+element.cargo_type_kr_desc+"]"+element.cargo_type_desc}
                                </option>
                            )
                        }):<></>}
                    </Input> */}
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Pack Qty</Label>
                    {/* <Input type="text" name="cargo_pack_qty" id="cargo_pack_qty"
                        placeholder=""
                        maxLength="4"
                        value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_pack_qty')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="cargo_pack_qty"
                        id="cargo_pack_qty"
                        placeholder=""
                        maxLength="4"
                        value={cargo.cargo_pack_qty?cargo.cargo_pack_qty:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_pack_qty')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Pack Type</Label>
                    <Select
                        className="react-select react-select-primary"
                        classNamePrefix="react-select"
                        name="cargo_pack_type"
                        value={{value:cargo.cargo_pack_type?cargo.cargo_pack_type:''
                            ,label:cargo.cargo_pack_type_name}}
                        onChange={(value)=>setCargo({...cargo,'cargo_pack_type':value.cargo_pack_type,'cargo_pack_type_name':value.cargo_pack_type_name})}
                        options={cargoPackTypeList}
                        onBlur={(e)=>fncOnBlur(e)}
                        // placeholder={placeholder}
                        />
                    {/* <Input type="select" name="cargo_pack_type" id="cargo_pack_type"
                        placeholder="Y"
                        value={cargo.cargo_pack_type?cargo.cargo_pack_type:''}
                        onChange={(e) => {
                            fncOnChangeSelect(e, 'cargo_pack_type');
                        }}
                        invalid={cargo.cargo_pack_type?false:('CARGO'===openType?true:false)}
                        >
                        {(cargoPackTypeList.length>0)?cargoPackTypeList.map((element,key)=>{
                            return(
                                <option key={key} value={element.cargo_pack_type}>
                                    {element.cargo_pack_type_desc}
                                </option>
                            )
                        }):<></>}
                    </Input> */}
                    {/* <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Cargo Weight</Label>
                    {/* <Input type="text" name="cargo_weight" id="cargo_weight"
                        placeholder=""
                        maxLength="10"
                        value={cargo.cargo_weight?cargo.cargo_weight:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={cargo.cargo_weight?false:('CARGO'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}
                    <InputValid 
                        type="number"
                        name="cargo_weight"
                        id="cargo_weight"
                        placeholder=""
                        maxLength="10"
                        value={cargo.cargo_weight?cargo.cargo_weight:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_weight')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                        inputgrouptext="kg"
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Total Volume</Label>
                    {/* <Input type="text" name="cargo_total_volume" id="cargo_total_volume"
                        placeholder=""
                        maxLength="10"
                        value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                        onBlur={(e)=>fncOnBlur(e)}>
                    </Input> */}
                    <InputValid 
                        type="number"
                        name="cargo_total_volume"
                        id="cargo_total_volume"
                        placeholder=""
                        maxLength="10"
                        value={cargo.cargo_total_volume?cargo.cargo_total_volume:''}
                        onChange={(e)=>fncOnChange(e, 'cargo_total_volume')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                        inputgrouptext="CBM"
                    />
                </FormGroup>
            </Col>
        </Row>
    </>
    );
}

export default CargoWdfc;