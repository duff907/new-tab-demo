import React from 'react';

export default class Lists extends React.Component {

  constructor() {
    super();

    this.state = {
      lists: []
    }

    this._handleNewListClick = this._handleNewListClick.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._saveToStorage = this._saveToStorage.bind(this);
    this._handleListUpdate = this._handleListUpdate.bind(this);
    this._onItemAdded = this._onItemAdded.bind(this);
  }

  componentDidMount() {
    chrome.storage.sync.get('lists', this._handleListUpdate);
  }

  _handleListUpdate(result) {
    if (!result.lists) return;
    this.setState({lists: result.lists});
  }

  render() {
    return (
      <div>
        <a href="#" className="new-list-gen" onClick={this._handleNewListClick}>add new list</a>
        <div className="three-col">
          {this.renderLists(this.state.lists)}
        </div>
      </div>
    );
  }

  renderLists(lists) {
    return lists.map((list, i) => {
      // console.log(list)
      return (
        <div className="to-do-list" key={i}>
          <input className="to-do-title" onBlur={(event) => {this._handleTitleChange(event, i)}} defaultValue={list.name} />
          <ul>
            {list.toDo.map((toDo, j) => {
              return (
                <li key={j}>
                  {toDo}
                  {this._getEditIcon()}
                  {this._getDeleteIcon(i, j)}
                </li>
              );
            })}
            <li key="new">
              <input type="text" placeholder="new item..." onBlur={(e) => {this._onItemAdded(e, i)}}/>
            </li>
          </ul>
        </div>
      )
    });
  }

  _onItemAdded(e, i) {
    var lists = this.state.lists;
    lists[i].toDo.push(e.target.value);
    this.setState({lists});
    this._saveToStorage();
    e.target.value = '';
  }

  _getEditIcon() {
    return (
      <svg id="icon-pencil" className="icon" viewBox="0 0 32 32">
        <title>pencil</title>
        <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
      </svg>
    );
  }

  _getDeleteIcon(list, item) {
    return (
      <svg id="icon-bin" className="icon" viewBox="0 0 32 32" onClick={(e) => {this._removeItem(list, item)}}>
        <title>bin</title>
        <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
        <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
      </svg>
    );
  }

  _handleEditToDo(e, i, j) {
    var lists = this.state.lists;
    lists[i].name = e.target.value;
    this.setState({lists});
    this._saveToStorage();
  }

  _handleTitleChange(e, i) {
    var lists = this.state.lists;
    lists[i].name = e.target.value;
    this.setState({lists});
    this._saveToStorage();
  }

  _handleNewListClick() {
    var lists = this.state.lists;
    lists.push({name: 'Please enter a name...', toDo: []});
    this.setState({lists});
    // this._saveToStorage();
  }

  _removeItem(list, item) {
    var lists = this.state.lists;
    lists[list].toDo.splice(item, 1);
    this.setState({lists});
    this._saveToStorage();
  }

  _saveToStorage() {
    chrome.storage.sync.set({'lists': this.state.lists}, function() {
      console.log('saved to storage')
    });
  }

}