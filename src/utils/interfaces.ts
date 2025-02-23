export interface PlayerState {
  red: PlayerProps;
  yellow: PlayerProps;
  green: PlayerProps;
  blue: PlayerProps;
}

export interface PlayerProps {
  pieces: PlayerPiecesProps;
  color: string;
  player: string;
}

export interface PlayerPiecesProps {
  one: PieceProps;
  two: PieceProps;
  three: PieceProps;
  four: PieceProps;
}

export interface PieceProps {
  position: string;
  name: string;
  color: string;
  updateTime: number;
}
