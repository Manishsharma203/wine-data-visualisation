import React from "react";
import { useAppContext } from "../context/ContextProvider";
import { uniqueAlcohols, wineDataStats } from "../utils/functions";

export default function FlavanoidsTable() {
  const { wineData } = useAppContext();
  return (
    <div className="table-container">
      <h2>Flavanoids Stats</h2>
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
            {["Flavanoids Mean", ...uniqueAlcohols(wineData)].map((e, i) => (
              <td key={i}>
                {i === 0
                  ? e
                  : wineDataStats({
                      keyName: "Flavanoids",
                      alcoholClass: e,
                      wineDataset: wineData,
                    }).mean}
              </td>
            ))}
          </tr>
          <tr>
            {["Flavanoids Median", ...uniqueAlcohols(wineData)].map((e, i) => (
              <td key={i}>
                {i === 0
                  ? e
                  : wineDataStats({
                      keyName: "Flavanoids",
                      alcoholClass: e,
                      wineDataset: wineData,
                    }).median}
              </td>
            ))}
          </tr>
          <tr>
            {["Flavanoids Mode", ...uniqueAlcohols(wineData)].map((e, i) => (
              <td key={i}>
                {i === 0
                  ? e
                  : wineDataStats({
                      keyName: "Flavanoids",
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
