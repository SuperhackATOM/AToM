'use client'

import styles from "./style.module.scss"
import { Button, Input, Form } from 'antd';

type FieldType = {
    address: string;
    location?: string;
    context?: string;
}


const Attest = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            name="basic"
            labelCol={{ span: 32 }}
            wrapperCol={{ span: 32 }}
            layout={"vertical"}
            style={{ maxWidth: 384 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.attest}
        >
            <Form.Item<FieldType>
                label="Recipient ETH address:"
                name="address"
                rules={[{ required: true, message: 'Please input recipient address!' }]}

            >
                <Input placeholder={"Recipient ETH address here..."} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Location:"
                name="location"
                rules={[{ required: false}]}
            >
                <Input placeholder={"Enter location of meet"} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Context:"
                name="context"
                rules={[{ required: false }]}
            >
                <Input placeholder={"Enter context of meet"} />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        // <Form className={styles.attest}>
        //     <h4 className={styles.title}>Attest meet with</h4>
        //     <Input placeholder={"Enter recipient ETH address here..."}/>
        //     <Input placeholder={"Enter location of meet"}/>
        //     <Input placeholder={"Enter context of meet"}/>
        //     <Button>Attest</Button>
        // </Form>
    );
};

export { Attest }
