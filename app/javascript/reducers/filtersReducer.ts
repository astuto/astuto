import {
  ChangeFiltersActionTypes,
  SET_SEARCH_FILTER,
  SET_POST_STATUS_FILTER,
} from '../actions/changeFilters';

export interface FiltersState {
  searchQuery: string;
  postStatusId: number;
}

const initialState: FiltersState = {
  searchQuery: '',
  postStatusId: null,
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
        postStatusId: action.postStatusId,
      };

    default:
      return state;
  }
}

export default filtersReducer;