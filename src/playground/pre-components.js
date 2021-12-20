console.log('app.js is running ');
"use strict";
//JSX Javascript XML

const app=
{
    title:'Indecision App',
    subtitle:'Put your life in the hands of a computer',
    options:[]
};

const onFormSubmit=(e)=>{
e.preventDefault();
const option=e.target.elements.option.value;
    if(option)
    {
        app.options.push(option);
        e.target.elements.option.value='';
        renderTemplate();
    }
}
const appRoot=document.getElementById('app');

const removeAll=()=>{
    app.options=[];
    renderTemplate();
};

const makeDecision=()=>{
    const item=app.options[Math.floor(Math.random()*app.options.length)]
    alert(item);
}
const renderTemplate=()=>{
    const template=(
        <div>
            <h1 id="h1">{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length>0 ? 'Here are your options':'No Options'}</p>
            <button disabled={app.options.length===0} onClick={makeDecision}>What Should I Do?</button>
            {app.options.length>0 ? <button onClick={removeAll}>Remove All</button>:''}
            <ol>
                {
                    app.options.map((option,index) => <li key={index}>{option}</li>)   
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );
    ReactDOM.render(template,appRoot);
}
renderTemplate();