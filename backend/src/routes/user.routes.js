import {Router} from 'express'
import { deleteUserStory, getAllStories, getUserStory, loginUser, logoutUser, registerUser, searchAuthor, updateStory } from '../controller/user.controller.js'
const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/story').post(updateStory)
router.route('/getStory').get(getAllStories)
router.route("/searchAuthor").get(searchAuthor)
router.route("/yourstory").post(getUserStory)
router.route("/delete-story").delete(deleteUserStory)

export default router