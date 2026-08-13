import React from 'react';
import { Paper, Typography } from '@mui/material';

/**
 * Placeholder chart component.
 * Replace with a real chart library (e.g., recharts, chart.js) later.
 */
export default function OverviewChart() {
  return (
    <Paper sx={{ p: 2, textAlign: 'center' }} elevation={2}>
      <Typography variant="h6" color="textSecondary">
        Overview Chart Placeholder
      </Typography>
      {/* You can render an <svg> or canvas here when you add a chart library */}
    </Paper>
  );
}
