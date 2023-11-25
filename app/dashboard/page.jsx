'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Dashboard = () => {
  const mechanicsData = [
    { id: 1, name: 'Raju', price: 9, latitude: 12.76, longitude: 79.35 },
    { id: 2, name: 'Sara', price: 12, latitude: 1222, longitude: 1415 },
    { id: 3, name: 'John', price: 15, latitude: 1223, longitude: 1416 },
    { id: 4, name: 'Alice', price: 8, latitude: 1224, longitude: 1417 },
    { id: 5, name: 'Bob', price: 18, latitude: 1225, longitude: 1418 },
    { id: 6, name: 'Eva', price: 10, latitude: 1226, longitude: 1419 },
    { id: 7, name: 'Mike', price: 14, latitude: 1227, longitude: 1420 },
    { id: 8, name: 'Linda', price: 20, latitude: 1228, longitude: 1421 },
    { id: 9, name: 'David', price: 11, latitude: 1229, longitude: 1422 },
    { id: 10, name: 'Sophie', price: 16, latitude: 1230, longitude: 1423 },
    { id: 11, name: 'Tom', price: 13, latitude: 1231, longitude: 1424 },
    { id: 12, name: 'Emily', price: 19, latitude: 1232, longitude: 1425 },
    { id: 13, name: 'Alex', price: 22, latitude: 1233, longitude: 1426 },
    { id: 14, name: 'Grace', price: 25, latitude: 1234, longitude: 1427 },
    { id: 15, name: 'Jake', price: 17, latitude: 1235, longitude: 1428 },
    { id: 16, name: 'Olivia', price: 23, latitude: 1236, longitude: 1429 },
    { id: 17, name: 'Daniel', price: 21, latitude: 1237, longitude: 1430 },
    { id: 18, name: 'Emma', price: 27, latitude: 1238, longitude: 1431 },
    { id: 19, name: 'William', price: 24, latitude: 1239, longitude: 1432 },
    { id: 20, name: 'Ava', price: 26, latitude: 1240, longitude: 1433 },
  ];
  
  

  const [mechanics, setMechanics] = useState(mechanicsData);
  const [selectedFilter, setSelectedFilter] = useState('default');

  const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].price < right[rightIndex].price) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const mergeSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  };

  const sortMechanics = (filter) => {
    let sortedMechanics = [...mechanics];

    if (filter === 'priceLowToHigh') {
      sortedMechanics = mergeSort(sortedMechanics);
    } else if (filter === 'priceHighToLow') {
      sortedMechanics = mergeSort(sortedMechanics).reverse();
    }

    setMechanics(sortedMechanics);
  };

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
    sortMechanics(selectedValue);
  };

  return (
    <>
      <div className='mt-12'>
        <p>List of all the mechanics</p>
        <div className="flex items-center mt-2">
          <label htmlFor="priceFilter" className="mr-2">Sort by Price:</label>
          <select
            id="priceFilter"
            value={selectedFilter}
            onChange={handleFilterChange}
            className="p-1 border border-gray-400 rounded-md"
          >
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price Low to High</option>
            <option value="priceHighToLow">Price High to Low</option>
          </select>
        </div>
        {mechanics.map((mechanic) => (
          <div key={mechanic.id} className="align-baseline drop-shadow-sm rounded-md flex flex-row justify-between mt-5 p-2 border w-72 border-black-400">
            <div>
              <Image
                src="/mechnic.png" // Adjust the path to your actual image
                width={30} // Adjust the width as needed
                height={30} // Adjust the height as needed
                alt="Mechanic"
              />
              <p className='text-sm'>{mechanic.name}</p>
            </div>
            <div>
              <div className='flex gap-2 flex-col'>
                <p className='text-sm'>Traveling charges</p>
                <div className='flex justify-end gap-2'>
                  <Link href={{
                    pathname: '/dashboard/navigate',
                    query: {
                      id: mechanic.id,
                      name: mechanic.name,
                      lat: mechanic.latitude,
                      lag: mechanic.longitude
                    }
                  }} className='text-sm border-0 rounded-md p-1.5 bg-gray-200 h-8 w-12'>Book</Link>
                  <p className='text-sm mt-2'>${mechanic.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
