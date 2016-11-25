import { Action }   from '@ngrx/store'
import { generate } from 'shortid'

import { addTiles
       , newTurtleBoard
       , removeTiles
       , shuffleBoard
       , updateOpenness
       } from '../../dealer'
import { isSameTile
       , makeTable
       , Table
       , Tile
       , proceedTimeline
       , collectRemovedTiles
       } from '../../model'
import { MARK_TILE
       , SET_BOARD
       , SHUFFLE
       , SHUFFLE_AT_ONCE
       , START_GAME
       , START_OVER_AT_ONCE
       , TIME_TRAVEL
       } from '../../constants/action-names'

// Produces a new table.
const tableOnStartGame = (): Table => {
  const baseBoard = newTurtleBoard()

  return makeTable(baseBoard, baseBoard)
}

// Given a table and a payload of MARK_TILE action, produces a new table.
const tableOnMarkTile = (table: Table, payload: any): Table => {
  const marked0 = table.marked[0]
  const marked1 = payload.tile

  if (!marked0)
    return makeTable( table.baseBoard
                    , table.board
                    , [ payload.tile ]
                    , table.timeline
                    )

  if (isSameTile(marked0, marked1))
    return makeTable( table.baseBoard
                    , table.board
                    , []
                   , table.timeline
                    )

  if (marked0.name === marked1.name)
    return makeTable( table.baseBoard
                    , updateOpenness(
                        removeTiles([ marked0, marked1 ], table.board)
                      )
                    , []
                    , proceedTimeline([ marked0, marked1 ], table.timeline)
                    )

  return table
}

// Given a table and a payload of SHUFFLE_AT_ONCE action, produces a new table.
const tableOnShuffleAtOnce = (table: Table, payload: any): Table => {
  const shuffled = shuffleBoard(table.board)

  return makeTable(shuffled, shuffled)
}

// Given a table and a payload of TIME_TRAVEL action, produces a new table.
const tableOnTimeTravel = (table: Table, payload: any): Table => {
  const removedTiles    = collectRemovedTiles(payload.target)
  const boardInTimeline = updateOpenness(
                            removeTiles(removedTiles, table.baseBoard)
                          )

  return makeTable( table.baseBoard
                  , boardInTimeline
                  , []
                  , { head:    table.timeline.head
                    , current: payload.target
                    }
                  )
}

// Table reducer.
const table = (state: Table = makeTable(), action: Action): Table => {
  switch (action.type) {
    case START_GAME:
    case START_OVER_AT_ONCE:
      return tableOnStartGame()

    case MARK_TILE:
      return tableOnMarkTile(state, action.payload)

    case SHUFFLE_AT_ONCE:
      return tableOnShuffleAtOnce(state, action.payload)

    case SET_BOARD:
      return makeTable(action.payload.board, action.payload.board)

    case TIME_TRAVEL:
      return tableOnTimeTravel(state, action.payload)

    default:
      return state
  }
}

export default table
