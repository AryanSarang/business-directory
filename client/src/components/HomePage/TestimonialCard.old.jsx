
const TestimonialCard = ({ testimonial, position }) => {
    return (
        <div style={{ "--cardPosition": position }} className="rounded-xl flex flex-col justify-between testimonialCard p-7 border border-solid 
                            w-full border-[#222222]/10 shadow-[0_7px_14px_#EAEAEA]">
            <h3 className="text-sm text-left font-sans line-clamp-[9]">{testimonial.text}</h3>
            <div className="flex gap-2 items-center">
                <div >
                    <img src={testimonial.img} alt={testimonial.name} className="w-8 h-8 bg-black rounded-full" />
                </div>
                <div className="text-left">
                    <h4 className="text-sm">{testimonial.name}</h4>
                    <span>{testimonial.rating}</span>
                </div>
            </div>

        </div>
    )
};

export default TestimonialCard;
