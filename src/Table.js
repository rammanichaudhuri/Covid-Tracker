import React from 'react';
import "./Table.css";
import {prettyPrintStat} from './util';

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(country => (
                <tr>
                    <td>{country.name}</td>
                    <td><strong>{prettyPrintStat(country.number)}</strong></td>
                </tr>
            ))};
        </div>
    )
}

export default Table;
