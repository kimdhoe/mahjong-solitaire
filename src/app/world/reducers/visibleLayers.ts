import { Action } from '@ngrx/store'

const visibleLayers = (state: number = 0, action: Action): number => {
  switch (action.type) {

    case 'RENDER_LAYER':
      return state >= 5 ? 5 : state + 1

    case 'REMOVE_LAYER':
      return state <= 0 ? 0 : state - 1

    default:
      return state
  }
}

export default visibleLayers
