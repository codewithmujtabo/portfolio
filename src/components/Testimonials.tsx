"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Add custom styles for Swiper pagination
if (typeof window !== 'undefined') {
  const styleId = 'custom-swiper-pagination-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .custom-swiper-pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 32px;
        position: relative;
        z-index: 10;
      }
      .custom-swiper-pagination .swiper-pagination-bullet {
        background: #fff !important;
        opacity: 1 !important;
        width: 16px !important;
        height: 4px !important;
        border-radius: 5px !important;
        margin: 0 6px !important;
        transition: background 0.3s;
      }
      .custom-swiper-pagination .swiper-pagination-bullet-active {
        background: #818cf8 !important; /* Tailwind indigo-400 */
      }
    `;
    document.head.appendChild(style);
  }
}

const testimonials = [
    {
        name: 'Dhanush S',
        role: 'Employer at Droit',
        text: 'Aryan brought professionalism and a strong work ethic to our team. His ability to quickly grasp complex concepts and deliver exceptional ',
        image: '/images/testimonial_1.png',
        rating: 4.9,
    },
    {
        name: 'Kunjan Kumar',
        role: 'Co-Founder at Tryidol Technologies',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsa vel natus, ullam eaque asperiores a impedit distinctio sit assumenda.',
        image: '/images/testimonial_1.png',
        rating: 4.9,
    },
    {
        name: 'Jane D',
        role: 'CEO',
        text: 'Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.',
        image: 'https://pagedone.io/asset/uploads/1696229969.png',
        rating: 4.9,
    },
    {
        name: 'Harsh P.',
        role: 'Product Designer',
        text: 'Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before.',
        image: 'https://pagedone.io/asset/uploads/1696229994.png',
        rating: 4.9,
    },
    {
        name: 'Alex K.',
        role: 'Design Lead',
        text: 'The customer service team at pagedone went above and beyond to help me resolve a billing issue.',
        image: 'https://pagedone.io/asset/uploads/1696230027.png',
        rating: 4.9,
    },
];

const Testimonials = () => {
    const paginationRef = useRef<HTMLDivElement>(null);
    // Swiper needs to wait for the ref to be attached
    const [paginationReady, setPaginationReady] = useState(false);
    useEffect(() => {
        setPaginationReady(true);
    }, []);
    return (
        <section id="testimonials" className="bg-[url('/images/Container.png')] mt-20 lg:mt-40 py-12 lg:py-24">
            <div className="mx-auto max-w-3xl lg:max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 lg:mb-16">
                    <span className="text-xs lg:text-sm text-[#E4ECFF] font-medium text-center block mb-2">TESTIMONIAL</span>
                    <h2 className="text-2xl lg:text-[50px] text-center font-bold text-white">Kind words from <span className='text-[#CBACF9]'>satisfied clients</span></h2>
                </div>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={16}
                    loop={true}
                    centeredSlides={true}
                    pagination={paginationReady ? { clickable: true, el: '.custom-swiper-pagination' } : false}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 16 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 32 },
                    }}
                    className="mySwiper"
                >
                    {testimonials.map((t, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="group bg-[#181C2A] border border-solid border-slate-700 rounded-xl p-4 lg:p-6 transition-all duration-500 w-full mx-auto hover:border-indigo-600 hover:shadow-lg flex flex-col justify-between min-h-[260px] lg:min-h-[340px]">
                                <div>
                                    <div className="flex items-center mb-4 lg:mb-7 gap-2 text-amber-400 transition-all duration-500">
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" fill="currentColor" />
                                        </svg>
                                        <span className="text-xs lg:text-base font-semibold text-indigo-400">{t.rating}</span>
                                    </div>
                                    <p className="text-xs lg:text-base text-[#E4ECFF] leading-5 lg:leading-6 transition-all duration-500 pb-4 lg:pb-8 group-hover:text-white">
                                        {t.text}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 lg:gap-5 border-t border-solid border-slate-700 pt-3 lg:pt-5">
                                    <img className="rounded-full h-8 w-8 lg:h-10 lg:w-10 object-cover border border-slate-700" src={t.image} alt={t.name} />
                                    <div className="block">
                                        <h5 className="text-white font-medium transition-all duration-500 mb-1 text-xs lg:text-base">{t.name}</h5>
                                        <span className="text-xs lg:text-sm leading-4 text-[#CBACF9]">{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div ref={paginationRef} className="custom-swiper-pagination" />
            </div>
        </section>
    );
}

export default Testimonials;