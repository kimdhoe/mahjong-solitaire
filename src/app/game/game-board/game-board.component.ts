import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       , trigger
       , state
       , style
       , transition
       , animate
       }              from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Board
       , Layer
       , LayerIndex
       , Tile
       , YesOrNo
       }              from '../../world/model'
import { TILE_DEPTH } from '../../world/constants/visual'

@Component(
  { selector:        'game-board'
  , templateUrl:     './game-board.component.html'
  , styleUrls:       [ './game-board.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class GameBoard {
  @Input() board:         Board
  @Input() marked:        Tile[]
  @Input() shouldAnimate: YesOrNo[]
  @Input() visibleLayers: number

  @Output() mark = new EventEmitter<Tile>()

  // Returns id of a given layer.
  layerId (layerIndex: number, layer: Layer): string {
    return layer.id
  }

  // Emits a mark event loaded with a given tile.
  onMark (tile): void {
    this.mark.emit(tile)
  }

  // Calculates layer offset value in px for 3D-like appearance.
  offsetForLayer (i: LayerIndex): number {
    return TILE_DEPTH * i * -1
  }
}

export default GameBoard
