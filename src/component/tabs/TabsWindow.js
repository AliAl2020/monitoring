import React, { useState } from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import GreenWindow from '../windows/green/GreenWindow';
import RedWindow from '../windows/red/RedWindow';

const TabsWindow = () => {
  const [activeTab, setActiveTab] = useState('green');

  return (
    <Row className="m-3">
      <Col sm={2}>
        <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav.Item>
            <Nav.Link eventKey="green">Green Window</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="red">Red Window</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={10}>
        {activeTab === 'green' && <GreenWindow />}
        {activeTab === 'red' && (
                            <div>
                                <RedWindow />
                                <GreenWindow />
                            </div>
                        )}
      </Col>
    </Row>
  );
};

export default TabsWindow;
