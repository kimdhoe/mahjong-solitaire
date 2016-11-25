import { Action } from '@ngrx/store'

import { TOGGLE_SLOT } from '../constants/action-names'
import { SlotAddress } from '../editor-model'

export const toggleSlot = (address: SlotAddress): Action => (
  { type:    TOGGLE_SLOT
  , payload: { address }
  }
)
