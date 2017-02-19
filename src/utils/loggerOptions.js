let loggerOptions = {
    predicate: (getState, action) => {
        action.type !== '@@redux-form/REGISTER_FIELD' &&
        action.type !== '@@redux-form/BLUR' &&
        action.type !== '@@redux-form/FOCUS'
    },
    timestamp:false
}

export default loggerOptions;