export interface Store {
  id?: number;
  name: string;
  location: string;
}

export interface StoreRequest {
  name: string;
  location: string;
}