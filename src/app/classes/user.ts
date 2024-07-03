export class User {
  userName!: string;
  userId!: string; 

  constructor(userName: string) {
    this.userName = userName;
  }
  
  public set setUserId(userid : string) {
    this.userId = userid;
  }
  
}