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
import GameTimeline  from './game-timeline/game-timeline.component'
import GameCommit    from './game-timeline/game-commit/game-commit.component'
import GameCommits   from './game-timeline/game-commits/game-commits.component'

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
                  , GameTimeline
                  , GameCommit
                  , GameCommits
                  ]
  , exports:      [ GameContainer ]
  }
)
class GameModule {}

export default GameModule
