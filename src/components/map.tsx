type MapProps = {
    lng: number;
    lat: number;
}


export default function Map({lat, lng}:MapProps) {
  const latitude = lat || 35.76764734535941; 
  const longitude = lng || 50.06351515804299; 
  const zoomLevel = 15;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.001}%2C${latitude - 0.001}%2C${longitude + 0.001}%2C${latitude + 0.001}&layer=mapnik&marker=${latitude}%2C${longitude}&zoom=${zoomLevel}`;

  return (
    <div className="w-full aspect-video rounded overflow-hidden">
      <iframe title="location"
        src={mapUrl}
        className="w-full h-full"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}