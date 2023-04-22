import React, { Component } from "react";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import { validateUsernamePassword } from "../api/api.service";
import { getCookieToken } from "../utils/helpers";
const { Title } = Typography;
const { Content } = Layout;

export default class SignIn extends Component {
  componentDidMount() {
    const authToken = getCookieToken("a_t");
  }
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
      const { username = "", password = "" } = values;
      const json = { username, password };
      validateUsernamePassword(json);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <button onClick={() => validateUsernamePassword()}>Click here</button>
        <Layout className="layout-default layout-signin">
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 0 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15 text-center">Sign In</Title>
                <Form
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="username" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="password" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
}
