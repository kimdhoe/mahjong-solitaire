import { Component } from '@angular/core'

import { makeTile
       , Tile
       } from './world/model'

@Component(
  { selector:    'app-footer'
  , templateUrl: './app-footer.component.html'
  , styleUrls:   [ './app-footer.component.css' ]
  }
)
class AppFooterComponent {
  tiles: Tile[] = [ makeTile('angular', false, [ 0, 0, 0 ])
                  , makeTile('ngrx', false, [ 0, 0, 0 ])
                  , makeTile('rxjs', false, [ 0, 0, 0 ])
                  , makeTile('webpack', false, [ 0, 0, 0 ])
                  , makeTile('typescript', false, [ 0, 0, 0 ])
                  , makeTile('css', false, [ 0, 0, 0 ])
                  , makeTile('npm', false, [ 0, 0, 0 ])
                  , makeTile('stack-overflow', false, [ 0, 0, 0 ])
                  ]
}

export default AppFooterComponent
