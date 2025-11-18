import { Icon } from '@iconify/react'
export default function Card({nama,data,bg,text,icon}) {
  return (
    <div className="flex justify-between py-10 px-8 rounded-3xl bg-white text-black w-1/2 lg:w-[30%] max-w-80 items-center gap-6 shadow-md">
            <div className="flex flex-col gap-3 justify-start items-center">
              <p className="text-md text-slate-700">
                Total {nama}
              </p>
              <p className="font-bold text-2xl text-start w-full">
                {data}
              </p>
            </div>
            <div className={`p-2 rounded-3xl ${bg} ${text}`}>
              <Icon icon={icon} width={44} height={44} />
            </div>
    </div>
  )
}
