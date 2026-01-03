import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="py-20 px-20 flex flex-col justify-center">
      <div className="relative">
        <Swiper
          centeredSlides
          loop
          spaceBetween={30}
          slidesPerView={3}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-car bg-white rounded-2xl p-8 shadow-sm text-center mb-14">
                <div className="text-4xl text-teal-200 mb-4">“</div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.text}
                </p>

                <div className="border-t border-dashed my-4"></div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="w-12 h-12 rounded-full bg-teal-700"></div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom arrows */}
        <div className="flex justify-center">
          <button className="custom-prev absolute -translate-x-16 bottom-0 w-10 h-10 rounded-full flex items-center justify-center">
            <FiArrowLeft />
          </button>
          <button className="custom-next absolute translate-x-16 bottom-0 w-10 h-10 rounded-full flex items-center justify-center">
            <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
