
import express from 'express'
import { createSubmissionController, deleteSubmissionByIdController, getSubmissionByIdController, getSubmissionsByProblemIdController, updateSubmissionStatusController } from '../../controllers/submission.controller';

const submissionRouter = express.Router();

submissionRouter.post('/', createSubmissionController);
submissionRouter.get('/problemid/:id', getSubmissionsByProblemIdController)
submissionRouter.get('/submissionId/:id', getSubmissionByIdController)
submissionRouter.put('/update/:id', updateSubmissionStatusController)
submissionRouter.delete('/delete/:id', deleteSubmissionByIdController)



export default submissionRouter;

