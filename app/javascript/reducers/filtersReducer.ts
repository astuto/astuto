import {
  ChangeFiltersActionTypes,
  SET_SEARCH_FILTER,
  SET_POST_STATUS_FILTER,
} from '../actions/changeFilters';

export interface FiltersState {
  searchQuery: string;
  postStatusIds: Array<number>;
}

const initialState: FiltersState = {
  searchQuery: '',
  postStatusIds: [],
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

    default:
      return state;
  }
}

export default filtersReducer;