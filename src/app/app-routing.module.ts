import { NgModule } from '@angular/core'
import { RouterModule
       , Routes
       }            from '@angular/router'

import HomeComponent from './home.component'

const appRoutes: Routes =
  // [ { path: '', component: HomeComponent } ]
  [ { path: '', redirectTo: '/game', pathMatch: 'full' } ]

@NgModule(
  { imports: [ RouterModule.forRoot(appRoutes) ]
  , exports: [ RouterModule ]
  }
)
class AppRoutingModule {}

export default AppRoutingModule
