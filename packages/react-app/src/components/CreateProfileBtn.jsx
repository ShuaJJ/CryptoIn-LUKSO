import React, { useState } from "react";
import { Button, Modal } from 'antd';
import CreateProfile from "../views/CreateProfile";

export default function CreateProfileBtn({ address, rss3 }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <div>
        <Button type="primary" onClick={showModal}>
            Create Profile
        </Button>
        <Modal 
            title="Create a Universal Profile" 
            visible={isModalVisible} 
            footer={null}
            onCancel={handleCancel}
        >
            <CreateProfile address={address} rss3={rss3} />
        </Modal>
    </div>
  }