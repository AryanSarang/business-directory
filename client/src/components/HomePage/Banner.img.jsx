import HomeBanner from '../../assets/HomeBanner.webp';

const BannerImg = () => {
    return (
        <section>
            <img src={HomeBanner} alt="home banner" className='w-full' />
        </section>
    )
};

export default BannerImg;
