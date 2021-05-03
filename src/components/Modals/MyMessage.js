/*eslint-disable*/
import React,{useState,useEffect} from "react";
// reactstrap components
import {
  CardBody,Row,Col,Button
} from "reactstrap";
import axios from "axios";
import Badge from "reactstrap/lib/Badge";
import {Link} from "react-router-dom";
export default function MyProfile(props) {
    const [data,setData] = useState([]);
    
    useEffect(() => {
        console.log(props.user)
        if(props.user) {
        	 /*axios.post("/api/companyUserSearch",{userno:props.user.user}).then(
        	            res=> {
        	                if(res.statusText==="OK") {
        	                    
        	                    console.log(res.data)
        	                    setData(res.data)
        	                }else {
        	                    setData([])
        	                }
        	            }
        	        );*/
        }

        return function cleanup() {
          console.log('cleanup')
        };
      },[props.user]);

    return (
        <>
            <div>
                <div className="mw-100">
                    <CardBody>
                        <div>
                            <Col>
                            <span style={{fontSize:'24px',fontWeight:'bold'}}className="card-category pb-1">메세지 서비스 준비중입니다.</span>
                            </Col>  
                        </div>
                    </CardBody>
                </div>
            </div>            
        </>
    );
}

