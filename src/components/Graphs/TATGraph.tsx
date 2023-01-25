import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import useApp from "../../hooks/useApp";
import { Customer } from "../../interfaces/record";
const pdata = [
  {
    name: "Python",
    student: 13,
    fees: 10,
  },
  {
    name: "Javascript",
    student: 15,
    fees: 12,
  },
  {
    name: "PHP",
    student: 5,
    fees: 10,
  },
  {
    name: "Java",
    student: 10,
    fees: 5,
  },
  {
    name: "C#",
    student: 9,
    fees: 4,
  },
  {
    name: "C++",
    student: 10,
    fees: 8,
  },
];

const TATGraph: React.FC = () => {
  const { customerRecords } = useApp();

  React.useEffect(() => {
    if(customerRecords.length > 0) {
        getQueueLengthAt()
    }
  },[customerRecords])

const separateCustomerServerWise = () =>  {
    let server1 = [],
        server2 = [];
    for (let i = 0; i < customerRecords.length; i++) {
        let customer = customerRecords[i];
        if (customer.server === 1) {
            server1.push(customer);
        } else if (customer.server === 2) {
            server2.push(customer);
        }
    }
    return { server1: server1, server2: server2 };
  }

const getQueueLengthAt = () => {
    let tempS1:Customer[] = [],
        tempS2:Customer[] = [];
    if(customerRecords.length > 0) {
        const {server1, server2} = separateCustomerServerWise()
        server1.forEach((c:any, i) => {
            let previousCustomer:Customer = {}

            if(i > 0){
                previousCustomer = server1[i-1];
                console.log('previousCustomer', previousCustomer)
            }
            if(i === 0) {
                console.log('s1 first customer')
                tempS1.push( {...c, queueLength: 0});
                return;
            }
            else if(c.arrival < previousCustomer.endTime!) {
                console.log('checking for s1 endtime', previousCustomer)
                tempS1.push({
                    ...c,
                    queueLength: previousCustomer.queueLength ?  previousCustomer.queueLength + 1 : 1
                })
            }
            else {
                tempS1.push(
                     {
                        ...c,
                        queueLength: 0
                    }
                    )
            }
        })
        server2.forEach((c:any, i) => {
            let previousCustomer:Customer = {}
            if(i !== 0){
                previousCustomer = server2[i-1];
            }
            if(i === 0) {
                console.log('s2 first customer')

                tempS2.push(  {...c, queueLength: 0})
                return;
            } 
            if(c.arrival < previousCustomer.endTime!) {
                console.log('checking for s2 endtime', previousCustomer)
                tempS2.push(  {
                    ...c,
                    queueLength: previousCustomer.queueLength ? previousCustomer.queueLength + 1 :  1
                })
            }
            else {
                tempS2.push(  {
                    ...c,
                    queueLength: 0
                })
            }
        })
        console.log('s1,s2', tempS1, tempS2)
    }
}


  return (
    <>
      <h1 className="chart-heading">Line Chart</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          data={pdata}
          width={500}
          height={300}
          margin={{ top: 5, right: 300, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={"preserveStartEnd"}
            tickFormatter={(value) => value + " Programming"}
          />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="student"
            stroke="red"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="fees"
            stroke="green"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <h1 className="chart-heading">Area Chart</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart
          width={500}
          height={300}
          data={pdata}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="student"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>

      <h1 className="chart-heading">Bar Chart</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={pdata}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="student" fill="#8884d8" />
          <Bar dataKey="fees" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default TATGraph;
