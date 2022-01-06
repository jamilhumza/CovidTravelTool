import React, { useEffect, useState } from 'react'
import '../App.css'
import pic from '../download.png'
import jsPDF from 'jspdf'

const Search = () => {
  const [county, setCounty] = useState('')
  const [cases, setCases] = useState('')
  const [caseDensity, setcaseDensity] = useState('')
  const [riskLevel, setriskLevel] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [code, setCode] = useState('')
  const [status, setStatus] = useState(5)
  //statuses: absent = 5, active = 6, inactive = 7

  const pdfGenerate = () => {
    const doc = new jsPDF()
    doc.text(county + ' COVID-19 Travel Report', 50, 10)
    doc.text(
      'There are ' +
        cases +
        ' confirmed cases with a case density of ' +
        caseDensity +
        '.',
      22,
      20
    )
    doc.text('The overall risk level is ' + riskLevel + '.', 70, 30)
    doc.text(recommendation + '.', 45, 40)
    doc.save(county + '.pdf')
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const body = { code }
      const response = await fetch('http://localhost:4000/apifetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const jsonData = await response.json()
      if (jsonData.county == null) {
        setStatus(4)
      } else {
        setCounty(jsonData.county)
        setCases(jsonData.cases)
        setcaseDensity(jsonData.caseDensity)
        setriskLevel(jsonData.riskLevel)
        setStatus(6)
        if (riskLevel < 3)
          setRecommendation('Travel is acceptable while utilizing precaution')

        if (riskLevel == 3)
          setRecommendation('Travel is discouraged due to moderate risk')

        if (riskLevel > 3)
          setRecommendation('Travel is strongly discouraged due to high risk')
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const saveData = async (e) => {
    e.preventDefault()
    try {
      const body = { county, cases, caseDensity, riskLevel }
      const response = await fetch('http://localhost:4000/savedata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setStatus(7)
    } catch (err) {
      console.error(err.message)
    }
  }

  /*const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/apifetch')
      const jsonData = await response.json()

      setCounty(jsonData.county)
      setCases(jsonData.cases)
      setcaseDensity(jsonData.caseDensity)
      setriskLevel(jsonData.riskLevel)
    } catch (err) {
      console.error(err.message)
    }
  }*/

  useEffect(() => {
    onSubmitForm()
  })

  return (
    <div className="Paddingstyle">
      <h2 class="text-4xl font-medium leading-tight mt-0 mb-2 text-blue-500 text-center">
        Enter a US county FIPS code to search for COVID-19 data:
      </h2>
      <h2 class="text-5xs font-medium leading-tight mt-0 mb-2 text-blue-500 text-center">
        FIPS county codes can be found{' '}
        <a
          class="underline"
          href="https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/home/?cid=nrcs143_013697"
        >
          here.
        </a>
      </h2>
      <div class="flex justify-center pt-6 pb-5">
        <form method="GET" onSubmit={onSubmitForm}>
          <div class="relative text-gray-600 focus-within:text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                class="p-1 focus:outline-none focus:shadow-outline"
                onClick={() => onSubmitForm}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  class="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              class="py-2 text-sm text-white bg-blue-500 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ex: 05039 for Dallas"
              autocomplete="off"
            />
          </div>
        </form>
      </div>
      {status === 4 && (
        <h2 class="text-5xs font-medium leading-tight mt-0 mb-2 text-blue-500 text-center">
          Please enter a valid FIPS code.
        </h2>
      )}
      {status > 5 && (
        <div class="pt-100">
          <div class="flex flex-col items-center justify-center pt-100">
            <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
              <img
                src={pic}
                alt="Logo"
                width="50"
                height="50"
                class="mx-auto"
              />

              <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white text-center">
                {county}
              </h1>

              <h6 class="text-gray-500 dark:text-gray-300 text-center">
                Cases: {cases}
              </h6>
              <h6 class="text-gray-500 dark:text-gray-300 text-center">
                Case Density (cases per 100k): {caseDensity}
              </h6>
              <h6 class="text-gray-500 dark:text-gray-300 text-center">
                Risk Level (1-5): {riskLevel}
              </h6>
              <div class="flex justify-center">
                {status === 6 && (
                  <button
                    type="button"
                    class="px-4 py-3 bg-blue-500 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex"
                    onClick={saveData}
                  >
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>

                    <span class="ml-2">Save Data</span>
                  </button>
                )}
                {status === 7 && (
                  <button
                    type="button"
                    class="px-4 py-3 bg-blue-500 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>

                    <span class="ml-2">Saved</span>
                  </button>
                )}

                <button
                  type="button"
                  class="px-4 py-3 bg-blue-500 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"
                  onClick={pdfGenerate}
                >
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>

                  <span class="ml-2">Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
