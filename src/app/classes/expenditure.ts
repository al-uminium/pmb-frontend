import { IExpenditure } from "../interface/iexpenditure";
import { User } from "./user";

export class Expenditure implements IExpenditure{
  expenditureName!: string;
  users!: User[];
  defaultCurrency!: string;
  inviteToken!: string;

  constructor(expName: string, users: User[], currency: string, invToken: string) {
    this.expenditureName = expName;
    this.users = users;
    this.defaultCurrency = currency;
    this.inviteToken = invToken;
  }
}
