import express from "express";
import {
  createProblemHandler,
  getAllProblemsHandler,
  getProblemByIdHandler,
  updateProblemByIdHandler,
  deleteProblemByIdHandler,
} from "../../controller/problems.controller"


const problemRouter = express.Router()

problemRouter.post("/", createProblemHandler);
problemRouter.get("/", getAllProblemsHandler);
problemRouter.get("/:id", getProblemByIdHandler);
problemRouter.put("/:id", updateProblemByIdHandler);
problemRouter.delete("/:id", deleteProblemByIdHandler);

export default problemRouter;
