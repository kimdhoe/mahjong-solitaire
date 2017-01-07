import { Action } from '@ngrx/store'

import { RESET_EDITOR
       , INIT_EDITOR
       , TOGGLE_MODE
       } from '../../constants/action-names'

const isAdding = (state: boolean = true, action: Action): boolean => {
  switch (action.type) {

    case TOGGLE_MODE:
      return state ? false : true

    case RESET_EDITOR:
    case INIT_EDITOR:
      return true

    default:
      return state
  }
}

export default isAdding
