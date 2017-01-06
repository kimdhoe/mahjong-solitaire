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
       , SET_LAYOUTS
       , SHUFFLE
       , SHUFFLE_AT_ONCE
       , START_GAME
       , START_OVER_AT_ONCE
       , TIME_TRAVEL
       }      from '../../constants/action-names'
import TURTLE from '../../constants/templates/turtle'

// Given a table and a layout name, produces a new table.
const tableOnStartGame = (table: Table, layoutName: string): Table => {
  // const baseBoard = newTurtleBoard()
  const template = table.layouts[layoutName]
  const baseBoard = template ? newBoard(template) : newBoard(TURTLE)

  return makeTable(table.layouts, baseBoard, baseBoard)
}

// Given a table and a payload of MARK_TILE action, produces a new table.
const tableOnMarkTile = (table: Table, payload: any): Table => {
  const marked0 = table.marked[0]
  const marked1 = payload.tile

  if (!marked0)
    return makeTable( table.layouts
                    , table.baseBoard
                    , table.board
                    , [ payload.tile ]
                    , table.timeline
                    )

  if (isSameTile(marked0, marked1))
    return makeTable( table.layouts
                    , table.baseBoard
                    , table.board
                    , []
                   , table.timeline
                    )

  if (marked0.name === marked1.name)
    return makeTable( table.layouts
                    , table.baseBoard
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

  return makeTable(table.layouts, shuffled, shuffled)
}

// Given a table and a payload of TIME_TRAVEL action, produces a new table.
const tableOnTimeTravel = (table: Table, payload: any): Table => {
  const removedTiles    = collectRemovedTiles(payload.target)
  const boardInTimeline = updateOpenness(
                            removeTiles(removedTiles, table.baseBoard)
                          )

  return makeTable( table.layouts
                  , table.baseBoard
                  , boardInTimeline
                  , []
                  , { head:    table.timeline.head
                    , current: payload.target
                    }
                  )
}

const turtleData: LayoutData = makeLayoutData('turtle', TURTLE)

// Given a table and a payload of SET_LAYOUTS action, produces a new table.
const tableOnSetLayouts = (table: Table, payload: any): Table => {
  const { layouts } = payload
  const saved: LayoutData[] = Object.keys(layouts).map(
                                name => makeLayoutData(name, layouts[name])
                              )
  const newLayouts: LayoutData[] = [ turtleData, ...saved ]

  return makeTable( newLayouts
                  , table.baseBoard
                  , table.board
                  , table.marked
                  , table.timeline
                  )
}

// Table reducer.
const table = (state: Table = makeTable(), action: Action): Table => {
  switch (action.type) {
    case START_GAME:
    case START_OVER_AT_ONCE:
      return tableOnStartGame(state, action.payload.layout)

    case MARK_TILE:
      return tableOnMarkTile(state, action.payload)

    case SHUFFLE_AT_ONCE:
      return tableOnShuffleAtOnce(state, action.payload)

    case SET_BOARD:
      return makeTable(action.payload.board, action.payload.board)

    case TIME_TRAVEL:
      return tableOnTimeTravel(state, action.payload)

    case SET_LAYOUTS:
      return tableOnSetLayouts(state, action.payload)

    default:
      return state
  }
}

export default table
