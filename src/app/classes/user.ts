export class User {
  userName!: string;
  userId!: string; 
  balance!: number;

  constructor(userName: string) {
    this.userName = userName;
  }
  
  public set setUserId(userid : string) {
    this.userId = userid;
  }
  
}