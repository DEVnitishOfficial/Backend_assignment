
import logger from "../config/logger.config";
import Problem from "../db/models/problem.schema";
import { createProblemDto, updateProblemDto } from "../dto/problem.dto"
import { NotFoundError } from "../utils/errors/app.error";

export const createProblem = async (problemData: createProblemDto) => {

    const problem = await Problem.create({
        title: problemData.title,
        difficulty: problemData.difficulty,
        topics: problemData.topics,
        companies: problemData.companies,
        hints: problemData.hints,
        statement: problemData.statement,
        notice: problemData.notice,
        examples: problemData.examples,
        constraints: problemData.constraints
    });
    logger.info(`Problem created successfully ${problem.id}`)
    return problem;
}

export const getAllProblem = async () => {
    const allProblems = await Problem.find();

    if(!allProblems){
        logger.error("Prolems not found")
        throw new NotFoundError("Not found any problems in DB")
    }
    return allProblems
}

export const getProblemById = async (id: string) => {
    const problem = await Problem.findById(id)
    if(!problem){
        logger.error(`Problems not found with id:${id}`)
        throw new NotFoundError(`Problems not found with id:${id}`);
    }
    return problem;
}

export const updateProblemById = async (id: string, problemData: updateProblemDto) => {
    const updatedProblem = await Problem.findByIdAndUpdate(id, problemData);
     if(!updatedProblem){
        logger.error(`Something went wrong while updating problem, Problem id:${id}`)
        throw new NotFoundError(`Something went wrong while updating problem, Problem id:${id}`);
    }
    return updatedProblem;
}

export const deleteProblemById = async (id:string) => {
    const deletedProblem = await Problem.findByIdAndDelete(id);
    if(!deletedProblem){
        logger.error(`Something went wrong while deleting problem, Problem id:${id}`)
        throw new NotFoundError(`Something went wrong while deleting problem, Problem id:${id}`);
    }
    return deletedProblem;
}