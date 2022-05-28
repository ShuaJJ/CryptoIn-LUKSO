import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";


export default function ArweaveImage({ txId, width = "100%", height = "100px" }) {

    const [data, setData] = useState();

    const getImageData = async () => {
        const imageData = await axios.get("https://arweave.net/"+txId);
        setData(imageData.data);
    }
  
    useEffect(() => {
        getImageData();
    }, []);
  
    if (data) {
        return <img src={data} style={{width, height}} />
    }

    return <div style={{width, height, background: "#ccc", color: "#666"}}><LoadingOutlined /></div>
  }