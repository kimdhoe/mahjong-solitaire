import { Injectable } from '@angular/core'
import { Action }     from '@ngrx/store'
import { Actions
       , Effect
       }              from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'

import { MARK_TILE }        from '../constants/action-names'
import { areMatchingTiles } from '../model'

@Injectable()
class SoundEffects {
  keyboardSound: HTMLAudioElement

  constructor (private action$: Actions) {
    this.keyboardSound = new Audio('assets/key.wav')
  }

  @Effect({ dispatch: false })
  makeSound$ =
    this.action$
      .ofType(MARK_TILE)
      .do(action => {
            action.payload.marked[0]
         && areMatchingTiles(action.payload.tile, action.payload.marked[0])
         && this.keyboardSound.play()
      })
}

export default SoundEffects
