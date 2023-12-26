export type AuthenticateRequest = {
  email: string;
  password: string;
  googleIDToken?: string;
};

export type RegisterRequest = {
  name: string;
  weight: number;
  dob: string;
  goal: string;
  height: number;
  gender: string;
  pal: string;
  wpa: number;
  email: string;
  password: string;
  image?: string;
  googleIDToken?: string;
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

export type NurtilogEntryRequest = {
  code: string;
  productName: string;
  product_quantity: number;
  serving_quantity: number;
  proteins_serving: number;
  carbohydrates_serving: number;
  energy_kcal_serving: number;
  saturated_fat_serving: number;
  unsaturated_fat_serving: number;
  entryDate: string;
};

export type AddProductRequest = {
  product: {
    code: string;
    productName: string;
    product_quantity: number;
    proteins: number;
    carbohydrates: number;
    energy_kcal_serving: number;
    saturated_fat: number;
    unsaturated_fat: number;
  };
  entryDate: string;
};

export type AddProductRequestNEU = {
  product: {
    code: string;
    productName: string;
    product_quantity: number;
    proteins: number;
    carbohydrates: number;
    energy_kcal: number;
    saturated_fat: number;
    unsaturated_fat: number;
  };
  entryDate: string;
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
  image: string;
  tag: string;
};

export type FoodEntry = {
  code: string;
  productName: string;
  product_quantity: number;
  proteins: number;
  carbohydrates: number;
  energy_kcal: number;
  saturated_fat: number;
  unsaturated_fat: number;
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
  EMAIL,
  PASSWORD,
}
