import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       , group
       , keyframes
       , trigger
       , state
       , style
       , transition
       , animate
       } from '@angular/core'

import { Row
       , Tile
       , YesOrNo
       }              from '../../world/model'
import { TILE_WIDTH } from '../../world/constants/visual'

@Component(
  { selector:        'game-row'
  , templateUrl:     './game-row.component.html'
  , styleUrls:       [ './game-row.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  , animations:
      [ trigger(
          'fade'
        , [ state('in', style({ transform: 'translateX(0)'
                              , opacity: 1
                              }
                             )
                 )
          , transition( 'void => yes'
                      , [ style({ transform: 'translateX(-7px) '
                                           + 'translateY(-10px) '
                                , opacity: 0
                                }
                               )
                        , group([ animate( '350ms ease-in'
                                         , style({ transform: 'translateX(0)' })
                                         )
                                , animate( '10ms ease-in'
                                         , style({ opacity: 1 })
                                         )
                                ]
                               )
                        ]
                      )
          , transition( 'yes => void'
                      , group([ animate( '200ms ease-out'
                                       , style({ transform: 'translateX(-7px)'
                                                          + 'translateY(-10px)'
                                               }
                                              )
                                       )
                              , animate( '200ms'
                                       , keyframes([ style({ opacity: 1, offset: 0 })
                                                   , style({ opacity: 1, offset: 0.85 })
                                                   , style({ opacity: 0, offset: 1 })
                                                   ]
                                                  )
                                       )
                              ]
                             )
                      )
          ]
        )
      ]
  }
)
class GameRow {
  @Input() row:           Row
  @Input() marked:        Tile[]
  @Input() shouldAnimate: YesOrNo
  @Input() visibleLayers: number
  @Input() layerIndex:    number

  @Output() mark = new EventEmitter<Tile>()

  // Produces visible tiles.
  tiles (): Tile[] {
    if (this.layerIndex < this.visibleLayers)
      return this.row.tiles.filter(tile => tile.name)

    return []
  }

  // Emits a mark event loaded with a given tile.
  onMark (tile): void {
    this.mark.emit(tile)
  }

  // Returns id of a given tile
  tileId (index: number, tile: Tile): string {
    return tile.id
  }

  // Calculates left position.
  leftForTile (tile: Tile): number {
    return tile.address[2] * TILE_WIDTH / 2
  }

  // Calculates z-index.
  zIndexForTile (tile: Tile): number {
    return tile.address[0] * 100 + tile.address[2] * 10
  }
}

export default GameRow
