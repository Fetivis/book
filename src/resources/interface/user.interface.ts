export default interface IUser {
  _id: any;
  firstName: string;
  lastName: string;
  email?: string;
  password: string;
  role: string;
  active: boolean;
}
