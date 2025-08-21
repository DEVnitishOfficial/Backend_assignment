import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Problem from "../models/problem.schema";
import connectToDB from "../../config/db";

dotenv.config();

const seedData = async () => {
  try {

    await connectToDB();

    // Load JSON file
    const filePath = path.join(__dirname, "data", "problems.json");
    const problemsData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await Problem.deleteMany();
    console.log("old data deleted")

    
    await Problem.insertMany(problemsData);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
