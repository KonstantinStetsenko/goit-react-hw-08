import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { logout } from "../../redux/auth/operations";
import { selectContacts } from "../../redux/contacts/selectors";
import { selectNameFilter, selectNumberFilter } from "../filters/selectors";
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from "./operations";

export const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
  editModal: { isEditModalOpen: false, editItemId: null },
  deleteModal: { isDeleteModalOpen: false, deleteItemId: null },
};

const contactsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    openEditModal: (state, action) => {
      state.editModal.isEditModalOpen = true;
      state.editModal.editItemId = action.payload;
    },
    closeEditModal: (state) => {
      state.editModal.isEditModalOpen = false;
      state.editModal.editItemId = null;
    },
    openDeleteModal: (state, action) => {
      state.deleteModal.isDeleteModalOpen = true;
      state.deleteModal.deleteItemId = action.payload;
    },
    closeDeleteModal: (state) => {
      state.deleteModal.isDeleteModalOpen = false;
      state.deleteModal.deleteItemId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload
        );
        toast.success("Пользователь успешно удален!", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#FF0000",
            color: "#fff",
          },
        });
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
        toast.success("Пользователь добавлен!", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#4caf50",
            color: "#fff",
          },
        });
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const index = state.contacts.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts.items[index] = action.payload;
        }
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContact.pending,
          addContact.pending,
          editContact.pending
        ),
        (state) => {
          state.contacts.loading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected,
          editContact.rejected
        ),
        (state, action) => {
          state.contacts.loading = false;
          state.contacts.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContact.fulfilled,
          addContact.fulfilled,
          editContact.fulfilled
        ),
        (state) => {
          state.contacts.loading = false;
        }
      );
  },
});
export const {
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
} = contactsSlice.actions;

// Мемоизация
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectNumberFilter],
  (contacts, nameFilter, numberFilter) => {
    return contacts.filter((contact) => {
      const matchesName = contact.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const matchesNumber = contact.number.includes(numberFilter);
      return matchesName && matchesNumber;
    });
  }
);

export const contactsReducer = contactsSlice.reducer;
