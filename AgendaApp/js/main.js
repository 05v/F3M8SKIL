class AgendaApp {
  api;
  agenda;

  constructor() {
    this.api = new Api();
    this.api.getData().then((result) => {
      this.agenda = new Agenda(result[0]);
    });
  }
}

class Api {
  dataFromApi = [];

  async getData() {
    await fetch("../data/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.dataFromApi = data.months;
      });
    return this.dataFromApi;
  }
}

class Agenda {
  renderer;
  header;
  month;
  data;
  htmlElement;

  constructor(data) {
    this.htmlElement = document.createElement("article");
    this.htmlElement.classList.add("agenda");
    this.data = data;
    this.renderer = new Renderer();
    this.renderer.render("body", this.htmlElement);
    this.header = new Header(this, this.data.name);
    this.month = new Month(this, this.data.days);
  }

  render(placeToRender, whatToRender) {
    this.renderer.render(placeToRender, whatToRender);
  }
}

class Renderer {
  render(placeToRender, whatToRender) {
    document.querySelector(placeToRender).appendChild(whatToRender);
  }
}

class Header {
  nameOfMonth;
  htmlElement;
  agenda;

  constructor(agenda, nameOfMonth) {
    this.agenda = agenda;
    this.htmlElement = document.createElement("header");
    this.agenda.render(".agenda", this.htmlElement);
    this.nameOfMonth = nameOfMonth;
  }
}

class Month {
  days = [];
  agenda;
  numberOfDays;
  htmlElement;

  constructor(agenda, numberOfDays) {
    this.agenda = agenda;
    this.numberOfDays = numberOfDays;
    for (let i = 0; i < this.numberOfDays; i++) {
      this.days.push(new Day(this));
    }
    this.htmlElement = document.createElement("ul");
  }
}

class Day {
  month;
  htmlElement;

  constructor(month) {
    this.month = month;
    this.htmlElement = document.createElement("li");
  }
}

const vladsAgenda = new AgendaApp();
console.log(vladsAgenda);
