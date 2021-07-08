import React from 'react';

const Weather = ({ data, dataDaily, city, isActive }) => {

    const weatherResult = data;
    const weatherResultDaily = dataDaily;
    let result = null;
    let resultDaily = null;
    const PUBLIC = process.env.PUBLIC_URL;

    if (weatherResult !== undefined) {
        result = weatherResult.map((item,index) => (
            <>
                <div className="accordion-item" key={item.id}>
                    <h2 className="accordion-header" id={`flush-headingOne${index}`}>
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapseOne${index}`}
                            aria-expanded="false"
                            aria-controls={`flush-collapseOne${index}`}
                        >
                            <div id='tempItem'>
                                <div className="tempItem">
                                    <p className='tempValue'>{Math.round(item.temp.value)}&#8451;</p>
                                </div>
                                <div id='weatherCode'>
                                    <img src={PUBLIC + `/img/${item.weather_code.value}.svg`} alt="" />
                                    <p className='weatherCode'>{item.weather_code.value.replace('_', " ")}</p>
                                </div>
                                <p className='cityItem'>{city}</p>
                                <p className='dateItem'>{new Date(item.observation_time.value).toLocaleDateString()}</p>
                                <p className='timeItem'>{new Date(item.observation_time.value).toLocaleTimeString()}</p>
                            </div>
                        </button>
                    </h2>
                    <div
                        id={`flush-collapseOne${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`flush-headingOne${index}`}
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className="accordion-body">
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/pressure.svg"} alt="" />
                                <p>{item.baro_pressure.value.toFixed()} {item.baro_pressure.units}</p>
                            </div>
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/humidity-5.svg"} alt="" />
                                <p>{item.humidity.value} {item.humidity.units}</p>
                            </div>
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/wind.svg"} alt="" />
                                <p>{item.wind_speed.value} {item.wind_speed.units}</p>
                            </div>
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/rain.svg"} alt="" />
                                <p>{item.precipitation.value.toFixed(3)} </p><p className='units'>{item.precipitation.units}</p>
                            </div>
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/cloudcover.svg"} alt="" />
                                <p>{Math.round(item.cloud_cover.value)} {item.cloud_cover.units}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ))
    }
    if (weatherResultDaily !== undefined) {
        resultDaily = weatherResultDaily.map((item, index) => (
            <>
                <div className="accordion-item" key={item.id}>
                    <h2 className="accordion-header" id={`flush-headingOne${index}`}>
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapseOne${index}`}
                            aria-expanded="false"
                            aria-controls={`flush-collapseOne${index}`}
                        >
                            <div id='tempItem'>
                                <div className="tempItem">
                                    <p className='tempValue'>{Math.round(item.temp[1].max.value)}&#8451;</p>
                                </div>
                                <div id='weatherCode'>
                                    <img src={PUBLIC + `/img/${item.weather_code.value}.svg`} alt="" />
                                    <p className='weatherCode'>{item.weather_code.value.replace('_', " ")}</p>
                                </div>
                                <p className='cityItem'>{city}</p>
                                <p className='dateItemDaily'>{new Date(item.observation_time.value).toLocaleDateString()}</p>

                            </div>
                        </button>
                    </h2>
                    <div
                        id={`flush-collapseOne${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`flush-headingOne${index}`}
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className="accordion-body">
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/rain.svg"} alt="" />
                                <p>{item.precipitation[0].max.value.toFixed(2)}</p><p className='units'> {item.precipitation[0].max.units}</p>
                            </div>
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/humidity.svg"} alt="" />
                                <p>{item.precipitation_probability.value} {item.precipitation_probability.units}</p>
                            </div>
                            <div className='detailItem'>
                                <img style={{ transform: `rotate(${item.wind_direction[0].min.value.toFixed()}deg)` }} src={PUBLIC + "/img/icon/arrow.svg"} alt="" />
                                <p>wind</p>

                            </div>
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/sunrise.svg"} alt="" />
                                <p>{new Date(item.sunrise.value).toLocaleTimeString()}</p>

                            </div>
                            <div className='detailItem'>
                                <img src={PUBLIC + "/img/icon/sunset.svg"} alt="" />
                                <p>{new Date(item.sunset.value).toLocaleTimeString()}</p>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        ))
    }




    return (
        <div className="accordion accordion-flush" id="accordionFlushExample" >
            {!isActive ? result : resultDaily}
        </div>
    );
}

export default Weather;