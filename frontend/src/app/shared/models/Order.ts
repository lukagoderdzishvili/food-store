import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";

export class Order{
    id!: number;
    items!: Array<CartItem>;
    totalPrice!: number;
    name!: string;
    address!: string;
    addressLatLng?: LatLng;
    paymentId!: string;
    createdAt!: string;
    status!: string; 
}