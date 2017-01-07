import { Action } from '@ngrx/store'

import { INIT_GAME
       , MARK_TILE
       , REMOVE_LAYER
       , RENDER_LAYER
       , SET_BOARD
       , SET_BOARDS
       , SET_LAYOUTS
       , START_GAME
       , SHUFFLE
       , SHUFFLE_AT_ONCE
       , START_OVER
       , START_OVER_AT_ONCE
       , TIME_TRAVEL
       , TOGGLE_ANIMATION
       } from '../constants/action-names'
import { Board
       , LayoutData
       , Template
       , Tile
       , TilePair
       , Commit
       } from '../model'

export const initGame = (layout: string): Action => (
  { type:    INIT_GAME
  , payload: { layout }
  }
)

export const startGame = (layout: LayoutData): Action => (
  { type:    START_GAME
  , payload: { layout }
  }
)

export const setBoard = (board: Board): Action => (
  { type:    SET_BOARD
  , payload: { board }
  }
)

export const setBoards = (board: Board): Action => (
  { type:    SET_BOARDS
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

export const markTile = (tile: Tile, marked: Tile[]): Action => (
  { type: MARK_TILE
  , payload: { tile, marked }
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

export const startOver = (layout: LayoutData): Action => (
  { type:    START_OVER
  , payload: { layout }
  }
)

export const startOverAtOnce = (): Action => (
  { type: START_OVER_AT_ONCE }
)

export const setLayouts = (layouts: { [name: string]: Template }): Action => (
  { type:    SET_LAYOUTS,
    payload: { layouts }
  }
)
