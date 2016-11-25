import { Action } from '@ngrx/store'

import { TOGGLE_SLOT } from '../../constants/action-names'
import { EditorBoard
       , makeEmptyEditor
       , toggleSlotInEditor
       }               from '../../editor-model'

const emptyEditor = makeEmptyEditor()

const editor = (state: EditorBoard = emptyEditor, action: Action): EditorBoard => {
  switch (action.type) {

    case TOGGLE_SLOT:
      return toggleSlotInEditor(state, action.payload.address)

    default:
      return state
  }
}

export default editor
