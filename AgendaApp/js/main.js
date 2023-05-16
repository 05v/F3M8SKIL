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
  leftButton;
  rightButton;
  monthNameText;

  constructor(agenda, nameOfMonth) {
    this.agenda = agenda;
    this.nameOfMonth = nameOfMonth;

    this.htmlElement = document.createElement("header");
    this.htmlElement.classList.add("agenda__header");

    this.leftButton = new Button("<", "agenda__button--left");
    // this.leftButton = document.createElement("button");
    // this.leftButton.classList = "agenda__button agenda__button--left";
    // this.leftButton.innerText = "<";

    this.monthNameText = document.createElement("h2");
    this.monthNameText.classList.add("agenda__title");
    this.monthNameText.innerText = this.nameOfMonth;

    this.rightButton = new Button(">", "agenda__button--right");
    // this.rightButton = document.createElement("button");
    // this.rightButton.classList = "agenda__button agenda__button--right";
    // this.rightButton.innerText = ">";

    this.agenda.render(".agenda", this.htmlElement);
    this.agenda.render(".agenda__header", this.leftButton);
    this.agenda.render(".agenda__header", this.monthNameText);
    this.agenda.render(".agenda__header", this.rightButton);
  }
}

class Button {
  htmlElement;
  constructor(innerText, extraClass) {
    this.innerText = innerText;
    this.extraClass = extraClass;

    this.htmlElement = document.createElement("button");

    this.htmlElement.classList.add = "agenda__button";
    this.htmlElement.classList.add = this.extraClass;

    this.htmlElement.innerText = this.innerText;

    console.log(this);
  }
}

class Switcher {}

class Month {
  days = [];
  agenda;
  numberOfDays;
  htmlElement;

  constructor(agenda, numberOfDays) {
    this.agenda = agenda;

    this.htmlElement = document.createElement("ul");
    this.htmlElement.classList.add("agenda__month");
    this.agenda.render(".agenda", this.htmlElement);

    this.numberOfDays = numberOfDays;
    for (let i = 1; i <= this.numberOfDays; i++) {
      this.days.push(new Day(this, i));
    }
  }

  renderDays(placeToRender, whatToRender) {
    this.agenda.render(placeToRender, whatToRender);
  }
}

class Day {
  month;
  htmlElement;
  dayNumber;

  constructor(month, dayNumber) {
    this.dayNumber = dayNumber;

    this.htmlElement = document.createElement("li");
    this.htmlElement.classList.add("agenda__day");
    this.htmlElement.innerText = this.dayNumber;

    this.month = month;
    this.month.renderDays(".agenda__month", this.htmlElement);
  }
}

const vladsAgenda = new AgendaApp();
console.log(vladsAgenda);
