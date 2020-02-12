import {LinksJSON} from '../links-json';

export interface RegistrationJSON {
  readonly id: number;
  // readonly user: string;
  readonly _links: LinksJSON;
  readonly outcome?: string;
}
