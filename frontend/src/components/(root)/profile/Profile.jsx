import { useSelector } from "react-redux";
import Nav from "../../Nav.jsx";
import './profile.css';
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const firstName = useSelector(state => state.firstName.firstName);
  const lastName = useSelector(state => state.lastName.lastName);
  const email = useSelector(state => state.email.email);
  const phoneNumber = useSelector(state => state.phoneNumber.phoneNumber);

  const [story, setStory] = useState({
    email: "",
    title: "",
    description: "",
    story: ""
  });

  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    setStory(prevStory => ({ ...prevStory, email: email }));
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory({
      ...story,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/story", story);
      console.log(response.data);
    } catch (error) {
      console.log("Error submitting story", error);
    } finally {
      setLoading(false); // Set loading to false after request is completed
    }
  };

  return (
    <>
      <Nav active2={`active`} userName={firstName} />
      <div className="profile-story">
        <div className="profile">
          <p className="fullName btn btn-primary">{`${firstName} ${lastName}`}</p>
          <p className="email btn btn-primary">{email}</p>
          <p className="phoneNumber btn btn-primary">{phoneNumber}</p>
        </div>
        <div className="update-story">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Enter Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={story.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Enter Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={story.description}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </div>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder=""
                id="story"
                name="story"
                style={{ height: "100px", width: "800px" }}
                value={story.story}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="story">Enter Your Story</label>
            </div>
            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`} style={{ marginTop: "20px" }}>
              {loading ? "Loading..." : "Create Story"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
