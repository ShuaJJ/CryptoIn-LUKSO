
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, notification, Tag, Tooltip, Button } from 'antd';
import React, {useEffect, useRef, useState} from "react";
import RSS3, { utils as RSS3Utils } from 'rss3';
import './CreateProfile.css';
const { ethers } = require("ethers");
const { LSPFactory } = require('@lukso/lsp-factory.js');

export default function CreateProfile({ address, rss3 }) {

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');
  const [portforlio, setPortforlio] = useState('');
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onIntroChange = (e) => {
    setIntro(e.target.value);
  };

  const onPortforlioChange = (e) => {
    setPortforlio(e.target.value);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }

    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

    async function createUniversalProfile() {

        if (!address || !rss3) {
            notification['error']({
                message: "Please make sure you have connected with your wallet"
            })
            return;
        }

        if (!name) {
            notification['error']({
                message: "Please at least enter a name"
            })
            return;
        }

        setLoading(true);

        const PRIVATE_KEY = '0xcf426ab7e5d2a7c1954496899b40874543a9227ed72ff2bb20b5ee85afcdfdc7';

        try {
            const lspFactory = new LSPFactory('https://rpc.l16.lukso.network', {
                deployKey: PRIVATE_KEY,
                chainId: 2828,
            });

            console.log('QQQQ', address);

            const deployedContracts = await lspFactory.UniversalProfile.deploy({
                controllerAddresses: [address], // our EOA that will be controlling the UP
                lsp3Profile: {
                    name: name,
                    description: intro,
                    tags: tags,
                    links: portforlio ? [
                    {
                        title: 'My Website / Portforlio',
                        url: portforlio,
                    },
                    ] : [],
                },
            });
        
            const myUPAddress = deployedContracts.LSP0ERC725Account.address;
            console.log('my Universal Profile address: ', myUPAddress);
            console.log('AAAAA', myUPAddress);
            const account1 = {
                id: RSS3Utils.id.getAccount('UniversalProfile', myUPAddress), // 'Twitter-DIYgod'
            };
            console.log('QQQQ2', account1);
            await rss3.profile.accounts.post(account1);
            await rss3.files.sync();
        
            setLoading(false);
        } catch (e) {
            console.log('BBBBB', e);
        }
      }

  return (
    <div className="profile-form">
       <div className="form-title">Enter a name for your profile</div>
       <Input placeholder="Name" onChange={onNameChange} />

       <div className="form-title">Introduce yourself(Optional)</div>
       <Input placeholder="Intro" onChange={onIntroChange} />

       <div className="form-title">My Personal Website / Portforlio(Optional)</div>
       <Input placeholder="URL" onChange={onPortforlioChange} />

       <div className="form-title">Please enter some of your skills</div>
        <div className="tags">
        {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== 0}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> Add Skill
        </Tag>
      )}
        </div>
        <Button 
            loading={loading}
            onClick={createUniversalProfile} 
            type="primary"
        >
            Create
        </Button>
    </div>
  );
}


// 0xD774Cd49F34202E9a155b8Ee61D737C4D1CacbB8
// 0xcf426ab7e5d2a7c1954496899b40874543a9227ed72ff2bb20b5ee85afcdfdc7


// UP: 0x7e0D4C05a1f7AEF67848550260f1354880c7e9Fc