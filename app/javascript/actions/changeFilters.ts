export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';
interface SetSearchFilterAction {
  type: typeof SET_SEARCH_FILTER;
  searchQuery: string;
}

export const SET_POST_STATUS_FILTER = 'SET_POST_STATUS_FILTER';
interface SetPostStatusFilterAction {
  type: typeof SET_POST_STATUS_FILTER;
  postStatusId: number;
}


export const setSearchFilter = (searchQuery: string): SetSearchFilterAction => ({
  type: SET_SEARCH_FILTER,
  searchQuery,
});

export const setPostStatusFilter = (postStatusId: number): SetPostStatusFilterAction => ({
  type: SET_POST_STATUS_FILTER,
  postStatusId,
});


export type ChangeFiltersActionTypes =
  SetSearchFilterAction |
  SetPostStatusFilterAction;