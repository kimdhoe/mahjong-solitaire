import { Action }   from '@ngrx/store'
import { generate } from 'shortid'

import { addTiles
       , newBoard
       , newTurtleBoard
       , removeTiles
       , shuffleBoard
       , updateOpenness
       }      from '../../dealer'
import { isSameTile
       , LayoutData
       , makeLayoutData
       , makeTable
       , Table
       , Tile
       , proceedTimeline
       , collectRemovedTiles
       }      from '../../model'
import { MARK_TILE
       , SET_BOARD
       , SET_BOARDS
       , SET_LAYOUTS
       , SHUFFLE
       , SHUFFLE_AT_ONCE
       , START_GAME
       , START_OVER_AT_ONCE
       , TIME_TRAVEL
       }      from '../../constants/action-names'
import TURTLE from '../../constants/templates/turtle'

// Given a table and a payload of START_GAME action, produces a new table.
//   - Sets a given layout-data as a current layout.
//   - Constructs a board using a template from the payload.
const tableOnStartGame = (table: Table, payload: any): Table => {
  const baseBoard = newBoard(payload.layout.template)

  return makeTable(payload.layout, baseBoard, baseBoard)
}

// Given a table, produces a fresh table.
const tableOnStartOverAtOnce = (table: Table): Table => {
  const newBoard = shuffleBoard(table.baseBoard)

  return makeTable(table.layout, newBoard, newBoard)
}

// Given a table and a payload of MARK_TILE action, produces a new table.
const tableOnMarkTile = (table: Table, payload: any): Table => {
  const marked0 = table.marked[0]
  const marked1 = payload.tile

  if (!marked0)
    return makeTable( table.layout
                    , table.baseBoard
                    , table.board
                    , [ payload.tile ]
                    , table.timeline
                    )

  if (isSameTile(marked0, marked1))
    return makeTable( table.layout
                    , table.baseBoard
                    , table.board
                    , []
                   , table.timeline
                    )

  if (marked0.name === marked1.name)
    return makeTable( table.layout
                    , table.baseBoard
                    , updateOpenness(
                        removeTiles([ marked0, marked1 ], table.board)
                      )
                    , []
                    , proceedTimeline([ marked0, marked1 ], table.timeline)
                    )

  return table
}

// Given a table, produces a table with a shuffled board.
const tableOnShuffleAtOnce = (table: Table): Table => {
  const shuffled = shuffleBoard(table.board)

  return makeTable(table.layout, table.baseBoard, shuffled)
}

// Given a table and a payload of TIME_TRAVEL action, produces a new table.
const tableOnTimeTravel = (table: Table, payload: any): Table => {
  const removedTiles    = collectRemovedTiles(payload.target)
  const boardInTimeline = updateOpenness(
                            removeTiles(removedTiles, table.baseBoard)
                          )

  return makeTable( table.layout
                  , table.baseBoard
                  , boardInTimeline
                  , []
                  , { head:    table.timeline.head
                    , current: payload.target
                    }
                  )
}

const turtleData: LayoutData = makeLayoutData('turtle', TURTLE)

// !!! remove?
// Given a table and a payload of SET_LAYOUTS action, produces a new table.
// const tableOnSetLayouts = (table: Table, payload: any): Table => {
//   const { layouts } = payload
//   const saved: LayoutData[] = Object.keys(layouts).map(
//                                 name => makeLayoutData(name, layouts[name])
//                               )
//   const newLayouts: LayoutData[] = [ turtleData, ...saved ]
//
//   return makeTable( newLayout
//                   , table.baseBoard
//                   , table.board
//                   , table.marked
//                   , table.timeline
//                   )
// }

// Table reducer.
const table = (state: Table = makeTable(), action: Action): Table => {
  switch (action.type) {
    case MARK_TILE:
      return tableOnMarkTile(state, action.payload)

    case TIME_TRAVEL:
      return tableOnTimeTravel(state, action.payload)

    case START_GAME:
      return tableOnStartGame(state, action.payload)

    case START_OVER_AT_ONCE:
      return tableOnStartOverAtOnce(state)

    case SHUFFLE_AT_ONCE:
      return tableOnShuffleAtOnce(state)

    case SET_BOARD:   // Do not change the base board:
      return makeTable(state.layout, state.baseBoard, action.payload.board)

    case SET_BOARDS:  // Change the base board:
      return makeTable(state.layout, action.payload.board, action.payload.board)

    default:
      return state
  }
}

export default table
