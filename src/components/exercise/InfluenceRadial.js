import React from 'react';

export default class InfluenceRadial extends React.Component {
       
    render()
    {let mi=this.props.muscleInfluence;
        let pColor='orange';
        let mColor='#a05301';
        // if(mi>19&&mi<40)
        // {pColor="orange";mColor="#753c00"}

        
        if (mi>39&&mi<60)
        {pColor='orange';mColor='brown '}
        if (mi>59&&mi<80)
        {pColor='orange ';mColor='red'}
        if (mi>79)
        {pColor='yellow';mColor='red'}
        //mi=mi-40;
    return( 
        <radialGradient id={"RadialGradientPerm"+this.props.muscleText}>
       
        <stop offset="0%" stopColor={pColor}/>
       

        <stop offset={mi+'%'} stopColor={mColor}/>
      {mi<99 &&<stop offset="100%" stopColor="black"/>}
        </radialGradient>
       )
    }
}


