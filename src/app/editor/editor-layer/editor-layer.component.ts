import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       }              from '@angular/core'

import { EditorLayer
       , EditorRow
       , SlotAddress
       } from '../../world/editor-model'

@Component(
  { selector:        'editor-layer'
  , templateUrl:     './editor-layer.component.html'
  , styleUrls:       [ './editor-layer.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class EditorLayerComponent {
  @Input() layer: EditorLayer

  @Output() toggle = new EventEmitter<SlotAddress>()

  onToggle (address: SlotAddress): void {
    this.toggle.emit(address)
  }

  rowId (row: EditorRow): string {
    return row.id
  }
}

export default EditorLayerComponent
