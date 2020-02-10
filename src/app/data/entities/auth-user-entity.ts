export interface AuthUserEntity {
  readonly id: string;
  readonly email: string;
  readonly nickname: string;
}

export function storageImagePathFor(authUser: AuthUserEntity): string {
  return `users/${authUser.id}/profile`;
}
