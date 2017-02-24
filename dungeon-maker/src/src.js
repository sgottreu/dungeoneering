import React, {Component} from 'react';
import './App.css';

import moment from 'moment';
import axios from 'axios';
import {items} from './static-data';

class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className="App">
        <ArticleList/>
      </div>


    );
  }

}

class ArticleList extends Component {
  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.state = { articles: {} };
  }

  componentDidMount() {
    axios.get(`reactjs.json`)
      .then(res => {
        const articles = res.data.data.children.map(obj => obj.data);
        this.setState({ articles });
      });
  }

  handleVote(id, dir) {
    let articles = this.state.articles;

    articles.map(function(el, i, arr){
      if( el.id == id){
        articles[i].score = (dir == 'up') ? articles[i].score + 1 : articles[i].score - 1;
      }
    });

    this.setState( { articles: articles });
  }

  render(){
    let articles = this.state.articles;
    let posts = [];

    Object.keys(articles).map(id => (
      posts.push(articles[id])
    ));
    
    function compare(a,b) {
      if (a.score < b.score)
        return 1;
      if (a.score > b.score)
        return -1;
      return 0;
    }

    posts.sort(compare);

    return(
      <div className="ArticleList">
        {posts.map(post => (
          <li key={post.id} className="">
            <Article item={post} onHandleVote={this.handleVote}  />
          </li>
        ))}
      </div>
    );
  }
}


class Article extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let {item, onHandleVote} = this.props;

    return(
      <div className="Article">
        <ArticleVotes score={item.score} id={item.id} onVote={onHandleVote}  />
        <div className="ArticleDetails">
          <ArticleHeading item={item} />
          <ArticleAuthor item={item} />
          <ArticleActions item={item} />
        </div>
      </div>

    );

  }

}

class ArticleHeading extends Component{
  constructor(props){
    super(props);
  }

  render() {
    let {title, url, domain} = this.props.item;

    return (
      <div className="ArticleHeading">
        <div className="ArticleTitle">
          <a href={url}><h2>{title}</h2></a>
        </div>
        <div className="ArticleDomain"><a href={`https://www.reddit.com/domain/${domain}`} >{domain}</a></div>
      </div>
    );

  }

}

class ArticleAuthor extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let {created, author} = this.props.item;
    return(
      <div className="ArticleAuthor">
        submitted {moment(created, "X").fromNow()} by <a href={`https://www.reddit.com/user/${author}`}>{author}</a>
      </div>
    );
  }
}

class ArticleActions extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let {permalink, num_comments} = this.props.item;
    return(
      <div className="ArticleActions">
        <div className="ArticleComment">
          <a href={`https://www.reddit.com${permalink}`}>{(num_comments > 0 ? `${num_comments} comments` : 'comments')}</a>
        </div>
        <div>share</div>
        <div>save</div>
        <div>hide</div>
        <div>report</div>
      </div>
    );


  }
}

class ArticleVotes extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let {id, score, onVote} = this.props;

    return(
      <div className="ArticleVotes">
        <button className="upvote">
          <i className="fa fa-arrow-up" aria-hidden="true" onClick={onVote.bind(this,id,'up')}></i>
        </button>
        <div className="ArticleScore">{score}</div>
        <button className="downvote">
          <i className="fa fa-arrow-down" aria-hidden="true" onClick={onVote.bind(this,id,'down')}></i>
        </button>
      </div>
    );

  }

}


/*
         <Article>
          <ArticleVotes></ArticleVotes>
          <ArticlePicture></ArticlePicture>
          <div className="ArticleDetails">

            <ArticleActions/>
          </div>
        </Article>
      </ArticleList>
*/
export default App;