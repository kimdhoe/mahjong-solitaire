import { Action } from '@ngrx/store'

import { ADD_TILE
       , INIT_EDITOR
       , REMOVE_TILE
       , RESET_EDITOR
       , TOGGLE_SLOT
       } from '../../constants/action-names'
import { EditorBoard
       , makeEmptyEditor
       , toggleSlotInEditor
       }               from '../../editor-model'

const emptyEditor = makeEmptyEditor()

const editor = (state: EditorBoard = emptyEditor, action: Action): EditorBoard => {
  switch (action.type) {

    // !!! ---
    case TOGGLE_SLOT:
      return toggleSlotInEditor(state, action.payload.address)

    case INIT_EDITOR:
      return emptyEditor

    case ADD_TILE:
    case REMOVE_TILE:
      return toggleSlotInEditor(state, action.payload.address)

    case RESET_EDITOR:
      return emptyEditor

    default:
      return state
  }
}

export default editor
