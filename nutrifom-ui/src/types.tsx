export type AuthenticateRequest = {
  email: string;
  password?: string;
  googleIdToken?: string;
};

export type RegisterRequest = {
  name: string;
  initialWeight: number;
  dob: string;
  goal: string;
  height: number;
  gender: string;
  pal: string;
  wpa: number;
  email: string;
  password?: string;
  image?: string;
  googleIdToken?: string;
};

export type ImageRequest = {
  image: string;
};
export type WeightRequest = {
  weight: number;
  entryDate: string;
};

export type RateRecipeRequest = {
  recipeId: number;
  score: number;
};

export type AddRecipeRequest = {
  recipeId: number;
  entryDate: string;
};

export type AddProductToNutrilog = {
  productCode: string;
  entryDate: string;
  productQuantity: number;
};

export type AddRecipeToNutrilog = {
  recipeId: number;
  entryDate: string;
  recipePortions: number;
};

export type AppUser = {
  id: number;
  name: string;
  initialWeight: number;
  dob: string;
  goal: string;
  height: number;
  gender: string;
  pal: string;
  wpa: number;
  image: string;
  email: string;
  kcalGoal?: number;
};

export type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  portions: number;
  energyKcal: number;
  proteins: number;
  saturatedFat: number;
  unsaturatedFat: number;
  carbohydrates: number;
  description: string;
  uses: number;
  averageRating: number;
  ratingCount: number;
  image: string;
  tag: string;
};

export type FoodEntry = {
  productCode: string;
  productName: string;
  proteins: number;
  carbohydrates: number;
  energyKcal: number;
  saturatedFat: number;
  unsaturatedFat: number;
  productQuantity: number;
};

export type NutrilogData = {
  products: FoodEntry[];
  recipes: Recipe[];
  totalProteins: number;
  totalCarbohydrates: number;
  totalEnergyKcal: number;
  totalSaturatedFat: number;
  totalUnsaturatedFat: number;
};

export enum fieldErrorEnum {
  NAME,
  DOB,
  HEIGHT,
  WEIGHT,
  GENDER,
  GOAL,
  PAL,
  WPA,
  EMAILSIGNIN,
  PASSWORDSIGNIN,
  EMAILSIGNUP,
  PASSWORDSIGNUP,
}
