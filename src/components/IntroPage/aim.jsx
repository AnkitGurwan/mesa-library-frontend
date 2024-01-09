import React from 'react'

export const aim = () => {
  return (
    <div className='w-full py-5 bg-gray-400 flex flex-col justify-center items-center text-center text-[#252525]' style={{'fontFamily':'Manrope',"backgroundColor":"#fbfbfd",}}>
        <div className='text-gray-700 font-extrabold text-4xl py-2 mb-4 w-full min-w-[270px] max-w-[700px] rounded-sm ' style={{"font-family": "Sans-serif","box-shadow" : "rgba(0, 0, 0, 0.25)"}}>Our Aim</div>
        <div className='px-[15%] md:px-[23%]'>To deliver knowledge through lectures convey experiences through talks and inculcate skills through workshops and also highlight achievements and honours of our students in Mechanika To organize <b className='text-gray-600'>Seismech - the mechanical engineering fest of IIT Guwahati</b>. Providing students of the department with relevant knowledge of other fields, given the inter-disciplinary nature of ME.</div>
    </div>
  )
}
export default aim;
