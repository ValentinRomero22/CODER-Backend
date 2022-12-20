export interface User {
  id: number;
  name: string;
  age: number;
}

export interface UserForUpdate {
  name?: string;
  age?: number;
}

export interface UserForCreate {
  name: string;
  age: number;
}
