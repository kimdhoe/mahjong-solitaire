import { Action } from '@ngrx/store'

import { ADD_TILE
       , INIT_EDITOR
       , REMOVE_TILE
       , RESET_EDITOR
       } from '../../constants/action-names'

const numberOfAdded = (state: number = 0, action: Action): number => {
  switch (action.type) {

    case ADD_TILE:
      return state + 1

    case REMOVE_TILE:
      return state - 1

    case RESET_EDITOR:
    case INIT_EDITOR:
      return 0

    default:
      return state
  }
}

export default numberOfAdded
