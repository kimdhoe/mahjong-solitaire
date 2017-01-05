import { Action } from '@ngrx/store'

import { TOGGLE_SLOT
       , ADD_TILE
       , REMOVE_TILE
       , SAVE_LAYOUT
       , SAVED_LAYOUT
       , TOGGLE_MODE
       } from '../constants/action-names'
import { EditorBoard
       , SlotAddress
       } from '../editor-model'

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
