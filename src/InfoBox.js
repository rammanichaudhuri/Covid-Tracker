import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

function InfoBox({ active, title, total, cases, ...props}) {
    return (
        <Card
          onClick={props.onClick}
          className="infoBox"
        >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 
                className="infoBox__cases">
                {props.isloading ? <i className="fa fa-cog fa-spin fa-fw" /> : cases}
                </h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

