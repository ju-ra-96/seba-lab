import React from 'react';
import { Radar, RadarChart, PolarGrid, 
    PolarAngleAxis, PolarRadiusAxis } from 'recharts';
  
const App = () => {
  
    // Sample data
    const data = [
        { name: 'A', x: 21, y: 31},
        { name: 'B', x: 22, y:33 },
        { name: 'C', x: -32, y: -22 },
        { name: 'D', x: -14, y: -21 },
        { name: 'E', x: -51, y: -44 },
        { name: 'F', x: 16, y: 12 },
        { name: 'G', x: 7, y: 2 },
        { name: 'H', x: -8, y: -9 },
        { name: 'I', x: 9, y: 4 },
    ];
  
    return (
        <RadarChart height={500} width={500} 
            outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar dataKey="x" stroke="green" 
                fill="green" fillOpacity={0.5} />
                 <Radar dataKey="y" stroke="blue" 
                fill="blue" fillOpacity={0.5} />
        </RadarChart>
    );
}
  
export default App;