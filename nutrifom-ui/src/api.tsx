import axios from "axios";
import { AuthenticateRequest, RegisterRequest } from "./types";

export const axiosInstance = axios.create({
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  timeout: 60000,
  baseURL: "https://nutrifom-api.azurewebsites.net",
});

const addAuth = (token: string) => {
  return { headers: { Authorization: token } };
};

export const deleteAppUser = async (userId: number, token: string) =>
  await axiosInstance.delete("/api/appUser/${userId}", {
    ...addAuth(token),
    params: { userId: userId },
  });

export const getAppUser = async (userId: number, token: string) =>
  await axiosInstance.get("/api/appUser/${userId}", {
    ...addAuth(token),
    params: { userId: userId },
  });

export const getAppUserImage = async (userId: number, token: string) => {
  await axiosInstance.get("/api/appUser/${userId}/image", {
    ...addAuth(token),
    params: { userId: userId },
  });
};

export const putAppUserWpa = async (
  userId: number,
  wpa: number,
  token: string
) => {
  await axiosInstance.get("/api/appUser/${userId }/wpa", {
    ...addAuth(token),
    params: { userId: userId, wpa: wpa },
  });
};

export const putAppUserWeight = async (
  userId: number,
  weight: number,
  token: string
) => {
  await axiosInstance.get("/api/appUser/${userId}weight", {
    ...addAuth(token),
    params: { userId: userId, weight: weight },
  });
};

export const putAppUserPal = async (
  userId: number,
  pal: string,
  token: string
) => {
  await axiosInstance.get("/api/appUser/${userId}/pal", {
    ...addAuth(token),
    params: { userId: userId, pal: pal },
  });
};

export const putAppUserImage = async (userId: number, token: string) => {
  await axiosInstance.get("/api/appUser/${userId}/image", {
    ...addAuth(token),
    params: { userId: userId },
  });
};

export const putAppUserGoals = async (
  userId: number,
  goal: string,
  token: string
) => {
  await axiosInstance.get("/api/appUser/${userId}/goal", {
    ...addAuth(token),
    params: { userId: userId, goal: goal },
  });
};

export const getRecipesByTag = async (tag: string, token: string) => {
  await axiosInstance.get("/api/recipes/get/by-tag", {
    ...addAuth(token),
    params: { tag: tag },
  });
};

export const getRecipesById = async (recipeId: number, token: string) => {
  await axiosInstance.get("/api/recipes/get/by-id", {
    ...addAuth(token),
    params: { recipeId: recipeId },
  });
};

export const rateRecipes = async (
  recipeId: number,
  userId: number,
  token: string
) => {
  await axiosInstance.get("/api/recipes/rate/${recipeId}", {
    ...addAuth(token),
    params: { recipeId: recipeId, userId: userId },
  });
};

export const getWeightsLast14DaysHistory = async (
  userId: number,
  token: string
) => {
  await axiosInstance.get("/api/weightTrack/last14DaysHistory", {
    ...addAuth(token),
    params: { userId: userId },
  });
};
//tbd

export const registerAppUser = async (registerRequest: RegisterRequest) =>
  await axiosInstance.post("/api/auth/register", {
    data: registerRequest,
  });

export const authenticateAppUser = async (
  authenticateRequest: AuthenticateRequest
) =>
  await axiosInstance.post("/api/auth/authenticate", {
    data: authenticateRequest,
  });
