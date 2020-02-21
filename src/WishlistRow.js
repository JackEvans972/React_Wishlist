import React, { Component } from 'react';

export class WishlistRow extends Component {


    render = () =>
    <tr>
    <td>{this.props.item.car}</td>
    <td>
      <input type="checkbox" checked={this.props.item.purchased} onChange={() => this.props.callback(this.props.item)}/>
    </td>
  </tr>
}