/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row,Col, CardBody, Collapse, UncontrolledTooltip,
    Button,Input, Card, Label, ButtonGroup, FormGroup} from "reactstrap";
import axios from 'axios';
import Select from "react-select";
import {ContainerWdfc} from "./ContainerWdfc.js";
import ContainerBookmarkWdfc from "./ContainerBookmarkWdfc.js";


const ContainerCardWdfc = (props) => {
    // Collapse Flag
    const [coll, setColl] = useState(false);
    // modal 창을 위한 state
    const [open, setOpen] = useState(false);
    // Container Bookmark List  
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Special Bookmark List
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    // Container List
    const [containerList, setContainerList] = useState([]);
    // Container Special List
    const [containerSpecialList, setContainerSpecialList] = useState([]);
    // Container SpecialRelationList
    const [specialBookmarkRelationList, setSpecialBookmarkRelationList] = useState([]);
    // 전체화면 css 적용을 위한 state
    const [clsNm, setClsNm] = useState("");
    const [booking, setBooking] = useState({});
    const [allCheck,setAllCheck] = useState(true);
    const [cntrCheck,setCntrCheck] = useState(true);
    const {user, dangerTrue} = props;

    useEffect(() => {
        if( user && user.user_no ) {
            selectBookingSpecialBookmark();
        }
    },[user]);

    useEffect(()=>{
        setColl(props.openWindow);
    },[props.openWindow]);

    useEffect(() => {
        // cntr_selected_yn === Y 이면 
        // selected 박스로 선택한건 바로 입력해준다.
        // if( containerList.length > 0 ) {
        //     containerList.map((element, key)=>{
        //         if( "Y" === element.cntr_selected_yn ) {
        //             fncSaveContainerList();     
        //         }
        //     });

        // }
        props.fncContainerParent(containerList);
    },[containerList]);

    useEffect(() => {
        props.fncContainerSpecialParent(containerSpecialList);
    },[containerSpecialList]);

    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        
        // 전체북마크로 수정하는 경우
        // console.log(props.booking.bookmark_yn, props.booking.bookmark_seq)
        if( "Y" === props.booking.bookmark_yn && props.booking.bookmark_seq ) {
            if( props.booking.container_bookmark_seq ) {
                containerBookmarkList.map((element, key)=>{
                    if( props.booking.container_bookmark_seq == element.container_bookmark_seq) {
                        // console.log(element)
                        // select로 새로운 document를 세팅한다
                        // 기존 Booking 정보
                        // console.log(">>>>>>>>>>>>>>>>",booking)
                        setBooking({...booking
                            ,'container_bookmark_seq':element.container_bookmark_seq
                            ,'container_bookmark_name':element.container_bookmark_name
                            ,'cntr_selected_yn':'Y'
                        });
                        
                        setContainerList([{
                            'cntr_seq':1
                            ,'container_bookmark_seq':element.container_bookmark_seq
                            ,'container_bookmark_name':element.container_bookmark_name
                            ,'cntr_code':element.cntr_code
                            ,'cntr_empty_yn':element.cntr_empty_yn
                            ,'cntr_frozen_fc':element.cntr_frozen_fc
                            ,'cntr_frozen_tmp':element.cntr_frozen_tmp
                            ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit
                            ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1
                            ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address2
                            ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address3
                            ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address4
                            ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address5
                            ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code
                            ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1
                            ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2
                            ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email
                            ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax
                            ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name
                            ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel
                            ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date
                            ,'cntr_pre_cooling':element.cntr_pre_cooling
                            ,'cntr_qty':element.cntr_qty
                            ,'cntr_seal_no':element.cntr_seal_no
                            // ,'cntr_seq':element.cntr_seq
                            ,'cntr_size':element.cntr_size
                            ,'cntr_soc_yn':element.cntr_soc_yn
                            ,'cntr_special_type':element.cntr_special_type
                            ,'cntr_type':element.cntr_type
                            ,'cntr_vent_open':element.cntr_vent_open
                            ,'cntr_width':element.cntr_width
                            ,'cntr_selected_yn':'Y'
                            ,'cntr_yn': 'Y'
                        }]);
                        props.fncContainerParent([{
                            'cntr_seq':1
                            ,'container_bookmark_seq':element.container_bookmark_seq
                            ,'container_bookmark_name':element.container_bookmark_name
                            ,'cntr_code':element.cntr_code
                            ,'cntr_empty_yn':element.cntr_empty_yn
                            ,'cntr_frozen_fc':element.cntr_frozen_fc
                            ,'cntr_frozen_tmp':element.cntr_frozen_tmp
                            ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit
                            ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1
                            ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address2
                            ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address3
                            ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address4
                            ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address5
                            ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code
                            ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1
                            ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2
                            ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email
                            ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax
                            ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name
                            ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel
                            ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date
                            ,'cntr_pre_cooling':element.cntr_pre_cooling
                            ,'cntr_qty':element.cntr_qty
                            ,'cntr_seal_no':element.cntr_seal_no
                            // ,'cntr_seq':element.cntr_seq
                            ,'cntr_size':element.cntr_size
                            ,'cntr_soc_yn':element.cntr_soc_yn
                            ,'cntr_special_type':element.cntr_special_type
                            ,'cntr_type':element.cntr_type
                            ,'cntr_vent_open':element.cntr_vent_open
                            ,'cntr_width':element.cntr_width
                            ,'cntr_selected_yn':'Y'
                            ,'cntr_yn': 'Y'
                        }]);
                        element.cntr_seq=1;
                        selectBookingContainerSpecialBookmarkRelation(element);
                    }
                    })
            } else {
                setBooking({...booking
                    ,'container_bookmark_seq':''
                    ,'container_bookmark_name':''
                    ,'cntr_selected_yn':'Y'
                });
                // props.fncBookingParent({...booking
                //     ,'container_bookmark_seq':element.container_bookmark_seq
                //     ,'container_bookmark_name':element.container_bookmark_name
                //     ,'cntr_selected_yn':'Y'
                // });
                setContainerList([{
                    'cntr_seq':1
                    ,'container_bookmark_seq': ''
                    ,'container_bookmark_name': ''
                    ,'cntr_code': null
                    ,'cntr_empty_yn': null
                    ,'cntr_frozen_fc': null
                    ,'cntr_frozen_tmp': null
                    ,'cntr_frozen_tmp_unit': null
                    ,'cntr_pick_up_cy_address1': null
                    ,'cntr_pick_up_cy_address2': null
                    ,'cntr_pick_up_cy_address3': null
                    ,'cntr_pick_up_cy_address4': null
                    ,'cntr_pick_up_cy_address5': null
                    ,'cntr_pick_up_cy_code': null
                    ,'cntr_pick_up_cy_name1': null
                    ,'cntr_pick_up_cy_name2': null
                    ,'cntr_pick_up_cy_user_email': null
                    ,'cntr_pick_up_cy_user_fax': null
                    ,'cntr_pick_up_cy_user_name': null
                    ,'cntr_pick_up_cy_user_tel': null
                    ,'cntr_pick_up_cy_date': null
                    ,'cntr_pre_cooling': null
                    ,'cntr_qty':null
                    ,'cntr_seal_no':null
                    // ,'cntr_seq':element.cntr_seq
                    ,'cntr_size': null
                    ,'cntr_soc_yn': null
                    ,'cntr_special_type': null
                    ,'cntr_type': null
                    ,'cntr_vent_open': null
                    ,'cntr_width': null
                    ,'cntr_selected_yn':'Y'
                    ,'cntr_yn': 'Y'
                }]);
                props.fncContainerParent([{
                    'cntr_seq':1
                    ,'container_bookmark_seq': ''
                    ,'container_bookmark_name': ''
                    ,'cntr_code': null
                    ,'cntr_empty_yn': null
                    ,'cntr_frozen_fc': null
                    ,'cntr_frozen_tmp': null
                    ,'cntr_frozen_tmp_unit': null
                    ,'cntr_pick_up_cy_address1': null
                    ,'cntr_pick_up_cy_address2': null
                    ,'cntr_pick_up_cy_address3': null
                    ,'cntr_pick_up_cy_address4': null
                    ,'cntr_pick_up_cy_address5': null
                    ,'cntr_pick_up_cy_code': null
                    ,'cntr_pick_up_cy_name1': null
                    ,'cntr_pick_up_cy_name2': null
                    ,'cntr_pick_up_cy_user_email': null
                    ,'cntr_pick_up_cy_user_fax': null
                    ,'cntr_pick_up_cy_user_name': null
                    ,'cntr_pick_up_cy_user_tel': null
                    ,'cntr_pick_up_cy_date': null
                    ,'cntr_pre_cooling': null
                    ,'cntr_qty':null
                    ,'cntr_seal_no':null
                    // ,'cntr_seq':element.cntr_seq
                    ,'cntr_size': null
                    ,'cntr_soc_yn': null
                    ,'cntr_special_type': null
                    ,'cntr_type': null
                    ,'cntr_vent_open': null
                    ,'cntr_width': null
                    ,'cntr_selected_yn':'Y'
                    ,'cntr_yn': 'Y'
                }]);
            }
            setContainerSpecialList([ {'key':'1', 'cntr_seq':1}]);
        } else {
            // console.log("props:",props.booking);
            let bkg_no = props.booking.bkg_no;
            let bkg_date = props.booking.bkg_date;
            let status_cus = props.booking.status_cus;
            let sc_no = props.booking.sc_no;
            let user_no = props.booking.user_no;

            // container Bookmark seq
            let container_bookmark_seq = props.booking.container_bookmark_seq;
            let init_container_bookmark_seq = props.booking.init_container_bookmark_seq;

            setBooking({...booking, 'bkg_no':bkg_no, 'bkg_date':bkg_date
                , 'status_cus':status_cus, 'sc_no':sc_no, 'user_no':user_no
                , 'container_bookmark_seq':container_bookmark_seq
                , 'init_container_bookmark_seq':init_container_bookmark_seq
            }); // 초기화 bookmark seq 값

            // 최초 조회하기
            if( booking.bkg_no != props.booking.bkg_no ) {
                if( props.booking.bkg_no && props.booking.bkg_date && props.booking.user_no ) {
                    selectContainerOfBooking(props.booking);
                    selectContainerSpecialOfBooking(props.booking);
                }
                // selectCargoOfBooking(props.booking);
            }
        }
    },[props.booking]);
    // 부모로부터 파라미터 전달 받음
    useEffect(()=>{
        setContainerBookmarkList(props.containerBookmarkList);
    },[props.containerBookmarkList]);

    // 메인 화면에서 select 선택한 경우
    const fncSelectContainer = (e)=>{
        //   console.log(e.target.value)
        // 선택
        if( 1 > e.value ) {
            // setBooking({});
            if ( coll ) {
                setColl(!coll)
            }
        // 그외 데이터인 경우
        } else {
            containerBookmarkList.map((element, key)=>{
            if( e.value == element.container_bookmark_seq) {
                // console.log(element)
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                // console.log(">>>>>>>>>>>>>>>>",booking)
                setBooking({...booking
                    ,'container_bookmark_seq':element.container_bookmark_seq
                    ,'container_bookmark_name':element.container_bookmark_name
                    ,'cntr_selected_yn':'Y'
                });


                let list = containerList;

                containerList.map((data,key)=> {
                    if( "Y" === data.cntr_yn ) {
                        list[key] = Object.assign(data, element);
                    }
                });
                console.log(list)
                setContainerList(list);
                props.fncContainerParent(list);
                
                // setContainerList([{
                //     'cntr_seq':1
                //     ,'container_bookmark_seq':element.container_bookmark_seq
                //     ,'container_bookmark_name':element.container_bookmark_name
                //     ,'cntr_code':element.cntr_code
                //     ,'cntr_empty_yn':element.cntr_empty_yn
                //     ,'cntr_frozen_fc':element.cntr_frozen_fc
                //     ,'cntr_frozen_tmp':element.cntr_frozen_tmp
                //     ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit
                //     ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1
                //     ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address2
                //     ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address3
                //     ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address4
                //     ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address5
                //     ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code
                //     ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1
                //     ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2
                //     ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email
                //     ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax
                //     ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name
                //     ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel
                //     ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date
                //     ,'cntr_pre_cooling':element.cntr_pre_cooling
                //     ,'cntr_qty':element.cntr_qty
                //     ,'cntr_seal_no':element.cntr_seal_no
                //     // ,'cntr_seq':element.cntr_seq
                //     ,'cntr_size':element.cntr_size
                //     ,'cntr_soc_yn':element.cntr_soc_yn
                //     ,'cntr_special_type':element.cntr_special_type
                //     ,'cntr_type':element.cntr_type
                //     ,'cntr_vent_open':element.cntr_vent_open
                //     ,'cntr_width':element.cntr_width
                //     ,'cntr_selected_yn':'Y'
                // }]);
                // props.fncContainerParent([{
                //     'cntr_seq':1
                //     ,'container_bookmark_seq':element.container_bookmark_seq
                //     ,'container_bookmark_name':element.container_bookmark_name
                //     ,'cntr_code':element.cntr_code
                //     ,'cntr_empty_yn':element.cntr_empty_yn
                //     ,'cntr_frozen_fc':element.cntr_frozen_fc
                //     ,'cntr_frozen_tmp':element.cntr_frozen_tmp
                //     ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit
                //     ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1
                //     ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address2
                //     ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address3
                //     ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address4
                //     ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address5
                //     ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code
                //     ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1
                //     ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2
                //     ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email
                //     ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax
                //     ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name
                //     ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel
                //     ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date
                //     ,'cntr_pre_cooling':element.cntr_pre_cooling
                //     ,'cntr_qty':element.cntr_qty
                //     ,'cntr_seal_no':element.cntr_seal_no
                //     // ,'cntr_seq':element.cntr_seq
                //     ,'cntr_size':element.cntr_size
                //     ,'cntr_soc_yn':element.cntr_soc_yn
                //     ,'cntr_special_type':element.cntr_special_type
                //     ,'cntr_type':element.cntr_type
                //     ,'cntr_vent_open':element.cntr_vent_open
                //     ,'cntr_width':element.cntr_width
                //     ,'cntr_selected_yn':'Y'
                // }]);
                element.cntr_seq=1;
                selectBookingContainerSpecialBookmarkRelation(element);
            }
            });
            if ( !coll ) {
                setColl(!coll);
            }
        }
    }

    // Card 팝업 화면에서 select 선택한 경우
    const fncSelectContainerList=(e, index)=>{
        // console.log("몇번째 컨테이너 인가요?",index);

        // 이미 추가된 Bookmark 인 경우 제어
        let chDup = false;
        containerList.forEach(function(n){
            if( n.container_bookmark_seq == e.target.value ) {
                chDup = true;
                return;
            }
        });
        if( chDup ) {
            props.onAlert("danger", "Bookmark 는 이미 추가되었습니다.");
            return false;
        }

        // Container 목록과 일치하는 index 찾기
        containerList.map((element, key)=>{
            // Container의 목록과 일치한다면
            if( key == index ) {
                // console.log( key, index )
                // Bookmark 정보에서 일치하는거 찾기
                containerBookmarkList.map((row, i)=>{
                    if( e.target.value == row.container_bookmark_seq ) {
                        if( element.cntr_seq ) {
                            row.cntr_seq = element.cntr_seq;
                        } else {
                            row.cntr_seq = index+1;
                        }
                        // 찾은걸 list에 넣어주자.
                        containerList[key] = row;
                        // Bookmark에서 Container와 연결된 Special Relation 정보도 넣어주자.
                        selectBookingContainerSpecialBookmarkRelation(row);
                    }
                });
            }
        });

        setContainerList([...containerList]);
    }


    const selectBookingSpecialBookmark=()=>{
        axios.post(
            "/shipper/selectBookingSpecialBookmark"
            ,{ user_no: user?user.user_no:null
            }
            ,{}
        ).then(
            res => {
                setSpecialBookmarkList(res.data);
            }
        );
    }

    // Container Booking 정보 조회
    const selectContainerOfBooking=(booking)=>{
        axios.post(
            "/shipper/selectContainerOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => {
                setContainerList(res.data);
            }
        );
    }

    // Container Special Booking 정보 조회
    const selectContainerSpecialOfBooking=(booking)=>{
        axios.post(
            "/shipper/selectContainerSpecialOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
            }
            ,{}
        ).then(
            res => {
                // console.log(">>>>>>>>>>>>>>>",res.data)
                if( res.data.length === 0 ) {
                    setContainerSpecialList([{'key':1, 'cntr_seq':1}]);
                } else {
                    setContainerSpecialList(res.data);
                }
            }
        );
    }

    // Container Special Relation Bookmark 조회
    const selectBookingContainerSpecialBookmarkRelation = (container) => {
        axios.post(
            "/shipper/selectBookingContainerSpecialBookmarkRelation"
            ,{ 
            user_no: user?user.user_no:null,
            container
        }
            ,{}
        ).then(
            res => {
                // console.log("container  ",container);
                // console.log(container.cntr_seq);
                for( let i =containerSpecialList.length; i > 0; i-- ) {

                    // console.log(i, containerSpecialList.length);
                    let row = containerSpecialList[i-1];
                    // console.log(row.cntr_seq ," CNTR SEQ ", container.cntr_seq);
                    if( row.cntr_seq == container.cntr_seq ) {
                        containerSpecialList.splice(i-1, 1);
                    }
                }
                let data = res.data;
                // console.log("1 length ",data.length)
                if( 0 === data.length ) {
                    // console.log(containerSpecialList.length);
                    setContainerSpecialList([...containerSpecialList, {'key':'1', 'cntr_seq':container.cntr_seq}]);
                } else {         

                    // Bookmark Relation 정보에 cntr_seq 값을 넣어준다.
                    data.map((element, key)=>{
                        element.cntr_seq = container.cntr_seq;
                        // console.log(element);
                        // Container Specail 목록에 넣어준다.
                        containerSpecialList.push(element);
                    });
                    // console.log("containerSpecialList  ",containerSpecialList);
                    setContainerSpecialList([...containerSpecialList]);
                }
            }
        );
    }

    const toggle = (params) => {
        (params==='F') ? setClsNm('fullscreen-modal') : setClsNm('')
        setOpen(!open);
    }

    const onAddContainer=()=>{
        let maxCntrSeq = 0;
        containerList.map((row, i)=>{
            if( maxCntrSeq < parseInt(row.cntr_seq) ) {
                maxCntrSeq = parseInt(row.cntr_seq);
            }
        });
        if( 999 < maxCntrSeq ) {
            props.onAlert("danger", "더이상 추가할 수 없습니다.")
            return false;
        }
        // console.log("MAX = ",maxCntrSeq);
        setContainerList([...containerList,{'key': parseInt(maxCntrSeq)+1, 'cntr_seq': parseInt(maxCntrSeq)+1, 'cntr_yn': (allCheck?'Y':'N')}]);
        setContainerSpecialList([...containerSpecialList,{'key':parseInt(maxCntrSeq)+1, 'cntr_seq':parseInt(maxCntrSeq)+1, 'cntr_yn': (allCheck?'Y':'N')}]);
    }
    const onDelContainer=(index)=>{
        // 어느 컨테이너가 삭제되었는지 cntr_seq 값을 뽑는다.
        let cntr_seq = containerList[index].cntr_seq;
        
        if( containerList.length === 1 ) {
            setContainerList([{'key':1, 'cntr_seq':1}])
        } else {
            const cntrIdx = containerList.findIndex(function(item){return item.cntr_seq === cntr_seq });
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(cntrIdx > -1) containerList.splice(cntrIdx,1);
            setContainerList([...containerList]);
            
            const specialIdx = containerSpecialList.findIndex(function(item){return item.cntr_seq === cntr_seq });
            containerSpecialList.splice(specialIdx,1);
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(specialIdx > -1) setContainerSpecialList([...containerSpecialList]);
        }
        
    }
    // Special 목록 삭제
    const onDelSpecial=(special)=>{
        // 어느 컨테이너가 삭제되었는지 cntr_seq 값을 뽑는다.
        let cntr_seq = special.cntr_seq;
        let special_seq = special.special_seq;

        if(containerSpecialList.length === 1) {
            setContainerSpecialList([{'key':1, 'cntr_seq':cntr_seq,'special_seq':1}])
        } else {
            // console.log("cntr_seq",cntr_seq,"special_seq",special_seq)
            const specialIdx = containerSpecialList.findIndex(function(item){return item.cntr_seq === cntr_seq && item.special_seq === special_seq });
            containerSpecialList.splice(specialIdx,1);
            //  Splice의 경우 return값이 아닌 splice 처리후 적용
            if(specialIdx > -1) setContainerSpecialList([...containerSpecialList]);
        }
    }

    // 컨테이너 자식에게 받은 정보
    const fncOnBlurContainer=(index, container)=>{
        // console.log(key, container)
        containerList[index] = container;
        setContainerList([...containerList]);
    }
    // 컨테이너 자식에게 받은 정보
    const fncOnBlurSpecialList=(specialList)=>{
        // console.log(key, container)
        // containerList[index] = container;
        setContainerSpecialList([...specialList]);
    }

    const fncValidation=(element)=>{
        // console.log(element)
        if( !element.cntr_code ) return false;
        if( !element.cntr_pick_up_cy_code ) return false;
        if( !element.cntr_pick_up_cy_date) return false;
        if( !element.cntr_qty ) return false;
        return true;
    }
    // 컨테이너 저장
    const fncSaveContainerList=(e)=>{
        // console.log("containerList>",containerList);
        // console.log("containerSpecialList>",containerSpecialList);
        let checkVal = false;
        for( let i=0; i<containerList.length; i++ ) {
            checkVal = fncValidation(containerList[i]);
            if( !checkVal ) break;
        }
        // containerList.map((element, key)=>{
            //     checkVal = validation(element);
            //     if( !checkVal ) break;
            // });
        // console.log(checkVal);
        if( !checkVal ) return false;
        axios.post(
            "/shipper/saveContainerOfBooking"
            ,{ user_no: user?user.user_no:null
                , booking
                , containerList
                , containerSpecialList
            }
            ,{}
        ).then(
            res => {
                // onDismiss("success", "정상 처리 되었습니다.");
                // 최초 조회하기
                selectContainerOfBooking(booking);
                selectContainerSpecialOfBooking(booking);
                setBooking({...booking, 'cntr_selected_yn':'N'});
            }
        );
    }


    const onContainerCheck =()=> {
        let list = containerList;
        let vVal = 'N';
        if(allCheck) {
            vVal = 'N';
        } else {
            vVal = 'Y';
        }
        containerList.map((data,key)=> {
            list[key] = {...data,'cntr_yn':vVal}
        });
        setContainerList(list);
        setAllCheck(!allCheck);
    }

    const fncCheckBoxOnChange =(element)=> {
        let list = containerList;
        console.log( element )
        containerList.map((data,key)=> {
            if( element.cntr_seq == data.cntr_seq ) {
                console.log( element.cntr_seq, data.cntr_seq )
                list[key] = {...data,'cntr_yn': (element.cntr_yn === 'Y'?'N':'Y')}
                console.log(list[key])
            }
        });
        setContainerList(list);
        setCntrCheck(!cntrCheck);
    }


  return (
    <>
        <Row id="Container">
            <Col xl="12" lg="12">
                <Card style={{zIndex:'60'}}>
                    <CardBody className="pt-3 pb-2" style={{border:'1px solid silver',borderRadius:'10px'}}>  
                        <Row className="pb-2">
                            <Col className="mt-2 mb-0 col-5" style={{fontSize:'18px',color:'#696969',fontWeight:'600'}}>CONTAINER
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
                                                value:booking.container_bookmark_seq?booking.container_bookmark_seq:'',
                                                label:booking.container_bookmark_name?booking.container_bookmark_name:'선택'
                                            }}
                                            onChange={(e)=>fncSelectContainer(e?e:null)}
                                            options={containerBookmarkList}
                                            placeholder={"선택"}
                                        />
                                    </Col>
                                    <Col className="col-2 pl-auto pr-auto">
                                        <ContainerBookmarkWdfc
                                            containerBookmarkList={containerBookmarkList}
                                            specialBookmarkList={specialBookmarkList}
                                            selectBookingContainerBookmark={props.selectBookingContainerBookmark}
                                            selectBookingSpecialBookmark={selectBookingSpecialBookmark}
                                            onAlert={props.onAlert}
                                            {...props}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Collapse isOpen={coll}>
                            <Col xl="6" className="mb-2 col-10">
                                <Row>
                                    <Col xl="2" className="col-3 ml-2 mr-0 pr-0">
                                        <FormGroup check className="mt-2">
                                        <Label check>
                                        <Input defaultValue="" type="checkbox"  checked={allCheck} 
                                            onChange = {()=>onContainerCheck()}
                                            />전체
                                            <span className="form-check-sign" />
                                        </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <hr className="mt-0"/>
                            <Col className="col-12 mb-3 ml-auto mr-auto">
                                {(containerList.length>0)?containerList.map((element, key)=>{
                                    return (
                                        <Row key={key}>
                                            
                                            <Col className="pb-1">
                                                <ButtonGroup className="pull-right pr-2">
                                                    <Button
                                                        className="pt-0 pb-0"
                                                        color="default"
                                                        data-toggle="tooltip"
                                                        outline
                                                        id="addCntr"
                                                        size="sm"
                                                        type="button"
                                                        onClick={onAddContainer}
                                                    >추가
                                                    </Button>
                                                </ButtonGroup>
                                            </Col>
                                            <Col xl="12" lg="12">
                                                <Row>
                                                    <Col xl="0" className="col-0 pl-2 mt-auto mb-auto">
                                                        <FormGroup check style={{height:'69px'}}>
                                                            <Label check>
                                                            <Input defaultValue="" type="checkbox"  
                                                                checked={element.cntr_yn?element.cntr_yn==="Y"?true:false:null}
                                                                onChange = {()=>fncCheckBoxOnChange(element)}
                                                            />
                                                            <span className="form-check-sign" />
                                                            </Label>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            <ContainerWdfc
                                                                index={key}
                                                                container={element}
                                                                containerBookmarkList={containerBookmarkList}
                                                                containerSpecialList={containerSpecialList}
                                                                specialBookmarkList={specialBookmarkList}
                                                                fncOnBlurContainer={fncOnBlurContainer}
                                                                fncOnBlurSpecialList={fncOnBlurSpecialList}
                                                                onDelContainer={onDelContainer}
                                                                onDelSpecial={onDelSpecial}
                                                                openType={"MAIN"}
                                                                fncSelectContainerList={fncSelectContainerList}
                                                                booking={props.booking}
                                                                {...props}
                                                                />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                }):<></>}
                            </Col>
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
        <Modal isOpen={open} toggle={toggle} className={clsNm} size="xl">
            <ModalHeader toggle={toggle}>Container</ModalHeader>
                <ModalBody className={clsNm}>
                    <CardBody >
                    <Col className="col-12 mb-3 ml-auto mr-auto">
                            {(containerList.length>0)?containerList.map((element, key)=>{
                                // console.log( "CNTR  >>> ",key )
                                return (
                                    <Row key={key} style={{ marginBottom:'10px'}}>
                                        {/* <Label xl="2" lg="2" style={{fontWeight:'bold',fontSize:'20px',color:'#696969'}}>{key+1}.</Label>
                                        <Col className="col-12 text-right" xl="6" lg="6">
                                            <Input type="select" key={key}
                                            
                                                // style={{height:'35px',fonztSize:'10px',border:'0',borderBottom:'1px solid silver',borderRadius:'0',textAlignLast:'center'}}
                                                onChange={(e) => {
                                                    fncSelectContainerList(e, key)
                                                }}
                                                value={element.container_bookmark_seq?element.container_bookmark_seq:'0'}>
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
                                        </Col> */}
                                        {/* <Col className="col-12 text-right" xl="4" lg="4">
                                            <Button
                                                className="p-0 mr-1"
                                                color="default"
                                                outline
                                                size="sm"
                                                onClick={onAddContainer}
                                            >
                                            <i className="fa fa-plus" />
                                            </Button>
                                        </Col> */}
                                        
                                        <Col className="pb-1">
                                            <ButtonGroup className="pull-right pr-2">
                                                <Button
                                                    className="pt-0 pb-0"
                                                    color="default"
                                                    data-toggle="tooltip"
                                                    outline
                                                    id="addCntr"
                                                    size="sm"
                                                    type="button"
                                                    onClick={onAddContainer}
                                                >추가
                                                </Button>
                                            </ButtonGroup>
                                        </Col>
                                        {/* <Col className="col-12 text-right" xl="4" lg="4" style={{paddingTop:'3px', paddingRight:'30px'}}>
                                            <Button
                                                //className="btn-link"
                                                color="danger"
                                                data-toggle="tooltip"
                                                id="addCntr"
                                                outline
                                                size="sm"
                                                type="button"
                                                onClick={onAddContainer}
                                            >추가
                                            </Button>
                                        </Col> */}
                                        <Col xl="12" lg="12">
                                            <ContainerWdfc
                                                index={key}
                                                container={element}
                                                containerSpecialList={containerSpecialList}
                                                containerBookmarkList={containerBookmarkList}
                                                specialBookmarkList={specialBookmarkList}
                                                fncOnBlurContainer={fncOnBlurContainer}
                                                fncOnBlurSpecialList={fncOnBlurSpecialList}
                                                onDelContainer={onDelContainer}
                                                onDelSpecial={onDelSpecial}
                                                openType={"CARD"}
                                                fncSelectContainerList={fncSelectContainerList}
                                                {...props}
                                                />

                                        </Col>
                                    </Row>
                                )
                            }):<></>}
                        </Col>
                    </CardBody>
                </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={fncSaveContainerList}>Save</Button>{' '} */}
                <Button color="primary" onClick={toggle}>Apply</Button>{' '}
                {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
            </ModalFooter>
        </Modal>
    </>
    );
}

export default ContainerCardWdfc;