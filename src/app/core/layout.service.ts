import { Injectable } from '@angular/core'

import { LayoutData
       , makeLayoutData
       , Template
       }      from '../world/model'
import { EditorBoard
       , serializeEditor
       }      from '../world/editor-model'
import TURTLE from '../world/constants/templates/turtle'

@Injectable()
class LayoutService {
  // Effect: Retrives saved layout-data from a local storage.
  getLayouts (): { [name: string]: Template } {
    return JSON.parse(localStorage.getItem('templates')) || {}
  }

  // Effect: Given a layout name, retrives a saved layout-data.
  //         If data with the given name doesn't exist, returns the default
  //         layout data.
  getLayout (name: string): LayoutData {
    const layouts = this.getLayouts()

    if (layouts[name])
      return makeLayoutData(name, layouts[name])

    return makeLayoutData('turtle', TURTLE)
  }

  // Effect: Given a name and an editor-board, serializes and saves as a new
  //         layout data. (if possible)
  saveLayout (name: string, editor: EditorBoard): void {
    const templates = this.getLayouts()
    templates[name] = serializeEditor(editor)
    localStorage.setItem('templates', JSON.stringify(templates))
  }
}

export default LayoutService
