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

export const SET_SORT_BY_FILTER = 'SET_SORT_BY_FILTER';
export type SortByFilterValues = 'trending' | 'newest' | 'most_voted' | 'oldest';
interface SetSortByFilterAction {
  type: typeof SET_SORT_BY_FILTER;
  sortBy: SortByFilterValues;
}


export const setSearchFilter = (searchQuery: string): SetSearchFilterAction => ({
  type: SET_SEARCH_FILTER,
  searchQuery,
});

export const setPostStatusFilter = (postStatusId: number): SetPostStatusFilterAction => ({
  type: SET_POST_STATUS_FILTER,
  postStatusId,
});

export const setSortByFilter = (sortBy: SortByFilterValues): SetSortByFilterAction => ({
  type: SET_SORT_BY_FILTER,
  sortBy,
});


export type ChangeFiltersActionTypes =
  SetSearchFilterAction |
  SetPostStatusFilterAction |
  SetSortByFilterAction;