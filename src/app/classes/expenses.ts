export class Expense {
  expenseName!: string;
  expenseOwnerId!: string; 
  totalCost!: number;
  expenseSplit!: Map<string, number>;
  exid!: string;
  eid!: string;

  constructor(expanseName: string, ownerId: string, totalCost: number, expenseSplit: Map<string, number>, exid: string, eid: string) {
    this.expenseName = expanseName;
    this.expenseOwnerId = ownerId;
    this.totalCost = totalCost;
    this.expenseSplit = expenseSplit; 
    this.exid = exid;
    this.eid = eid; 
  }
}