import {UserEntity} from './user-entity';
import {TournamentEntity} from './tournament-entity';

export interface RegistrationEntity {
  readonly user: UserEntity;
  readonly tournament: TournamentEntity;
  readonly outcome?: string;
}
