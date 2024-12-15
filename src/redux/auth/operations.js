import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { fetchContacts } from "../../redux/contacts/operations";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const setAuthHeader = (token) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", token); // Сохраняем токен в localStorage
};
const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = ``;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await goitApi.post("users/signup", credentials);
      const token = response.data.token;
      localStorage.setItem("token", token); // Сохраняем токен в localStorage
      setAuthHeader(token); // Устанавливаем заголовок Authorization
      thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await goitApi.post("users/login", credentials);
      const token = response.data.token;
      localStorage.setItem("token", token); // Сохраняем токен в localStorage
      setAuthHeader(token); // Устанавливаем заголовок Authorization
      thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk("/users/logout", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token; // Получаем токен из состояния
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token); // Устанавливаем токен в заголовок

    await goitApi.post("/users/logout"); // Запрос на выход
    clearAuthHeader(); // Очищаем токен после выхода
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "/users/refresh",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    console.log(savedToken);

    if (!savedToken) {
      return thunkAPI.rejectWithValue("Token is not exist");
    }

    try {
      setAuthHeader(savedToken);
      const response = await goitApi.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
