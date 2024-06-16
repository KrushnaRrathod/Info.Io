import axios from "axios";
import Nav from "../../Nav.jsx";
import { useState, useEffect } from "react";
import Story from "../main/Story.jsx";
import { useSelector } from "react-redux";
import './yourstory.css'
import { Link } from "react-router-dom";

const YourStory = () => {
  const firstName = useSelector((state) => state.firstName.firstName);
  const lastName = useSelector((state) => state.lastName.lastName);
  const email = useSelector((state) => state.email.email);

  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/user/yourstory", { email });
        setAllData(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

  const handleDeleteStory = (storyId) => {
    setAllData(allData.filter((story) => story._id !== storyId));
  };

  return (
    <>
      <Nav active3={`active`} userName={firstName} />
      <div className="story-container">
        {loading ? (
          <p>Loading...</p>
        ) : allData.length === 0 ? (
          <div className="not-upload-story">
            <p className="not-story">You have not uploaded any stories yet.</p>
            <p className="upload-story"><Link to="/profile" style={{textDecoration:"none", margin:"30px"}} className=" btn btn-primary">Upload Story</Link></p>
          </div>
        ) : (
          allData.map((story) => (
            <Story
              key={story._id}
              storyId={story._id}
              firstName={firstName}
              lastName={lastName}
              email={email}
              title={story.title}
              description={story.description}
              story={story.story}
              isProfile={true} // Indicates that this is the user's profile
              createdAt={story.createdAt}
              onDelete={handleDeleteStory}
            />
          ))
        )}
      </div>
    </>
  );
};

export default YourStory;
