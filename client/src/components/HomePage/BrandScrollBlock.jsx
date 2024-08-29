
const BrandScrollBlock = ({ src, alt, position }) => {
    return (

        <div className="item" style={{ "--position": position }}>
            <img src={src} alt={alt} />
        </div>

    )
};

export default BrandScrollBlock;
