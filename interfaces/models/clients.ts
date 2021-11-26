interface PersonalDataClient {
  name: string;
  surname1: string;
  surname2: string;
}

interface UserDataClient {
  userName: string;
  password: string;
  email: string;
  phone: number;
}

interface InterestDataClient {
  tattooStyles: Array<string>;
  suggestions: Boolean;
}

interface Client {
  personalDataClient: PersonalDataClient;
  userDataClient: UserDataClient;
  interestDataClient: InterestDataClient;
  profileImage: String;
  favoriteTattoos: Array<string>;
  favoriteTattooArtists: Array<string>;
}

export default Client;
