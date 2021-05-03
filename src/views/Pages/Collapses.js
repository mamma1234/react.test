import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
} from "reactstrap";

function Collapses() {
  // collapse states and functions
  const [collapses, setCollapses] = React.useState([]);
  const changeCollapse = collapse => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter(prop => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  };
  return (
    <>
     <div className="wrapper">
        <div className="profile-content section">
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
          <h2>teset</h2>
      <div id="acordeon">
        <div aria-multiselectable={true} id="accordion" role="tablist">
          <Card className="no-transition">
            <CardHeader className="card-collapse" id="headingOne" role="tab">
              <h5 className="mb-0 panel-title">
                <a
                  aria-expanded={collapses.includes(1)}
                  className="collapsed"
                  data-parent="#accordion"
                  href="#pablo"
                  id="collapseOne"
                  onClick={e => {
                    e.preventDefault();
                    changeCollapse(1);
                  }}
                >
                  Default Collapsible Item 1{" "}
                  <i className="nc-icon nc-minimal-down" />
                </a>
              </h5>
            </CardHeader>
            <Collapse isOpen={collapses.includes(1)}>
              <CardBody>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                aliqua put a bird on it squid single-origin coffee nulla
                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                beer labore wes anderson cred nesciunt sapiente ea proident.
                Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                beer farm-to-table, raw denim aesthetic synth nesciunt you
                probably haven't heard of them accusamus labore sustainable
                VHS.
              </CardBody>
            </Collapse>
            <CardHeader className="card-collapse" id="headingTwo" role="tab">
              <h5 className="mb-0 panel-title">
                <a
                  aria-controls="collapseTwo"
                  aria-expanded={collapses.includes(2)}
                  className="collapsed"
                  data-parent="#accordion"
                  href="#pablo"
                  id="collapseTwo"
                  onClick={e => {
                    e.preventDefault();
                    changeCollapse(2);
                  }}
                >
                  Default Collapsible Item 2{" "}
                  <i className="nc-icon nc-minimal-down" />
                </a>
              </h5>
            </CardHeader>
            <Collapse isOpen={collapses.includes(2)}>
              <CardBody>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                aliqua put a bird on it squid single-origin coffee nulla
                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                beer labore wes anderson cred nesciunt sapiente ea proident.
                Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                beer farm-to-table, raw denim aesthetic synth nesciunt you
                probably haven't heard of them accusamus labore sustainable
                VHS.
              </CardBody>
            </Collapse>
            <CardHeader
              className="card-collapse"
              id="headingThree"
              role="tab"
            >
              <h5 className="mb-0 panel-title">
                <a
                  aria-controls="collapseThree"
                  aria-expanded={collapses.includes(3)}
                  className="collapsed"
                  data-parent="#accordion"
                  href="#pablo"
                  id="collapseThree"
                  onClick={e => {
                    e.preventDefault();
                    changeCollapse(3);
                  }}
                >
                  Default Collapsible Item 3{" "}
                  <i className="nc-icon nc-minimal-down" />
                </a>
              </h5>
            </CardHeader>
            <Collapse isOpen={collapses.includes(3)}>
              <CardBody>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                aliqua put a bird on it squid single-origin coffee nulla
                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                beer labore wes anderson cred nesciunt sapiente ea proident.
                Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                beer farm-to-table, raw denim aesthetic synth nesciunt you
                probably haven't heard of them accusamus labore sustainable
                VHS.
              </CardBody>
            </Collapse>
          </Card>
        </div>
        {/* end acordeon */}
      </div>
      </div>
      </div>
    </>
  );
}

export default Collapses;