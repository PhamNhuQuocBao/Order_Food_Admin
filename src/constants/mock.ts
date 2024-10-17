import { RestautantResponse } from "../types";

export const RESTAURANT: RestautantResponse[] = [
  {
    _id: "1",
    name: "Kindubai",
    address: {
      street: "24 Mai Anh Tuan",
      city: "Da Nang",
    },
    menu: [
      {
        itemId: "1",
        available: true,
        category: "food",
        name: "pizza",
        description: "pizza sieu ngon bo re",
        price: 200,
      },
    ],
    ownerId: "1",
    phone: "0326495191",
    rating: 4,
  },
];
