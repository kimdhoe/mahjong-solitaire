import { Injectable } from '@angular/core'

import { Board } from './world/model'
import { newTurtleBoard
       , shuffleBoard
       }         from './world/dealer'

@Injectable()
class DealerService {
  newTurtleBoard (): Board {
    return newTurtleBoard()
  }

  shuffle (board: Board): Board {
    return shuffleBoard(board)
  }
}

export default DealerService
