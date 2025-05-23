"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemCard from "../../product-item/ItemCard";
import FadeComponent from "@/components/animations/FadeComponent";
import { useEffect, useState } from "react";
import Spinner from "@/components/button/Spinner";
import { productService, Product } from "@/services/productService";

const RelatedProduct = ({
  className = '',
  onSuccess = () => {},
  hasPaginate = false,
  onError = () => {},
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        onSuccess();
      } catch (err) {
        setError("Không thể tải sản phẩm");
        console.error(err);
        onError();
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) return <div>⚠️ {error}</div>;
  if (loading) return <Spinner />;

  const getData = () => {
    return products;
  };

  return (
    <>
      <section className="gi-related-product gi-new-product padding-tb-40">
        <div className="container">
          <div className="row overflow-hidden m-b-minus-24px">
            <div className="gi-new-prod-section col-lg-12">
              <div className="gi-products">
                <FadeComponent
                  triggerOnce
                  direction="up"
                  duration={2}
                  delay={0.2}
                  distance={50}
                  className="section-title-2"
                >
                  <>
                    <h2 className="gi-title">
                    liên quan <span>Sản phẩm</span>
                    </h2>
                    <p>Xem các sản phẩm liên quan</p>
                  </>
                </FadeComponent>

                <FadeComponent
                  triggerOnce
                  direction="up"
                  duration={2}         // Convert from ms to seconds
                  delay={0.3}         // Convert from ms to seconds
                  distance={50}
                  
                >
                  <div className="gi-new-block m-minus-lr-12">
                  <Swiper
                    loop={true}
                    autoplay={{ delay: 1000 }}
                    slidesPerView={5}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      320: {
                        slidesPerView: 1,
                      },
                      425: {
                        slidesPerView: 2,
                      },
                      640: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                      1025: {
                        slidesPerView: 5,
                      },
                    }}
                    className="deal-slick-carousel gi-product-slider"
                  >
                    {getData().map((item: any, index: number) => (
                      <SwiperSlide key={index}>
                        <ItemCard data={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  </div>
                  
                </FadeComponent>
                
                {/* <Fade
                  triggerOnce
                  direction="up"
                  duration={2000}
                  delay={300}
                  cascade={true}
                  className="gi-new-block m-minus-lr-12"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="300"
                >
                  <div >
                  <Swiper
                    loop={true}
                    autoplay={{ delay: 1000 }}
                    slidesPerView={5}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      320: {
                        slidesPerView: 1,
                      },
                      425: {
                        slidesPerView: 2,
                      },
                      640: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                      1025: {
                        slidesPerView: 5,
                      },
                    }}
                    className="deal-slick-carousel gi-product-slider"
                  >
                    {getData().map((item: any, index: number) => (
                      <SwiperSlide key={index}>
                        <ItemCard data={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  </div>
                </Fade> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedProduct;
