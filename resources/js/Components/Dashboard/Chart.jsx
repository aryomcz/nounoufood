import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Chart({data, year}) {
    console.log(data);
    
  return (
    <div className="w-full max-w-[600px] h-[400px]">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" type="category" interval={0} angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name={year} fill="#fac000" maxBarSize={30}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
