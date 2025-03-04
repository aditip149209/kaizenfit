import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 70 },
  { name: "Apr", value: 60 },
];

const Chart = () => {
  return (
    <div className="p-6 bg-card rounded-xl shadow-lg">
      <h2 className="text-lg text-white mb-4">Performance</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Bar dataKey="value" fill="#f9a825" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
