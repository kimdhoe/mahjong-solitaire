import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

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
  @Input() layer:         EditorLayer
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

  rowId (row: EditorRow): string {
    return row.id
  }
}

export default EditorLayerComponent
