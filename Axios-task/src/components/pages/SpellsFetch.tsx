import axios from "axios";
import { useEffect, useState } from "react";


function Spells() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios
        .get("https://hp-api.onrender.com/api/spells")
        .then(function (response) {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    
    if (loading) return <div>Loading....</div>;
    if (error) return <div>Error: {error}</div>;
    
    console.log(data);
    return (
      <>
        <div>
          <h1>Posts</h1>
          <ul>
            {data.map((post:any) => (
              <li><p>{post.name}---{post.description}</p></li>
            ))}
          </ul>
        </div>
      </>
    );
}

export default Spells