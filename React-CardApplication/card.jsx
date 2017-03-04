
var Card = React.createClass({
   getInitialState: function(){
     return {};
   },
   componentDidMount : function(){
     var component = this;
     $.get("https://api.github.com/users/"+this.props.login,function(result){
       component.setState(result);
     })
   },
  render : function(){ 
    return (
    <div>
      <img src={this.state.avatar_url} width={100} />
      <h3>{this.state.login} </h3>
      <hr/>
    </div>)
  }
});

var Form = React.createClass({
  getInitialState: function(){
    return {timer:20};
  },
  
  localHandleClick: function(){
  this.props.localHandleClick('petejohn');
   //this.props.localHandleClick(this.state.timer);
   this.setState({timer:this.state.timer+5});
},
handleSubmit:function(e){
  e.preventDefault();
  var loginInput = this.refs.login;
  this.props.addCard(loginInput.value);
  loginInput.value='';
},
  render:function(){
    return (
     <form onSubmit = {this.handleSubmit}>
      <input placeholder ="github login" ref="login" />
        <button  onClick={this.localHandleClick}>Add+{this.state.timer}</button>
      </form>
      )
  }
});


var MainView = React.createClass({
   getInitialState: function(){
     return {logins:["ashleyjohn84"],counter:0};
   },
   handleClick:function(name){
     //this.setState({logins:this.state.logins.concat(name)});
    // this.setState({counter:5});
   },
   addCard:function(name){
      this.setState({logins:this.state.logins.concat(name)});
   },
  render : function(){ 
    var cards = this.state.logins.map(function(card){
      return (<Card login= {card} />)
    })
    return (
    <div>
      <Form localHandleClick={this.handleClick} addCard={this.addCard}/>
      <br/>
      <div>{this.state.counter}</div>
      {cards}
    </div>)
  }
});



ReactDOM.render(<MainView />,document.getElementById("root1"));