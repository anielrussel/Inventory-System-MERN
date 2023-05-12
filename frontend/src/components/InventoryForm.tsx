import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import useInventoryContext from "../hooks/useInventoryContext";
import useAuthContext from "../hooks/useAuthContext";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const InventoryForm: React.FC = () => {
  const inventoryContext = useInventoryContext();

  if (!inventoryContext) {
    return null; // or render a loading state
  }
  const { dispatch } = inventoryContext;
  const { user } = useAuthContext()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
  };

  const Option = Select.Option;

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  const handleBlur = () => {
    console.log("blur");
  };

  const handleFocus = () => {
    console.log("focus");
  };

  const notify = () => toast("Inventory Added");

  const [form] = Form.useForm();

  const handleSubmit = async () => {
  
    const values = form.getFieldsValue();
    
    try {
      const response = await axios.post("https://inventory-sytem-mern.onrender.com/api/inventory", values, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });
  
      if (response.status === 200) {
        form.resetFields(); // Reset form fields
        console.log("new inventory added", response.data);
        dispatch({ type: "CREATE_INVENTORY", payload: response.data });
        notify()
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <div className="flex justify-end">
        <Button type="primary" onClick={showModal} className="bg-black">
          Add Inventory
        </Button>
      </div>
      <Modal
        title="Add a new Inventory"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCancel}
        okButtonProps={{ style: { backgroundColor: '#f50', borderColor: '#f50' } }}
        className="overflow-x-hidden"
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={handleSubmit}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ type: "number", required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price each(₱)"
            rules={[{ type: "number", required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="isAvailable"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a status"
              optionFilterProp="children"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              filterOption={(input, option) =>
                option?.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="available">Available</Option>
              <Option value="not available">Not Available</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" className="bg-black">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryForm;
