import React, { Fragment, useEffect, useState } from 'react'
import '../App.css'

const Table = () => {
  const [datas, setData] = useState([])

  const deleteData = async (id) => {
    try {
      const deleteData = await fetch(`http://localhost:4000/data/${id}`, {
        method: 'DELETE',
      })

      setData(datas.filter((data) => data.id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:4000/alldata')
      const jsonData = await response.json()

      setData(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Fragment>
      <div className="Paddingstyle">
        {' '}
        <h2 class="text-4xl font-medium leading-tight mt-0 mb-2 text-blue-500 text-center">
          Covid Data By County
        </h2>
        <div>
          <table class="border-collapse w-full">
            <thead>
              <tr>
                <th class="p-3 font-bold uppercase bg-gray-200 text-blue-500 border border-gray-300 hidden lg:table-cell">
                  County
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-blue-500 border border-gray-300 hidden lg:table-cell">
                  Cases
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-blue-500 border border-gray-300 hidden lg:table-cell">
                  Case Density
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-blue-500 border border-gray-300 hidden lg:table-cell">
                  Risk Level
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-blue-500 border border-gray-300 hidden lg:table-cell">
                  Date
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-blue-500 border border-gray-300 hidden lg:table-cell">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => (
                <tr
                  key={data.id}
                  class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                >
                  <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                    {data.county}
                  </td>
                  <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                    {data.cases}
                  </td>
                  <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                    {data.casedensity}
                  </td>
                  <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                    {data.risklevel}
                  </td>
                  <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                    {data.date}
                  </td>
                  <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <button
                      class="py-3 px-6 text-white rounded-lg bg-red-500 shadow-lg block md:inline-block"
                      onClick={() => deleteData(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default Table
