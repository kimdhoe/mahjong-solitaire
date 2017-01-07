import { Action } from '@ngrx/store'

import { TOGGLE_SLOT
       , ADD_TILE
       , INIT_EDITOR
       , REMOVE_TILE
       , RESET_EDITOR
       , SAVE_LAYOUT
       , SAVED_LAYOUT
       , TOGGLE_MODE
       } from '../constants/action-names'
import { EditorBoard
       , SlotAddress
       } from '../editor-model'

export const initEditor = (): Action => (
  { type: INIT_EDITOR }
)

export const toggleSlot = (address: SlotAddress): Action => (
  { type:    TOGGLE_SLOT
  , payload: { address }
  }
)

export const addTile = (address: SlotAddress): Action => (
  { type:    ADD_TILE
  , payload: { address }
  }
)

export const removeTile = (address: SlotAddress): Action => (
  { type:    REMOVE_TILE
  , payload: { address }
  }
)

export const toggleMode = (): Action => (
  { type: TOGGLE_MODE }
)

export const resetEditor = (): Action => (
  { type: RESET_EDITOR }
)

export const saveLayout = (name: string, editor: EditorBoard): Action => (
  { type:    SAVE_LAYOUT
  , payload: { name, editor }
  }
)

export const savedLayout = (succeeded: boolean = true): Action => (
  { type:    SAVED_LAYOUT
  , payload: { succeeded }
  }
)
