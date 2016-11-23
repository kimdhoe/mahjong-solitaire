import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

import { YesOrNo } from '../../world/model'

@Component(
  { selector:        'game-control'
  , templateUrl:     './game-control.component.html'
  , styleUrls:       [ './game-control.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class GameControl {
  @Input() shouldAnimate: YesOrNo

  @Output() shuffle         = new EventEmitter()
  @Output() toggleAnimation = new EventEmitter()
}

export default GameControl
