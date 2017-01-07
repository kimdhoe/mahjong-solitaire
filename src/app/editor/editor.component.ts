import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       } from '@angular/core'

import { EditorBoard
       , EditorLayer
       , Slot
       , SlotAddress
       } from '../world/editor-model'

@Component(
  { selector:        'editor'
  , templateUrl:     './editor.component.html'
  , styleUrls:       [ './editor.component.css' ]
  , changeDetection: ChangeDetectionStrategy.OnPush
  }
)
class EditorComponent {
  @Input() editor:        EditorBoard
  @Input() isAdding:      boolean
  @Input() numberOfAdded: number
  @Input() hasChanged:    boolean

  @Output() addTile     = new EventEmitter<SlotAddress>()
  @Output() removeTile  = new EventEmitter<SlotAddress>()
  @Output() toggleMode  = new EventEmitter()
  @Output() resetEditor = new EventEmitter()
  @Output() saveLayout  = new EventEmitter<{ name: string, editor: EditorBoard }>()

  onAddTile (address: SlotAddress): void {
    this.addTile.emit(address)
  }

  onRemoveTile (address: SlotAddress): void {
    this.removeTile.emit(address)
  }

  onToggleMode (): void {
    this.toggleMode.emit()
  }

  onResetEditor (): void {
    this.resetEditor.emit()
  }

  onSaveLayout (name: string): void {
    this.saveLayout.emit({ name, editor: this.editor })
  }

  layerId (layer: EditorLayer): string {
    return layer.id
  }
}

export default EditorComponent
