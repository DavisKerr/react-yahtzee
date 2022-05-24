import "../index.css"

export default function Dice(props)
{

    if(!props.static)
    {
    
    }
    const frozenStyle = {
        backgroundColor : "#70F586"
    }
    const regularStyle = {
        backgroundColor : "#FFFFFF",
    }

    return (
        <div 
            className={"dice grid-item" + " " + (props.rollAnimation && !props.val.static && !props.val.justClicked ? "roll" : "")}
             onClick={() => props.freeze(props.val.id)}
              style={props.val.static ? frozenStyle : regularStyle}
        >
            {props.val.num}
        </div>
    )
}