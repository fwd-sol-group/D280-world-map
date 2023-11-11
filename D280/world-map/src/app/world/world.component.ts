import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Country {
  countryId: string;
  path: string;
}

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {
  selectedCountry: {
    countryName: string;
    countryCapital: string;
    countryRegion: string;
    incomeLevel: string;
    countryLongitude: string;
    countryLatitude: string;
  } | null = null;

  ngOnInit(): void {
    let svgPaths = document.querySelectorAll<SVGPathElement>('.country-path');
    svgPaths.forEach(svgCountry => {
      svgCountry.addEventListener('mouseover', event => {
        const path = event.target as SVGPathElement;
        if (path) {
          path.style.fill = 'red';
        }
      });

      svgCountry.addEventListener('mouseleave', event => {
        const path = event.target as SVGPathElement;
        if (path) {
          path.style.fill = '';
        }
      });

      svgCountry.addEventListener('click', () => {
        this.getCountryData(svgCountry.id); // Pass country id to the function
      });
    });
  }

  // Fetch country data from the API
  async getCountryData(countryId: string) {
    let api: string = 'https://api.worldbank.org/V2/country/' + countryId + '?format=json';
    let res: Response = await fetch(api);
    let data: any = await res.json();
    let dataPath: any = data[1][0];

    
    this.selectedCountry = {
      countryName: dataPath.name,
      countryCapital: dataPath.capitalCity,
      countryRegion: dataPath.region.value,
      incomeLevel: dataPath.incomeLevel.value,
      countryLongitude: dataPath.longitude,
      countryLatitude: dataPath.latitude
    };
  }
}