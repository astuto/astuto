import {
  ChangeFiltersActionTypes,
  SET_SEARCH_FILTER,
  SET_POST_STATUS_FILTER,
  SET_SORT_BY_FILTER,
  SortByFilterValues,
} from '../actions/changeFilters';

export interface FiltersState {
  searchQuery: string;
  postStatusIds: Array<number>;
  sortBy: SortByFilterValues;
}

const initialState: FiltersState = {
  searchQuery: '',
  postStatusIds: [],
  sortBy: 'newest',
}

const filtersReducer = (
  state = initialState,
  action: ChangeFiltersActionTypes,
) => {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchQuery: action.searchQuery,
      };

    case SET_POST_STATUS_FILTER:
      return {
        ...state,
        postStatusIds: state.postStatusIds.includes(action.postStatusId)
          ? state.postStatusIds.filter(id => id !== action.postStatusId)
          : [...state.postStatusIds, action.postStatusId],
      };

    case SET_SORT_BY_FILTER:
      return {
        ...state,
        sortBy: action.sortBy,
      };

    default:
      return state;
  }
}

export default filtersReducer;