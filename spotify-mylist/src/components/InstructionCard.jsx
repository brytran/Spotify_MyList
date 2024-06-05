function InstructionCard(props) {
  return (
    <div className="instruction-card-container">
      <div className="instruction-card">
        <img className="instruction-image" src={props.path}></img>
        <div className="instruction-text-container">
          <p className="spotify-font">{props.step}.</p>
          <p className="spotify-font">{props.instr}</p>
        </div>
      </div>
    </div>
  );
}

export default InstructionCard;
