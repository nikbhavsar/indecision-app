const app = {
    title:"Indecision App",
    subTitle:"What's in your luck",
    options:['one','two','three']
}

const formSubmit = (e) => {

    e.preventDefault();

    const option = e.target.elements.option.value;

    if(option){
        app.options.push(option);
        e.target.elements.option.value = "";
        console.log(app.options);
    }

};

const removeOptions = () => {
    app.options = [];
    console.log(app.options.length);
};

const makeDecision = () => {

    const randomSelection = Math.floor(Math.random() * app.options.length);
    const selectedOption = app.options[randomSelection];
    console.log(selectedOption);

};


const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subTitle && <p> {app.subTitle}</p>}
        {app.options.length > 0 ? <p>Here are your options</p> : <p> No more options to show </p>}

        <button disabled={app.options.length === 0} onClick={makeDecision}> What should I do? </button>
        <button onClick={removeOptions}> Remove All </button>
        <ol>

             {app.options.map((option)=>{

                return <li key={option}>{option}</li>;

             })}
           
        </ol>
        <form onSubmit={formSubmit}>
            <input type="text" name="option" />
            <button>Add Option</button>
        </form>
    </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template,appRoot);