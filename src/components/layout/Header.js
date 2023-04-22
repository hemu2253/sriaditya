import { useEffect } from "react";
import { Row, Col, Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

function Header({ name, subName }) {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/dashboard">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </>
  );
}

export default Header;
