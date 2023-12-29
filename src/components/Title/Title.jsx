

const Title = ({title,quote}) => {
    return ( 
        <div className="relative aspect-[4/2] bg-[url('../public/wave5.svg')] md:aspect-[18/5] border border-white md:bg-[url('../public/wave3.svg')] bg-image-outline-none width-[100%] bg-no-repeat bg-cover sm:px-40 overflow-y-hidden">
            <p className="absolute top-[16%] left-[10%] lg:top-[20%] text-3xl min-[360px]:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#fffafa] [text-decoration:underline_overline] underline-offset-[40%] sm:underline-offset-[37%] font-['Manrope']">{title}</p>
            <blockquote className="text-white absolute sm:top-[20%] 2xl:top-[15%] sm:right-[20%] 2xl:right-[23%] hidden xl:block text-3xl 2xl:text-4xl 3xl:text-5xl font-bold xl:max-w-lg 2xl:max-w-lg text-start font-['Raleway']" >🙶  {quote}  🙷</blockquote>
        </div>
     );
}
 
export default Title;