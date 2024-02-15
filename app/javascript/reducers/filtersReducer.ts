import {
  ChangeFiltersActionTypes,
  SET_SEARCH_FILTER,
  SET_POST_STATUS_FILTER,
  SET_SORT_BY_FILTER,
  SortByFilterValues,
  SET_DATE_FILTER,
} from '../actions/changeFilters';

export interface FiltersState {
  searchQuery: string;
  postStatusIds: Array<number>;
  sortBy: SortByFilterValues;
  date: {
    startDate?: string;
    endDate?: string;
  };
}

const initialState: FiltersState = {
  searchQuery: '',
  postStatusIds: [],
  sortBy: 'newest',
  date: { startDate: '', endDate: '' },
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

    case SET_DATE_FILTER:
      return {
        ...state,
        date: {
          startDate: action.startDate,
          endDate: action.endDate,
        },
      };

    default:
      return state;
  }
}

export default filtersReducer;