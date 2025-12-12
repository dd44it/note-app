type UserRole = 'admin' | 'editor' | 'viewer';
type Permission = Record<UserRole, boolean>;

const access: Permission = {admin: true, editor: true, viewer: true}


////


const user = {id: 1, name: 'John'};
type User = typeof user;


type UserKeys = keyof User;
const getProperty = (obj: User, key: UserKeys) => {
  return obj[key];
}

////
interface User1 {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}
type PublicUser = Pick<User, 'id' | 'name'>;
type UserWithoutEmail = Omit<User, 'email'>;

type UpdateUser = Partial<User1>;
const patch: UpdateUser = {name: 'Bill'};



/////

interface User2 {
  id?: number;
  name?: string;
  email?: string;
  isAdmin?: boolean;
}

type StrictUser = Required<User2>;
/// not useful i think

const config: Readonly<{apiKey: string}> = {apiKey: 'string'};
// config.apiKey = 'stringiii';


////

interface User3 {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// interface createUser3 {
//   name: string;
//   email: string;
//   isAdmin: boolean;
// }
//
// interface updateUser3 {
//   name?: string;
//   email?: string;
//   isAdmin?: boolean;
// }

type CreateUser3 = Pick<User3, 'name' | 'email' | 'isAdmin'>
type UpdateUser3 = Partial<User3>
