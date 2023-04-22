import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  getAllClasses,
  getAllSmsTemplates,
  getAllStudets,
  postSendSmsToParent,
} from "../api/api.service";
import SmsModal from "../components/SmsModal";

const SendSms = () => {
  const [smsTemplates, setSmsTemplates] = useState([]);
  const [showSmsModal, setSmsModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [classes, setClasses] = useState([]);
  const getClassesData = () => {
    getAllClasses().then((res) => setClasses(res));
  };
  const getTemplatesData = () => {
    getAllSmsTemplates()
      .then((res) => {
        setSmsTemplates(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTemplatesData();
    getClassesData();
  }, []);
  const handleTemplateSelection = (templateId) => {
    const selectedTemp = smsTemplates.find(
      (item) => item.templateId === templateId
    );
    setSelectedTemplate(selectedTemp);
    console.log(selectedTemp);
    setSmsModal(true);
  };
  const columns = [
    {
      title: "Template ID",
      dataIndex: "templateId",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Message Content",
      dataIndex: "message",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => {
        return (
          <Button
            onClick={() => handleTemplateSelection(record.templateId)}
            size="small"
            type="link"
          >
            Send SMS
          </Button>
        );
      },
    },
  ];

  const sendSmsToParent = (values, templateId) => {
    postSendSmsToParent(values, templateId).then((res) => console.log(res));
  };

  return (
    <>
      <div>
        <Table columns={columns} dataSource={smsTemplates} size="small" />
      </div>
      {showSmsModal ? (
        <SmsModal
          classes={classes}
          selectedTemplate={selectedTemplate}
          showSmsModal={showSmsModal}
          setSmsModal={(value) => setSmsModal(value)}
          sendSmsToParent={(values, templateId) =>
            sendSmsToParent(values, templateId)
          }
        />
      ) : // <Modal
      //   title={`${selectedTemplate?.title || ""} ( ${
      //     selectedTemplate?.templateId || ""
      //   } )`}
      //   width={700}
      //   centered
      //   open={showSmsModal}
      //   onOk={() => setSmsModal(false)}
      //   onCancel={() => setSmsModal(false)}
      //   footer={[
      //     <Button
      //       key="submit"
      //       type="primary"
      //       onClick={() => setSmsModal(false)}
      //       htmlType="submit"
      //     >
      //       Submit
      //     </Button>,
      //   ]}
      // >
      //   <Form layout="horizontal" onFinish={onFinish} autoComplete="off">
      //     {Object.values(selectedTemplate.variables).map((item) => {
      //       if (item.type === "text") {
      //         return (
      //           <Form.Item name={item.value}>
      //             <Input placeholder={`Enter ${item.value}`} />
      //           </Form.Item>
      //         );
      //       }
      //       return null;
      //     })}
      //   </Form>
      // </Modal>
      null}
    </>
  );
};

export default SendSms;
