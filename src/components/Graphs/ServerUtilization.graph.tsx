import React, { useEffect } from "react";
import useApp from "../../hooks/useApp";
import { separateCustomerServerWise } from "../../utils/common";
import { Customer } from "../../interfaces/record";

const ServerUtilizationGraph = () => {
	/**
	 * to calculate an average based off of an existing average and given new parameters for the resulting average?
	 * newAve = ((oldAve*oldNumPoints) + x)/(oldNumPoints+1)
	 *
	 * To create a server utilization graph for a G/G/1 approximation, follow these steps:
	 * Calculate the average arrival rate (lambda) and average service rate (mu).
	 * Utilization is defined as lambda/mu.
	 * Plot the utilization on the Y-axis and time on the X-axis to see the utilization over time.
	 * The graph should show a steady state utilization rate that approaches the calculated utilization value as time increases.
	 */
	const { customerRecords } = useApp();
	useEffect(() => {
		//follow the above steps and model data for server utilization
		//add new attribute to each server i.e. arrivalAverage and serviceTimeAverage. at every arrival

		let servers = separateCustomerServerWise(customerRecords);
    addArrivalAverageAndServiceTimeAverageAtEveryArrival(servers);
    addUtilizationAtEveryArrival(servers);
		// servers[0].forEach((customer, index) => {
		//   if (index === 0) {
		//     servers[0][index] = { ...servers[0][index], average: 0 };
		//     return;
		//   }
		//   const previousCustomer = servers[0][index - 1];
		//   const previousAverage = previousCustomer.average ? previousCustomer.average : 0;
		//   const previousNumPoints = previousCustomer.numPoints ? previousCustomer.numPoints : 0;
		//   const newAverage = ((previousAverage * previousNumPoints) + customer.arrival) / (previousNumPoints + 1);
		//   servers[0][index] = { ...servers[0][index], average: newAverage, numPoints: previousNumPoints + 1 };
		// })

		// servers = servers.filter((item) => item !== undefined ||  item !== null || item !== 0 || item !== Infinity || item !== '');
		// console.log('serversserversserversservers',servers)
		// if (servers.length > 0) {
		// 	servers[0]?.forEach((customer, index) => {
		// 		if (index === 0) {
		// 			servers[0][index] = { ...servers[0][index], arrivalAverage: customer.arrival };
		// 			servers[0][index] = { ...servers[0][index], serviceTimeAverage: customer.serviceTime };
		// 			return;
		// 		}
		// 		const previousCustomer = servers[0][index - 1];
		// 		const previousArrivalAverage = previousCustomer.arrivalAverage;
		// 		const previousServiceTimeAverage = previousCustomer.serviceTimeAverage;
		// 		const newArrivalAverage = (previousArrivalAverage! * index + customer.arrival!) / (index  + 1);
		// 		const newServiceTimeAverage = (previousServiceTimeAverage! * index + customer.serviceTime!) / (index + 1);

		// 		servers[0][index] = { ...servers[0][index], arrivalAverage: newArrivalAverage };
		// 		servers[0][index] = { ...servers[0][index], serviceTimeAverage: newServiceTimeAverage };
		// 	});
		// 	console.table(servers[0]);
		// }
    console.log('serrrrrrrrrrrrrrrrr',servers);
	}, [customerRecords]);

	const addArrivalAverageAndServiceTimeAverageAtEveryArrival = (servers: Customer[][]) => {
		
		if (servers.length > 0) {
			servers.forEach(server => {
				server.forEach((customer, index) => {
					if (index === 0) {
						server[index] = { ...server[index], arrivalAverage: customer.arrival };
						server[index] = { ...server[index], serviceTimeAverage: customer.serviceTime };
						return;
					}
					const previousCustomer = server[index - 1];
					const previousArrivalAverage = previousCustomer.arrivalAverage;
					const previousServiceTimeAverage = previousCustomer.serviceTimeAverage;
					const newArrivalAverage = (previousArrivalAverage! * index + customer.arrival!) / (index + 1);
					const newServiceTimeAverage = (previousServiceTimeAverage! * index + customer.serviceTime!) / (index + 1);

					server[index] = { ...server[index], arrivalAverage: newArrivalAverage };
					server[index] = { ...server[index], serviceTimeAverage: newServiceTimeAverage };
				});
			});

			// console.log(servers);
		}
	};
  //nned to fix, if arrival is zero then utilization is zero
  const addUtilizationAtEveryArrival = (servers: Customer[][]) => {
    servers.forEach(server => {
      server.map((customer, index) => {
        return server[index] = {
          ...server[index],
          utilizationAtArrival: customer.serviceTimeAverage === 0 ? 0 : customer.arrivalAverage! / customer.serviceTimeAverage!
        }
      })
    });
    

  }

	return <div>ServerUtilizationGraph</div>;
};

export default ServerUtilizationGraph;
