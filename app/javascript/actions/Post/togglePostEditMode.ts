export const POST_TOGGLE_EDIT_MODE = 'POST_TOGGLE_EDIT_MODE';

export interface PostToggleEditMode {
  type: typeof POST_TOGGLE_EDIT_MODE;
}

export const togglePostEditMode = (): PostToggleEditMode => ({
  type: POST_TOGGLE_EDIT_MODE,
});