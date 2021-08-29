import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if(a.number > b.number) {
            return -1;
        }
        else
        {
            return 1;
        }
    })
    return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 200,
    },
    recovered: {
      hex: "#006400",
      multiplier: 1000,
    },
    deaths: {
      hex: "#808080",
      multiplier: 1500,
    },
  };
//draw circles
export const showDataOnMap = (countries, casesType) => (
    countries.map((country) => (
        <Circle
          center={[country.countryInfo.lat, country.countryInfo.long]}
          fillOpacity={0.3}
          pathOptions={{
            color: casesTypeColors[casesType].hex,
            fillColor: casesTypeColors[casesType].hex,
          }}
          radius={casesType === "recovered"?Math.sqrt(country[casesType]/20) * casesTypeColors[casesType].multiplier:Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
        <Popup>
        <div className="info-container">
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
        </Popup> 
        </Circle>
    ))
);