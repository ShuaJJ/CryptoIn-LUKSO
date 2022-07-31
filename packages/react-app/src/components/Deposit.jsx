import {WalletABI} from '../contracts/wallet';
import { InputNumber, Modal, Button, notification } from 'antd';
import { InfoOutlined, WalletOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
const ethers = require("ethers");

export default function Deposit({ address, signer }) {

    const walletContract = new ethers.Contract("0x177131ED637DB5be04B897126a7b1EEcdfd1aAcf", WalletABI, signer);

    const [balance, setBalance] = useState("0.0");
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0.01);

    const deposit = async () => {
        try {
            const options = {value: ethers.utils.parseEther(amount.toString())}
            await walletContract.deposit(options)
        } catch(e) {
            notification["error"]({
                message: 'Error',
                description:
                  e.toString(),
              });
        }
    }

    const getBalance = async () => {
        const bal = await walletContract.getBalance();
        setBalance(ethers.utils.formatEther(bal));
    }

    useEffect(() => {
        if (signer) {
            getBalance();
        }
    }, [signer])

    const onChange = (value) => {
        setAmount(value);
      };


      const [isModalVisible, setIsModalVisible] = useState(false);

      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = async () => {
        setLoading(true);
        await deposit();
        setLoading(false);
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };


    return <>

    <Button type="primary" onClick={showModal}>
        {address && (address.substring(0, 4) +  '...' + address.substring(address.length-4, address.length))} <WalletOutlined /> {balance}
      </Button>
      <Modal 
        title="Deposit to your CryptoIn wallet" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        okText="Deposit"
        okButtonProps={{loading: loading}}
    >
          <div style={{margin: "15px 0"}}>Deposit ethers to the CryptoIn wallet, and later use them to tip others</div>
        <InputNumber min={0.01} max={9999} value={amount} onChange={onChange} style={{width: "100%"}} />
      </Modal>
    </>


  }