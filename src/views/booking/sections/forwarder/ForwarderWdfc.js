/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Row,Col, FormGroup,Label,Input, FormFeedback } from "reactstrap";
import * as validation from 'components/common/validation.js';
import InputValid from "components/CustomInput/InputValid.js";

const ForwarderWdfc = (props) => {
    const [forwarder, setForwarder] = useState({});
    const [openType, setOpenType] = useState("");
    useEffect(() => {
        // console.log("렌더링 될 때마다 수행");
    },[]);

    useEffect(() => {
        setForwarder(props.forwarder);
        setOpenType(props.openType);
    },[props]);

    useEffect(()=>{
        props.fncOpenType(openType);
    },[openType]);

    // 수정된 내용은 FORWARDER 저장
    const fncOnChange = ( e, key ) => {
        e.preventDefault();
        setForwarder({...forwarder, [key]:e.target.value.toUpperCase()});
    }

    // 완료된 내용은 부모로 전달
    const fncOnBlur = (e) => {
        e.preventDefault();
        props.fncOnBlur( forwarder );
    }

  return (
    <>
        <Row>
        {(openType === "BOOK")?
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Bookmark</Label>
                    {/* <Input type="text"
                        name="forwarder_bookmark_name"
                        id="forwarder_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={forwarder.forwarder_bookmark_name?forwarder.forwarder_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'forwarder_bookmark_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={forwarder.forwarder_bookmark_name?false:('BOOK'===openType?true:false)}
                        />
                    <FormFeedback>{validation.REQ_MSG}</FormFeedback> */}

                    <InputValid 
                        type="text"
                        name="forwarder_bookmark_name"
                        id="forwarder_bookmark_name"
                        placeholder=""
                        maxLength="50"
                        value={forwarder.forwarder_bookmark_name?forwarder.forwarder_bookmark_name:''}
                        onChange={(e)=>fncOnChange(e, 'forwarder_bookmark_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={'BOOK'===openType?true:false} 
                    />
                </FormGroup>
            </Col>
        :<></>}
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Code</Label>
                    {/* <Input type="text"
                        name="fwd_code"
                        id="fwd_code"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_code?forwarder.fwd_code:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_code')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_code"
                        id="fwd_code"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_code?forwarder.fwd_code:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_code')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Name1</Label>
                    {/* <Input type="text"
                        name="fwd_name1"
                        id="fwd_name1"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_name1?forwarder.fwd_name1:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_name1')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_name1"
                        id="fwd_name1"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_name1?forwarder.fwd_name1:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_name1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">Forwarder Name2</Label>
                    {/* <Input type="text"
                        name="fwd_name1"
                        id="fwd_name2"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_name2?forwarder.fwd_name2:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_name2')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_name2"
                        id="fwd_name2"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_name2?forwarder.fwd_name2:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_name2')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Name</Label>
                    {/* <Input type="text"
                        name="fwd_user_name"
                        id="fwd_user_name"
                        placeholder=""
                        maxLength="17"
                        value={forwarder.fwd_user_name?forwarder.fwd_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_name')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_name"
                        id="fwd_user_name"
                        placeholder=""
                        maxLength="17"
                        value={forwarder.fwd_user_name?forwarder.fwd_user_name:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_name')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Tel</Label>
                    {/* <Input type="text"
                        name="fwd_user_tel"
                        id="fwd_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_tel?forwarder.fwd_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_tel')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_tel"
                        id="fwd_user_tel"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_tel?forwarder.fwd_user_tel:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_tel')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="tel"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="4" lg="4" md="12">
                <FormGroup>
                    <Label className="mb-0">Fax</Label>
                    {/* <Input type="text"
                        name="fwd_user_fax"
                        id="fwd_user_fax"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_fax?forwarder.fwd_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_fax')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_fax"
                        id="fwd_user_fax"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_fax?forwarder.fwd_user_fax:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_fax')}
                        onBlur={(e) => {fncOnBlur(e)}}
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
                    {/* <Input type="text"
                        name="fwd_user_dept"
                        id="fwd_user_dept"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_user_dept?forwarder.fwd_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_dept')}
                        onBlur={(e)=>fncOnBlur(e)}
                        /> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_dept"
                        id="fwd_user_dept"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_user_dept?forwarder.fwd_user_dept:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_dept')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="6" lg="6" md="12">
                <FormGroup>
                    <Label className="mb-0">E-mail</Label>
                    {/* <Input type="text"
                        name="fwd_user_email"
                        id="fwd_user_email"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_email?forwarder.fwd_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_email')}
                        onBlur={(e)=>fncOnBlur(e)}
                        invalid={forwarder.fwd_user_email?(validation.validationEmail(forwarder.fwd_user_email)?false:true):false}
                        />
                    <FormFeedback>{validation.EML_MSG}</FormFeedback> */}
                    <InputValid 
                        type="text"
                        name="fwd_user_email"
                        id="fwd_user_email"
                        placeholder=""
                        maxLength="25"
                        value={forwarder.fwd_user_email?forwarder.fwd_user_email:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_user_email')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="email"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row>
        {/* <Row>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address1</Label>
                    <InputValid 
                        type="text"
                        name="fwd_address1"
                        id="fwd_address1"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address1?forwarder.fwd_address1:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address1')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
            <Col xl="12" lg="12" md="12">
                <FormGroup>
                    <Label className="mb-0">Address2</Label>
                    <InputValid 
                        type="text"
                        name="fwd_address2"
                        id="fwd_address2"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address2?forwarder.fwd_address2:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address2')}
                        onBlur={(e) => {fncOnBlur(e)}}
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
                        name="fwd_address3"
                        id="fwd_address3"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address3?forwarder.fwd_address3:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address3')}
                        onBlur={(e) => {fncOnBlur(e)}}
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
                        name="fwd_address4"
                        id="fwd_address4"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address4?forwarder.fwd_address4:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address4')}
                        onBlur={(e) => {fncOnBlur(e)}}
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
                        name="fwd_address5"
                        id="fwd_address5"
                        placeholder=""
                        maxLength="35"
                        value={forwarder.fwd_address5?forwarder.fwd_address5:''}
                        onChange={(e)=>fncOnChange(e, 'fwd_address5')}
                        onBlur={(e) => {fncOnBlur(e)}}
                        validtype="text"
                        required={false} 
                    />
                </FormGroup>
            </Col>
        </Row> */}
    </>
    );
}

export default ForwarderWdfc;