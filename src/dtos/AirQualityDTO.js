class Location {
    constructor(type, coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }
}

class Pollution {
    constructor(ts, aqius, mainus, aqicn, maincn) {
        this.ts = ts;
        this.aqius = aqius;
        this.mainus = mainus;
        this.aqicn = aqicn;
        this.maincn = maincn;
    }
}

class Weather {
    constructor(ts, tp, pr, hu, ws, wd, ic) {
        this.ts = ts;
        this.tp = tp;
        this.pr = pr;
        this.hu = hu;
        this.ws = ws;
        this.wd = wd;
        this.ic = ic;
    }
}

class Current {
    constructor(pollution, weather) {
        this.pollution = pollution;
        this.weather = weather;
    }
}

class AirQualityDTO {
    constructor(status, city, state, country, location, current) {
        this.status = status;
        this.data = {
            city,
            state,
            country,
            location: new Location(location.type, location.coordinates),
            current: new Current(
                new Pollution(
                    current.pollution.ts,
                    current.pollution.aqius,
                    current.pollution.mainus,
                    current.pollution.aqicn,
                    current.pollution.maincn
                ),
                new Weather(
                    current.weather.ts,
                    current.weather.tp,
                    current.weather.pr,
                    current.weather.hu,
                    current.weather.ws,
                    current.weather.wd,
                    current.weather.ic
                )
            )
        };
    }

    static from(response) {
        return new AirQualityDTO(
            response.data.status,
            response.data.data.city,
            response.data.data.state,
            response.data.data.country,
            response.data.data.location,
            response.data.data.current
        );
    }
}

module.exports = AirQualityDTO;