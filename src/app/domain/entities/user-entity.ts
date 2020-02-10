export interface UserEntity {
  readonly id: string;
  readonly email: string;
  readonly nickname: string;
  readonly isSubscriber: boolean;
  readonly image?: string;
}

