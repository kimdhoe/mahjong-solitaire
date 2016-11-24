import { Action } from '@ngrx/store'

import { SET_BOARD
       , START_GAME
       , MARK_TILE
       , REMOVE_LAYER
       , RENDER_LAYER
       , TOGGLE_ANIMATION
       , SHUFFLE
       , SHUFFLE_AT_ONCE
       , START_OVER
       , START_OVER_AT_ONCE
       , TIME_TRAVEL
       } from './constants/action-names'
import { Board
       , Tile
       , TilePair
       , ShortID
       , Commit
       } from './model'

export const startGame = (): Action => (
  { type: START_GAME }
)

export const setBoard = (board: Board): Action => (
  { type:    SET_BOARD
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

export const markTile = payload => (
  { type: MARK_TILE
  , payload
  }
)

export const shuffle = (board: Board): Action => (
  { type:    SHUFFLE
  , payload: { board }
  }
)

export const shuffleAtOnce = (): Action => (
  { type: SHUFFLE_AT_ONCE }
)

export const toggleAnimation = (): Action => (
  { type: TOGGLE_ANIMATION }
)

export const timeTravel = (target: Commit): Action => (
  { type:    TIME_TRAVEL
  , payload: { target }
  }
)

export const startOver = (): Action => (
  { type: START_OVER }
)

export const startOverAtOnce = (): Action => (
  { type: START_OVER_AT_ONCE }
)
