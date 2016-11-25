import { ChangeDetectionStrategy
       , Component
       , EventEmitter
       , Input
       , Output
       }              from '@angular/core'

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
  @Input() editor: EditorBoard

  @Output() toggle = new EventEmitter<SlotAddress>()

  onToggle (address: SlotAddress): void {
    this.toggle.emit(address)
  }

  layerId (layer: EditorLayer): string {
    return layer.id
  }
}

export default EditorComponent
