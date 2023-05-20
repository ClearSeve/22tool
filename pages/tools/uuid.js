import { useState } from "react";
import ToolLayout from '@/layouts/ToolLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import { Table, Empty, Row, Col, message, Button, Form, Input, Radio } from "antd";
import copy from 'copy-to-clipboard';
import { v4 as uuidv4 } from 'uuid';
import { InputNumber } from 'antd';

export default function ToolPage(props) {
  const [uuids, setUUIDs] = useState("");

  const onFinish = (values) => {
    let generatedUUIDs = "";
    for (let i = 0; i < values.count; i++) {
      const uuid = uuidv4();
      if (!values.hyphens) {
        generatedUUIDs += uuid.toString().replace(/-/g, "");
      } else {
        generatedUUIDs += uuid.toString();
      }
      generatedUUIDs += "\n";
    }
    if (values.uppercase) {
      generatedUUIDs = generatedUUIDs.toUpperCase();
    }
    setUUIDs(generatedUUIDs);
  };

  const onCopy = () => {
    if (!uuids) {
      return;
    }
    copy(uuids);
    message.success("已复制到粘贴板");
  }

  const onClear = () => {
    setUUIDs("");
  };

  return (
    <ToolLayout {...props}>
      <Form onFinish={onFinish}>
        <Form.Item label="生成个数" name="count" initialValue={1}>
          <InputNumber min={1} max={99999} style={{ width: "200px" }} />
        </Form.Item>
        <Form.Item label="字母大写" name="uppercase" initialValue={true}>
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="含连字符" name="hyphens" initialValue={true}>
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            生成UUID
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={onCopy}>
            复制结果
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={onClear}>
            清空结果
          </Button>
        </Form.Item>
        <Form.Item>
          <Input.TextArea readOnly value={uuids} rows={6} />
        </Form.Item>
      </Form>
    </ToolLayout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      tool: await RequestUtil.getTool(context),
    },
  };
}

