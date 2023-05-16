class AgendaApp {
  api;
  switcher;
  month = 0;

  constructor() {
    this.api = new Api();
    this.switcher = new Switcher(this);
    this.api.getData().then((result) => {
      this.switcher.loadAgenda(result[this.month]);
    });
  }

  switchMonths = (sign) => {
    switch (sign) {
      case "+":
        this.month = this.month + 1;
        break;
      case "-":
        this.month = this.month - 1;
        break;
    }

    this.switcher.loadAgenda(this.api.dataFromApi[this.month]);
  };
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
  agendaApp;

  constructor(data, agendaApp) {
    this.data = data;
    this.agendaApp = agendaApp;

    this.htmlElement = document.createElement("article");
    this.htmlElement.classList.add("agenda");

    this.renderer = new Renderer();
    this.renderer.render("body", this.htmlElement);
    this.header = new Header(this, this.data.name, this.agendaApp);
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
  agendaApp;

  constructor(agenda, nameOfMonth, agendaApp) {
    this.agenda = agenda;
    this.nameOfMonth = nameOfMonth;
    this.agendaApp = agendaApp;

    this.htmlElement = document.createElement("header");
    this.htmlElement.classList.add("agenda__header");

    this.monthNameText = document.createElement("h2");
    this.monthNameText.classList.add("agenda__title");
    this.monthNameText.innerText = this.nameOfMonth;

    this.agenda.render(".agenda", this.htmlElement);
    this.leftButton = new Button(
      "<",
      "agenda__button--left",
      this,
      this.agendaApp
    );
    this.agenda.render(".agenda__header", this.monthNameText);
    this.rightButton = new Button(
      ">",
      "agenda__button--right",
      this,
      this.agendaApp
    );
  }

  render(placeToRender, whatToRender) {
    this.agenda.render(placeToRender, whatToRender);
  }
}

class Button {
  htmlElement;
  innerText;
  extraClass;
  header;
  agendaApp;

  constructor(innerText, extraClass, header, agendaApp) {
    this.innerText = innerText;
    this.extraClass = extraClass;
    this.header = header;
    this.agendaApp = agendaApp;

    this.htmlElement = document.createElement("button");

    this.htmlElement.className += " agenda__button";
    this.htmlElement.className += " " + this.extraClass;

    this.htmlElement.innerText = this.innerText;

    this.switcher = new Switcher(this.extraClass);

    this.render();

    this.htmlElement.onclick = this.buttonClicked;
  }

  buttonClicked = () => {
    this.agendaApp.switchMonths("+");
  };

  render() {
    this.header.render("header", this.htmlElement);
  }
}

class Switcher {
  agendaApp;
  agenda;

  constructor(agendaApp) {
    this.agendaApp = agendaApp;
  }

  loadAgenda = (data) => {
    this.agenda = new Agenda(data, this.agendaApp);
  };

  clicked = (type) => {
    console.log("Ik moet naar " + type);
  };
}

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
