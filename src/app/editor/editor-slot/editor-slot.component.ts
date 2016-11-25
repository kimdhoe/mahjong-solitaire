import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       }              from '@angular/core'

import { Slot
       , SlotAddress
       } from '../../world/editor-model'

@Component(
  { selector:        'editor-slot'
  , templateUrl:     './editor-slot.component.html'
  , styleUrls:       [ './editor-slot.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class SlotComponent {
  @Input() slot: Slot

  @Output() toggle = new EventEmitter<SlotAddress>()

  onClick (): void {
    console.log(`Click: Toggle slot #${this.slot.address}.`)
    this.toggle.emit(this.slot.address)
  }

  zIndex (): number {
    return this.slot.address[0] * 100 + this.slot.address[2] * 10
  }
}

export default SlotComponent
