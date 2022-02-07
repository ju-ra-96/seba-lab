import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, 
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
  
const Radarchart = ({cpu,ram,disk}) => {
    console.log(ram);
    console.log(cpu)
    console.log(disk)


    const [dataToDisplay,setDataToDisplay] = useState([{}]);
    const incomingData = [ram,cpu,disk];
    const labelsData = ["ram","cpu","disk"];
    let elem = {};
    let data_to_display = [];

    for(let i=0; i < incomingData.length;i++){
        elem['name'] = labelsData[i]
        incomingData[i].map(data =>{
            elem[data.cluster] = data.load
        }) 
        console.log(elem);
        data_to_display.push(elem);
        console.log(elem)
        console.log(data_to_display)
        //setDataToDisplay(...data_to_display,elem)
    }

    console.log(dataToDisplay);
  
    // Sample data
    const data = [
        { name: 'CPU', cluster1: -21, cluster2: 31},
        { name: 'RAM', cluster1: -22, cluster2:100},
        { name: 'DISK', cluster1: -32, cluster2: 22 },
        /* { name: 'D', x: -14, y: -21 },
        { name: 'E', x: -51, y: -44 },
        { name: 'F', x: 16, y: 12 },
        { name: 'G', x: 7, y: 2 },
        { name: 'H', x: -8, y: -9 },
        { name: 'I', x: 9, y: 4 }, */
    ];
  
    return (
        <ResponsiveContainer width={700} height={250}>
              <RadarChart height={500} width={500} 
            outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar dataKey="cluster1" stroke="green" 
                fill="green" fillOpacity={0.5} />
                 <Radar dataKey="cluster2" stroke="blue" 
                fill="blue" fillOpacity={0.5} />
                <Legend />
                <Tooltip />
        </RadarChart>
        </ResponsiveContainer>
    );
}
  
export default Radarchart;