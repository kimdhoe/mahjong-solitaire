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
  // Returns all layout data.
  // effect: Reads from the local storage.
  getLayouts (): { [name: string]: Template } {
    return JSON.parse(localStorage.getItem('templates')) || {}
  }

  // Given a layout name, returns a correspoinding layout-data. If data with
  // the given name doesn't exist, returns the default layout data.
  // effect: Reads from the local storage.
  getLayout (name: string): LayoutData {
    const layouts = this.getLayouts()

    if (layouts[name])
      return makeLayoutData(name, layouts[name])

    return makeLayoutData('turtle', TURTLE)
  }

  // effect: Given a name and an editor-board, serializes and saves as a new
  //         layout data. (if possible)
  saveLayout (name: string, editor: EditorBoard): void {
    const templates = this.getLayouts()
    templates[name] = serializeEditor(editor)
    localStorage.setItem('templates', JSON.stringify(templates))
  }

  // effect: Deletes a layout with a given name from the storage.
  deleteLayout (name: string): void {
    const templates = this.getLayouts()

    delete templates[name]

    if (Object.keys(templates).length)
      localStorage.setItem('templates', JSON.stringify(templates))
    else
      localStorage.removeItem('templates')
  }
}

export default LayoutService
