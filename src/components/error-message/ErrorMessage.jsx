export default function ErrorMessage() {
  return (
    <img
      src={process.env.PUBLIC_URL + "/error.gif"}
      style={{ display: "block", margin: "0 auto" }}
      alt="error"
    />
  );
}
