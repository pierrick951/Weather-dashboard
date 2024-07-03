import { Wind as WindIco}from 'lucide-react'



interface Props  {

 
  windspeed:number

}




function Wind({ windspeed}: Props) {
  return (
    <div className="bg-zinc-900 flex flex-col lg:flex-row justify-between p-4 w-full rounded-xl gap-4">
    <div className="flex flex-col items-center lg:items-start">
      <h3 className="text-xs lg:text-lg font-semibold pb-2 text-gray-50 flex items-center">
      

      
        <span className='ml-2'>Wind</span>
      </h3>
      <div className="flex flex-row items-center gap-3">
      <WindIco
          color="#ffffff"
          className="h-auto w-auto lg:h-9 lg:w-9 animate-pulse"
        />
        <p className="text-sm lg:text-lg">
          <span>Speed {windspeed} </span>
        
         
          </p>

      </div>
    </div>
</div>
  )
}
export default Wind

