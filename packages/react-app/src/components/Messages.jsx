import { useState, useEffect } from "react"
import { Drawer, Button, Input, notification } from 'antd';
import { GraphQLClient, gql } from "graphql-request";
import CyberConnect, { Env, Blockchain } from "@cyberlab/cyberconnect";
import './Messages.css';


export default function Messages({ provider, client, recipient, isCyberConnect }) {

    const [conversation, setConversation] = useState(null)
    const [messages, setMessages] = useState([]);
    const [sendLoading, setSendLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [followed, setFollowed] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    const [visible, setVisible] = useState(false);

    const graphClient = new GraphQLClient("https://api.cybertino.io/connect/");

    const cyberConnect = new CyberConnect({
        namespace: "CryptoIn",
        env: Env.PRODUCTION,
        chain: Blockchain.ETH,
        provider: provider.provider,
        signingMessageEntity: "CryptoIn",
    });
    
    const follow = async (targetAddr) => {
        setFollowLoading(true);
        await cyberConnect.connect(targetAddr);
        setFollowLoading(false);
        getFollowers();
    }
    
    const unfollow = async (targetAddr) => {
      await cyberConnect.disconnect(targetAddr);
    }

    const GET_CONNECTIONS = gql`
        query($address: String!, $recipient: String!) {
            connections(
                fromAddr: $recipient
                toAddrList: [$address]
            ) {
                followStatus {
                    isFollowed
                }
            }
        }
        `;

    const getFollowers = async () => {
        const res = await graphClient.request(GET_CONNECTIONS, { address: client.address, recipient: recipient.address });
        if (res?.connections) {
            setFollowed(res.connections[0].followStatus.isFollowed);
        } else {
            setFollowed(false);
        }
    }

    const showDrawer = async () => {
        setVisible(true);
        setConversation(await client.conversations.newConversation(recipient.address))
    };

    const onClose = () => {
        setVisible(false);
    };

    const sendMsg = async () => {
        if (isCyberConnect && !followed) {
            notification['error']({
                message: "Error",
                description: "You haven't followed this address through CyberConnect"
            })
            return;
        }
        if (!msg || msg.length < 2) {
            notification['error']({
                message: "Error",
                description: "Msg too short"
            })
            return;
        }
        if (conversation) {
            setSendLoading(true)
            try {
                await conversation.send(msg)
                setSendLoading(false)
                setMsg('');
                getMsgs();
            } catch(e) {
                notification['error']({
                    message: "Error",
                    description: "Message cannot be sent"
                })
                setSendLoading(false)
            }
        } else {
            notification['error']({
                message: "Error",
                description: "Conversation was not initialized"
            })
        }
    }

    const onChange = (e) => {
        setMsg(e.target.value);
      };

    const getMsgs = async () => {
        if (!conversation) {
          return
        }
        setMessages(await conversation.messages({ pageSize: 100 }))
      }

      useEffect(() => {
        getMsgs()
      }, [conversation])

      useEffect(() => {
        getFollowers()
      }, [])

      const getActionButton = () => {
          if (isCyberConnect) {
              if (followed) {
                  return (
                    <Button 
                        onClick={showDrawer}
                        type="primary"
                    >
                        Chat
                    </Button>
                  )
              } else {
                  return (
                    <Button 
                        onClick={() => { follow(recipient.address) }}
                        type="primary"
                        loading={followLoading}
                    >
                        Follow
                    </Button>
                  )
              }
          }
      }

    return (
      <div>
        {client && (
            <div className="conversation-item">
                <img src={recipient.avatar} />
                {recipient.name}
                {getActionButton()}
            </div>
        )}
        <Drawer title={"Chat with " + recipient.name} placement="right" onClose={onClose} visible={visible} className="drawer-wrapper" width={555}>
            <div className="messages">
                {messages.map((msg) => {
                    const isSender = msg.senderAddress === recipient.address
                    return (
                <div key={msg.id} className={isSender ? "message" :"my-message" }>
                    <span className="msg-item">{msg.content}</span>
                </div>
                )})}
            </div>
            <Input.Group compact className="send-input">
                <Input style={{ width: 'calc(100% - 110px)' }} value={msg} onChange={onChange} />
                <Button 
                    style={{width: "60px"}} 
                    type="primary" 
                    onClick={sendMsg} 
                    loading={sendLoading}
                    disabled={isCyberConnect && !followed}
                >
                    Send
                </Button>
            </Input.Group>
        </Drawer>
      </div>
    );
  }
  