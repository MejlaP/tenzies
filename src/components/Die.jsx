export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'transparent'
    }

    //props.holdDice -> when each one is clicked, it logs its own unique ID property
    return (
        <div style={styles} className="die-box" onClick={() => props.holdDice(props.id)}>
            <h5>{props.value}</h5>
        </div>
    )
}