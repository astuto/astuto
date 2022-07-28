import IOAuth from "../interfaces/IOAuth";

export interface OAuthsState {
  items: Array<IOAuth>;
  areLoading: boolean;
  error: string;
}

const initialState: OAuthsState = {
  items: [],
  areLoading: false,
  error: '',
};

// const oAuthsReducer = (
//   state = initialState,
//   action: ,
// ) => {
//   switch (action.type) {
//     case OAUTH_REQUEST_START:
//       return {
//         ...state,
//         areLoading: true,
//       };

//     case OAUTH_REQUEST_SUCCESS:
//       return {
//         ...state,
//         areLoading: false,
//         error: '',
//         items: action.oAuth.
//       }
//   }
// }