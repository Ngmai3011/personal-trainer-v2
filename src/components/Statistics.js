import {BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";
import {TrainingContext} from "./TrainingContext";
import {useContext} from "react";

export default function Statistics() {
  const {data} = useContext(TrainingContext);
  const _ = require("lodash");
  const groupDataByActivity = _.groupBy(data, "activity");
  const chartData = Object.values(groupDataByActivity).map((data) => ({
    activity: data[0].activity,
    duration: _.sumBy(data, "duration"),
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
