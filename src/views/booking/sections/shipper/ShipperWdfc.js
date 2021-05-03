/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup,Label,Input, FormFeedback, Form } from "reactstrap";
import InputValid from 'components/CustomInput/InputValid.js';

const ShipperWdfc = (props) => {
    const [shipper, setShipper] = useState({});
    // openType CARD, BOOK 에 따라 Bookmark 명 visible
    const [openType, setOpenType] = useState("");

    useEffect(() => {
        // console.log(validation, validation.emailMsg)
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setShipper(props.shipper);
        setOpenType(props.openType);
    },[props]);

    useEffect(()=>{
        props.fncOpenType(openType);
    },[openType]);

    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setShipper({...shipper, [key]:e.target.value.toUpperCase()});
    }
    // 완료된 내용은 부모로 전달
    const fncOnBlurShipper = (e) => {
        // e.preventDefault();
        // console.log(shipper)
        props.fncOnBlurShipper( shipper );
    }

  return (
    <>
    <Row>
    {(openType === 'BOOK')?
        <Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">Bookmark Name</Label>
                <InputValid 
                    type="text"
                    name="shipper_bookmark_name"
                    id="shipper_bookmark_name"
                    placeholder=""
                    maxLength="50"
                    value={shipper.shipper_bookmark_name?shipper.shipper_bookmark_name:''}
                    onChange={(e)=>fncOnChange(e, 'shipper_bookmark_name')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'BOOK'===openType?true:false} 
                />
            </FormGroup>
        </Col>
    :<></>}
        <Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">Shipper Code</Label>
                <InputValid 
                    type="text"
                    name="shp_code"
                    id="shp_code"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_code?shipper.shp_code:''}
                    onChange={(e)=>fncOnChange(e, 'shp_code')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
    </Row>
    <Row>
        <Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">Shipper Name1</Label>
                <InputValid 
                    type="text"
                    name="shp_name1"
                    id="shp_name1"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_name1?shipper.shp_name1:''}
                    onChange={(e)=>fncOnChange(e, 'shp_name1')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
        <Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">Shipper Name2</Label>
                <InputValid 
                    type="text"
                    name="shp_name2"
                    id="shp_name2"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_name2?shipper.shp_name2:''}
                    onChange={(e)=>fncOnChange(e, 'shp_name2')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col>
    </Row>
    {/* <Row>
        <Col xl="4" lg="4" md="12">
            <FormGroup>
                <Label className="mb-0">Name</Label>
                <InputValid 
                    type="text"
                    name="shp_user_name"
                    id="shp_user_name"
                    placeholder=""
                    maxLength="17"
                    value={shipper.shp_user_name?shipper.shp_user_name:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_name')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
        <Col xl="4" lg="4" md="12">
            <FormGroup>
                <Label className="mb-0">Tel</Label>
                <InputValid 
                    type="text"
                    name="shp_user_tel"
                    id="shp_user_tel"
                    placeholder=""
                    maxLength="17"
                    value={shipper.shp_user_tel?shipper.shp_user_tel:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_tel')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="tel"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
        <Col xl="4" lg="4" md="12">
            <FormGroup>
                <Label className="mb-0">Fax</Label>
                <InputValid 
                    type="text"
                    name="shp_user_fax"
                    id="shp_user_fax"
                    placeholder=""
                    maxLength="25"
                    value={shipper.shp_user_fax?shipper.shp_user_fax:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_fax')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="tel"
                    required={false} 
                />
            </FormGroup>
        </Col>
    </Row>
    <Row>
        <Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">Dept</Label>
                <InputValid 
                    type="text"
                    name="shp_user_dept"
                    id="shp_user_dept"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_user_dept?shipper.shp_user_dept:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_dept')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col>
        <Col xl="6" lg="6" md="12">
            <FormGroup>
                <Label className="mb-0">E-mail</Label>
                <InputValid 
                    type="text"
                    name="shp_user_email"
                    id="shp_user_email"
                    placeholder=""
                    maxLength="25"
                    value={shipper.shp_user_email?shipper.shp_user_email:''}
                    onChange={(e)=>fncOnChange(e, 'shp_user_email')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="email"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
    </Row> */}
    {/* <Row>
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Address1</Label>
                <InputValid 
                    type="text"
                    name="shp_address1"
                    id="shp_address1"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address1?shipper.shp_address1:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address1')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={'CARD'===openType?true:false} 
                />
            </FormGroup>
        </Col>
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Address2</Label>
                <InputValid 
                    type="text"
                    name="shp_address2"
                    id="shp_address2"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address2?shipper.shp_address2:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address2')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col>
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Address3</Label>
                <InputValid 
                    type="text"
                    name="shp_address3"
                    id="shp_address3"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address3?shipper.shp_address3:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address3')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col>
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Address4</Label>
                <InputValid 
                    type="text"
                    name="shp_address4"
                    id="shp_address4"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address4?shipper.shp_address4:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address4')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col>
        <Col xl="12" lg="12" md="12">
            <FormGroup>
                <Label className="mb-0">Address5</Label>
                <InputValid 
                    type="text"
                    name="shp_address5"
                    id="shp_address5"
                    placeholder=""
                    maxLength="35"
                    value={shipper.shp_address5?shipper.shp_address5:''}
                    onChange={(e)=>fncOnChange(e, 'shp_address5')}
                    onBlur={(e) => {fncOnBlurShipper(e)}}
                    validtype="text"
                    required={false} 
                />
            </FormGroup>
        </Col>
    </Row> */}
    </>
    );
}

export default ShipperWdfc;