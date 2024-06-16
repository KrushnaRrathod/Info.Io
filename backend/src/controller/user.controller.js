import {ApiError, ApiResponse, asyncHandler} from '../utils/index.js'
import {User} from "../models/user.model.js"
import { Story } from '../models/story.model.js'

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const { firstName, lastName, email, phoneNumber, password} = req.body

    console.log(req.body);

    const existedUser = await User.findOne({
        $or: [{email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        firstName,
        lastName,
        password,
        email,
        phoneNumber
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) =>{

    const {email, password} = req.body

    if (!email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    // Set new cookies with tokens
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
    // if (!req.user || !req.user._id) {
    //     throw new ApiError(400, "User ID is required for logout");
    // }

    await User.findByIdAndUpdate(
        req._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

const updateStory = asyncHandler(async (req, res) => {
    const { email, title, description, story } = req.body;

    console.log(`Received request to create a new story for user: ${email}`);

    // Validate input
    if (!email || !title || !description || !story) {
        throw new ApiError(400, "All fields (email, title, description, story) are required");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        console.error(`User not found: ${email}`);
        throw new ApiError(404, "User not found");
    }


    // Create a new story for the user
    const newStory = new Story({ owner: user._id, title, description, story });

    await newStory.save();


    const createdStory = await Story.findById(newStory._id).populate('owner', '-password -refreshToken');

    return res.status(201).json(
        new ApiResponse(201, createdStory, "Story Created Successfully")
    );
});

const getAllStories = asyncHandler(async (req, res) => {
    try {
        const stories = await Story.find().populate('owner', '-password -refreshToken');
        if (!stories.length) {
            throw new ApiError(404, "No stories found");
        }

        return res.status(200).json(
            new ApiResponse(200, stories, "Stories retrieved successfully")
        );
    } catch (error) {
        throw new ApiError(500, "An error occurred while retrieving stories");
    }
});

const searchAuthor = asyncHandler(async (req, res) => {
    const { query } = req.query;
  
    try {
      // Assuming 'query' is the search term for author's name
      const authors = await User.find({
        $or: [
          { firstName: { $regex: query, $options: 'i' } }, // Case-insensitive regex search on first name
          { lastName: { $regex: query, $options: 'i' } }, // Case-insensitive regex search on last name
        ],
      }).select('_id firstName lastName email phoneNumber'); // Adjust fields as per your requirement
  
      if (!authors || authors.length === 0) {
        return res.status(404).json({ success: false, message: 'Authors not found' });
      }
  
      res.status(200).json({ success: true, data: authors });
    } catch (error) {
      console.error('Error searching authors:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
});

const getUserStory = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    try {
      // Find the user by email to get userId
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Fetch stories belonging to the user based on their email
      const stories = await Story.find({ owner: user._id });
  
      if (!stories || stories.length === 0) {
        return res.status(404).json({ success: false, message: "Stories not found" });
      }
  
      res.status(200).json({ success: true, data: stories, message: "Stories retrieved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
});


const deleteUserStory = async (req, res) => {
    const { email, storyId } = req.body;
  
    try {
      // Find the user by email to get userId
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Find and delete the story belonging to the user
      const story = await Story.findOneAndDelete({ _id: storyId, owner: user._id });
  
      if (!story) {
        return res.status(404).json({ success: false, message: "Story not found or user does not have permission to delete this story" });
      }
  
      res.status(200).json({ success: true, message: "Story deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  

export{
    registerUser,
    loginUser,
    logoutUser,
    updateStory,
    getAllStories,
    searchAuthor,
    getUserStory,
    deleteUserStory
}