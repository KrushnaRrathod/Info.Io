import React from "react";
import axios from "axios";
import "./story.css"; // Correct import statement for the CSS file

const Story = ({
  storyId,
  firstName,
  lastName,
  title,
  description,
  story,
  email,
  createdAt,
  isProfile,
  onDelete,
}) => {
  const handleDelete = async () => {
    // Show confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this story?");

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          "http://localhost:8000/api/v1/user/delete-story",
          {
            data: { email, storyId },
          }
        );

        if (response.status === 200) {
          onDelete(storyId); // Update UI by deleting the story from state
        } else {
          alert(response.data.message || "Failed to delete story");
        }
      } catch (error) {
        console.error("Error deleting story:", error);
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="story-section">
      <p className="title_name">{title}</p>
      <p className="description">{description}</p>
      <p className="story">{story}</p>
      <p className="author">{`${firstName} ${lastName}`}</p>
      <p className="created-at btn btn-outline-secondary">Created at: {new Date(createdAt).toLocaleString()}</p>
      {isProfile && (
        <button className="delete-button" onClick={handleDelete}>
          Delete Story
        </button>
      )}
    </div>
  );
};

export default Story;
