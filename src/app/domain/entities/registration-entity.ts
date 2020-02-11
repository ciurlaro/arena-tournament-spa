import {UserEntity} from './user-entity';
import {TournamentEntity} from './tournament-entity';

export class RegistrationEntity {

  constructor(
    public readonly user: UserEntity,
    public readonly tournament: TournamentEntity,
    public readonly outcome?: string
  ) {}
}
