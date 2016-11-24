import { BrowserModule } from '@angular/platform-browser'
import { NgModule }      from '@angular/core'
import { StoreModule }   from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import AppComponent    from './app.component'
import GameModule      from './game/game.module'
import CoreModule      from './core/core.module'
import reducers        from './world/reducers'
import RenderEffects   from './world/effects/render-effects.service'
import SoundEffects    from './world/effects/sound-effects.service'

@NgModule(
  { declarations: [ AppComponent ]
  , imports:      [ BrowserModule
                  , GameModule
                  , CoreModule
                  , StoreModule.provideStore(reducers)
                  , EffectsModule.run(RenderEffects)
                  , EffectsModule.run(SoundEffects)
                  ]
  , bootstrap:    [ AppComponent ]
  }
)
export class AppModule {}
