import { Action } from '@ngrx/store'

import { TOGGLE_SLOT
       , TOGGLE_MODE
       } from '../constants/action-names'
import { SlotAddress } from '../editor-model'

export const toggleSlot = (address: SlotAddress): Action => (
  { type:    TOGGLE_SLOT
  , payload: { address }
  }
)

export const toggleMode = (): Action => (
  { type: TOGGLE_MODE }
)
