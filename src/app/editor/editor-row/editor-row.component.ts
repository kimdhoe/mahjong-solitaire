import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

import { EditorRow
       , Slot
       , SlotAddress
       } from '../../world/editor-model'

@Component(
  { selector:        'editor-row'
  , templateUrl:     './editor-row.component.html'
  , styleUrls:       [ './editor-row.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class EditorRowComponent {
  @Input() row:           EditorRow
  @Input() isAdding:      boolean
  @Input() numberOfAdded: number

  @Output() addTile    = new EventEmitter<SlotAddress>()
  @Output() removeTile = new EventEmitter<SlotAddress>()

  onAddTile (address: SlotAddress): void {
    this.addTile.emit(address)
  }

  onRemoveTile (address: SlotAddress): void {
    this.removeTile.emit(address)
  }

  slotId (slot: Slot): string {
    return slot.id
  }

  zIndexForSlot (slot: Slot): number {
    return slot.address[0] * 1000 + slot.address[1] * 100 + slot.address[2] * 100
  }
}

export default EditorRowComponent
