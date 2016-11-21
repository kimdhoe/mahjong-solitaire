import { Action } from '@ngrx/store'

import { addTiles
       , newTurtleBoard
       , removeTiles
       , shuffleBoard
       , updateOpenness
       } from '../dealer'
import { makeTable
       , Table
       , Tile
       }          from '../model'
import { MARK_TILE
       , REDO
       , SET_BOARD
       , SHUFFLE
       , SHUFFLE_AT_ONCE
       , START_GAME
       , UNDO
       }     from '../constants/action-names'

const EMPTY: Table = makeTable()

// Are the addresses of t1 and t2 the same?
const addressEqual = (t1: Tile, t2: Tile): boolean => {
  const [ i1, j1, k1 ] = t1.address
  const [ i2, j2, k2 ] = t2.address

  return i1 === i2 && j1 === j2 && k1 === k2
}

// Given a table and a payload of MARK_TILE action, produces a new table.
const tableOnMarkTile = (table: Table, payload: any): Table => {
  const marked0 = table.marked[0]
  const marked1 = payload.tile

  if (!marked0)
    return makeTable( table.board
                    , [ payload.tile ]
                    , table.removed
                    , table.timelineIndex
                    )

  if (addressEqual(marked0, marked1))
    return makeTable( table.board
                    , []
                    , table.removed
                    , table.timelineIndex
                    )

  if (marked0.name === marked1.name)
    return makeTable( updateOpenness(
                        removeTiles([ marked0, marked1 ], table.board)
                      )
                    , []
                    , [ [ marked0, marked1 ]
                      , ...table.removed.slice(table.timelineIndex + 1)
                      ]
                    , -1
                    )

  return table
}

// Applies UNDO to a given table.
const tableOnUndo = (table: Table): Table => {
  if (table.timelineIndex + 1 >= table.removed.length)
    return table

  return makeTable( updateOpenness(
                      addTiles(table.removed[table.timelineIndex + 1]
                              , table.board
                              )
                    )
                  , []
                  , table.removed
                  , table.timelineIndex + 1
                  )
}

// Applies REDO to a given table.
const tableOnRedo = (table: Table): Table => {
  if (table.timelineIndex < 0)
    return table

  return makeTable( updateOpenness(
                      removeTiles(table.removed[table.timelineIndex]
                                  , table.board
                                  )
                    )
                  , []
                  , table.removed
                  , table.timelineIndex - 1
                  )
}

// Table reducer.
const table = (state: Table = EMPTY, action: Action): Table => {
  switch (action.type) {
    case START_GAME:
      return makeTable(newTurtleBoard())

    case MARK_TILE:
      return tableOnMarkTile(state, action.payload)

    case UNDO:
      return tableOnUndo(state)

    case REDO:
      return tableOnRedo(state)

    case SHUFFLE_AT_ONCE:
      return makeTable(shuffleBoard(state.board))

    case SET_BOARD:
      return makeTable(action.payload.board)

    default:         return state
  }
}

export default table
