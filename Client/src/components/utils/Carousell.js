import React from "react";
import {Carousel} from "react-bootstrap";
import Rupiah from "../Items/Format/formatRupiah";

export default function Carousell({LabuanBajo, Paris, HagiaSophia}) {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={LabuanBajo?.image?.[3].url}
            alt="First slide"
            width={100}
          />
          <Carousel.Caption className="carousel-caption">
            <h2>
              <b>{LabuanBajo?.title}</b>
            </h2>
            <div className="price-carousel">
              <b className="carousel-price-text">
                Rp. {Rupiah(LabuanBajo?.price)}{" "}
              </b>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={Paris?.image?.[3].url}
            alt="First slide"
            width={100}
          />
          <Carousel.Caption>
            <h2>
              <b>{Paris?.title}</b>
            </h2>
            <div className="price-carousel">
              <b className="carousel-price-text">Rp. {Rupiah(Paris?.price)} </b>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={HagiaSophia?.image?.[3].url}
            alt="First slide"
            width={100}
          />
          <Carousel.Caption>
            <h2>
              <b>{HagiaSophia?.title}</b>
            </h2>
            <div className="price-carousel">
              <b className="carousel-price-text">
                Rp. {Rupiah(HagiaSophia?.price)}{" "}
              </b>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
