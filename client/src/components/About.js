import React from 'react'
import '../App.css'

function About() {
  return (
    <div className="Paddingstyle">
      <p class="text-3xl font-medium leading-tight mt-0 mb-2 text-blue-500 text-center">
        COVID-19 Travel Report is an application that allows the user to search
        and save COVID-19 data in US counties via the Covid Act Now API. A
        downloadable PDF is dynamically generated based on the risk level to
        recommend/discourage travel to the area.
      </p>
    </div>
  )
}

export default About
