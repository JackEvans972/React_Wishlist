import React, {Component} from 'react';

export class WishlistBanner extends Component {
    render = () =>
    <h4 className="bg-danger text-white text-center p-2">
      {this.props.name}'s Car Wishlist ({ this.props.tasks.filter(t => !t.purchased).length} Cars to get)
    </h4>
    
}