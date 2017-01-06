import { Component
       , OnInit
       }              from '@angular/core'
import { Action
       , Store
       }              from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { LayoutData
       , World
       }              from './world/model'
import { setLayouts } from './world/actions/game'

@Component(
  { selector: 'home-container'
  , template: `<home [layoutNames]="layoutNames$ | async"></home>`
  }
)
class HomeComponent implements OnInit {
  layoutNames$: Observable<string[]>

  constructor (private store: Store<World>) {
    const layouts$: Observable<LayoutData[]> = store.select('layouts')

    this.layoutNames$ = layouts$.map(layouts => layouts.map(l => l.name))
  }

  ngOnInit (): void {
    const templates = JSON.parse(localStorage.getItem('templates'))

    if (templates)
      this.store.dispatch(setLayouts(templates))

    console.log(Object.keys(templates))

    // Create HomeContainer ???
    // setTemplates(templates)
  }


}

export default HomeComponent
