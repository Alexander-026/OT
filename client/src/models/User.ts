export interface IUser {
   email: string;
   isActivated:true;
   id:string;
   role: 'USER' | 'ADMIN'
}


export type LoginUser = {
   email: string;
   password:string;
}