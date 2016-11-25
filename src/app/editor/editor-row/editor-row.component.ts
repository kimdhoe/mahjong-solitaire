import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       }              from '@angular/core'

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
  @Input() row: EditorRow

  @Output() toggle = new EventEmitter<SlotAddress>()

  onToggle (address: SlotAddress): void {
    this.toggle.emit(address)
  }

  slotId (slot: Slot): string {
    return slot.id
  }
}

export default EditorRowComponent
