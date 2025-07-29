// "use client";

// import React, { useState } from "react";
// import {
//   Button,
//   Flex,
//   Form,
//   FormProps,
//   Input,
//   message,
//   Modal,
//   Spin,
// } from "antd/es";
// import { PlusOutlined } from "@ant-design/icons";
// import { useEmployeeTechnicianActions } from "@/providers/employeeTechnician-provider";
// import { IEmployeeTechnician } from "@/providers/employeeTechnician-provider/context";

// const CreateEmployeeTechnician: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const { createEmployeeTechnician } = useEmployeeTechnicianActions();

//   const handleCreate: FormProps<IEmployeeTechnician>["onFinish"] = (values) => {
//     setLoading(true);
//     try {
//       const payload = {
//         id: values.id,
//         name: values.name,
//         emailAddress: values.email,
//         buildingAddress: values.buildingAddress,
//         password: values.password,
//         latitude: values.latitude,
//         longitude: values.longitude,
//         salonId: values.salonId,
//         salonName: values.salonName,

//       };

//       createEmployeeTechnician(payload);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//       message.error("Creating Service Provider failed");
//     }
//     setIsModalOpen(false);
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setIsModalOpen(false);
//   };

//   const formItemLayout = {
//     labelCol: {
//       xs: { span: 24 },
//       sm: { span: 6 },
//     },
//     wrapperCol: {
//       xs: { span: 24 },
//       sm: { span: 14 },
//     },
//   };

//   return (
//     <>
//       {loading ? (
//         <div>
//           <Flex
//             justify="center"
//             align="center"
//             style={{ marginBottom: 20, width: "100%", height: "100vh" }}
//           >
//             <Spin size="large" />
//           </Flex>
//         </div>
//       ) : (
//         <>
//           <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
//             Service
//           </Button>

//           <Modal
//             title="Add an item"
//             closable={{ "aria-label": "Custom Close Button" }}
//             open={isModalOpen}
//             onCancel={handleCancel}
//             footer={[]}
//           >
//             <br />
//             <Form
//               {...formItemLayout}
//               name="add-food-item"
//               form={form}
//               style={{ maxWidth: 500 }}
//               initialValues={{ variant: "filled" }}
//               onFinish={handleCreate}
//             >
//               <Form.Item
//                 label="Name"
//                 name="name"
//                 rules={[
//                   { required: true, message: "Please enter Name" },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[{ required: true, message: "Please enter email" }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 label="Address"
//                 name="addres"
//                 rules={[{ required: true, message: "Please enter the address" }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 label="Contact Number"
//                 name="fat"
//                 rules={[{ required: true, message: "Please enter Contact Number" }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Button
//                 block
//                 type="primary"
//                 htmlType="submit"
//                 style={{
//                   width: "150px",
//                   fontWeight: "bold",
//                 }}
//                 size="large"
//               >
//                 Create
//               </Button>

//               <Button
//                 key="cancel"
//                 type="primary"
//                 onClick={handleCancel}
//                 style={{
//                   width: "100px",
//                   marginLeft: "1rem",
//                 }}
//                 size="large"
//               >
//                 Cancel
//               </Button>
//             </Form>
//           </Modal>
//         </>
//       )}
//     </>
//   );
// };

// export default CreateEmployeeTechnician;
