import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, quis ad blanditiis ratione dolorem qui modi eius vel, eligendi tenetur facilis impedit inventore ex dolore illo consequuntur unde incidunt distinctio?"
      },
      {
        icon: <FaHiking />,
        title: "Endless Hiking",
        info:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, quis ad blanditiis ratione dolorem qui modi eius vel, eligendi tenetur facilis impedit inventore ex dolore illo consequuntur unde incidunt distinctio?"
      },
      {
        icon: <FaShuttleVan />,
        title: "free shuttle",
        info:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, quis ad blanditiis ratione dolorem qui modi eius vel, eligendi tenetur facilis impedit inventore ex dolore illo consequuntur unde incidunt distinctio?"
      },
      {
        icon: <FaBeer />,
        title: "strongest beer",
        info:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, quis ad blanditiis ratione dolorem qui modi eius vel, eligendi tenetur facilis impedit inventore ex dolore illo consequuntur unde incidunt distinctio?"
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
