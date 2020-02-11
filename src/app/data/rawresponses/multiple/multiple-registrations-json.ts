export interface MultipleRegistrationsJSON {

  readonly _embedded: MultipleEmbeddedJSON,
  readonly _links: LinksJSON,
  readonly page: PageJSON
}


export interface MultipleEmbeddedJSON {
  readonly registrationEntities: RegistrationJSON[]
}
