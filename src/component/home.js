import React from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import Carousel from 'react-bootstrap/Carousel';


export default function HomeUser() {

  const id = JSON.parse(localStorage.getItem('id'));

  return (
                <>
                    <Header/>
                    <Carousel>
                            <Carousel.Item style={{height:"90vh"}}>
                              <img
                                className="d-block w-100"
                                src={require("../publicUser/image/land page.png")}
                                alt="First slide"
                              />
                              <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                              </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item style={{height:"90vh"}}>
                              <img
                                className="d-block w-100"
                                src={require("../publicUser/image/land page.png")}
                                alt="Second slide"
                              />

                              <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                              </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item style={{height:"90vh"}}>
                              <img
                                className="d-block w-100"
                                src={require("../publicUser/image/land page.png")}
                                alt="Third slide"
                              />

                              <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                              </Carousel.Caption>
                            </Carousel.Item>
                          </Carousel>
                    <Footer/>
                </>
  )
}
