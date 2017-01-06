import { generate } from 'shortid'

import { EditorBoard } from './editor-model'
import { randomColor } from '../util'
import TURTLE          from './constants/templates/turtle'

interface World { // [game] Represents the informations regarding tiles and
                  // game play.
                  table: Table

                  // [game] The number of layers that is visible at the moment.
                  //   - 0: Nothing should be visible.
                  //   - 1: Only the bototm layer should be evisible.
                  //   - ...
                  //   - 5: All layers should be visible.
                , visibleLayers: number

                  // [editor] Turn on and off animation.
                , shouldAnimate: YesOrNo

                  // [editor] Represents a layout editor data.
                , editor: EditorBoard

                  // [editor] Is user adding or removing tiles in layout editor?
                , isAdding: boolean

                  // [editor] Keeps track of the number of tiles added so far.
                , numberOfAdded: number
                }

interface Timeline { // A head of a timeline tree.
                     head:    Commit

                     // A commit that represents current state.
                   , current: Commit
                   }

interface Commit { id:       string

                   // A commit is created when a pair of tiles are removed.
                   //   - A root commit is clean.
                 , diff?:    TilePair

                   // A parent represnts the previous commit.
                   //   - The root has no parent.
                 , parent?:  Commit

                   // The children represnt the next commits.
                 , children: Array<Commit>

                   // Commits in a new branch will have a different color.
                 , color:    string
                 }

interface Table { // On time travel, a set of tiles will be removed from
                  // a base board. Will only change on shuffling tiles.
                  baseBoard: Board

                  // Represents the tiles.
                  board:     Board

                  // Marked (selected) tiles at the moment.
                , marked:    Array<Tile>

                  // A revision tree.
                , timeline:  Timeline

                  // !!!
                , layout:    LayoutData

                  // !!! remove?
                  // Available layouts (Turtle + saved layouts)
                // , layouts:   Array<LayoutData>
                }

interface LayoutData { name:     string
                     , template: Template
                     }

type Board = Array<Layer>

interface Layer { id:   string
                , rows: Array<Row>
                }

interface Row   { id:    string
                , tiles: Array<Tile>
                }

interface Tile  { id:      string
                , name:    string
                , isOpen:  boolean
                , address: TileAddress
                }

type TilePair = [ Tile, Tile ]

type YesOrNo = 'yes'
             | 'no'

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

// Produces a layout-data.
const makeLayoutData = (name: string, template: Template): LayoutData => (
  { name, template }
)

// Produces a layer.
const makeLayer = (rows: Row[], id: string = generate()): Layer => (
  { rows, id }
)

// Produces a row.
const makeRow = (tiles: Tile[] = [], id: string = generate()): Row => (
  { tiles, id }
)

// Produces a tile.
const makeTile = ( name:     string      = ''
                 , isOpen:   boolean     = false
                 , address:  TileAddress = [ 0, 0, 0 ]
                 , id:       string      = generate()
                 ) => (
  { name, isOpen, address, id }
)

// Produces a commit.
const makeCommit = ( children: Commit[]
                   , diff:     TilePair
                   , parent?:  Commit
                   , color:    string = randomColor()
                   , id:       string = generate()
                   ) => (
  { diff, id, children, parent, color }
)

// Produces a timeline.
const makeTimeline = (): Timeline => {
  const head = makeCommit([], null)

  return { head
         , current: head
         }
}

// Produces a table.
const makeTable = ( layout:    LayoutData = makeLayoutData('turtle', TURTLE)
                  , baseBoard: Board      = []
                  , board:     Board      = []
                  , marked:    Tile[]     = []
                  , timeline:  Timeline   = makeTimeline()
                  ): Table => (
  { layout, baseBoard, board, marked, timeline }
)

// Are the addresses of t1 and t2 the same?
const isSameTile = (t1: Tile, t2: Tile): boolean => {
  const [ i1, j1, k1 ] = t1.address
  const [ i2, j2, k2 ] = t2.address

  return i1 === i2 && j1 === j2 && k1 === k2
}

// Are t1 and t2 matching tiles?
const areMatchingTiles = (t1: Tile, t2: Tile): boolean =>
     t1.name === t2.name
  && !isSameTile(t1, t2)

// Are the given two pairs of tiles the same?
const isSamePair = ([ t1, t2 ]: TilePair, [ t3, t4 ]: TilePair): boolean =>
     (isSameTile(t1, t3) && isSameTile(t2, t4))
  || (isSameTile(t1, t4) && isSameTile(t2, t3))

// Finds a commit for removed in commits.
// If there isn't, returns null.
const findCommit = (removed: TilePair, commits: Commit[]): Commit => {
  for (let i = 0; i < commits.length; i++) {
    if (isSamePair(commits[i].diff, removed))
      return commits[i]
  }

  return null
}

// Given a pair of removed tiles, proceeds a given timeline
// by inserting a new commit or changing current commit.
const proceedTimeline = (removed: TilePair, timeline): Timeline => {
  const existingCommit = findCommit(removed, timeline.current.children)

  if (existingCommit)
    return { head:    timeline.head
           , current: existingCommit
           }

  const { current } = timeline

  const newCommit = makeCommit( []
                              , removed
                              , current
                              , current.children.length > 0
                                  ? randomColor()
                                  : current.color
                              )

  timeline.current.children.push(newCommit)

  return { head:    timeline.head
         , current: newCommit
         }
}

// Collects all tiles removed since the beginning of timeline.
const collectRemovedTiles = (commit: Commit): Tile[] => {
  const removed = []

  if (commit.diff)
    removed.push(...commit.diff)

  while (commit.parent) {
    commit = commit.parent

    removed.push(...commit.diff)
  }

  return removed
}

export { areMatchingTiles
       , Board
       , collectRemovedTiles
       , Commit
       , isSameTile
       , LayoutData
       , makeLayer
       , makeLayoutData
       , makeRow
       , makeTable
       , makeTile
       , proceedTimeline
       , Row
       , RowIndex
       , RowTemplate
       , Table
       , Template
       , Tile
       , TileAddress
       , TileIndex
       , TilePair
       , Timeline
       , Layer
       , LayerIndex
       , LayerTemplate
       , World
       , YesOrNo
       }
