import { useState, useEffect } from 'react';
import React from 'react';
import Container from './Container';
import Loading from './Loading';
import axios from 'axios';
export default function Weather() {
    const [data, setData] = useState([]);
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    useEffect(
        () => {
            getLocation();
            // getData();
        },
        []
    )
    useEffect(
        () => {
            getData()
        },
        [lat, long]
    )
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
                console.log(lat, long)
            },
            (error) => {
                console.log(error)
            }
        )
    }
    const getData = async () => {
        if (lat !== "" && long !== "") {
            // await fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=21805bff7224936fa25d6cec016a0a4b`)
            //     .then(
            //         res => res.json()
            //     )
            //     .then(
            //         result => {
            //             console.log(result)
            //         }
            //     )
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=21805bff7224936fa25d6cec016a0a4b`
            ).then(
                (res) => {
                    console.log(res.data)
                    setData(res.data);
                }
            )
        }

    }
    return (
        <>
            <Container>
                <div className="col-6 offset-3">
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">City Name</label>
                        <input type="text" name="" id="" className="form-control" placeholder="" />
                        <small id="helpId" className="text-muted">Enter the city name</small>
                    </div>
                </div>
            </Container>
            {
                data.length === 0
                    ?
                    <>
                        <Loading classData="col-6 offset-3 text-center mt-5" />
                    </>

                    :
                    <>
                        <Container>
                            <div className="col-6 offset-3 text-center bg-primary text-white p-2 rounded">
                                <h2>{data.name}</h2>
                            </div>
                        </Container>
                        <Container>

                            <div className="col-6 offset-3 bg-dark text-white p-2 rounded">
                                <div className="row">
                                    <div className="col-6">
                                        Temp: {data.main.temp} deg
                                    </div>
                                    <div className="col-6">
                                        Humidity: {data.main.humidity} %
                                    </div>
                                    <div className="col-6">
                                        Sunrise
                                    </div>
                                    <div className="col-6">
                                        Sunset
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </>
            }
        </>);
}
