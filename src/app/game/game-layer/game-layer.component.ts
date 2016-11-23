import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

import { Layer
       , Row
       , RowIndex
       , Tile
       , YesOrNo
       }               from '../../world/model'
import { TILE_HEIGHT } from '../../world/constants/visual'

@Component(
  { selector:        'game-layer'
  , templateUrl:     './game-layer.component.html'
  , styleUrls:       [ './game-layer.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class GameLayer {
  @Input() layer:         Layer
  @Input() marked:        Tile[]
  @Input() shouldAnimate: YesOrNo[]
  @Input() visibleLayers: number
  @Input() layerIndex:    number

  @Output() mark = new EventEmitter<Tile>()

  // Returns id of a given row.
  rowId (rowIndex: number, row: Row): string {
    return row.id
  }

  // Emits a mark event loaded with a given tile.
  onMark (tile): void {
    this.mark.emit(tile)
  }

  // Calculates top position value (px) of i-th row.
  topForRow (i: RowIndex): number {
    return TILE_HEIGHT * i / 2
  }
}

export default GameLayer
