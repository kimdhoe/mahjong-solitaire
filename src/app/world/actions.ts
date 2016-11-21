import { Action } from '@ngrx/store'

import { SET_BOARD
       , START_GAME
       , MARK_TILE
       , REDO
       , REMOVE_LAYER
       , RENDER_LAYER
       , TOGGLE_ANIMATION
       , SHUFFLE
       , SHUFFLE_AT_ONCE
       , UNDO
       } from './constants/action-names'
import { Board
       , Tile
       } from './model'

export const startGame = (): Action => (
  { type: START_GAME }
)

export const setBoard = (board: Board): Action => (
  { type: SET_BOARD
  , payload: { board }
  }
)

export const removeLayer = (): Action => (
  { type: REMOVE_LAYER }
)

export const renderLayer = (): Action => (
  { type: RENDER_LAYER
  }
)

export const markTile = (tile: Tile): Action => (
  { type:    MARK_TILE
  , payload: { tile }
  }
)

export const undo = (): Action => (
  { type: UNDO }
)

export const redo = (): Action => (
  { type: REDO }
)

export const shuffle = (board: Board): Action => (
  { type:    SHUFFLE
  , payload: { board }
  }
)

export const shuffleAtOnce = (): Action => (
  { type:    SHUFFLE_AT_ONCE }
)

export const toggleAnimation = (): Action => (
  { type: TOGGLE_ANIMATION }
)
