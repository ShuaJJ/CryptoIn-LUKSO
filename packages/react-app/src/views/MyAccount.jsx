import { Button } from "antd";
import React, { useEffect, useState } from "react";
import CryptoInGrid from "../components/Grid";
import PostModal from "../components/PostModal";

export default function MyAccount({ provider, address, loadWeb3Modal, rss3 }) {

  const btnStyle = {
    width: "100%",
    backgroundColor: "#00D3C5",
    border: "none",
    color: "#222",
    height: "56px",
    fontSize: "18px",
    fontWeight: "600",
    marginTop: "24px"
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    if (rss3) {
      try {
        const page1 = await rss3.items.getList({
            persona: address,
            limit: 32,
        });
        setActivities(page1);
      } catch(e) {
        console.log('rss3 error', e);
      }
    }
  }

  useEffect(() => {
    getActivities();
  }, [rss3])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ width: "100%", maxWidth: "666px", margin: "0 auto", paddingTop: "32px"}}>
      {address ? (
        <div>
          <Button style={btnStyle} onClick={showModal}>Post</Button>
          <CryptoInGrid activities={activities} />
        </div>
      ) : (
        <Button style={btnStyle} onClick={loadWeb3Modal}>Connect Wallet</Button>
      )}
      <PostModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} rss3={rss3} />
    </div>
  );
}
