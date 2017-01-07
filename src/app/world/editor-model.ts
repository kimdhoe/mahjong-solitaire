import { generate } from 'shortid'

import { Template
       , LayerTemplate
       , RowTemplate
       } from './model'

type EditorBoard = Array<EditorLayer>

interface EditorLayer { id:   string
                      , rows: Array<EditorRow>
                      }

interface EditorRow { id:    string
                    , slots: Array<Slot>
                    }

interface Slot { id: string

                 // For a slot to be available:
                 //   1) any of its space shouldn't be occupied.
                 //   2) all spaces of a layer below should be occupied.
               , isAvailable: boolean

                 // For a slot to be emptiable:
                 //   1) it must have a tile.
                 //   2) its top side should be completely open.
               , isEmptiable: boolean

                 // Does a slot have a tile?
               , hasTile: boolean

                 // Represents the location of a slot.
               , address: SlotAddress
               }

// Indices of a layer, a row, and a slot.
type SlotAddress = number[]

// Produces a slot.
const makeLayer = (rows: EditorRow[], id: string = generate()): EditorLayer => (
  { rows, id }
)

// Produces a slot.
const makeRow = (slots: Slot[], id: string = generate()): EditorRow => (
  { slots, id }
)

// Produces a slot.
const makeSlot = ( isAvailable: boolean
                 , isEmptiable: boolean
                 , hasTile:     boolean
                 , address:     SlotAddress
                 , id:          string = generate()
                 ): Slot => (
  { isAvailable, isEmptiable, hasTile, address, id }
)

// Given a layer index and a row index, produces an empty row.
const makeEmptyRow = (layerIndex: number, rowIndex: number): EditorRow => {
  const slots: Slot[] = []

  for (let i = 0; i < 29; i++) {
    // !!!
    if (layerIndex === 0)
      slots.push(makeSlot(true, false, false, [ layerIndex, rowIndex, i ]))
    else
      slots.push(makeSlot(false, false, false, [ layerIndex, rowIndex, i ]))
  }

  return makeRow(slots)
}

// Given a layer index, produces an empty layer.
const makeEmptyLayer = (layerIndex: number): EditorLayer => {
  const rows: EditorRow[] = []

  for (let i = 0; i < 15; i++) {
    rows.push(makeEmptyRow(layerIndex, i))
  }

  return makeLayer(rows)
}

// Produces an empty editor.
const makeEmptyEditor = (): EditorBoard => {
  const layers: EditorBoard = []

  for (let i = 0; i < 5; i++) {
    layers.push(makeEmptyLayer(i))
  }

  return layers
}

// Given a slot, toggles hasTile flag.
const toggleSlot = (slot: Slot): Slot =>
  makeSlot(slot.isAvailable, slot.isEmptiable, !slot.hasTile,  slot.address)

// Given a editor-row and and a slot address, toggles isAvailable flag
// of the corresponding slot.
// Assume the index of a given row is always equal to address[1].
const toggleSlotInRow = ( row:     EditorRow
                        , address: SlotAddress
                        ): EditorRow => {
  const slots = [ ...row.slots.slice(0, address[2])
                , toggleSlot(row.slots[address[2]])
                , ...row.slots.slice(address[2] + 1)
                ]

  return makeRow(slots, row.id)
}

// Given a editor-layer and a slot address, toggles isAvailable flag  of the
// corresponding slot.
// Assume the index of a given layer is always equal to address[0].
const toggleSlotInLayer = ( layer:   EditorLayer
                          , address: SlotAddress
                          ): EditorLayer => {
  const rows = [ ...layer.rows.slice(0, address[1])
               , toggleSlotInRow(layer.rows[address[1]], address)
               , ...layer.rows.slice(address[1] + 1)
               ]

  return makeLayer(rows, layer.id)
}

// Collects all slots that can be affected by toggling hasTile flag of a slot
// at address.
const collectAffectedInLayer = ( address: SlotAddress
                               , layer:  EditorLayer
                               ): Slot[] => {
  const [ _, j, k ]      = address
  const affected: Slot[] = []

  const middleRow = layer.rows[j]
  const northRow  = layer.rows[j-1]
  const southRow  = layer.rows[j+1]

  middleRow.slots[k-1] && affected.push(middleRow.slots[k-1])  // west
  affected.push(middleRow.slots[k])                            // itself
  middleRow.slots[k+1] && affected.push(middleRow.slots[k+1])  // east

  if (northRow) {
    northRow.slots[k-1] && affected.push(northRow.slots[k-1])  // north-west
    affected.push(northRow.slots[k])                           // north
    northRow.slots[k+1] && affected.push(northRow.slots[k+1])  // north-east
  }

  if (southRow) {
    southRow.slots[k-1] && affected.push(southRow.slots[k-1])  // south-west
    affected.push(southRow.slots[k])                           // south
    southRow.slots[k+1] && affected.push(southRow.slots[k+1])  // south-east
  }

  return affected
}

// Collects all slots that can be affected by toggling hasTile flag of a slot
// at address.
const collectAffected = (address: SlotAddress, editor: EditorBoard): Slot[] => {
  const [ i, j, k ] = address
  const thisLayer   = editor[i]
  const upperLayer  = editor[i + 1]
  const lowerLayer  = editor[i - 1]

  let affected: Slot[] = []

  lowerLayer && affected.push(...collectAffectedInLayer(address, lowerLayer))
  affected.push(...collectAffectedInLayer(address, thisLayer))
  upperLayer && affected.push(...collectAffectedInLayer(address, upperLayer))

  return affected
}

// Checks the absence of tiles in surrounding addresses.
const checkAbsenceOfSurroundings = ( address: SlotAddress
                                   , layer:   EditorLayer
                                   ): boolean => {
  const [ _, j, k ] = address
  const middleRow   = layer.rows[j]
  const northRow    = layer.rows[j - 1]
  const southRow    = layer.rows[j + 1]

  const isMiddleRowOk =
    !(  middleRow.slots[k].hasTile
     || (middleRow.slots[k - 1] && middleRow.slots[k - 1].hasTile)
     || (middleRow.slots[k + 1] && middleRow.slots[k + 1].hasTile)
     )

  const isNorthRowOk =
       !northRow
    || !(  northRow.slots[k].hasTile
        || (northRow.slots[k - 1] && northRow.slots[k - 1].hasTile)
        || (northRow.slots[k + 1] && northRow.slots[k + 1].hasTile)
        )

  const isSouthRowOk =
       !southRow
    || !(  southRow.slots[k].hasTile
        || (southRow.slots[k - 1] && southRow.slots[k - 1].hasTile)
        || (southRow.slots[k + 1] && southRow.slots[k + 1].hasTile)
        )

  return isMiddleRowOk && isNorthRowOk && isSouthRowOk
}

// Checks the presence of tiles in surrounding addresses.
// A tile can be placed over:
//   - 1 tile  ==> 1 case
//   - 2 tiles ==> 2 cases
//   - 3 tiles ==> 4 cases
//   - 4 tiles ==> 1 case
const checkPresenceOfSurroundings = ( address: SlotAddress
                                    , layer:   EditorLayer
                                    ): boolean => {
  const [ i, j, k ] = address
  const middleRow   = layer.rows[j]
  const northRow    = layer.rows[j-1]
  const southRow    = layer.rows[j+1]

  // 1
  const a = middleRow.slots[k].hasTile

  // 2-1
  const b =  (middleRow.slots[k-1] && middleRow.slots[k-1].hasTile)
          && (middleRow.slots[k+1] && middleRow.slots[k+1].hasTile)

  // 2-2
  const c =  (northRow && northRow.slots[k].hasTile)
          && (southRow && southRow.slots[k].hasTile)

  // 3-1
  const d =  (northRow && northRow.slots[k].hasTile)
          && (  southRow
             && (southRow.slots[k-1] && southRow.slots[k-1].hasTile)
             && (southRow.slots[k+1] && southRow.slots[k+1].hasTile)
             )

  // 3-2
  const e =  (southRow && southRow.slots[k].hasTile)
          && (  northRow
             && (northRow.slots[k-1] && northRow.slots[k-1].hasTile)
             && (northRow.slots[k+1] && northRow.slots[k+1].hasTile)
             )

  // 3-3
  const f =  middleRow.slots[k+1] && middleRow.slots[k+1].hasTile
          && (northRow && northRow.slots[k-1] && northRow.slots[k-1].hasTile)
          && (southRow && southRow.slots[k-1] && southRow.slots[k-1].hasTile)

  // 3-4
  const g =  middleRow.slots[k-1] && middleRow.slots[k-1].hasTile
          && (northRow && northRow.slots[k+1] && northRow.slots[k+1].hasTile)
          && (southRow && southRow.slots[k+1] && southRow.slots[k+1].hasTile)

  // 4
  const h =  (northRow && northRow.slots[k-1] && northRow.slots[k-1].hasTile)
          && (northRow && northRow.slots[k+1] && northRow.slots[k+1].hasTile)
          && (southRow && southRow.slots[k-1] && southRow.slots[k-1].hasTile)
          && (southRow && southRow.slots[k+1] && southRow.slots[k+1].hasTile)

  return a || b || c || d || e || f || g || h
}

// Is a slot at address availble?
// The availability of a slot depends on the surroundings of the current and
// the lower layers.
const isAvailable = (address: SlotAddress, editor: EditorBoard): boolean => {
  const [ i, j, k ] = address
  const lowerLayer  = editor[i-1]

  const isCurrentLayerOk = checkAbsenceOfSurroundings(address, editor[i])
  const isLowerLayerOk   =    !lowerLayer
                           || checkPresenceOfSurroundings(address, lowerLayer)

  return isCurrentLayerOk && isLowerLayerOk
}

// Is a slot at address emptiable?
// The empiability of a slot depends on the surroundings of the upper-layer
// and the presence of a tile in the slot itself.
const isEmptiable = (address: SlotAddress, editor: EditorBoard): boolean => {
  const [ i, j, k ] = address
  const upperLayer  = editor[i+1]

  return editor[i].rows[j].slots[k].hasTile
      && (  !upperLayer
         || checkAbsenceOfSurroundings(address, upperLayer)
         )
}

// Updates isAvailable and isEmptiable flags of a slot at address.
const updateFlagsInRow = ( address: SlotAddress
                         , editor:  EditorBoard
                         ): EditorRow => {
  const [ i, j, k ]   = address
  const row           = editor[i].rows[j]
  const { slots, id } = row

  const newSlots = [ ...slots.slice(0, k)
                   , makeSlot( isAvailable(address, editor)
                             , isEmptiable(address, editor)
                             , slots[k].hasTile
                             , slots[k].address
                             )
                   , ...slots.slice(k + 1)
                   ]

  return makeRow(newSlots, id)
}

// Updates isAvailable and isEmptiable flags of a slot at address.
const updateFlagsInLayer = ( address: SlotAddress
                           , editor:  EditorBoard
                           ): EditorLayer => {
  const [ i, j, k ]  = address
  const layer        = editor[i]
  const { rows, id } = layer

  const newRows = [ ...rows.slice(0, j)
                  , updateFlagsInRow(address, editor)
                  , ...rows.slice(j + 1)
                  ]

  return makeLayer(newRows, id)
}

// Updates isAvailable and isEmptiable flags of a slot at address.
const updateFlags = ( address: SlotAddress
                    , editor:  EditorBoard
                    ): EditorBoard => {
  const [ i ] = address

  return [ ...editor.slice(0, i)
         , updateFlagsInLayer(address, editor)
         , ...editor.slice(i + 1)
         ]
}

// Updates isAvailable and isEmptiable flags of all slots at addresses in
// addresses.
const updateFlagsAll = ( addresses: SlotAddress[]
                       , editor:    EditorBoard
                       ): EditorBoard =>
  addresses.reduce(
    (acc, x) => updateFlags(x, acc)
  , editor
  )

// Given a editor and a slot address, toggles hasTile flag of the corresponding
// slot.
// Then, updates isAvailable and isEmptiable flags of the slots that were
// affected.
const toggleSlotInEditor = ( editor:  EditorBoard
                           , address: SlotAddress
                           ): EditorBoard => {
  const newEditor = [ ...editor.slice(0, address[0])
                    , toggleSlotInLayer(editor[address[0]], address)
                    , ...editor.slice(address[0] + 1)
                    ]

  const affectedAddress = collectAffected(address, editor)
                            .map(slot => slot.address)

  return updateFlagsAll(affectedAddress, newEditor)
}


// Given an editor-row, produces a row-template.
const serializeRow = (row: EditorRow): RowTemplate =>
  row.slots.map(slot => slot.hasTile ? 'o' : '-').join('')

// Given an editor-layer, produces a layer-template.
const serializeLayer = (layer: EditorLayer): LayerTemplate =>
  layer.rows.map(serializeRow)

// Given an editor-board, produces a template.
const serializeEditor = (editor: EditorBoard): Template =>
  editor.map(serializeLayer)

export { EditorBoard
       , EditorLayer
       , EditorRow
       , makeEmptyEditor
       , Slot
       , SlotAddress
       , toggleSlotInEditor

     , serializeEditor
       }
