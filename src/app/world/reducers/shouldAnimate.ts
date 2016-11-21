import { Action } from '@ngrx/store'

import { YesOrNo }          from '../model/'
import { TOGGLE_ANIMATION } from '../constants/action-names'

const shouldAnimate = (state: YesOrNo = 'yes', action: Action): YesOrNo => {
  switch (action.type) {

    case TOGGLE_ANIMATION:
      return state === 'yes' ? 'no' : 'yes'

    default:
      return state
  }
}

export default shouldAnimate
