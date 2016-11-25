import { NgModule } from '@angular/core'
import { RouterModule
       , Routes
       } from '@angular/router'

import GameContainer from './game.container'

const gameRoutes: Routes =
   [ { path: 'game', component: GameContainer } ]

@NgModule(
  { imports: [ RouterModule.forChild(gameRoutes) ]
  , exports: [ RouterModule ]
  }
)
class GameRoutingModule {}

export default GameRoutingModule
