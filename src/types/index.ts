// restautant type
export interface RestautantResponse extends RestaurantRequest {
  _id: string;
  ownerId: string; // Reference to Users collection (restaurant_owner)
  menu: [
    {
      itemId: string;
      name: string;
      description: string;
      price: number;
      category: string;
      available: boolean;
    },
  ];
  rating: number;
  createdAt?: Date;
}

export interface RestaurantRequest {
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
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
