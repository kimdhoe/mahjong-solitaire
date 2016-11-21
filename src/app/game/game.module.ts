import { NgModule }     from '@angular/core'
import { CommonModule } from '@angular/common'

import GameContainer from './game.container'
import Game          from './game.component'
import GameBoard     from './game-board/game-board.component'
import GameLayer     from './game-layer/game-layer.component'
import GameRow       from './game-row/game-row.component'
import GameTile      from './game-tile/game-tile.component'
import GameControl   from './game-control/game-control.component'
import GameFooter    from './game-footer/game-footer.component'

@NgModule(
  { imports:      [ CommonModule ]
  , declarations: [ Game
                  , GameBoard
                  , GameContainer
                  , GameControl
                  , GameFooter
                  , GameLayer
                  , GameRow
                  , GameTile
                  ]
  , exports:      [ GameContainer ]
  }
)
class GameModule {}

export default GameModule
