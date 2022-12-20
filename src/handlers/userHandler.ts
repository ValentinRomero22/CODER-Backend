// deno-lint-ignore-file
import { Context, helpers } from "../deps.ts";
import type { User, UserForCreate, UserForUpdate } from "../types/user.ts";
import * as db from "../db/userDb.ts";

export const findAllUsers = (ctx: Context) => {
  try {
    const allUsers: User[] = db.findAllUsers();
    ctx.response.body = allUsers;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const findUser = (ctx: Context) => {
  try {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });
    const user: User = db.findUserById(parseInt(userId));
    //const user: User = await db.findUserById(userId);
    ctx.response.body = user;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createUser = async (ctx: Context) => {
  try {
    const { name, age } = await ctx.request.body().value;
    const userToCreate: UserForCreate = { name, age };

    const createdUser: User = await db.createUser(userToCreate);
    ctx.response.body = createdUser;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const updateUser = async (ctx: Context) => {
  try {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });
    const { name, age } = await ctx.request.body().value;
    const userToUpdate: UserForUpdate = { name, age };

    const updatedUser: User = db.updateUser(parseInt(userId), userToUpdate);
    ctx.response.body = updatedUser;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const deleteUser = async (ctx: Context) => {
  try {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });

    const result: boolean = db.deleteUser(parseInt(userId));

    if (result) ctx.response.body = { message: "User deleted" };
    else ctx.response.body = { message: "User not found" };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};
