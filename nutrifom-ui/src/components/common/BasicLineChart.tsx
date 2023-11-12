import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';

dayjs.extend(localizedFormat);

export default function BasicLineChart() {
  // Generiere ein Array von Datumsangaben für den Zeitraum von heute bis vor 14 Tagen
  const dateArray = Array.from({ length: 15 }, (_, index) => {
    return dayjs().subtract(index, 'day').toDate();
  }).reverse();

  console.log('Date Array:', dateArray);

  // Stellen Sie sicher, dass die Anzahl der Datenpunkte in der X-Achse mit der Anzahl der Werte übereinstimmt
  const seriesData = [65,66,65.5,67,67.3,68,65.5,65,66,65.5,67,67.3,70,65.5]

  return (
    <LineChart
    xAxis={[
      {
        id: 'date',
        data: dateArray,
        scaleType: 'time',
        valueFormatter: (date) => dayjs(date).format('DD.MM.YYYY'),
      },]}
      series={[
        {
          data: seriesData,
        },
      ]}
      height={700}
    />
  );
}
