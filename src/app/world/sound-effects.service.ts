import { Injectable } from '@angular/core'
import { Action }     from '@ngrx/store'
import { Actions
       , Effect
       }              from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'

import { MARK_TILE }        from './constants/action-names'
import { areMatchingTiles } from './model'

@Injectable()
class SoundEffects {
  keyboard: HTMLAudioElement

  constructor (private action$: Actions) {
    this.keyboard = new Audio('assets/key.wav')
  }

  @Effect({ dispatch: false })
  makeSound$ =
    this.action$
      .ofType(MARK_TILE)
      .do(action => {
        if (  action.payload.marked[0]
           && areMatchingTiles(action.payload.tile, action.payload.marked[0])
           )
          this.keyboard.play()
      })
}

export default SoundEffects
