export class Fee {
    public feeId: number;
    public studentId: number;
    public month: number;
    public totalAmount: number;
    public amountPaid: number;
    public dueAmount: number;
    public paymentType: number;
    public paidBy: number;
    public paidDate: Date;
    public lateFee: number;
    public createdBy: number;
    public createdOn: Date
    public modifiedBy: number;
    public modifiedOn: number;
    public checkNo: number;
    public bankName: string;
    public cVVNo: number;
    public creditCardNo: number;

    constructor() {
    }
}