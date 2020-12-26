const actions = [];

const middleware = store => next => action => {

    actions.push(action);
    localStorage.setItem('actions', JSON.stringify(actions));
    next(action)
}

export default middleware;