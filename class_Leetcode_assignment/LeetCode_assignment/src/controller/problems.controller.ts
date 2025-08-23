import { NextFunction, Request, Response } from "express";
import Problem from "../db/models/problem.schema";
import { createProblemService, deleteProblemByIdService, getAllProblemService, getProblemByIdService } from "../services/problem.service";
import { StatusCodes } from "http-status-codes";
import { updateProblemById } from "../repositories/problem.repositories";

// Create Problem
export const createProblemHandler = async (req: Request, res: Response, next: NextFunction) => {
  // call the service layer to create a problem
    const problemResponse = await createProblemService(req.body);

    // Send a success response with the created problem data
      res.status(StatusCodes.CREATED).json({  
            success: true,
            message: "Problem created successfully",
            data: problemResponse,
        });
}

// Get all Problems
export const getAllProblemsHandler = async (req: Request, res: Response, next: NextFunction) => {
      // call the service layer to create a problem
    const allProblemsResponse = await getAllProblemService();

    // Send a success response with the created problem data
    res.status(StatusCodes.OK).json({
        success : true,
        message : "Get all leetcode problems successfully",
        data : allProblemsResponse
    })
};

// Get problem by Id
export const getProblemByIdHandler = async (req:Request, res:Response, next:NextFunction) => {
    // call the service layer to get problem by id.
    const problem = await getProblemByIdService(req.params.id)

    res.status(StatusCodes.OK).json({
        success : true,
        message : "Got leetCode problemById successfully",
        data : problem
    })
}

// Update problem by Id
export const updateProblemByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    // call the service layer to update problem by Id
    const updatedProblem = await updateProblemById(req.params.id, req.body);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Updated leetCode problem successfully",
        data : updatedProblem
    })
}


// Delete problem by Id
export const deleteProblemByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  // call the service layer to delete the problem by Id
    const deletedProblem = await deleteProblemByIdService(req.params.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Deleted leetCode problem successfully",
        data : deletedProblem
    })
}
