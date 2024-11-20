// restautant type
export interface RestautantResponse extends RestaurantRequest {
  _id: string;
  __v: number;
  createdAt?: Date;
}

export interface RestaurantRequest {
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
  image: string;
  rating: number;
  ownerId: string;
}

export type FieldTypeRestaurant = RestaurantRequest;

// User type
export interface UserRequest {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
  };
}

export interface UserResponse extends UserRequest {
  _id: string;
  __v: number;
  role: string;
}

export type FieldTypeUser = UserRequest;

// Menu types
export interface MenuRequest {
  name: string;
  description: string;
  price: number;
  category: string; // hard code o FE
  size?: string[];
  image: string;
}

export interface MenuResponse extends MenuRequest {
  _id: string;
  __v?: number;
}
