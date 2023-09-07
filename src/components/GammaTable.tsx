import React from "react";
import { useAppContext } from "../context/ContextProvider";
import { gammaStats, uniqueAlcohols } from "../utils/functions";

export default function GammaTable() {
  const { wineData } = useAppContext();

  return (
    <div className="table-container">
      <h2>Gamma Stats</h2>
      <table>
        <thead>
          <tr>
            {["Measure", ...uniqueAlcohols(wineData)].map((e, i) => (
              <th key={i}>{i === 0 ? e : `Class ${e}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {["Gamma Mean", ...uniqueAlcohols(wineData)].map((e, i) => (
              <td key={i}>
                {i === 0
                  ? e
                  : gammaStats({
                      keyName: "Gamma",
                      alcoholClass: e,
                      wineDataset: wineData,
                    }).mean}
              </td>
            ))}
          </tr>
          <tr>
            {["Gamma Median", ...uniqueAlcohols(wineData)].map((e, i) => (
              <td key={i}>
                {i === 0
                  ? e
                  : gammaStats({
                      keyName: "Gamma",
                      alcoholClass: e,
                      wineDataset: wineData,
                    }).median}
              </td>
            ))}
          </tr>
          <tr>
            {["Gamma Mode", ...uniqueAlcohols(wineData)].map((e, i) => (
              <td key={i}>
                {i === 0
                  ? e
                  : gammaStats({
                      keyName: "Gamma",
                      alcoholClass: e,
                      wineDataset: wineData,
                    }).mode}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
