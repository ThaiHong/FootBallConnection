import * as ActionConstants from '../constants';

export const topic = (state = {topicLists : [], topic : {}}, action) => {
    switch (action.type) {
      case ActionConstants.GET_ALL_TOPIC_OF_EVENTS:
          return Object.assign({}, state, {
              topicLists : action.topicLists
          })
    default:
      return state;
    }
};
