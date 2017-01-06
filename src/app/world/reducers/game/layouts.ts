import { Action } from '@ngrx/store'

import TURTLE from '../../constants/templates/turtle'
import { LayoutData
       , makeLayoutData
       }      from '../../model'

const initialState: LayoutData[] = [ makeLayoutData('turtle', TURTLE) ]

const layouts = ( state:  LayoutData[] = initialState
                , action: Action
                ): LayoutData[] => {
  switch (action.type) {
    case 'SET_LAYOUTS':
      const { layouts } = action.payload
      const loaded      = Object.keys(layouts).map(
                            name => makeLayoutData(name, layouts[name])
                          )

      return [ ...state, ...loaded ]

    default:
      return state
  }
}

export default layouts
