

class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.removeAllOptions=this.removeAllOptions.bind(this);
        this.removeSingleOption=this.removeSingleOption.bind(this);
        this.handlePick=this.handlePick.bind(this);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state={
            options:props.options
        };
    }

    componentDidMount(){
    try{
        if (localStorage.getItem('options') 
        && JSON.parse(localStorage.getItem('options')).length>0)
        {
            const options=JSON.parse(localStorage.getItem('options'));
            this.setState(()=>({options:options}))
        }
    }catch(e){
        console.log(e)
    }
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.options.length!==this.state.options.length)
        {
            const json =JSON.stringify(this.state.options)
            localStorage.setItem('options',json);
            console.log('saved data')
        }
        
    }
    componentWillUnmount(){
        console.log('comp will unmount')
    }
    removeAllOptions()
    {
        this.setState(()=>({options:[]}));
    }

    removeSingleOption(opt)
    {
        this.setState((prevState)=>({
          options:prevState.options.filter((option)=> opt!==option)
        }));
    }

    handlePick()
    {
        alert(this.state.options[Math.floor(Math.random()*this.state.options.length)])

    }
    handleAddOption(option)
    {
        if(!option){
            return 'Enter Valid Item!'
        }
        else if(this.state.options.indexOf(option)>-1)
        {
            return 'This Option already Exists! '
        }
        this.setState((prevState)=>({options:prevState.options.concat(option)})) 
    }

    render(){
        const title="FitApp";
        const subtitle="Get Fit";
        ReactModal.defaultStyles.overlay.backgroundColor = 'cornsilk';
        return(
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                hasOptions={this.state.options.length>0}
                handlePick={this.handlePick}/>
                <Options 
                options={this.state.options} 
                removeAll={this.removeAllOptions}
                removeSingle={this.removeSingleOption}
                />
                <AddOption 
                handleAddOption={this.handleAddOption}
                />
               
            </div>
        );
    }
}

IndecisionApp.defaultProps={
  options:[]  
}
const Header=(props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );   
}

Header.defaultProps={
    title:'Indecision'
}

const Action =(props)=>{
    return(
        <div>
        <button 
        onClick={props.handlePick}
        disabled={!props.hasOptions}
        > 
        What Should I Do?
        </button>
        </div>
    )

}

const Options=(props)=>{
    return(
        <div>
        <button onClick={props.removeAll}>Remove All</button>
        {!props.options.length>0 && <p>No options found, please add an option to get started</p>}
        {
            props.options.map((option)=>(
            <Option 
            key={option} 
            optionText={option}
            removeSingle={props.removeSingle}
            />))
        }
       
        </div>
       
    )
}

const Option=(props)=>{
    return(
    <div>
    {props.optionText}
    <button onClick={(e)=> {
        props.removeSingle(props.optionText);
    }}
    >
    Remove</button>
    </div>
    )
}

class AddOption extends React.Component{
    constructor(props)
    {
        super(props);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state ={
            error:undefined
        };
    }
    handleAddOption(e){
        e.preventDefault();
        const option=e.target.elements.option.value.trim();
        const error =this.props.handleAddOption(option)
        this.setState(()=>({error}));
        if(!error)
        {
        e.target.elements.option.value='';
        }
    }
    render(){
        return(
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            
            <form onSubmit={this.handleAddOption}>
            <input type="text" name="option" />
            <button >Add Option</button>
            </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp options={['Shout','Run','Code','Play']}/>, document.getElementById('app'))