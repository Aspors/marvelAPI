import "./banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <img
        src={process.env.PUBLIC_URL + "/icons/Avengers.png"}
        alt="avengers"
        className="avengers"
      />
      <p>
        New comics every week!
        <br />
        Stay tuned!
      </p>
      <img
        src={process.env.PUBLIC_URL + "/icons/Avengers_logo.png"}
        alt="avengers_logo"
        className="avengers_logo"
      />
    </div>
  );
};

export default Banner;
