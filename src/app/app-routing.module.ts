import { NgModule } from '@angular/core'
import { RouterModule
       , Routes
       }            from '@angular/router'

import HomeContainer from './home.container'

const appRoutes: Routes =
  [ { path: '', component: HomeContainer } ]
  // [ { path: '', redirectTo: '/game', pathMatch: 'full' } ]

@NgModule(
  { imports: [ RouterModule.forRoot(appRoutes) ]
  , exports: [ RouterModule ]
  }
)
class AppRoutingModule {}

export default AppRoutingModule
