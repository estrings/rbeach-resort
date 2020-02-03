import React, { Component } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

export default class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    //console.log(this.context);
    let { loading, featuredRooms: rooms_feature } = this.context;
    const rooms = rooms_feature.map(item => {
      return <Room key={item.id} room={item} />;
    });
    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}
