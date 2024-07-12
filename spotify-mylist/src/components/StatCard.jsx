function StatCard(props) {
  const duration = props.duration;
  const description = props.description;
  const color = props.color;
  const type = props.type;
  const reference = props.reference;
  return (
    <>
      <div className="stat-card-container" ref={reference}>
        <div className="stat-card-image-container">
          <div className="stat-card-image" style={{ backgroundColor: color }}>
            <p className="spotify-font stat-image-font top-font">Top</p>
            <p className="spotify-font stat-image-font">{type}</p>
            <p className="spotify-font stat-image-font duration-font">
              {duration}
            </p>
          </div>
        </div>
        <div className="stat-description-container">
          <p className="stat-description-header-font spotify-font">
            {"Top Tracks - " + duration}
          </p>
          <p className="spotify-font stat-description">{description}</p>
        </div>
      </div>
    </>
  );
}

export default StatCard;
