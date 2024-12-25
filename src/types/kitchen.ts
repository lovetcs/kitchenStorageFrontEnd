export interface KitchenItem {
  id: string; // Changed from number to string since ID is the item name
  name: string;
  categoryName: string;
  quantity: number;
  storedIn: string;
  expirationDate: string;
}