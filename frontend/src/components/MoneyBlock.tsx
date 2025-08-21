import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

interface MoneyBlockProps {
  label: string;
  value: string;
}

const MoneyBlock: React.FC<MoneyBlockProps> = ({ label, value }) => {
  return (
    <Card className="shadow">
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {label}
        </Typography>
        <Typography color="textSecondary">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default MoneyBlock;
