type OrderStatus =
  | "Pending"
  | "Accepted"
  | "Preparing"
  | "On the Way"
  | "Delivered"
  | "Cancelled";
type PaymentStatus = "Pending" | "Completed" | "Failed" | "Refunded";

class Address {
  constructor(
    public id: number,
    public addressLine1: string,
    public street: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public addressLine2?: string
  ) {}

  updateAddressLine1(line: string) {
    this.addressLine1 = line;
  }
  updateCity(city: string) {
    this.city = city;
  }
  updateState(state: string) {
    this.state = state;
  }
  updateZipCode(zip: string) {
    this.zipCode = zip;
  }
}

class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public addresses: Address[] = []
  ) {}

  updateName(newName: string) {
    this.name = newName;
  }
  updateEmail(newEmail: string) {
    this.email = newEmail;
  }
  addAddress(address: Address) {
    this.addresses.push(address);
  }
  removeAddress(addressId: number) {
    this.addresses = this.addresses.filter((a) => a.id !== addressId);
  }
}

class Customer extends User {
  private cart: Food[] = [];

  addToCart(food: Food) {
    this.cart.push(food);
  }
  removeFromCart(foodId: number) {
    this.cart = this.cart.filter((f) => f.id !== foodId);
  }
  clearCart() {
    this.cart = [];
  }
}

class HotelManager extends User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public addresses: Address[] = []
  ) {
    super(id, name, email, addresses);
    console.log("Hotel Manager created");
  }
}

class Food {
  constructor(
    public id: number,
    public name: string,
    public quantity: string,
    public price: number
  ) {}

  updateQuantity(newQuantity: string) {
    this.quantity = newQuantity;
  }
  updatePrice(newPrice: number) {
    this.price = newPrice;
  }
}

class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public address: Address[],
    public menu: Food[] = []
  ) {}

  addMenuItem(food: Food) {
    this.menu.push(food);
  }
  removeMenuItem(foodId: number) {
    this.menu = this.menu.filter((food) => food.id !== foodId);
  }
  updateMenuItemPrice(foodId: number, newPrice: number) {
    const item = this.menu.find((food) => food.id === foodId);
    if (item) item.updatePrice(newPrice);
  }
}
class OrderItem {
  constructor(
    public id: number,
    public food: Food,
    public price: number,
    public quantity: string
  ) {}

  changeQuantity(quantity: string) {
    this.quantity = quantity;
  }
}

class Offer {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public discount: string | number,
    public startDate: Date,
    public endDate: Date
  ) {}

  isValid(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }
}

class Coupon {
  constructor(
    public id: number,
    public name: string,
    public code: string,
    public offer: Offer,
    public usageLimit?: number,
    public usedCount: number = 0
  ) {}

  canUse(): boolean {
    return this.usageLimit ? this.usedCount < this.usageLimit : true;
  }

  markUsed(): void {
    if (this.canUse()) this.usedCount++;
  }
}

class Payment {
  constructor(
    public id: number,
    public paymentMethod: string,
    public amount: number,
    public status: PaymentStatus = "Pending",
    public paymentDate?: Date,
    public transactionId?: string
  ) {}

  complete(transactionId: string) {
    this.status = "Completed";
    this.paymentDate = new Date();
    this.transactionId = transactionId;
  }
  fail() {
    this.status = "Failed";
  }
  refund() {
    this.status = "Refunded";
  }
}

class Order {
  constructor(
    public id: number,
    public user: User,
    public restaurant: Restaurant,
    public items: OrderItem[] = [],
    public orderDescription: string = "",
    public orderTime: Date = new Date(),
    public status: OrderStatus = "Pending",
    public offer?: Offer,
    public coupon?: Coupon,
    public payment?: Payment
  ) {}

  addItem(food: Food, quantity: string) {
    this.items.push(new OrderItem(Date.now(), food, food.price, quantity));
  }
  removeItem(foodId: number) {
    this.items = this.items.filter((i) => i.food.id !== foodId);
  }
  applyOffer(offer: Offer) {
    if (offer.isValid(new Date())) this.offer = offer;
  }
  applyCoupon(coupon: Coupon) {
    if (coupon.canUse()) this.coupon = coupon;
  }
  updateStatus(newStatus: OrderStatus) {
    this.status = newStatus;
  }
  completePayment(payment: Payment) {
    this.payment = payment;
  }
}

class Delivery {
  constructor(
    public id: number,
    public deliveryAddress: Address,
    public deliveryPersonName?: string,
    public deliveryPersonContact?: string,
    public estimatedDeliveryTime?: Date
  ) {}

  assignDeliveryPerson(name: string, contact: string) {
    this.deliveryPersonName = name;
    this.deliveryPersonContact = contact;
  }
  updateEstimatedTime(time: Date) {
    this.estimatedDeliveryTime = time;
  }
}

class Rating {
  constructor(
    public id: number,
    public reviewRating: number,
    public comment: string,
    public user: User,
    public restaurant: Restaurant,
    public reviewDate: Date = new Date()
  ) {}

  updateRating(newRating: number, newComment: string) {
    this.reviewRating = newRating;
    this.comment = newComment;
  }
}
