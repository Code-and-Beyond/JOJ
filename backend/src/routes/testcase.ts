import express from 'express';
import testcaseController from '../controllers/testcase.controller';
// import auth from '../middleware/auth';

const router = express.Router();

router.put('/testcases/:testcaseId', testcaseController.updateTestcase);
router.delete('/testcases/:testcaseId', testcaseController.deleteTestcase);

export = router;
