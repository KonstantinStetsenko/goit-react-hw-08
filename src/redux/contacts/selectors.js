export const selectContacts = (state) => state.contacts.contacts.items;
export const selectLoading = (state) => state.contacts.contacts.loading;
export const selectError = (state) => state.contacts.contacts.error;
export const selectFilter = (state) => state.filters.name;
export const selectIsEditModalOpen = (state) =>
  state.contacts.editModal.isEditModalOpen;
export const selectEditItemId = (state) => state.contacts.editModal.editItemId;
export const selectIsDeleteModalOpen = (state) =>
  state.contacts.deleteModal.isDeleteModalOpen;
export const selectDeleteItemId = (state) =>
  state.contacts.deleteModal.deleteItemId;
