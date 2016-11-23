import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , OnInit
       , Output
       } from '@angular/core'

import { Tile } from '../../world/model'
import { TILE_WIDTH
       , TILE_HEIGHT
       }        from '../../world/constants/visual'

@Component(
  { selector:        'game-tile'
  , templateUrl:     './game-tile.component.html'
  , styleUrls:       [ './game-tile.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class GameTile {
  width:  number = TILE_WIDTH
  height: number = TILE_HEIGHT

  @Input() tile:   Tile
  @Input() marked: Tile[]

  @Output() mark = new EventEmitter()

  // Emits a MARK_TILE event loaded with a tile, only if it is open.
  onClick (): void {
    if (this.tile.isOpen) {
      this.mark.emit(this.tile)
    }
  }

  // Is this tile marked?
  isMarked (): boolean {
    const [ i0, j0, k0 ] = this.tile.address

    return this.marked.some(
      ({ address: [ i, j, k ] }: Tile) =>    i === i0
                                          && j === j0
                                          && k === k0
    )
  }
}

export default GameTile
