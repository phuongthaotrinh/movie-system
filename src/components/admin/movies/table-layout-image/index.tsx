import { LoadingSpin } from "@/components/loading-spin";
import Link from "next/link";

export default function TableLayoutImage({data, isLoading}: { data: any[], isLoading:boolean }) {
    return (
        <>
            {!isLoading ? (
                <div className="item w-full">
                <div className="grid grid-cols-5 gap-3">
                    {data && data.length > 0 && data.map((item) => (
                        <div key={item['_id']} className="">
                            <div className="text-center">
                                <Link href={`/admin/movies/${item['_id']}`}
                                      className="cursor-pointer relative"
                                      title={item['name']}
                                >
                                    <img src={item['image'][0].url} alt={item['name']}
                                         className=" relative w-auto max-w-[233px]  mx-auto  h-[350px] object-cover group-hover:hover:scale-75"
                                    />
                                    <h1 className="font-semibold text-sm py-5 hover:text-primary" >{item['name']}</h1>
                                </Link>
                            </div>
    
                        </div>
                    ))}
                </div>
            </div>
            ):(
                <><LoadingSpin /></>
            )}
        
        </>
    )
}