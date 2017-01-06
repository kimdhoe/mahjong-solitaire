import { NgModule } from '@angular/core'
import { RouterModule
       , Routes
       }            from '@angular/router'

import GameContainer from './game.container'

const gameRoutes: Routes =
   [ { path: 'game', redirectTo: '/game/turtle', pathMatch: 'full' }
   , { path: 'game/:name', component: GameContainer }
   ]

@NgModule(
  { imports: [ RouterModule.forChild(gameRoutes) ]
  , exports: [ RouterModule ]
  }
)
class GameRoutingModule {}

export default GameRoutingModule
