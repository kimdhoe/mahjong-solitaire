import { Action } from '@ngrx/store'

import { ADD_TILE
       , REMOVE_TILE
       } from '../../constants/action-names'

const numberOfAdded = (state: number = 0, action: Action): number => {
  switch (action.type) {

    case ADD_TILE:
      return state + 1

    case REMOVE_TILE:
      return state - 1

    default:
      return state
  }
}

export default numberOfAdded
