import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import trips from "./db.js";

function MainPage() {
  const [searchTrip, setSearchTrip] = useState("");
  const [tripsData, setTripsData] = useState([]);
  // const getTravelTrips = async () => {
  //   const respond = await axios.get(
  //     `http://localhost:4001/trips?keywords=${searchTrip}`
  //   );
  //   console.log(respond.data.data);
  //   setTripsData(respond.data.data);
  // };

  useEffect(() => {
    // getTravelTrips();
    const searchTerms = searchTrip.split(" ");
    console.log(searchTerms);
    setTripsData(
      trips.filter((trip) =>
        searchTerms.every(
          (term) =>
            trip.title.includes(term) ||
            trip.tags.some((tag) => tag.includes(term))
        )
      )
    );
  }, [searchTrip]);

  const textLimit100 = (text) => {
    if (text.length > 100) {
      text = text.substr(0, 100) + `...`;
    }
    return text;
  };

  const copyClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("คัดลอกลิงก์เรียบร้อยแล้ว");
    } catch (error) {
      console.error("ไม่สามารถคัดลอกลิงก์ได้: ", error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen pt-10 md:p-10 bg-[url('/bg.jpg')] bg-cover ">
      <h1 id="font-1" className="text-6xl font-bold text-sky-500 text-center">
        เที่ยวไหนดี
      </h1>
      <div className="pt-10 pb-10 text-xl ">
        <label htmlFor="searchTravel">ค้นหาที่เที่ยว</label>
        <input
          id="searchTravel"
          type="text"
          name="searchTravel"
          placeholder="หาที่เที่ยวแล้วไปกัน"
          className="border-b-slate-300 p-2 border-b-2 block text-center rounded-md  w-full "
          value={searchTrip}
          onChange={(event) => {
            setSearchTrip(event.target.value);
          }}
        />
      </div>
      <section className=" grid grid-cols-1  md:grid-cols-2 gap-5 ">
        {tripsData.map((item) => {
          return (
            <div
              className="flex justify-center rounded-xl overflow-hidden shadow-lg "
              key={item.uid}
            >
              <div className="relative xxl:flex p-3 rounded-xl bg-white container max-md:flex-col">
                <img
                  className=" rounded-3xl w-full md:w-1/2 h-48 object-cover p-4"
                  src={item.photos[0]}
                  alt=" travel image"
                  key={item.img}
                ></img>
                <button
                  id="copyBtn"
                  className=" bg-blue-500 absolute bottom-5 right-5 md:top-5 md:right-5 text-xs text-white  w-10 h-10 rounded-full flex-row "
                  onClick={() => copyClipboard(item.url)}
                >
                  Copy
                </button>
                <div>
                  <button
                    onClick={() => {
                      const newWindow = window.open(item.url, "_blank");
                      if (newWindow) newWindow.focus();
                    }}
                  >
                    <p id="title" className="text-xl font-semibold">
                      {item.title}
                    </p>
                  </button>
                  <p className="text-ellipsis overflow: hidden;">
                    {textLimit100(item.description)}
                  </p>
                  <button
                    className="underline text-blue-500 "
                    onClick={() => {
                      const newWindow = window.open(item.url, "_blank");
                      if (newWindow) newWindow.focus();
                    }}
                  >
                    อ่านต่อ
                  </button>
                  <div className="flex gap-2 ">
                    <p className="text-slate-500 font-medium">หมวด</p>
                    {item.tags.map((tag) => {
                      return (
                        <button
                          id="tag"
                          key={tag}
                          className="underline text-slate-600"
                          onClick={() => {
                            const newSearchTrip = searchTrip
                              ? `${searchTrip} ${tag}`
                              : tag;
                            setSearchTrip(newSearchTrip);
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    {item.photos.map((photos, index) => {
                      if (index !== 0) {
                        return (
                          <img
                            className=" rounded-3xl bg-slate-50 inline p-1 w-30 h-24 object-cover"
                            src={photos}
                            alt="travel image"
                            key={index}
                          ></img>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default MainPage;
