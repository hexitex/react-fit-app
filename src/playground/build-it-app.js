class ToggleVisibilty extends React.Component{
    constructor(props){
        super(props);
        this.state={
            vis:false
        }
        this.toggle=this.toggle.bind(this);
    }
    toggle()
    {
       
        this.setState((prevState)=>{
            return{
            vis:!prevState.vis
            }
        });
    }
    render(){
        return(
            <div>
            
            <button onClick={this.toggle}>Toggle</button>
            {this.state.vis && (<p id="p1">Hello</p>)}
            </div>
        
        );
    }
}
ReactDOM.render(<ToggleVisibilty/>,document.getElementById('app'))

// console.log('app.js is running ');
// "use strict";

// let visible=false;
// const toggleVisibilty=()=>{
// visible=!visible;

// renderTemplate();
// } 
// const renderTemplate=()=>
// {
//     const page=(
//     <div >
//     <h1>Visibility Toggle</h1>
//     <p></p>
//     <button onClick={toggleVisibilty}>{visible ?'Hide details':'Show Details'}</button>
//     <p>{visible && 'Here is the details'}</p>
//     </div>
//     );
//     ReactDOM.render(page,appRoot);
// }
// const appRoot=document.getElementById('app');

// renderTemplate();