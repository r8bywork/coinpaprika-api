import { useState } from "react";
import { Modal, Input, Button } from "antd";

interface ModalWindowProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
}

const ModalWindow = ({ visible, setVisible }: ModalWindowProps) => {
    const [password, setPassword] = useState("");

    const handleSubmitPassword = () => {
        if (password !== "matrix2023") return;
        setVisible(false);
    };

    return (
        <Modal
            title="Please enter password"
            open={visible}
            closable={false}
            maskClosable={false}
            onOk={handleSubmitPassword}
            footer={null}
        >
            <Input.Password
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onPressEnter={handleSubmitPassword}
            />
            <Button onClick={handleSubmitPassword} disabled={!password}>
                Submit
            </Button>
        </Modal>
    );
};

export default ModalWindow;
