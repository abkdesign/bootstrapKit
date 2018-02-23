
import React from 'react';
import { connect } from 'react-redux';
// import assets 
import appStyles from './assets/scss/app.scss';
import {bindActionCreators} from 'redux';
import * as questionarieActionCreators from './actions/questionnarieAction';
import * as questionActionCreators from './actions/questionAction';
import * as ruleActionCreators from './actions/ruleActions';
import Questionnarie from './components/Questionnarie';
import { toggleQuestion } from './actions/questionAction';
import { CircularProgress } from 'material-ui/Progress';
import StartPage from './components/StartPage';


class App extends React.Component {
  constructor(){
    super()
    this.state={
      startQuestionnarie: false,
    }
  }
  componentDidMount() {
    const {fetchQuestionnaries } = this.props
    fetchQuestionnaries()
  }
  componentDidUpdate(prevProps) {
    const { fetchQuestionnaries } = this.props
    if (this.props.questionnarie !== prevProps.questionnarie) {
      
    }
    if (this.props.questionarie.success === true) {
      
    }
  }
  startQuestionnarie = (bool) =>{
    this.props.fetchQuestionnaries()
    this.setState({
      startQuestionnarie: true
    })
  }
  renderStartPage = () =>{
    const questionnarieDocument = process.env.NODE_ENV === "production" ? this.props.questionarie.document : this.props.questionarie.document.Document;
    return(
      <div className="ComC-questionnarie-container">
        <StartPage startQuestionnarie={this.startQuestionnarie} title={questionnarieDocument.Title} description={questionnarieDocument.Description} />
        { this.state.startQuestionnarie && this.renderQuestionnarie()}
      </div>
    )
  }
  renderQuestionnarie = () => {
    const questionnarieDocument = process.env.NODE_ENV === "production" ? this.props.questionarie.document : this.props.questionarie.document.Document;
    return (
      <React.Fragment>
        {this.props.questionarie.success === false && <CircularProgress /> }
        {this.props.questionarie.success && <Questionnarie questionnariedocument={questionnarieDocument} rules={this.props.rulesReducer.rules}/>}
      </React.Fragment>
    )
  }
  render() {
    return (
      <React.Fragment>
        {this.props.questionarie.success && this.renderStartPage()}
      </React.Fragment>
    );
  }
}


// Pass Redux store state into the props
// here you can specify a part of the state/or the whole state
// your component might not need the whole state to get the updated props
const mapStateToProps = (state) => {
  return {
    questionaries: state.questionaries,
    rules: state.rulesReducer
  };
};
// helps the component to fire an action event
// mapDispatchToProps, should return an object full of action creators
// you can include all the actions functions here that is needed
const mapDispatchToProps = (dispatch) => {
  return {
    questionnarieActions: bindActionCreators(questionarieActionCreators, dispatch),
    questionActions: bindActionCreators(questionActionCreators, dispatch),
    ruleActions: bindActionCreators(ruleActionCreators, dispatch),
    fetchQuestionnaries: () => dispatch({ type: 'GET_QUESTIONARIE' })
  }
};

// connect is a higher order component
// passing redux store state and actions to the component
export default connect((state) => state, mapDispatchToProps)(App);


