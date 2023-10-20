import { faker } from "@faker-js/faker";

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    };
    // does not work
    // this.location.lat = faker.location.latitude();
    // this.location.lng = faker.location.longitude();
  }
}
