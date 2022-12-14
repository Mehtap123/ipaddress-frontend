import { Map, Marker } from "pigeon-maps";
import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const Landingpage = () => {
  // const api = process.env.REACT_APP_API_URL;

  const [data, setData] = useState({"query": "24.48.0.1",
  "status": "success",
  "country": "Canada",
  "countryCode": "CA",
  "region": "QC",
  "regionName": "Quebec",
  "city": "Montreal",
  "zip": "H1K",
  "lat": 45.6085,
  "lon": -73.5493,
  "timezone": "America/Toronto",
  "isp": "Le Groupe Videotron Ltee",
  "org": "Videotron Ltee",
  "as": "AS5769 Videotron Telecom Ltee"
  });

  useEffect(() => {
    fetch("http://ip-api.com/json/24.48.0.1")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [data]);

  console.log(data);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    try {
      const ip = e.target[0].value;
      console.log(ip);
      await axios
        .post("https://ipaddress-app.herokuapp.com/api/ip", { ip: ip })
        .then((response) => {
          setData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  return (
    <>
      {data ? (
        <>
          <div className="card m-auto mt-5 box" style={{ width: "70%" }}>
            <div className="card-body">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>Jetzt IP-Adressen lokalisieren</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Gib in das Suchfeld die IP Adresse ein, über die du mehr
                  erfahren möchtest
                </figcaption>
              </figure>

              <form onSubmit={submitHandler}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bsp. IP: 24.48.0.1"
                    aria-label="IP-Adresse"
                    aria-describedby="button-addon2"
                  />

                  <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    id="button-addon2"
                  >
                    lokalisieren
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card m-auto mt-5 mb-5 box" style={{ width: "70%" }}>
            <Map height={300} center={[data.lat, data.lon]} zoom={13}>
              <Marker width={50} anchor={[data.lat, data.lon]} />
            </Map>
            <div className="card-body">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">IP-Adresse:</th>
                    <th scope="col">Internetdienstanbieter:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.query}</td>
                    <td>{data.isp}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th scope="col">Land:</th>
                    <th scope="col">Region/Bundesland:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.country}</td>
                    <td>{data.regionName}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th scope="col">Ort:</th>
                    <th scope="col">Postleitzahl:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.city}</td>
                    <td>{data.zip}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <p>
              made with{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ff00ff"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </p>
          </div>
        </>
      ) : (
        // "Loading...."
        <div className="loaderSpinner">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      )}
    </>
  );
};

export default Landingpage;
