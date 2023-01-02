import React, { useRef } from "react";

import styles from "./styles.module.scss";

// const SLIDE_CHANGE_TIMEOUT = 10000;

const HeaderPoster = (/* { onDlfPosterClick }: any */) => {
    const slideContainer = useRef<any>();
    // const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // const moveToSlide = (slideIndex: number) => {
    //     // start from 0//
    //     const { clientWidth } = slideContainer.current;
    //     const scrollLeft = clientWidth * slideIndex;
    //     slideContainer.current.scrollLeft = scrollLeft;
    // };

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setCurrentSlideIndex((prevState) => (prevState + 1) % 2);
    //     }, SLIDE_CHANGE_TIMEOUT);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [currentSlideIndex]);

    // useEffect(() => {
    //     moveToSlide(currentSlideIndex);
    // }, [currentSlideIndex]);

    return (
        <div className={styles.main_container}>
            <div className={styles.slides_container} ref={slideContainer}>
                <div className={`${styles.slide} `}>
                    <div className={styles.posterlaunchyour_story} />
                </div>
                {/* <div className={styles.slide}>
                    <div className={styles.posterjoinpublaunch} />
                </div>
                <div className={styles.slide}>
                    <div
                        className={styles.posterwhypublaunch}
                        onClick={() => onDlfPosterClick?.()}
                    />
                </div> */}
                <div className={styles.side_container}>
                    {/* <div className={styles.jumpslide_container}>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setCurrentSlideIndex(0);
                            }}
                        >
                            <div
                                className={`${styles.jumptoslide}  ${
                                    currentSlideIndex === 0 ? styles.active : ""
                                }`}
                            >
                                01
                            </div>
                            <div
                                className={`${styles.line}  ${
                                    currentSlideIndex === 0
                                        ? styles.lineactive
                                        : ""
                                }`}
                            />
                        </div>

                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setCurrentSlideIndex(1);
                            }}
                        >
                            <div
                                className={`${styles.jumptoslide}  ${
                                    currentSlideIndex === 1 ? styles.active : ""
                                }`}
                            >
                                02
                            </div>
                            <div
                                className={`${styles.line}  ${
                                    currentSlideIndex === 1
                                        ? styles.lineactive
                                        : ""
                                }`}
                            />
                        </div>

                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setCurrentSlideIndex(3);
                            }}
                        >
                            <div
                                className={`${styles.jumptoslide}  ${
                                    currentSlideIndex === 3 ? styles.active : ""
                                }`}
                            >
                                03
                            </div>
                            <div
                                className={`${styles.line}  ${
                                    currentSlideIndex === 3
                                        ? styles.lineactive
                                        : ""
                                }`}
                            />
                        </div>

                        {/* <div className="flex items-center">
                            <div
                                className={`${styles.jumptoslide}  ${
                                    currentSlideIndex === 2 ? styles.active : ""
                                }`}
                                onClick={() => {
                                    setCurrentSlideIndex(2);
                                }}
                            >
                                03
                            </div>
                            <div
                                className={`${styles.line}  ${
                                    currentSlideIndex === 2
                                        ? styles.lineactive
                                        : ""
                                }`}
                            />
                        </div>

                        <div className="flex items-center">
                            <div
                                className={`${styles.jumptoslide}  ${
                                    currentSlideIndex === 3 ? styles.active : ""
                                }`}
                                onClick={() => {
                                    setCurrentSlideIndex(3);
                                }}
                            >
                                04
                            </div>
                            <div
                                className={`${styles.line}  ${
                                    currentSlideIndex === 3
                                        ? styles.lineactive
                                        : ""
                                }`}
                            />
                        </div> 
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default HeaderPoster;
