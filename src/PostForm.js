import React, {Component} from 'react'

export class PostForm extends Component {
    render(){
        return(
            <div>
                <div style={{ color: color, fontWeight: "bolder" }}>
        Latitud: {latitud}
      </div>
      <div style={{ color: color, fontWeight: "bolder" }}>
        Longitud: {longitud}
      </div>
      <div style={{ color: color, fontWeight: "bolder" }}>
        Fecha y Hora: {date}

            </div>
        )
    }
}

export default PostForm