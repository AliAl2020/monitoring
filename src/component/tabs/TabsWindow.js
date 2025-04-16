import React, { useState } from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import GreenWindow from '../windows/green/GreenWindow';
import RedWindow from '../windows/red/RedWindow';
import './TabsWindow.css';

const TabsWindow = () => {
  const [activeTab, setActiveTab] = useState('green');

  return (
    <Container fluid className="p-0 d-flex">
      {/* Sidebar with Bootstrap Grid */}
      <div className="tab-buttons">
        <Row className="g-3"> {/* g-3 = gap between rows */}
          <Col xs={12}>
            <Nav
              variant="pills"
              className="flex-column"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
            >
              <Nav.Item className="bgbt">
                <Nav.Link eventKey="green" className="custom-tab">Green Window</Nav.Link>
              </Nav.Item>
              <Nav.Item className="bgbt">
                <Nav.Link eventKey="red" className="custom-tab">Red Window</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </div>

      {/* Main content */}
      <div className="tab-content-area flex-grow-1 p-3">
        {activeTab === 'green' && <GreenWindow />}
        {activeTab === 'red' && <RedWindow />}
      </div>
    </Container>
  );
};

export default TabsWindow;
