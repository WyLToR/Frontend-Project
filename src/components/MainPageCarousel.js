import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./MainPageCarousel.css"
import laptop from "../assets/images/main-page/laptop.jpg"
import drone from "../assets/images/main-page/drone.jpg"
import phoneGaming from "../assets/images/main-page/gaming.jpg"
function MainPageCarousel() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    return (
        <Carousel className='carousel-container' activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className='carousel-img'
                    src={laptop}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Első hirdetés</h3>
                    <p>Hirdetés szövege 1</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='carousel-img'
                    src={drone}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Második hirdetés</h3>
                    <p>Hirdetés szövege 2</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='carousel-img'
                    src={phoneGaming}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Harmadik hirdetés</h3>
                    <p>Hirdetés szövege 3</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default MainPageCarousel