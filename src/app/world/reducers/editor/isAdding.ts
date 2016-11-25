import { Action } from '@ngrx/store'

import { TOGGLE_MODE } from '../../constants/action-names'

const isAdding = (state: true, action: Action): boolean => {
  switch (action.type) {

    case TOGGLE_MODE:
      return state ? false : true

    default:
      return state
  }
}

export default isAdding
