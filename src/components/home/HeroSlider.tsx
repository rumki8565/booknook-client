"use client";

import Link from "next/link";
import type { JSX } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
  title: string;
  text: string;
  background: string;
}

const slides: Slide[] = [
  {
    title: "Your Next Great Read Is Waiting",
    text: "Explore books shared by our readers and find a story for the next few days.",
    background: "from-emerald-900 to-stone-800",
  },
  {
    title: "Borrow a Book, Keep the Story",
    text: "Borrow any available book for 7 days and return it when you are done.",
    background: "from-amber-800 to-stone-900",
  },
  {
    title: "Share Your Own Shelf",
    text: "Add the books you love and let other readers enjoy them too.",
    background: "from-teal-800 to-emerald-950",
  },
];

export default function HeroSlider(): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        className="overflow-hidden rounded-box"
      >
        {slides.map(
          (slide: Slide): JSX.Element => (
            <SwiperSlide key={slide.title}>
              <div
                className={`flex h-[24rem] flex-col items-center justify-center bg-linear-to-br px-6 text-center text-white sm:h-[30rem] ${slide.background}`}
              >
                <h2 className="max-w-3xl font-heading text-3xl font-bold sm:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
                  {slide.text}
                </p>
                <Link href="/books" className="btn btn-accent mt-8">
                  Browse Books
                </Link>
              </div>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </section>
  );
}
