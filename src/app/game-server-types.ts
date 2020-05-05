export interface GameState {
  state: string,
  message: string
}

export interface Player {
  name: string,
  uid: string
}

export interface Timer {
  round: number,
  totalRounds: number,
  roundDuration: number,
  timeRemaining: number
}