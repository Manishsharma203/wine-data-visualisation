import { IWine } from "../types";

export const uniqueAlcohols = (wineDataset: IWine[]): string[] => {
  const uniqueAlcoholsSet = new Set<string>();
  wineDataset.forEach((wine: IWine) => {
    uniqueAlcoholsSet.add(wine.Alcohol.toString());
  });
  return Array.from(uniqueAlcoholsSet);
};
interface IProps {
  keyName: keyof IWine;
  alcoholClass: string;
  wineDataset: IWine[];
}
interface IRes {
  mean: string;
  median: string;
  mode: string;
}
export const wineDataStats = (props: IProps): IRes => {
  const { keyName, alcoholClass, wineDataset } = props;
  //finding batch of selected alcohol
  const wines = wineDataset.filter(
    (wine) => wine.Alcohol === Number(alcoholClass)
  );
  if (!wines) {
    return {
      mean: "0",
      median: "0",
      mode: "0",
    };
  }
  const findMean = () => {
    const mean =
      wines.reduce((acc, curr) => {
        const value: string | number = curr[keyName];
        if (typeof value === "string") {
          return acc + Number(value);
        }
        return acc + value;
      }, 0) / wines.length;
    return mean.toFixed(3);
  };
  const findMedian = () => {
    const sortedWines = wines.sort(
      (a, b) => Number(a[keyName]) - Number(b[keyName])
    );
    let median: number = 0;
    if (sortedWines.length % 2 !== 0) {
      median = Number(sortedWines[Math.floor(sortedWines.length / 2)][keyName]);
    } else {
      const mid1Value1 = Number(sortedWines[sortedWines.length / 2][keyName]);
      const mid1Value2 = Number(
        sortedWines[sortedWines.length / 2 + 1][keyName]
      );
      median = (mid1Value1 + mid1Value2) / 2;
    }
    return median.toFixed(3);
  };
  const findMode = () => {
    interface IModeObj {
      [key: string]: number;
    }
    //creating an object of all values with their frequency
    const modeObj: IModeObj = {};
    wines.forEach((e, i) => {
      let value = e[keyName];
      if (typeof value === "string") {
        value = Number(value);
      }
      if (modeObj[value]) {
        modeObj[value]++;
      } else {
        modeObj[value] = 1;
      }
    });
    //{a:4,b:5,c:4,d:2,e:1}-> a,c

    //finding the maximum frequency
    const maxValue = Object.values(modeObj).reduce((acc, curr) => {
      if (acc < curr) {
        return (acc = curr);
      }
      return acc;
    }, 0);
    const modeArr: string[] = [];
    for (const property in modeObj) {
      if (modeObj[property] === maxValue) {
        modeArr.push(property);
      }
    }
    return modeArr.join(",");
  };
  return {
    mean: findMean(),
    median: findMedian(),
    mode: findMode(),
  };
};

export const gammaStats = (props: IProps): IRes => {
  const { keyName, alcoholClass, wineDataset } = props;
  const updatedWineDataset = wineDataset.map((wine: IWine) => {
    const { Ash, Hue, Magnesium } = wine;
    const gamma = (Ash * Hue) / Magnesium;
    return { ...wine, Gamma: Number(gamma.toFixed(3)) };
  });
  const stats = wineDataStats({
    keyName: "Gamma",
    alcoholClass: alcoholClass,
    wineDataset: updatedWineDataset,
  });
  return stats;
};
