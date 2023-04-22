import { Button, Col, Form, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  getAllClasses,
  getAllStudets,
  getAllTransportationModes,
  getAllVillages,
} from "../api/api.service";

const initialFilters = {
  classIds: [],
  villageIds: [],
  transportationIds: [],
};

const Students = () => {
  const [showTableLoading, setTableLoadingState] = useState(false);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [villages, setVillages] = useState([]);
  const [transportationModes, setTransportationModes] = useState([]);
  const [filterParams, setFilters] = useState(initialFilters);
  const getStudentsData = (filterParamsData) => {
    setTableLoadingState(true);
    const params = filterParamsData;
    getAllStudets(params)
      .then((res) => {
        setStudents(res);
        setTableLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
        setTableLoadingState(false);
      });
  };
  const getClassesData = () => {
    getAllClasses().then((res) => setClasses(res));
  };
  const getVillagesData = () => {
    getAllVillages().then((res) => setVillages(res));
  };
  const getTransportationData = () => {
    getAllTransportationModes().then((res) => setTransportationModes(res));
  };
  useEffect(() => {
    getStudentsData(filterParams);
    getClassesData();
    getVillagesData();
    getTransportationData();
  }, []);
  const columns = [
    {
      title: "Roll ID",
      dataIndex: "roll_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Class",
      dataIndex: "class",
    },
    {
      title: "Contact No",
      dataIndex: "primaryContact",
    },
    {
      title: "Village",
      dataIndex: "villageName",
    },
    {
      title: "Mode of Transport",
      dataIndex: "modeOfTravel",
    },
  ];

  const classesOptions = classes.map((item) => {
    return {
      label: item.class,
      value: item.id,
    };
  });

  const villageOptions = villages.map((item) => {
    return {
      label: item.village,
      value: item.id,
    };
  });

  const transportationOptions = transportationModes.map((item) => {
    return {
      label: item.modeOfTravel,
      value: item.id,
    };
  });

  const onFinish = (values) => {
    const filterParams = {
      classIds: values?.class ? values.class : [],
      villageIds: values?.village ? values.village : [],
      transportationIds: values?.transportation ? values.transportation : [],
    };
    if (!values.class && !values.transportation && !values.village) {
      return;
    }
    getStudentsData(filterParams);
  };

  return (
    <div className="layout-content">
      <h3>Filters</h3>
      <Form
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row>
          <Col span={8}>
            <Form.Item label="Class" name="class">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={[]}
                options={classesOptions}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Village" name="village">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={[]}
                options={villageOptions}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Mode of Transport" name="transportation">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={[]}
                options={transportationOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button
                loading={showTableLoading}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <br />

      <Table
        loading={showTableLoading}
        columns={columns}
        dataSource={students}
        size="medium"
        pagination={{ pageSize: 15, total: students?.length }}
      />
    </div>
  );
};

export default Students;
