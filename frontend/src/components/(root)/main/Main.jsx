import { useSelector } from "react-redux";
import Nav from "../../Nav.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import Story from './Story.jsx'; // Import the Story component

const Main = () => {
  const firstName = useSelector(state => state.firstName.firstName);
  const lastName = useSelector(state => state.lastName.lastName);
  const email = useSelector(state => state.email.email);
  const phoneNumber = useSelector(state => state.phoneNumber.phoneNumber);

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/user/getStory");
        setAllData(response.data.data); // Make sure to access the 'data' property correctly
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // Add an empty dependency array to run useEffect only once

  return (
    <>
      <Nav active1={`active`} userName={firstName} />
      <div className="story-container">
        {allData.map((story) => (
          <Story 
            key={story._id}
            firstName={story.owner.firstName}
            lastName={story.owner.lastName}
            email={story.owner.email}
            title={story.title}
            description={story.description}
            story={story.story}
            createdAt={story.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default Main;
