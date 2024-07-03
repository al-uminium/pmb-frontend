import { IExpenditure } from "../interface/iexpenditure";

export class Expenditure implements IExpenditure{
  expenditureName!: string;
  users!: string[];
  defaultCurrency!: string;
  inviteToken!: string;

  
  constructor(expName: string, users: string[], currency: string, invToken: string) {
    this.expenditureName = expName;
    this.users = users;
    this.defaultCurrency = currency;
    this.inviteToken = invToken;
  }
}
