import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SearchTournamentFlowService} from './services/search-tournament-flow.service';
import {ArenaTournamentRepository} from './domain/repositories/arena-tournament-repository';
import {GameEntity} from './domain/entities/game-entity';
import {UserEntity} from './domain/entities/user-entity';
import {TournamentEntity} from './domain/entities/tournament-entity';
import {RegistrationEntity} from './domain/entities/registration-entity';
import {AuthChangesUseCase} from './domain/usecases/login/auth-changes-use-case';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  private sub: Subscription;
  private testSubs: Subscription[] = [];

  constructor(
    private authChangesUseCase: AuthChangesUseCase,
    private searchTournamentFlowService: SearchTournamentFlowService,
    private repository: ArenaTournamentRepository
  ) {
  }

  ngOnInit(): void {
    this.sub = this.authChangesUseCase.buildAction()
      .subscribe((value) => this.isLoggedIn = value);
    // this.repositoryCalls();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.testSubs.forEach((sub) => sub.unsubscribe());
  }

  onSearchTournamentTextChanged(text: string) {
    this.searchTournamentFlowService.publish(text);
  }


  repositoryCalls(): void {

    const id = 33;
    const email = 'email';
    const nickname = 'nickname';
    const password = 'password';
    const isSubscriber = true;
    const image: Uint8Array = Uint8Array.from([0, 1, 2, 3, 4]);
    const playersNumber = 42;
    const title = 'title';
    const modeName = 'modeName';
    const gameName = 'gameName';
    const availableModes: string[] = ['mode1', 'mode2'];
    const icon = 'icon';
    const description = 'description';
    const mode: string = availableModes[0];
    const page = 0;

    const user: UserEntity = new UserEntity('user_nick', email, nickname, isSubscriber, image.toString());
    const admin: UserEntity = new UserEntity('admin_nick', email, nickname, isSubscriber, image.toString());
    const game: GameEntity = new GameEntity(gameName, availableModes, image.toString(), icon);
    const tournament: TournamentEntity = new TournamentEntity(id, playersNumber, title, description, modeName, admin, game);
    const registration: RegistrationEntity = new RegistrationEntity(user, tournament, game, 69);

    this.testSubs = [
      this.repository.createTournament(playersNumber, title, description, mode, admin, game),
      this.repository.createGame(gameName, availableModes, image.toString(), icon),
      this.repository.createRegistration(user, tournament),
      this.repository.createGameMode(modeName),
      this.repository.updateCurrentUserEmail(email),
      this.repository.updateCurrentUserPassword(password),
      this.repository.updateCurrentUserNickname(nickname),
      this.repository.updateCurrentUserProfileImage(image),
      this.repository.getGameByName(gameName),
      this.repository.searchGamesByName(gameName, page),
      this.repository.getAllGames(page),
      this.repository.getGamesContainingName(gameName, page),
      this.repository.getGamesByMode(mode, page),
      this.repository.getTournamentById(tournament.id),
      this.repository.getTournamentsByMode(mode, page),
      this.repository.getTournamentsByGame(gameName, page),
      this.repository.getTournamentsByUser(user.id, page),
      this.repository.getShowcaseTournaments(page),
      this.repository.getTournamentsContainingTitles(title, page),
      this.repository.searchTournamentsByName(title, page),
      this.repository.getRegistrationById(registration.id),
      this.repository.getRegistrationsByUser(user.id, page),
      this.repository.getRegistrationsByTournament(tournament.id, page)
    ]
      .map((obs: Observable<any>) => obs.subscribe());
    // (this.repository.getUserById(user.id));
    // (this.repository.getCurrentUser());
    // (this.repository.isCurrentUserEmailVerified());
    // (this.repository.loginWithEmailAndPassword(email, password));
    // (this.repository.loginWithFacebookToken(token));
    // (this.repository.loginWithGoogleToken(token));
    // (this.repository.logout());
    // (this.repository.createAccountWithEmailAndPassword(email, password));
    // (this.repository.getCurrentUserAuthMethods());
    // (this.repository.getAuthMethodsForEmail(email));
    // (this.repository.linkGoogleAuthProvider(token));
    // (this.repository.linkFacebookProvider(token));
    // (this.repository.linkPasswordAuthProvider(token));
    // (this.repository.reauthenticateWithGoogleToken(token));
    // (this.repository.reauthenticateWithFacebookToken(token));
    // (this.repository.isCurrentUserSubscriber());
  }
}
