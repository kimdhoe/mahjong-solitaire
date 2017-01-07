import { BrowserModule } from '@angular/platform-browser'
import { NgModule }      from '@angular/core'
import { StoreModule }   from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import AppComponent       from './app.component'
import AppRoutingModule   from './app-routing.module'
import HomeComponent      from './home.component'
import HomeContainer      from './home.container'
import AppFooterComponent from './app-footer.component'
import GameModule         from './game/game.module'
import EditorModule       from './editor/editor.module'
import CoreModule         from './core/core.module'
import reducers           from './world/reducers'
import RenderEffects      from './world/effects/render-effects.service'
import SoundEffects       from './world/effects/sound-effects.service'
import LayoutEffects      from './world/effects/layout-effects.service'

@NgModule(
  { declarations: [ AppComponent
                  , AppFooterComponent
                  , HomeComponent
                  , HomeContainer
                  ]
  , imports:      [ BrowserModule
                  , AppRoutingModule
                  , GameModule
                  , EditorModule
                  , CoreModule
                  , StoreModule.provideStore(reducers)
                  , EffectsModule.run(RenderEffects)
                  , EffectsModule.run(SoundEffects)
                  , EffectsModule.run(LayoutEffects)
                  ]
  , bootstrap:    [ AppComponent ]
  }
)
export class AppModule {}
