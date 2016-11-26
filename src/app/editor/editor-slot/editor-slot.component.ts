import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

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
  @Input() slot:          Slot
  @Input() isAdding:      boolean
  @Input() numberOfAdded: number
  @Input() zIndex: number

  @Output() addTile    = new EventEmitter<SlotAddress>()
  @Output() removeTile = new EventEmitter<SlotAddress>()

  onAddClick (): void {
    this.addTile.emit(this.slot.address)
  }

  onRemoveClick (): void {
    this.removeTile.emit(this.slot.address)
  }

  // Has used up all 144 tiles?
  usedUpAllTiles (): boolean {
    return this.numberOfAdded >= 144
  }

  // !!!
  // calling this function too many times...
  // zIndex (): number {
  //   return this.slot.address[0] * 100 + this.slot.address[2] * 10
  // }
}

export default SlotComponent
