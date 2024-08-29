import BrandScrollBlock from "./BrandScrollBlock";

const BrandScrollInfinite = ({ brandLogos, quantity }) => {
    return (
        <div className="infiniteSlider" style={{ "--brandBlockWidth": "100px", "--brandBlockHeight": "50px", "--quantity": quantity }} >
            <div className="list" >
                {brandLogos.map((brandLogo, index) =>
                (
                    <BrandScrollBlock alt={brandLogo.alt} src={brandLogo.src} key={index} position={index} />
                )
                )}
            </div>
        </div >
    )
};

export default BrandScrollInfinite;
