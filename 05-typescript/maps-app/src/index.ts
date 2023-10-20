import { Company } from "./Company";
import { User } from "./user";
import { CustomMap } from "./CustomMap";

const user = new User();
console.log(user);

const company = new Company();
console.log(company);

const map = new CustomMap("map");

map.addMarker(user.location);
map.addMarker(company.location);

/// <reference types="@types/google.maps" />
