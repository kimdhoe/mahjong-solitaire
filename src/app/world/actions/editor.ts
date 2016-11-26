import { Action } from '@ngrx/store'

import { TOGGLE_SLOT
       , ADD_TILE
       , REMOVE_TILE
       , TOGGLE_MODE
       } from '../constants/action-names'
import { SlotAddress } from '../editor-model'

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
