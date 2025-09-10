// TODO: Implement the submission controller

import { Request, Response } from "express";
import { SubmissionService } from "../services/submission.service";
import { SubmissionRepository } from "../repositories/submission.repository";
import {StatusCodes} from 'http-status-codes';
import { SubmissionStatus } from "../models/submission.model";

const submissionRepository = new SubmissionRepository();
const submissionService = new SubmissionService(submissionRepository);

export async function createSubmissionController(req:Request, res:Response): Promise<void> {

    
    const createdSubmission = await submissionService.createSubmission(req.body);

    res.status(StatusCodes.CREATED).json({
        success: true,
        data: createdSubmission,
        message: "Submission created successfully",
    });
}

export async function getSubmissionByIdController(req:Request, res:Response) : Promise<void>{
    
    const submission = await submissionService.getSubmissionById(req.params.id);

    res.status(StatusCodes.OK).json({
        success : true,
        data : submission,
        message : "Submission fetched by submissionId successfully",
    })
}

export async function getSubmissionsByProblemIdController(req:Request, res:Response): Promise<void>{

    const submission = await submissionService.getSubmissionsByProblemId(req.params.id);

     res.status(StatusCodes.OK).json({
        success : true,
        data : submission,
        message : "Submission fetched by problemId successfully"
    })
}

export async function updateSubmissionStatusController(req:Request, res:Response): Promise<void>{

    const  {status} = req.body

    const updatedStatus = await submissionService.updateSubmissionStatus(req.params.id, status as SubmissionStatus);

    res.status(StatusCodes.OK).json({
        success:true,
        data : updatedStatus,
        message : "Updated problem submission status"
    })
}

export async function deleteSubmissionByIdController(req:Request, res:Response): Promise<void>{
    
    const deletedSubmission = await submissionService.deleteSubmissionById(req.params.id);

    res.status(StatusCodes.OK).json({
        success:true,
        data : deletedSubmission,
        message : "Deleted code submission successfully"
    })
}





