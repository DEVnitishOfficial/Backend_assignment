import { createProblemDto, updateProblemDto } from "../dto/problem.dto";
import { createProblem, deleteProblemById, getAllProblem, getProblemById, updateProblemById } from "../repositories/problem.repositories";


export async function createProblemService(problemData: createProblemDto){
    const problem = await createProblem(problemData);
    return problem;
}

export async function getAllProblemService(){
    const problems = await getAllProblem()
    return problems
}

export async function getProblemByIdService(id:string){
    const problem = await getProblemById(id)
    return problem
}

export async function updateProblemByIdService(id:string, problemData: updateProblemDto){
    const updatedProblem = await updateProblemById(id, problemData)
    return updatedProblem;
}

export async function deleteProblemByIdService(id:string){
    const deletedProblem = await deleteProblemById(id);
    return deleteProblemById;
}