// deno-lint-ignore-file
import type { User, UserForCreate, UserForUpdate } from "../types/user.ts";
import { v1 } from "../deps.ts";

const users: User[] = [
  {
    id: 1,
    name: "Valentín Romero",
    age: 27,
  },
  {
    id: 2,
    name: "Usuario número dos",
    age: 5,
  },
  {
    id: 3,
    name: "Usuario número tres",
    age: 18,
  },
  {
    id: 4,
    name: "Usuario número cuatro",
    age: 65,
  },
];

export const findAllUsers = () => {
  return users;
};

export const findUserById = (id: number) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    throw new Error("User not found");
  } else {
    return user;
  }
};

export const createUser = (user: UserForCreate): User => {
  const idList = users
    .map((u) => u.id)
    .sort((a, b) => {
      return a - b;
    });

  const id = idList[idList.length - 1] + 1;
  const newUser = { id, ...user };

  users.push(newUser);

  return newUser;
};

export const updateUser = (id: number, user: UserForUpdate): User => {
  const userFound = users.find((u) => u.id === id);

  if (userFound) {
    if (user?.name) userFound.name = user.name;

    if (user?.age) userFound.age = user.age;

    return userFound;
  } else {
    throw new Error("User not found");
  }
};

export const deleteUser = (id: number) => {
  const userIndex = users.findIndex((u) => u.id === id);
  console.log(userIndex);

  if (userIndex) {
    users.splice(userIndex, 1);
    return true;
  } else {
    throw new Error("User not found");
  }
};
