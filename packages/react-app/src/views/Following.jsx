
import { LoadingOutlined } from "@ant-design/icons";
import React, {useState, useEffect} from "react";
import CryptoInGrid from "../components/Grid";

export default function Following({ address, rss3 }) {

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const getActivities = async () => {
    if (rss3) {
      setLoading(true);
      try {
        const page1 = await rss3.items.getList({
            persona: address,
            limit: 12,
            linkID: 'following',
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
  
  if (loading) {
    return <div style={{fontSize: '32px', color: '#fff', margin: '32px 0', textAlign: 'center'}}>
        <LoadingOutlined />
      </div>
  }

  if (activities.length == 0) {
    return <div style={{textAlign: 'center', marginTop: '32px'}}>
              You haven't followed anyone yet...
            </div>
  }

  return (
    <div>
      <div style={{margin: '32px auto', maxWidth: "1000px"}}>
        <CryptoInGrid activities={activities} columnCount={5} />
      </div>
    </div>
  );
}
