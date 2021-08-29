import React, { useState, useEffect } from 'react';
import {MenuItem, FormControl, Select} from "@material-ui/core";
import { Card, CardContent, Typography } from '@material-ui/core';
import "./App.css";
import "leaflet/dist/leaflet.css";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import {sortData, prettyPrintStat} from "./util";


function App() {
  const [countriesdata, setCountriesdata] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34, lng: -40 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");
  const [isLoading, setLoading] = useState(false);


  //state = how to write a variable in react

  //useeffect = runs a piece of code based on a given condition

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    //async -> send a request, wait, do something with the info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
            number: country.cases,
            lt: country.countryInfo.lat,
            lg: country.countryInfo.long
          }
        ));
        let sortedData = sortData(countries);
        setTableData(sortedData);
        setCountriesdata(data);
        setCountries(countries);
      })
    }
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    setLoading(true);
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ?
     "https://disease.sh/v3/covid-19/all" :
     `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      setLoading(false);
      countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })
  };



  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1> COVID TRACKER </h1>
      <FormControl className="app__dropdown">
      <Select
        variant="outlined"
        onChange = {onCountryChange}
        value={country}
      >
        <MenuItem value="worldwide">WorldWide</MenuItem>
        {countries.map(country => (
            <MenuItem value = {country.value}>{country.name}</MenuItem>
          ))}
        
      </Select>
    </FormControl>
    </div>

    {/*InfoBoxes*/}

    <div className="app__status">
      <InfoBox 
      active={casesType === "cases"}
      className="infoBox__cases"
      onClick={(e) => setCasesType("cases")}
      title="Cases"
      total={prettyPrintStat(countryInfo.cases)} 
      cases={prettyPrintStat(countryInfo.todayCases)}
      isloading={isLoading}
      />
      <InfoBox 
      active={casesType === "recovered"}
      className="infoBox__recovered"
      onClick={(e) => setCasesType("recovered")}
      title="Recovered" 
      total={prettyPrintStat(countryInfo.recovered)} 
      cases={prettyPrintStat(countryInfo.todayRecovered)}
      isloading={isLoading}
      />
      <InfoBox 
      active={casesType === "deaths"}
      className="infoBox__deaths"
      onClick={(e) => setCasesType("deaths")}
      title="Deaths" 
      total={prettyPrintStat(countryInfo.deaths)} 
      cases={prettyPrintStat(countryInfo.todayDeaths)}
      isloading={isLoading}
      />
    </div>

    <div>
      <Map countries={countriesdata} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
    </div>

    </div>

    <Card className="app__right">
      <CardContent>
        <Typography>
          <div><h3>Live Cases By Country</h3></div>
          <Table countries={tableData}/>
          <div className="right__elements"><h3>Worldwide Stats</h3></div>
          <LineGraph casesType={casesType} className="app__graph" />
        </Typography>
      </CardContent>
    </Card>

    </div>
  );
}

export default App;
