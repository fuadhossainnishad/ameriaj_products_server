import { Types } from "mongoose";

export interface IPayment {
    orderId: Types.ObjectId;
    userId: Types.ObjectId;
    subscriptionId: Types.ObjectId;
    paymentIntentId: string,
    amount: number,
    currency: string,
    method: string;
    payStatus: boolean;
    updatedAt: Date;
    isDeleted: boolean;
}

export interface IPaymentUPdate extends IPayment {
    orderId: Types.ObjectId;
}
