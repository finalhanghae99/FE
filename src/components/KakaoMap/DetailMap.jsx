import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import React, { useState, useEffect } from 'react';
import { isVisible } from '@testing-library/user-event/dist/utils';

function DetailMap(props) {
  const { position, campingName } = props;
  const [isVisible, setIsVisible] = useState(false);

  function EventContainer({ position, content, onClick}) {
    const info = (isVisible)? content : null;
    return (
      <MapMarker
        position={position}
        onClick={onClick}
        // onMouseOver={() => setIsVisible(true)}
        // onMouseOut={() => setIsVisible(false)}
      >
        {info}
      </MapMarker>
    )
  }

  return (
    <div className="App">
      <Map
        key={campingName}
        center={{
          // 지도의 중심좌표
          lat: position.lat,
          lng: position.lng,
        }}
        style={{ width: "100%", height: "300px" }}
        level={5}
      >
          <EventContainer
            position={position}
            onClick={() => {setIsVisible(!isVisible)}}
            // isClicked={selected === index}
            content={
              <div style={{ padding: "5px", color: "#000" }}>
                {campingName}<br />
                <a
                  href={`https://map.kakao.com/link/map/${campingName},${position.lat}, ${position.lng}`}
                  style={{ color: "blue" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  큰지도보기
                </a>{" | "}
                <a
                  href={`https://map.kakao.com/link/to/${campingName},${position.lat},${position.lng}`}
                  style={{ color: "blue" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  길찾기
                </a>
              </div>
            }
          />
      </Map>
    </div>
  );
}

export default DetailMap;
