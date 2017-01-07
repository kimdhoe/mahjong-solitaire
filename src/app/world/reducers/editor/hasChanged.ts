import { Action } from '@ngrx/store'

import { ADD_TILE
       , INIT_EDITOR
       , REMOVE_TILE
       , RESET_EDITOR
       , SAVED_LAYOUT
       } from '../../constants/action-names'

const hasChanged = (state: boolean = false, action: Action): boolean => {
  switch (action.type) {

    case ADD_TILE:
    case REMOVE_TILE:
    case RESET_EDITOR:
      return true

    case INIT_EDITOR:
      return false

    case SAVED_LAYOUT:
      return action.payload.succeeded ? false : true

    default:
      return state
  }
}

export default hasChanged
