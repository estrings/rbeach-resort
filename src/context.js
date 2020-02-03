import React, { Component } from "react";
//import items from "./data";
import Client from "./Contentful";

// Client.getEntries({ content_type: "beachResortExample" }).then(response =>
//   console.log(response.items)
// );
const RoomContext = React.createContext();

//
class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  //getData from api
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortExample",
        //order:"sys_createdAt"
        order: "-fields.price"
      });
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms: rooms,
        featuredRooms: featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice: maxPrice,
        maxSize: maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
    // let rooms = this.formatData(items);
    // let featuredRooms = rooms.filter(room => room.featured === true);
    // let maxPrice = Math.max(...rooms.map(item => item.price));
    // let maxSize = Math.max(...rooms.map(item => item.size));
    // this.setState({
    //   rooms: rooms,
    //   featuredRooms: featuredRooms,
    //   sortedRooms: rooms,
    //   loading: false,
    //   price: maxPrice,
    //   maxPrice: maxPrice,
    //   maxSize: maxSize
    // });
  }

  //this method returns all data from the data.js file
  formatData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images: images, id };
      return room;
    });
    return tempItems;
  };

  //return a single room object
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  //detect change of any input element clicked
  handleChange = event => {
    const target = event.target;
    const name = event.target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  //filter
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    //returning all rooms
    let tempRooms = [...rooms];

    //transform values to integer
    capacity = parseInt(capacity);
    //filter price
    price = parseInt(price);
    //filter room by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    //filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    //state for filtering
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
