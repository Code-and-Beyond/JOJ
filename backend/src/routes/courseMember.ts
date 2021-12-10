import express from 'express';
import courseMemberController from '../controllers/courseMember.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.get(
  '/courses/:courseId/members',
  courseMemberController.getCourseMembers
);
router.post(
  '/courses/:courseId/members/:uid',
  courseMemberController.pushCourseMember
);
router.put(
  '/courses/:courseId/members/:uid',
  courseMemberController.updateCourseMember
);
router.delete(
  '/courses/:courseId/members/:uid',
  courseMemberController.deleteCourseMember
);

export = router;
