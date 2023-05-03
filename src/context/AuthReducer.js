const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
                isAuthenticated: false,
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
                isAuthenticated: true,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
                isAuthenticated: false,
            }
        case "REGISTER_START":
            return {
                user: null,
                isFetching: true,
                error: false,
                isAuthenticated: false,
            }
        case "REGISTER_SUCCESS":
            return {
                user: null,
                isFetching: false,
                error: false,
                isAuthenticated: false,
            }
        case "REGISTER_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
                isAuthenticated: false,
            }
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: null,
                isAuthenticated: false,
            }
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };
        case "UPDATE_USER":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
                isAuthenticated: true,
            };
        default:
            return state;

    }
}
export default AuthReducer