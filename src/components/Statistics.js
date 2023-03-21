import {BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";
import useFetchData from "../utils/useFetchData";

export default function Statistics() {
  const {data} = useFetchData(
    "https://traineeapp.azurewebsites.net/gettrainings"
  );

  const arrayData = data !== null ? data : [];

  const _ = require("lodash");
  const groupDataByActivity = _.groupBy(arrayData, "activity");
  const chartData = Object.values(groupDataByActivity).map((arrayData) => ({
    activity: arrayData[0].activity,
    duration: _.sumBy(arrayData, "duration"),
  }));

  return (
    <BarChart
      width={1000}
      height={600}
      style={{margin: "24px auto 24px auto"}}
      data={chartData}>
      <CartesianGrid strokeDasharray="2 3" />
      <XAxis dataKey="activity" />
      <YAxis
        label={{value: "Duration (min)", angle: -90, position: "insideLeft"}}
      />
      <Tooltip />
      <Bar dataKey="duration" fill="#8458B3"></Bar>
    </BarChart>
  );
}
