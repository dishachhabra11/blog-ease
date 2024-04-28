

const Skeleton = () => {
  return (
    <div>
         <div role="status" className="w-full animate-pulse">

<div className="p-4 flex flex-col border-b  ">
        <div className="flex gap-2 "><div className=" bg-gray-200 rounded-full  w-4 h-4 "></div><div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div></div>
        <div className=" pb-3 gap-2">
        <div className="h-[20px] mb-1 bg-gray-200 rounded-full  w-full"></div>
        <div className="h-[40px]  bg-gray-200 rounded-full  w-full"></div>
        </div>

       <div className="flex gap-2 items-center"> 
       {/* <button type="button" className="text-gray-900  border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1   bg-gray-200">react</button> */}
       <div className="  border border-gray-300 focus:outline-none hover:bg-gray-100 text-gray-500 font-medium rounded-full  bg-gray-200 text-sm px-3 py-1"><div className="h-1.5 bg-gray-200 rounded-full  w-6 mb-4"></div></div></div>
        
    </div>
  
        
{/*        
    <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
    <span className="sr-only">Loading...</span> */}
</div>

    </div>
  )
}

export default Skeleton