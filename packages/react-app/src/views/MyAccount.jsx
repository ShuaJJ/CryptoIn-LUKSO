import { Button } from "antd";
import React, { useState } from "react";

export default function MyAccount({ provider, address, loadWeb3Modal }) {

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

  return (
    <div style={{ width: "100%", maxWidth: "666px", margin: "0 auto", paddingTop: "32px"}}>
      {address ? (
        <Button style={btnStyle}>Post</Button>
      ) : (
        <Button style={btnStyle} onClick={loadWeb3Modal}>Connect Wallet</Button>
      )}
    </div>
  );
}
