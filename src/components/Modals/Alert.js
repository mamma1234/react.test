/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  Input,
  Row,Col,Label
} from "reactstrap";

export default function Alert(props) {
  // modals states
  const {open,message, status} = props;
  // carousel states and functions
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [classic, setClassic] = React.useState(false);

/*  React.useEffect(()=>{
	  if(open) {
	    setTimeout(()=>{ console.log(">>>>alert");
		  props.close();
	    },2000);
	  }
   },[open]);*/

  return (
    <>
        <Modal //size="sm"
                isOpen={open}
                toggle={props.close}
              >
                <div className="no-border-header">
                  <button
                    className="close"
                    type="button"
                    onClick={props.close}
                  >
                    <span>×</span>
                  </button>
                   
                </div>
                <div className="modal-body pl-3">
                	<Row>
                		<Col className="col-2">
                		{status==="success"?<i className="fa fa-check-square-o fa-3x text-info" aria-hidden="true"></i>:
                            <i className="fa fa-exclamation-triangle fa-3x text-danger mr-5" aria-hidden="true"></i>}
                		</Col>
                		<Col className="pt-2">
                		<h4 className="text-center mt-0"> {message}</h4> </Col>
                	</Row>
                
                </div>
                <div className="modal-footer">
               		<Button block  color="info" onClick={props.close}>확인</Button>
                </div>
        </Modal>
    </>
  );
}

