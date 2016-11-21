import { generate } from 'shortid'

interface World { // Represents the informations regarding tiles and game play.
                  table: Table

                  // The number of layers that is visible at the moment.
                  //   - 0: Nothing should be visible.
                  //   - 1: Only the bototm layer should be evisible.
                  //   - ...
                  //   - 5: All layers should be visible.
                , visibleLayers: number

                  // Turn on and off animation.
                , shouldAnimate: YesOrNo
                }

interface Table { // Represents the tiles.
                  board:         Board
                  // Marked (selected) tiles at the moment.
                , marked:        Array<Tile>
                  // The history of removed tiles for undo/redo.
                , removed:       Array<TilePair>
                  // Keeps track of the current position in the undo history.
                , timelineIndex: number
                }

type Board = Array<Layer>

interface Layer { id:   string
                , rows: Array<Row>
                }

interface Row   { id:    string
                , tiles: Array<Tile>
                }

interface Tile  { id:      string
                , name:    TileName
                , isOpen:  boolean
                , address: TileAddress
                }

type TilePair = [ Tile, Tile ]

type YesOrNo = 'yes'
             | 'no'

type TileName    = string
type TileAddress = [ LayerIndex, RowIndex, TileIndex ]
type LayerIndex  = number   // Bottom-layer index is 0.
type RowIndex    = number   // Leftmost-tile index is 0.
type TileIndex   = number   // Top-row index is 0.

type Template      = Array<LayerTemplate>
type LayerTemplate = Array<RowTemplate>
type RowTemplate   = string
// A RowTemplate is a string consisting of 'o' and '-'.
//   - 'o' represents the presence of a tile.
//   - '-' represents the absence of a tile.
//   - e.g. '--o-o-o-o-o-o-o-----'


// Produces a layer.
const makeLayer = ( rows: Row[], id: string = generate() ): Layer => (
  { rows, id }
)

// Produces a row.
const makeRow = ( tiles: Tile[] = [], id: string = generate() ): Row => (
  { tiles, id }
)

// Produces a tile.
const makeTile = ( name:     TileName    = ''
                 , isOpen:   boolean     = false
                 , address:  TileAddress = [ 0, 0, 0 ]
                 , id:       string      = generate()
                 ) => (
  { name, isOpen, address, id }
)

// Produces a table.
const makeTable = ( board:         Board      = []
                  , marked:        Tile[]     = []
                  , removed:       TilePair[] = []
                  , timelineIndex: number     = -1
                  ): Table => (
  { board, marked, removed, timelineIndex }
)

export { Board
       , makeLayer
       , makeRow
       , makeTable
       , makeTile
       , Table
       , Template
       , Tile
       , TileAddress
       , TileIndex
       , TileName
       , Layer
       , LayerIndex
       , LayerTemplate
       , Row
       , RowIndex
       , RowTemplate
       , World
       , YesOrNo
       }
