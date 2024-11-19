export default function({heading, number, content}){
    return <div className="w-100% md:w-auto text-center py-8 md:py-24 ">
       <div className="text-xl mb-6 ">
            {heading}
       </div>
       <div className="text-5xl font-semibold text-blue-900 mb-3">
            {number}
       </div>
       <div className="text-lg leading-6 text-pink-500 tracking-wide">
            {content.toUpperCase()}
       </div>
    </div>
}