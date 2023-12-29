

const Title = ({title,quote}) => {
    return ( 
        <div className="border border-white bg-[url('../public/wave.svg')] bg-image-outline-none aspect-[4/2] sm:aspect-[5/2] width-[100%] bg-no-repeat bg-cover flex justify-center xl:justify-between items-center pb-16 min-[480px]:pb-28 lg:pb-52 xl:pb-60 xl:pl-40 xl:pr-10 2xl:px-40">
            <p className="text-4xl min-[480px]:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#fffafa] [text-decoration:underline_overline] underline-offset-[37%] ">{title}</p>
            <blockquote className="hidden xl:block text-3xl font-bold text-gray-900/80 max-w-lg text-start" >🙶 {quote} 🙷</blockquote>
        </div>
     );
}
 
export default Title;