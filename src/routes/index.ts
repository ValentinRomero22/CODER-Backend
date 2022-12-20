import { Router } from "../deps.ts";
import {
  findAllUsers,
  createUser,
  deleteUser,
  findUser,
  updateUser,
} from "../handlers/userHandler.ts";
export const router = new Router()
  //User routes
  .get("/api/users/", findAllUsers)
  .get("/api/users/:userId", findUser)
  .delete("/api/users/:userId", deleteUser)
  .patch("/api/users/:userId", updateUser)
  .post("/api/users", createUser);
