import { User } from "./user";
import { Company } from "./Company";

interface Mappable {
  lat: number;
  lng: number;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    const mapDiv = document.getElementById(divId);
    if (mapDiv) {
      this.googleMap = new google.maps.Map(mapDiv, {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      });
    }
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.lat,
        lng: mappable.lng,
      },
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: "Hi there!",
      });

      infoWindow.open(this.googleMap, marker);
    });
  }

  //   addCompanyMarker(company: Company): void {
  //     new google.maps.Marker({
  //       map: this.googleMap,
  //       position: {
  //         lat: company.location.lat,
  //         lng: company.location.lng,
  //       },
  //     });
  //   }
}
