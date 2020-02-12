import {RegistrationJSON} from '../rawresponses/single/registration-json';
import {MultipleRegistrationsJSON} from '../rawresponses/multiple/multiple-registrations-json';
import {MultipleTournamentsJSON} from '../rawresponses/multiple/multiple-tournaments-json';
import {TournamentJSON} from '../rawresponses/single/tournament-json';


export interface Splitter<In, Out> {
  split(input: In): Out[];
}


export class RegistrationSplitter implements Splitter<MultipleRegistrationsJSON, RegistrationJSON> {

  split(input: MultipleRegistrationsJSON): RegistrationJSON[] {
    return input._embedded.registrationEntities;
  }
}


export class TournamentSplitter implements Splitter<MultipleTournamentsJSON, TournamentJSON> {

  split(input: MultipleTournamentsJSON): TournamentJSON[] {
    return input._embedded.tournamentEntities;
  }

}

