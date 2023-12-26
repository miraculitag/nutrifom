import axios from "axios";
import {
  AddProductRequest,
  AddRecipeRequest,
  AuthenticateRequest,
  RateRecipeRequest,
  RegisterRequest,
  WeightRequest,
} from "./types";

export const axiosInstance = axios.create({
  timeout: 20000,
  baseURL: "https://nutrifom-api.azurewebsites.net",
});

const addAuth = (token: string) => {
  return {
    headers: { Authorization: token },
  };
};

export const deleteAppUser = async (token: string) =>
  await axiosInstance.delete("/api/appUser/user", {
    ...addAuth(token),
  });

export const getAppUserImage = async (token: string) =>
  await axiosInstance.get("/api/appUser/image", {
    ...addAuth(token),
  });

export const getAppUser = async (token: string) =>
  await axiosInstance.get("/api/appUser/user", {
    ...addAuth(token),
  });

export const putAppUserWpa = async (wpa: number, token: string) =>
  await axiosInstance.put("/api/appUser/wpa", null, {
    ...addAuth(token),
    params: { wpa: wpa },
  });

export const putAppUserWeight = async (weight: number, token: string) =>
  await axiosInstance.put("/api/appUser/weight", null, {
    ...addAuth(token),
    params: { weight: weight },
  });

export const putAppUserPal = async (pal: string, token: string) =>
  await axiosInstance.put("/api/appUser/pal", null, {
    ...addAuth(token),
    params: { pal: pal },
  });

export const putAppUserKcalGoal = async (kcalGoal: number, token: string) =>
  await axiosInstance.put("/api/appUser/kcalgoal", null, {
    ...addAuth(token),
    params: { updatedKcalGoal: kcalGoal },
  });

export const putAppUserImage = async (formData: FormData, token: string) => {
  return await axiosInstance.put("/api/appUser/image", formData, {
    headers: {
      ...addAuth(token).headers,
    },
  });
};

export const putAppUserGoal = async (goal: string, token: string) =>
  await axiosInstance.put(`/api/appUser/goal`, null, {
    ...addAuth(token),
    params: { goal: goal },
  });

export const getWeightLast14Days = async (token: string) =>
  await axiosInstance.get("/api/weight/last14Days", {
    ...addAuth(token),
  });

export const getWeightHistory = async (token: string) =>
  await axiosInstance.get("/api/weight/history", {
    ...addAuth(token),
  });

export const addWeightEntry = async (
  weightRequestBody: WeightRequest,
  token: string
) =>
  await axiosInstance.post("/api/weight/entry", weightRequestBody, {
    ...addAuth(token),
  });

export const getRecipes = async (token: string) =>
  await axiosInstance.get("/api/recipe/all", {
    ...addAuth(token),
  });

export const rateRecipe = async (
  rateRecipeRequestBody: RateRecipeRequest,
  token: string
) =>
  await axiosInstance.post(`/api/recipe/rate`, rateRecipeRequestBody, {
    ...addAuth(token),
  });

export const getNutrilog = async (entryDate: string, token: string) =>
  await axiosInstance.get("/api/nutrilog", {
    ...addAuth(token),
    params: { entryDate: entryDate },
  });

export const getKcalLast14Days = async (token: string) =>
  await axiosInstance.get("/api/nutrilog/last14DaysCalories", {
    ...addAuth(token),
  });

export const addRecipeToNutrilog = async (
  addRecipeRequest: AddRecipeRequest,
  token: string
) =>
  await axiosInstance.post("/api/nutrilog/recipe", addRecipeRequest, {
    ...addAuth(token),
  });

export const addProductToNutrilog = async (
  addProductRequest: AddProductRequest,
  token: string
) =>
  await axiosInstance.post("/api/nutrilog/product", addProductRequest, {
    ...addAuth(token),
  });

export const searchOFF = async (searchTerm: string, token: string) =>
  await axiosInstance.get("/api/OFF/search", {
    ...addAuth(token),
    params: { searchTerm: searchTerm },
  });

export const registerAppUser = async (registerRequest: RegisterRequest) =>
  await axiosInstance.post("/api/auth/register", registerRequest);

export const authenticateAppUser = async (
  authenticateRequest: AuthenticateRequest
) => await axiosInstance.post("/api/auth/authenticate", authenticateRequest);



export const getKcalGoal = async (token: string) =>
  await axiosInstance.get("/api/nutrilog/kcalgoal", {
    ...addAuth(token),
  });
  export const putAppUserkcalGoal = async (KcalGoal: number, token: string) =>
  await axiosInstance.put("/api/appUser/kcalGoal", null, {
    ...addAuth(token),
    params: { KcalGoal: KcalGoal  },
  });