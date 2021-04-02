import * as Chart from 'chart.js';
import { ChartColor, ChartDataSets, Scriptable } from 'chart.js';

const RANK_TO_RGB: { [key: number]: (opacity: number) => string } = {
  5: (opacity) => `rgba(255, 138, 0, ${opacity})`,
  4: (opacity) => `rgba(187, 134, 252, ${opacity})`,
  3: (opacity) => `rgba(3, 218, 197, ${opacity})`,
  1: (opacity) => `rgba(151, 151, 151, ${opacity})`,
};

export class ColorsUtils {
  static getColorsFor(
    ranks: number[],
    radial?: boolean,
    index?: number
  ): {
    pointHoverBackgroundColor: string | string[];
    pointHoverBorderColor: string | string[];
    pointBackgroundColor: string | string[];
    pointBorderColor: string | string[];
    hoverBorderColor: string | string[];
    hoverBackgroundColor: string | string[];
    borderColor: string | string[];
    backgroundColor: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  } {
    const fullOpacity =
      index !== undefined
        ? RANK_TO_RGB[ranks[index]](1)
        : ranks.map((rank) => RANK_TO_RGB[rank](1));
    return {
      pointBackgroundColor: fullOpacity,
      pointBorderColor: fullOpacity,
      pointHoverBackgroundColor: fullOpacity,
      pointHoverBorderColor: fullOpacity,
      hoverBorderColor: fullOpacity,
      hoverBackgroundColor:
        index !== undefined
          ? RANK_TO_RGB[ranks[index]](0.3)
          : ranks.map((rank) => RANK_TO_RGB[rank](0.3)),
      borderColor: fullOpacity,
      backgroundColor: (args: {
        chart?: Chart;
        dataIndex?: number;
        dataset?: ChartDataSets;
        datasetIndex?: number;
      }) => {
        const canvas = args.chart?.canvas;
        const ctx = canvas?.getContext('2d');

        if (!ctx || !canvas) return '';

        const gradient = radial
          ? ctx.createRadialGradient(
              (canvas.parentElement?.clientWidth || 0) / 2,
              (canvas.parentElement?.clientHeight || 0) / 2,
              0,
              (canvas.parentElement?.clientWidth || 0) / 2,
              (canvas.parentElement?.clientHeight || 0) / 2,
              (canvas.parentElement?.clientHeight || 0) / 2 + 80
            )
          : ctx.createLinearGradient(
              0,
              0,
              0,
              (canvas.parentElement?.clientHeight || 0) * 1.6
            );

        gradient.addColorStop(
          0,
          RANK_TO_RGB[
            ranks[(index !== undefined ? index : args.dataIndex) || 0]
          ](0.3)
        );
        gradient.addColorStop(
          0.5,
          RANK_TO_RGB[
            ranks[(index !== undefined ? index : args.dataIndex) || 0]
          ](0)
        );

        return gradient;
      },
    };
  }
}
