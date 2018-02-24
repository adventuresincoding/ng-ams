export class PaymentModel {
    public id: number;
    public totalAmount: number;
    public paidAmount: number;
    public paymentType: number;
    public checkNumber: string;
    public creditCardNumber: string;
    public expiryDate: Date
    public bankName: string;
    public cVVNo: string;
    public studentId: number;
}