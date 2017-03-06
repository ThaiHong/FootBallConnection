import * as ActionConstants from '../constants';

export const speaker = (state = {speakerLists : [], speaker : {}}, action) => {
    switch (action.type) {
      case ActionConstants.GET_ALL_SPEAKER_OF_EVENTS:
          return Object.assign({}, state, {
              speakerLists : action.speakerLists
          })
    default:
      return state;
    }
};
