import { IExpenditure } from "../interface/iexpenditure";
import { Expense } from "./expenses";
import { User } from "./user";

export class Expenditure implements IExpenditure{
  expenditureName!: string;
  users!: User[];
  defaultCurrency!: string;
  inviteToken!: string;
  // expenditureUsers!: User[]
  expenses!: Expense[]

  constructor(expName: string, users: User[], currency: string, invToken: string) {
    this.expenditureName = expName;
    this.users = users;
    this.defaultCurrency = currency;
    this.inviteToken = invToken;
  }

  
  public set setUsers(v : User[]) {
    this.users = v;
  }
  
}
