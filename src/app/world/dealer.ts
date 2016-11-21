import TURTLE     from './constants/templates/turtle'
import TILE_NAMES from './constants/tile-names'

import { Board
       , Layer
       , LayerIndex
       , LayerTemplate
       , Row
       , RowIndex
       , RowTemplate
       , makeLayer
       , makeRow
       , makeTile
       , Table
       , Template
       , Tile
       , TileIndex
       , TileName
       , TileAddress
       } from './model'

const TILE_PLACEHOLDER = makeTile('')

// -----------------------------------------------------------------------------

// Produces a random integer[0, n].
// effect
const random = (n: number): number =>
  Math.floor(Math.random() * (n + 1))

// Inserts x into xs.
// effect: The position of x is determined by Math.random.
const insert = <X> (x: X, xs: Array<X>): Array<X> => {
  const i = random(xs.length)

  return [ ...xs.slice(0, i)
         , x
         , ...xs.slice(i)
         ]
}

// Given an array, produces a shuffled array.
// effect
const shuffle = <X> (xs: Array<X>): Array<X> =>
  xs.length <= 1
    ? xs
    : insert(xs[0], shuffle(xs.slice(1)))

// -----------------------------------------------------------------------------

// Given a row template and tile names, initializes a row.
//   - All tiles are closed (not selectable) by default.
// Assume names contains enough names for the given row template.
const initRow = ( rt:         RowTemplate
                , layerIndex: LayerIndex
                , rowIndex:   RowIndex
                , names:      Array<TileName>
                ): Row => {
  const tiles: Tile[] = []

  let i = 0

  for (const x of rt) {
    if (x === 'o') {
      const name = names.pop()

      if (!name)
        throw new Error('has run out of name?! This should not happen.')

      tiles.push(makeTile(name, false, [ layerIndex, rowIndex, i ]))
    }
    else {
      tiles.push(TILE_PLACEHOLDER)
    }

    i++
  }

  return makeRow(tiles)
}

// Given a layer template and tile names, initialized a layer.
const initLayer = ( lt:         LayerTemplate
                  , layerIndex: LayerIndex
                  , names:      TileName[]
                  ): Layer => {
  const rows = lt.map(// RowTemplate * number -> Row
                      (rt, i) => initRow(rt, layerIndex, i, names)
                     )

  return makeLayer(rows)
}

// Given a whole template and tile names, initialized a board.
const initBoard = (t: Template, names: TileName[]): Board =>
  t.map(// LayerTemplate * number -> Layer
        (lt, i) => initLayer(lt, i, names)
       )


// Updates isOpen property of the tiles in a given board.
const updateOpenness = (board: Board): Board => {
  const forRow = ({ tiles, id }: Row): Row =>
    makeRow( tiles.map(tile => tile.name
                                 ? makeTile( tile.name
                                           , isOpenTile(tile.address, board)
                                           , tile.address
                                           , tile.id
                                           )
                                 : tile
                      )
           , id
           )

  const forLayer = ({ rows, id }: Layer): Layer =>
    makeLayer( rows.map(row => forRow(row))
             , id
             )

  return board.map(layer => forLayer(layer))
}

// Given a template, initializes a board.
// effect: Tiles are positioned differently each time by shuffling TILE_NAMES.
const newBoard = (t: Template): Board => {
  const names = shuffle(TILE_NAMES)

  return updateOpenness(initBoard(t, names))
}

// Produces a turtle board.
// effect: Tiles are differently positioned each time by shuffling tile names.
const newTurtleBoard = (): Board =>
  newBoard(TURTLE)

// Is i-th tile present in row?
const isTilePresentInRow = (i: TileIndex, row: Row): boolean =>
  !!(row.tiles[i] && row.tiles[i].name)

// Is j-th tile present in i-th row of layer?
const isTilePresentInLayer = (i: RowIndex, j: TileIndex, layer: Layer): boolean =>
  layer.rows[i] && isTilePresentInRow(j, layer.rows[i])

// Is upper side of a tile at given position open?
const isTopOpen = ([ l, r, t ]: TileAddress, board: Board): boolean => {
  const upperLayer = board[l + 1]

  return !upperLayer
  || (  !isTilePresentInLayer(r, t, upperLayer)
     && !isTilePresentInLayer(r-1, t-1, upperLayer)
     && !isTilePresentInLayer(r+1, t-1, upperLayer)
     && !isTilePresentInLayer(r-1, t+1, upperLayer)
     && !isTilePresentInLayer(r+1, t+1, upperLayer)
     )
}

// Is east side of a tile at given address open?
const isEastOpen = ([ l, r, t ]: TileAddress, board): boolean => {
  const layer = board[l]

  return !isTilePresentInLayer(r, t+2, layer)
      && !isTilePresentInLayer(r-1, t+2, layer)
      && !isTilePresentInLayer(r+1, t+2, layer)
}

// Is west side of a tile at given address open?
const isWestOpen = ([ l, r, t ]: TileAddress, board: Board): boolean => {
  const layer = board[l]

  return !isTilePresentInLayer(r, t-2, layer)
      && !isTilePresentInLayer(r-1, t-2, layer)
      && !isTilePresentInLayer(r+1, t-2, layer)
}

// Is any of east and west side of a tile at a given address open?
const isSideOpen = (address: TileAddress, board: Board): boolean =>
     isEastOpen(address, board)
  || isWestOpen(address, board)

// Is a tile at address open?
const isOpenTile = (address: TileAddress, board: Board): boolean =>
     isTopOpen(address, board)
  && isSideOpen(address, board)

// Removes a given tile from row.
const removeTileFromRow = (tile: Tile, { tiles, id }: Row): Row => {
  const i = tile.address[2]

  return makeRow( [ ...tiles.slice(0, i)
                  ,  TILE_PLACEHOLDER
                  , ...tiles.slice(i + 1)
                  ]
                , id
                )
}

// Removes a given tile from layer.
const removeTileFromLayer = (tile: Tile, { rows, id }: Layer): Layer => {
  const i = tile.address[1]

  return makeLayer( [ ...rows.slice(0, i)
                    , removeTileFromRow(tile, rows[i])
                    , ...rows.slice(i + 1)
                    ]
                  , id
                  )
}

// Removes a given tile from board.
const removeTile = (tile: Tile, board: Board): Board => {
  const i = tile.address[0]

  return [ ...board.slice(0, i)
         , removeTileFromLayer(tile, board[i])
         , ...board.slice(i + 1)
         ]
}

// Removes the given tiles from board and checks openness.
const removeTiles = (tiles: Tile[], board: Board): Board =>
  tiles.reduce( (acc, x) => removeTile(x, acc)
              , board
              )

// Adds a given tile to row.
const addTileToRow = (tile: Tile, { tiles, id }: Row): Row => {
  const i = tile.address[2]

  return makeRow( [ ...tiles.slice(0, i)
                  , tile
                  , ...tiles.slice(i + 1)
                  ]
                 , id
                )
}

// Adds a given tile to layer.
const addTileToLayer = (tile: Tile, { rows, id }: Layer): Layer => {
  const i = tile.address[1]

  return makeLayer( [ ...rows.slice(0, i)
                    , addTileToRow(tile, rows[i])
                    , ...rows.slice(i + 1)
                    ]
                  , id
                  )
}

// Adds a given tile to board.
const addTile = (tile: Tile, board: Board): Board => {
  const i = tile.address[0]

  return [ ...board.slice(0, i)
         , addTileToLayer(tile, board[i])
         , ...board.slice(i + 1)
         ]
}
// Adds the given tiles to board and checks openness.
const addTiles = (tiles: Tile[], board: Board): Board =>
  tiles.reduce( (acc: Board, tile: Tile) => addTile(tile, acc)
              , board
              )

// Collects tile names from row.
const gatherNamesFromRow = (row: Row): TileName[] =>
  row.tiles.reduce(
    (acc: TileName[], tile: Tile) => tile.name
                                       ? [ ...acc, tile.name ]
                                       : acc
  , []
  )

// Collects tile names from layer.
const gatherNamesFromLayer = (layer: Layer): TileName[] =>
  layer.rows.reduce(
    (acc: TileName[], row: Row) => [ ...acc
                                   , ...gatherNamesFromRow(row)
                                   ]
  , []
  )

// Collects tile names from board.
const gatherNames = (board: Board): TileName[] =>
  board.reduce(
    (acc: TileName[], layer: Layer) => [ ...acc
                                       , ...gatherNamesFromLayer(layer)
                                       ]
  , []
  )

// Shffles tiles in board.
const shuffleBoard = (board: Board): Board => {
  const names = shuffle(gatherNames(board))

  let i = 0

  const forTile = (tile: Tile): Tile =>
    tile.name ? makeTile( names[i++]
                        , tile.isOpen
                        , tile.address
                        , tile.id
                        )
              : tile

  const forRow = ({ tiles, id }: Row): Row => {
    const newTiles = tiles.map(tile => forTile(tile))

    return makeRow(newTiles, id)
  }

  const forLayer = ({ rows, id }: Layer): Layer => {
    const newRows = rows.map(row => forRow(row))

    return makeLayer(newRows, id)
  }

  return board.map(layer => forLayer(layer))
}

export { addTiles
       , initBoard
       , newTurtleBoard
       , removeTiles
       , shuffleBoard
       , updateOpenness
       }
