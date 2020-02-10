import {UserEntity} from './user-entity';
import {GameEntity} from './game-entity';

export interface TournamentEntity {
  readonly id: number;
  readonly playersNumber: number;
  readonly title: string;
  readonly description: string;
  readonly mode: string;
  readonly admin: UserEntity;
  readonly game: GameEntity;
}
