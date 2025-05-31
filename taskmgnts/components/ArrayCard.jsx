
import React from 'react'

function ArrayCard({data,title}) {
  return (
    <div className="bg-white py-2 rounded-l shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
    <div className='border-b-1 border-gray-300  ps-4 py-1 text-gray-700 font-bold '>
      <p>{title}</p>
    </div>
    <div className=' ps-4 pt-2'>
      <ol type="1" className="list-decimal list-inside">
        {data.map((e, i) => (
          <li className='pt-1' key={i}>{e}</li>
        ))}
      </ol>
    </div>
  </div>
  )
}

export default ArrayCard