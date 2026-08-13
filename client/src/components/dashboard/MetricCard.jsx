import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

/** Simple metric card – shows a title and a numeric/value */
export default function MetricCard({ title, value }) {
  return (
    <Card elevation={3} sx={{ textAlign: 'center', py: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
