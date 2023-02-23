import "./End.css";

const End = ({retry}) => {
  return (
    <div>
    <h1>GameOver</h1>
    <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

export default End;
