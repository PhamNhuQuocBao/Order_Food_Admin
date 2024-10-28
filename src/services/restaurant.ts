import { ENDPOINT } from "../constants/endpoint";
import { RestaurantRequest } from "../types";
import { APIs } from "./index.api";

export const getRestaurants = async () => {
  try {
    const res = await APIs.get(ENDPOINT.RESTAURANT.BASE);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRestaurantById = async (id: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.RESTAURANT.BASE}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRestaurantByOwnerId = async (id: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.RESTAURANT.OWNER}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createRestaurant = async (data: RestaurantRequest) => {
  try {
    const res = await APIs.post(ENDPOINT.RESTAURANT.BASE, data);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRestaurant = async (id: string, data: RestaurantRequest) => {
  try {
    const res = await APIs.put(`${ENDPOINT.RESTAURANT.BASE}/${id}`, data);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRestaurant = async (id: string) => {
  try {
    const res = await APIs.delete(`${ENDPOINT.RESTAURANT.BASE}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
