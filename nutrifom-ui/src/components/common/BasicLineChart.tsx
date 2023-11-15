import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';

dayjs.extend(localizedFormat);

export default function BasicLineChart() {
  const customize = {
    height: 600,
    legend: { hidden: true },
    margin: { top: 5 },
  };
  // Generiere ein Array von Datumsangaben für den Zeitraum von heute bis vor 14 Tagen
  const dateArray = Array.from({ length: 15 }, (_, index) => {
    return dayjs().subtract(index, 'day').toDate();
  }).reverse();


  const worldElectricityProduction = [
    { date: dateArray[0], value: 65 },
    { date: dateArray[1], value: 66 },
    { date: dateArray[2], value: 65.5 },
    { date: dateArray[3], value: 70 },
    { date: dateArray[4], value: 62 },
    { date: dateArray[5], value: 69 },
    { date: dateArray[6], value: 65 },
    { date: dateArray[7], value: 65.5 },
    { date: dateArray[8], value: 66 },
    { date: dateArray[9], value: 66 },
    { date: dateArray[10], value: 66 },
    { date: dateArray[11], value: 66 },
    { date: dateArray[12], value: 62 },
    { date: dateArray[13], value: 66 },
    { date: dateArray[14], value: 66 },
  ];



  return (
    <><LineChart
    sx={{
      '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
        fill: '#eff8ef',
      },
    }}
        xAxis={[
          {
            dataKey: 'date',
            valueFormatter: (date) => dayjs(date).format('DD.MM'),
            scaleType:'point'
          },
        ]}
        series={[
          {
            dataKey:'value',
            valueFormatter: (value) => (value == null ? '?' : value.toString()),
            color: "#33cc33"
          },
        ]}
        dataset={worldElectricityProduction}
        
        {...customize} /></>

    
  );
}
