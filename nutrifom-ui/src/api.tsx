import axios from "axios";
import { AuthenticateRequest, RegisterRequest } from "./types";

export const axiosInstance = axios.create({
  timeout: 20000,
  baseURL: "https://nutrifom-api.azurewebsites.net",
});

const addAuth = (token: string) => {
  return { headers: { Authorization: token } };
};

export const deleteAppUser = async (token: string) =>
  await axiosInstance.delete("/api/appUser/user", {
    ...addAuth(token),
  });

export const getAppUserImage = async (token: string) => {
  await axiosInstance.get("/api/appUser/image", {
    ...addAuth(token),
  });
};

export const getAppUser = async (token: string) =>
  await axiosInstance.get("/api/appUser/user", {
    ...addAuth(token),
  });

export const putAppUserWpa = async (wpa: number, token: string) => {
  await axiosInstance.put("/api/appUser/wpa", null, {
    ...addAuth(token),
    params: { wpa: wpa },
  });
};

export const putAppUserWeight = async (weight: number, token: string) => {
  await axiosInstance.put("/api/appUser/weight", null, {
    ...addAuth(token),
    params: { weight: weight },
  });
};

export const putAppUserPal = async (pal: string, token: string) => {
  await axiosInstance.put("/api/appUser/pal", null, {
    ...addAuth(token),
    params: { pal: pal },
  });
};

export const putAppUserImage = async (token: string) => {
  await axiosInstance.put("/api/appUser/image", null, {
    ...addAuth(token),
  });
};

export const putAppUserGoal = async (goal: string, token: string) => {
  await axiosInstance.put(`/api/appUser/goal`, null, {
    ...addAuth(token),
    params: { goal: goal },
  });
};

export const getWeightLast14Days = async (token: string) => {
  await axiosInstance.get("/api/weight/last14Days", {
    ...addAuth(token),
  });
};

export const getWeightHistory = async (token: string) => {
  await axiosInstance.get("/api/weight/history", {
    ...addAuth(token),
  });
};

export const addWeightEntry = async (
  weight: number,
  entryDate: string,
  token: string
) => {
  await axiosInstance.post("/api/weight/entry", {
    ...addAuth(token),
    params: { weight: weight, entryDate: entryDate },
  });
};

export const getRecipeById = async (recipeId: number, token: string) => {
  await axiosInstance.get(`/api/recipe/${recipeId}`, {
    ...addAuth(token),
    params: { recipeId: recipeId },
  });
};

export const getRecipeByTag = async (tag: string, token: string) => {
  await axiosInstance.get(`/api/recipe/tag/${tag}`, {
    ...addAuth(token),
    params: { tag: tag },
  });
};

//tbd
export const rateRecipe = async (recipeId: number, token: string) => {
  await axiosInstance.post(`/api/recipe/${recipeId}/rate`, {
    ...addAuth(token),
    params: { recipeId: recipeId },
  });
};

export const getNutrilog = async (entryDate: string, token: string) => {
  await axiosInstance.get("/api/nutrilog", {
    ...addAuth(token),
    params: { entryDate: entryDate },
  });
};

export const getNutrilogLast14DaysCalories = async (token: string) => {
  await axiosInstance.get("/api/nutrilog/last14DaysCaloies", {
    ...addAuth(token),
  });
};

export const addRecipeToNutrilog = async (token: string) => {
  await axiosInstance.post("/api/nutrilog/recipe", {
    ...addAuth(token),
  });
};

export const addProductToNutrilog = async (
  entryDate: string,
  token: string
) => {
  await axiosInstance.post("/api/nutrilog/product", {
    ...addAuth(token),
    params: { entryDate: entryDate },
  });
};

export const registerAppUser = async (registerRequest: RegisterRequest) =>
  await axiosInstance.post("/api/auth/register", registerRequest);

export const authenticateAppUser = async (
  authenticateRequest: AuthenticateRequest
) => await axiosInstance.post("/api/auth/authenticate", authenticateRequest);
