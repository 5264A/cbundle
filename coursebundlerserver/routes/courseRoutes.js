import express from 'express';
import { createCourse, getAllCourse } from '../controllers/courseController.js';
const router = express.Router();
// get all courses without lectures
router.route("/courses").get(getAllCourse);
// create courses -- admin
router.route("/createcourse").post(createCourse);

// add lectures , delete Course , get course details

// delete lectures
export default router;