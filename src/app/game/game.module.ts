import { NgModule }     from '@angular/core'

import GameRoutingModule from './game-routing.module'
import SharedModule      from '../shared/shared.module'
import GameContainer     from './game.container'
import Game              from './game.component'
import GameBoard         from './game-board/game-board.component'
import GameLayer         from './game-layer/game-layer.component'
import GameRow           from './game-row/game-row.component'
import GameTile          from './game-tile/game-tile.component'
import GameControl       from './game-control/game-control.component'
import GameTimeline      from './game-timeline/game-timeline.component'
import GameCommit        from './game-timeline/game-commit/game-commit.component'
import GameCommits       from './game-timeline/game-commits/game-commits.component'

@NgModule(
  { imports:      [ SharedModule
                  , GameRoutingModule
                  ]
  , exports:      [ GameTile ]
  , declarations: [ Game
                  , GameBoard
                  , GameContainer
                  , GameControl
                  , GameLayer
                  , GameRow
                  , GameTile
                  , GameTimeline
                  , GameCommit
                  , GameCommits
                  ]
  }
)
class GameModule {}

export default GameModule
