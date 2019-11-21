import { Admission } from "src/app/admission/admission.entity";

export interface IOrder {
    readonly id?: string;
    readonly orderId?: number;
    readonly email?: string;
    readonly orderNumber?: number;
    readonly note?: string;
    readonly token?: string;
    readonly gateway?: string;
    readonly test?: boolean;
    readonly totalPrice?: string;
    readonly subtotalPrice?: string;
    readonly totalWeight?: number;
    readonly totalTax?: string;
    readonly taxesIncluded?: boolean;
    readonly currency?: string;
    readonly financialStatus?: string;
    readonly confirmed?: boolean;
    readonly totalDiscounts?: string;
    readonly totalLineItemsPrice?: string;
    readonly cartToken?: string;
    readonly buyerAcceptsMarketing?: boolean;
    readonly name?: string;
    readonly referringSite?: string;
    readonly receiverName?: string;
    readonly receiverAddress?: string;
    readonly receiverContactName?: string;
    readonly receiverContactPhone?: string;
    readonly serviceCode?: string;
    readonly totalPieces?: number;
    readonly kg?: number;
    readonly volumen?: number;
    readonly admissionProcessed?: boolean;
    readonly receiverCountry?: string;
    readonly admission: Admission;
    readonly created_at?: Date;
    readonly updated_at?: Date;
}
