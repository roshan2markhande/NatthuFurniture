import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { time: '10AM', users: 120 },
  { time: '11AM', users: 132 },
  { time: '12PM', users: 101 },
  { time: '1PM', users: 190 },
];

const TrafficChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="users" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

export default TrafficChart;
