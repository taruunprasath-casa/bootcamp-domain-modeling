 class User {
  id: number;
  name: string;
  email: string;
  address: Address[];

   register(name: string, email: string, addresses: Address[]): void;
   updateName(newName: string): void;
   updateEmail(newEmail: string): void;
   addAddress(address: Address): void;
   removeAddress(addressId: number): void;
   placeOrder(restaurant: Restaurant, items: Food[]): Order;


   class Customer extends User{
    private cart: Food[];
    constructor(name: string, email: string, addresses: Address[]) {
        super();
        this.cart = [];
    }
   }
   class HotelManager extends User{
   }
}

 class Restaurant {
  id: number;
  name: string;
  address: Address[];
  menu: Food[];

   addMenuItem(food: Food): void;
   removeMenuItem(foodId: number): void;
   updateMenuItemPrice(foodId: number, newPrice: number): void;
   prepareOrder(order: Order): void;
}

 class Food {
  id: number;
  name: string;
  quantity: string;
  price: number;

   updateQuantity(newQuantity: string): void;
   updatePrice(newPrice: number): void;
}

 class OrderItem {
  id: number;
  food: Food;
  price: number;

   changeQuantity(quantity: string): void;
}

 class Order {
  id: number;
  user: User;
  restaurant: Restaurant;
  items: OrderItem[];
  orderDescription: string;
  orderTime: Date;
  offer?: Offer;
  coupon?: Coupon;
  payment?: Payment;
  status:
    | "Pending"
    | "Accepted"
    | "Preparing"
    | "On the Way"
    | "Delivered"
    | "Cancelled";

   addItem(food: Food, quantity: string): void;
   removeItem(foodId: number): void;
   applyOffer(offer: Offer): void;
   applyCoupon(coupon: Coupon): void;
   updateStatus(newStatus: Order["status"]): void;
   completePayment(payment: Payment): void;
}

 class Address {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;

   updateAddressLine1(line: string): void;
   updateCity(city: string): void;
   updateState(state: string): void;
   updateZipCode(zip: string): void;
}

 class Offer {
  id: number;
  name: string;
  description: string;
  discount: string | number;
  startDate: Date;
  endDate: Date;

   isValid(date: Date): boolean;
}

 class Coupon {
  id: number;
  name: string;
  code: string;
  offer: Offer;
  usageLimit?: number;
  usedCount?: number;

   canUse(): boolean;
   markUsed(): void;
}

 class Payment {
  id: number;
  paymentMethod: string;
  paymentDate: Date;
  amount: number;
  status: "Pending" | "Completed" | "Failed" | "Refunded";
  transactionId?: string;

   complete(transactionId: string): void;
   fail(): void;
   refund(): void;
}

 class Delivery {
  id: number;
  deliveryAddress: Address;
  deliveryPersonName?: string;
  deliveryPersonContact?: string;
  estimatedDeliveryTime?: Date;

   assignDeliveryPerson(name: string, contact: string): void;
   updateEstimatedTime(time: Date): void;
}

 class Rating {
  id: number;
  reviewRating: number;
  comment: string;
  user: User;
  restaurant: Restaurant;
  reviewDate: Date;

   updateRating(newRating: number, newComment: string): void;
}
