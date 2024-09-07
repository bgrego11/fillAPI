/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  // CarouselCaption
} from 'reactstrap';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

// import carouselImage1 from '../../../assets/homeCarousel1.png';
// import carouselImage2 from '../../../assets/homeCarousel2.png';
// import carouselImage3 from '../../../assets/homeCarousel3.png';

// import carouselImage1 from '../../../assets/img/roses1200x600.png';
// import carouselImage1 from '../../../assets/slider1.jpg'
// import carouselImage2 from '../../../assets/slider2.jpg';
// //import carouselImage3 from '../../../assets/slider2.jpg';
// import carouselImage4 from '../../../assets/slider4.jpg';
// //import carouselImage5 from '../../../assets/slider5.png';
// import carouselImage6 from '../../../assets/slider6.png';
// import carouselImage7 from '../../../assets/slider7.jpg';


// Leaving these commented fro now
// const items = [
//   {
//     src: carouselImage1,
//     // altText: 'Slide 1', 
//     // caption: 'Slide 1'
//   },
//   {
//     src: carouselImage2,
//     // altText: 'Slide 2',
//     // caption: 'Slide 2'
//   },
//   {
//     src: carouselImage4,
//     // altText: 'Slide 3',
//     // caption: 'Slide 3'
//   },
//   {
//     src: carouselImage6,
//     // altText: 'Slide 3',
//     // caption: 'Slide 3'
//   },
//   {
//     src: carouselImage7,
//     // altText: 'Slide 3',
//     // caption: 'Slide 3'
//   }
// ];

const HomeCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [carouselData, setCarouselData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carouselData.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carouselData.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  // Leaving this commented for now don't think we need it SS
  // const goToIndex = (newIndex) => {
  //   if (animating) return;
  //   setActiveIndex(newIndex);
  // }

  const fetchCarouselData = async () => {
    try {
      let res = await fetch('/api/carousel', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
      );
      let newData = await res.json();
      setCarouselData(newData);
      setIsLoaded(true)
    } catch (err) {
      setErr(err);
      setIsLoaded(true);
    }
  };

  const slides = carouselData && carouselData.map((item, index) => { // added index for unique key, instead of image name, since it is possible to have duplicate image names.
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        // key={item.src}
        key={index}
      >
        <img
          width="100%" src={item.dt_url} alt={`The fill slide ${index}`} />
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    );
  });

  if (!isLoaded) {
    return <LoadingScreen />
  } else {
  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}

    >
      {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} /> */}
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
  }
}

export default HomeCarousel