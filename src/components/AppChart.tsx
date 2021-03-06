import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AppChartProps, PrefecturePopulation } from '@/types';

export const createHighcartsOptions = (
  population: PrefecturePopulation[],
): Highcharts.Options => {
  const categories =
    population[0]?.data?.map((data) => data.year.toString()) ?? [];
  const series: Highcharts.SeriesOptionsType[] =
    population.length !== 0
      ? population?.map((prefData) => ({
          type: 'spline',
          name: prefData.prefName,
          data: prefData.data?.map((data) => data.value),
        }))
      : [{ type: 'spline', name: '都道府県名', data: [] }];

  return {
    title: {
      text: '総人口推移',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    series,
  };
};

export const AppChart: FC<AppChartProps> = ({ population }) => {
  const options = createHighcartsOptions(population);

  Highcharts.setOptions({
    lang: {
      numericSymbols: ['万', '億'],
      numericSymbolMagnitude: 10000,
    },
  });

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
