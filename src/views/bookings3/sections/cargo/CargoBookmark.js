/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, Card,
    CardBody, Button,FormGroup, Table, UncontrolledTooltip,
    TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import Cargo from "./Cargo.js";
import AlertMessage from "../AlertMessage.js";
import axios from "axios";
import classnames from 'classnames';
import GoodsBookmarkRelation from './GoodsBookmarkRelation.js';
import GoodsBookmark from './GoodsBookmark.js';


const CargoBookmark = (props) => {
    const [open, setOpen] = useState(false);
    // Cargo
    const [cargo, setCargo] = useState({});
    const [cargoBookmarkList, setCargoList] = useState([]);
    // Goods
    const [goods, setGoods] = useState([]);
    // Goods Bookmark List
    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    const [goodsRelationList, setGoodsRelationList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    // Alert을 위한 state
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("정상 처리되었습니다.");
    // Tab
    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
    //   console.log("렌더링 될 때마다 수행");
        setCargo( {['cargo_type']:'1', ['cargo_pack_type']:'1'});
    },[]);

    useEffect(() => {
        setCargoList(props.cargoBookmarkList);
        setGoodsBookmarkList(props.goodsBookmarkList);
    }, [props]);

    useEffect(() => {
        if( cargo.cargo_bookmark_seq ) {
            selectBookingCargoBookmarkRelation();
        }
    }, [cargo]);

    // Cargo Bookmark 입력하기
    const fncSaveCargoBookmark=(e)=>{
        e.preventDefault(e);
        if( !cargo.cargo_bookmark_seq || '0' === cargo.cargo_bookmark_seq ) {
            insertBookingCargoBookmark();
        } else {
            updateBookingCargoBookmark();
        }
    }

    // Insert Cargo Bookmark
    const insertBookingCargoBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingCargoBookmark"
            ,{
                user_no : 'M000002',
                cargo,
                goodsRelationList
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingCargoBookmark();
                props.selectBookingCargoGoodsBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Cargo Bookmark
    const updateBookingCargoBookmark = () => {
        const body =
        axios.post(
            "/api/updateBookingCargoBookmark"
            ,{
                user_no : 'M000002',
                cargo,
                goodsRelationList
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingCargoBookmark();
                props.selectBookingCargoGoodsBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Delete Cargo Bookmark
    const deleteBookingCargoBookmark = () => {
        if( !cargo.cargo_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/api/deleteBookingCargoBookmark"
            ,{
                user_no : 'M000002',
                cargo
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingCargoBookmark();
                setCargo({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const fncOnBlur = (cargo) => {
        setCargo(cargo);
    }
    const fncOnBlurGoods = (goods) => {
        setGoods(goods);
    }
    const fncOnBlurGoodsRelation = (goodsRelationList) => {
        setGoodsRelationList(goodsRelationList);
    }
    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    // New Cargo Bookmark
    const fncInitCargoBookmark = (e) => {
        e.preventDefault();
        // cargo_type, cargo_pack_type 은 초기값
        setCargo( {['cargo_type']:'1', ['cargo_pack_type']:'1'});
        setGoodsRelationList([{'key':1}]);
    }
    // New Goods Bookmark
    const fncInitGoods = (e) => {
        e.preventDefault();
        setGoods({});
    }
    
    // Alert 메세지 팝업
    const onDismiss = (color, message) => {
        setColor(color);
        setMessage(message);
        setVisible(!visible);
    }

    const clickTab = (tab) => {
        if(activeTab !== tab ) setActiveTab(tab);
    }

    // Cargo Bookmark 입력하기
    const fncSaveGoodsBookmark=(e)=>{
        e.preventDefault(e);
        if( !goods.cargo_goods_bookmark_seq || '0' === goods.cargo_goods_bookmark_seq ) {
            insertBookingCargoGoodsBookmark();
        } else {
            updateBoookingCargoGoodsBookmark();
        }
    }

    // Insert Goods Bookmark
    const insertBookingCargoGoodsBookmark = () => {
        const body =
        axios.post(
            "/api/insertBookingCargoGoodsBookmark"
            ,{
                user_no : 'M000002',
                goods
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingCargoGoodsBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Update Goods Bookmark
    const updateBoookingCargoGoodsBookmark = () => {
        const body =
        axios.post(
            "/api/updateBoookingCargoGoodsBookmark"
            ,{
                user_no : 'M000002',
                goods
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingCargoGoodsBookmark();
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Delete Goods Bookmark
    const deleteBoookingCargoGoodsBookmark = () => {
        if( !goods.cargo_goods_bookmark_seq ) {
            onDismiss("danger", "삭제할 Bookmark를 선택하세요.");
            return false;
        }
        const body =
        axios.post(
            "/api/deleteBoookingCargoGoodsBookmark"
            ,{
                user_no : 'M000002',
                goods
            }
            ,{}
        ).then(
            res=>{
                onDismiss("success", "정상 처리 되었습니다.");
                props.selectBookingCargoGoodsBookmark();
                setCargo({});
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Cargo Bookmark 조회
    const selectBookingCargoBookmarkRelation = () => {
        axios.post(
            "/api/selectBookingCargoBookmarkRelation"
            ,{ 
            user_no: 'M000002',
            cargo
        }
            ,{}
        ).then(
            res => {
                setGoodsRelationList(res.data);
            }
        ).catch(err => {
            if(err.response.status) {
                onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    return (
    <>
        <Button
            className="btn-round btn-just-icon mr-1"
            color="default"
            outline
            id="shbookmark"
            onClick={toggle.bind(this, 'B')}
            style={{position:'relative',backgroundColor:'white'}}
        >
        <i className="fa fa-bookmark-o" />
        </Button>
        <UncontrolledTooltip delay={0} target="shpview">Window Input</UncontrolledTooltip>
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="lg">
            <ModalHeader toggle={toggle}>Cargo</ModalHeader>
            <ModalBody className={clsNm}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active:activeTab === '1' })}
                            onClick={()=>{clickTab('1');}}>
                                Cargo
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active:activeTab === '2' })}
                            onClick={()=>{clickTab('2');}}>
                                Goods
                            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col>Cargo BookMark List</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xl="12" lg="12" md="12">
                                <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                                    <Card className="card-raised card-form-horizontal no-transition mb-0">
                                        <CardBody className="bg-white p-0">
                                            <Table className="mb-0" responsive hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <td className="p-2 bg-info">No.</td>
                                                        <td className="p-2 bg-info">Bookmark</td>
                                                        <td className="p-2 bg-info">NAME</td>
                                                        <td className="p-2 bg-info">Goods 연결</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {(cargoBookmarkList.length>0)?cargoBookmarkList.map((element,key)=>{
                                                    // console.log(cntrList, key, element)
                                                    return(
                                                        <tr scope="row" key={key} onClick={()=>{setCargo(element)}}>
                                                            <td>{element.cargo_bookmark_seq}</td>
                                                            <td>{element.cargo_bookmark_name}</td>
                                                            <td>{element.cargo_name}</td>
                                                            <td data-toggle="tooltip"
                                                                id={"tooltip"+key}>{element.relation_yn}
                                                            {element.relation_bookmark?<UncontrolledTooltip
                                                                delay={0}
                                                                placement="right"
                                                                target={"tooltip"+key}
                                                            >{element.relation_bookmark}</UncontrolledTooltip>:
                                                            <></>}
                                                            </td>
                                                        </tr>
                                                    )
                                                }):<></>}
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Cargo
                            cargo={cargo}
                            fncOnBlur={fncOnBlur}
                            />
                        <GoodsBookmarkRelation
                            goodsRelationList={goodsRelationList}
                            goodsBookmarkList={goodsBookmarkList}
                            fncOnBlurGoodsRelation={fncOnBlurGoodsRelation}
                            />
                        <ModalFooter>
                            <Button color="primary" onClick={(e)=>fncInitCargoBookmark(e)}>New</Button>{' '}
                            <Button color="primary" onClick={(e)=>fncSaveCargoBookmark(e)}>Save</Button>{' '}
                            <Button color="primary" onClick={(e)=>deleteBookingCargoBookmark(e)}>Delete</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col>Goods BookMark List</Col>
                        </Row>
                        {/* <CardBody className="pt-2 pb-2 bg-white"> */}
                        <Row className="mb-3">
                            <Col xl="12" lg="12" md="12">
                                <FormGroup style={{height:'150px',overflow:'auto'}} className="mb-0">
                                    <Card className="card-raised card-form-horizontal no-transition mb-0">
                                        <CardBody className="bg-white p-0">
                                            <Table className="mb-0" responsive hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <td className="p-2 bg-info">No.</td>
                                                        <td className="p-2 bg-info">Name</td>
                                                        <td className="p-2 bg-info">DESC</td>
                                                        <td className="p-2 bg-info">Cargo 연결</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {(goodsBookmarkList.length>0)?goodsBookmarkList.map((element,key)=>{
                                                    // console.log(cntrList, key, element)
                                                    return(
                                                        <tr scope="row" key={key} onClick={()=>{setGoods(element)}}>
                                                            <td>{element.cargo_goods_bookmark_seq}</td>
                                                            <td>{element.cargo_goods_bookmark_name}</td>
                                                            <td>{element.goods_desc1}</td>
                                                            <td data-toggle="tooltip"
                                                                id={"tooltip"+key}>{element.relation_yn}
                                                            {element.relation_bookmark?<UncontrolledTooltip
                                                                delay={0}
                                                                placement="right"
                                                                target={"tooltip"+key}
                                                            >{element.relation_bookmark}</UncontrolledTooltip>:
                                                            <></>}
                                                            </td>
                                                        </tr>
                                                    )
                                                }):<></>}
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                            </Col>
                        </Row>
                        <GoodsBookmark
                            goods={goods}
                            fncOnBlurGoods={fncOnBlurGoods}
                            />
                        <ModalFooter>
                            <Button color="primary" onClick={(e)=>fncInitGoods(e)}>New</Button>{' '}
                            <Button color="primary" onClick={(e)=>fncSaveGoodsBookmark(e)}>Save</Button>{' '}
                            <Button color="primary" onClick={(e)=>deleteBoookingCargoGoodsBookmark(e)}>Delete</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </TabPane>
                </TabContent>
            </ModalBody>
            
        </Modal>
        <AlertMessage
            isOpen={visible}
            toggle={onDismiss}
            color={color}
            message={message}
            />
    </>
    );
}

export default CargoBookmark;