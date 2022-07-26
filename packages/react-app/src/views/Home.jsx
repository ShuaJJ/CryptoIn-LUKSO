import { LoadingOutlined } from "@ant-design/icons";
import React, {useState, useEffect} from "react";
import CryptoInGrid from "../components/Grid";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ rss3 }) {
  
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const getActivities = async () => {
    if (rss3) {
      setLoading(true);
      try {
        const page1 = await rss3.items.getList({
            persona: '0xe6259caE435525D698b26E6c5792CA8E6B410D2C',
            limit: 12,
        });
        setActivities(page1);
        setLoading(false);
      } catch(e) {
        console.log('rss3 error', e);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getActivities();
  }, [rss3])

  return (
    <div>
      {loading ? 
      <div style={{fontSize: '32px', color: '#fff', margin: '32px 0', textAlign: 'center'}}>
        <LoadingOutlined />
      </div> : <div style={{margin: '32px auto', maxWidth: "1000px"}}>
        <CryptoInGrid activities={activities} columnCount={5} />
      </div>
      }
    </div>
  );
}

export default Home;
