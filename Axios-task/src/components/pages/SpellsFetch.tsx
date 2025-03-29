import axios from "axios";
import { useEffect, useState } from "react";

function Spells() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://hp-api.onrender.com/api/characters/students")
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

  return (
    <>
      <div>
        <h1>Posts</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {data
            .filter(
              (post: any) => post.image !== "" && post.yearOfBirth !== null
            )
            .map((post: any) => (
              <div>
                <p>
                  <b>Name: </b> {post.name} <br />
                  <b>Gender:</b> {post.gender} <br />
                  <b>DOB:</b> {post.dateOfBirth} <br />
                  <b>Actor Name:</b> {post.actor} <br />
                </p>
                <img
                  src={post.image}
                  alt="image"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Spells;
