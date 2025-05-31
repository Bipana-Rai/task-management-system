import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

export const projectDetail = createAsyncThunk(
  "projectDetail",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${baseURL}/api/addTask`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);
export const getProjectDetail = createAsyncThunk(
  "getProjectDetail",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${baseURL}/api/getTask`);
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);
export const updateProjectDetail = createAsyncThunk(
  "updateProjectDetail",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseURL}/api/updateTask/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const authorizeUserDetail = createAsyncThunk(
  "authorizeUserDetail",
  async (rejectWithValue) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(`${baseURL}/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //  console.log("User verified:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "deleteTask",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/api/${id}/delete`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getTeams = createAsyncThunk(
  "getTeams",
  async (rejectWithValue) => {
    try {
      const res = await fetch(`${baseURL}/getTeams`);
      const result = res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    project: [],
    profileInfo: [],
    teams: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(projectDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = [...state.project, action.payload];
      })
      .addCase(projectDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProjectDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProjectDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload;
      })
      .addCase(getProjectDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateProjectDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProjectDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = state.project.map((e) =>
          e._id === action.payload._id ? { ...e, ...action.payload } : e
        );
      })
      .addCase(updateProjectDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(authorizeUserDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authorizeUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileInfo = action.payload.user.doesExist;
      })
      .addCase(authorizeUserDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = state.project.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { clicked } = userSlice.actions;

export default userSlice.reducer;
