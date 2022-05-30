import { notification } from "antd";
import { useEffect, useState } from "react";
import { Client } from '@xmtp/xmtp-js'

import './Conversations.css';
import Messages from "../components/Messages";


export default function Conversations({ signer }) {

  const [client, setClient] = useState(null);

  const setupClient = async () => {
    try {
      const clientt = await Client.create(signer);
      setClient(clientt);
    } catch(e) {
      notification['error']({
        message: 'Error',
        description: 'Cannot initialize a client'
      })
      console.error(e);
    }
  }

  useEffect(() => {
    if (!client) {
      setupClient();
    }
  }, [])

  return (
    <div className="convs">
      <div className="convs-intro">Here you can message the developers of this dapp but under some conditions:</div>
      <Messages client={client} recipient="0xC4cD7F3F5B282d40840E1C451EC93FFAE61514f9" />
    </div>
  );
}
