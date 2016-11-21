import { BrowserModule } from '@angular/platform-browser'
import { NgModule }      from '@angular/core'
import { StoreModule }   from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import AppComponent    from './app.component'
import GameModule      from './game/game.module'
import reducers        from './world/reducers'
import RenderEffects   from './world/render-effects.service'
import RerenderEffects from './world/rerender-effects.service'

@NgModule(
  { declarations: [ AppComponent ]
  , imports:      [ BrowserModule
                  , GameModule
                  , StoreModule.provideStore(reducers)
                  , EffectsModule.run(RenderEffects)
                  , EffectsModule.run(RerenderEffects)
                  ]
  , providers:    []
  , bootstrap:    [ AppComponent ]
  }
)
export class AppModule {}
