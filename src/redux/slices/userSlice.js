import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  filteredUsers: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  searchQuery: '',
};

// Fetch users with pagination
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, userData);
      return { id, updatedData: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update user');
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete user');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload.trim() === '') {
        state.filteredUsers = state.users;
      } else {
        state.filteredUsers = state.users.filter(
          user => 
            user.first_name.toLowerCase().includes(action.payload.toLowerCase()) ||
            user.last_name.toLowerCase().includes(action.payload.toLowerCase()) ||
            user.email.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.filteredUsers = action.payload.data;
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch users';
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload.updatedData };
          state.filteredUsers = state.users.filter(user => {
            if (state.searchQuery.trim() === '') return true;
            return (
              user.first_name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
              user.last_name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
          });
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update user';
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        state.filteredUsers = state.filteredUsers.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete user';
      });
  },
});

export const { setSearchQuery, clearError } = userSlice.actions;

export default userSlice.reducer;
