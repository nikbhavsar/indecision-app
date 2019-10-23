import React from 'react';
import Header from './Header';
import AddOption from './AddOption';
import Action from './Action';
import Options from './Options';
import OptionModal from'./OptionModal';

export default class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption:undefined
    };

    componentDidMount(){

        try{

            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            console.log(options);
            this.setState(() => ({  options : options }));    

        } catch(e){

        }     

    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }

  

    handleRemoveAll = () => {
        this.setState(() => {
            return {
                options:[]
            }
        });
    }

    handlePick = () => {

        const randomOption = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomOption];
        this.setState(() =>({
            selectedOption: option
        }))

    }

    handleAddOption = (option) => {
        if(!option){
            return 'Please Enter valid Option'
        } else if(this.state.options.indexOf(option) > -1){
            return 'This Option is already exist'
        } else{
            this.setState((prevState)=>{
                return {
                    options : prevState.options.concat([option])
                }
            })
        }
    }

    handleRemoveOption = (optionToRemove) => {
        this.setState((prevState)=>{
          return { options: prevState.options.filter((option)=> optionToRemove !== option)}
        });
    }

    closeModal = () => {
        this.setState(() => ({
            selectedOption: undefined
        }))
    }

    render(){

      //  const title = 'Indecision App';
        const subTitle = "put your life into computer's hand" ;
      //  const options = ['Option1','Option2'];

        return(
            <div>
            <Header subTitle={subTitle}/>
            <div className="container">
            <Action
             hasOptions={this.state.options.length > 0}
             handlePick = {this.handlePick}
             />
             <div className="widget">
            <Options 
            options={this.state.options}
            handleRemoveAll = {this.handleRemoveAll}
            handleRemoveOption = {this.handleRemoveOption}
            />
            <AddOption
            handleAddOption = {this.handleAddOption}
            />
            </div>
            </div>
            <OptionModal 
            selectedOption={this.state.selectedOption}
            closeModal={this.closeModal}
            />
            </div>
        );
    }
}

