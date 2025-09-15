const express=require("express");
const problem = require("../models/problems");
const problemRouter = express.Router();

//create 
problemRouter.post("/create",createProblem)
problemRouter.patch("/:id",updateProblem)
problemRouter.delete("/:id",deleteProblem)
problemRouter.get("/:id",getProblem)
problemRouter.get("/",fetchAll)
problemRouter.get("/user",solvedProblem)