import { Component
       , OnInit
       }              from '@angular/core'
import { Action
       , Store
       }              from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { LayoutData
       , Table
       , World
       }              from './world/model'
import { setLayouts } from './world/actions/game'
import LayoutService  from './core/layout.service'

@Component(
  { selector: 'home-container'
  , template: `<home
                 [layoutNames]="layoutNames"

                 (deleteLayout)="onDeleteLayout($event)"
               >
               </home>
              `
  }
)
class HomeContainer implements OnInit {
  layoutNames: string[]

  constructor (private layout: LayoutService) {}

  ngOnInit (): void {
    const templates = this.layout.getLayouts()
    const names     = templates ? Object.keys(templates) : []

    this.layoutNames = [ 'turtle', ...names ]
  }

  onDeleteLayout (name: string): void {
    console.log(`Delete ${name}`)

    try {
      this.layout.deleteLayout(name)
      this.layoutNames = this.layoutNames.filter(n => n !== name)
    } catch (e) {
      console.error(e)
    }
  }
}

export default HomeContainer
