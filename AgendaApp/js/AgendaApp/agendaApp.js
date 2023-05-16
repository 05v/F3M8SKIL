class AgendaApp {
  api;
  switcher;
  // Je begint bij January
  month = 0;

  // Op basis van de switchMonths en de button clicked
  // zal de maand 1 opschuiven
  constructor() {
    this.api = new Api();
    this.switcher = new Switcher(this);
    this.api.getData().then((result) => {
      this.switcher.loadAgenda(result[this.month]);
    });
  }

  switchMonths = (sign) => {
    // Als er een + meegegeven is wordt er een opgeteld, bij min een afgehaald
    switch (sign) {
      case "+":
        this.month = this.month + 1;
        break;
      case "-":
        this.month = this.month - 1;
        break;
    }

    // Als de maand 12 wordt (array gaat tot 11) wordt die naar 0 gezet, january
    if (this.month === 12) {
      this.month = 0;
    }
    // Als de maand -1 wordt (array gaat tot 11) wordt die naar 11 gezet, december
    if (this.month === -1) {
      this.month = 11;
    }

    // Laadt de huidige maand in via api (bijv 1 is February)
    this.switcher.loadAgenda(this.api.dataFromApi[this.month]);
  };
}

class Api {
  dataFromApi = [];

  // Zet de JSON array om in data die gelogged kan worden
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

    // Maakt een article class=agenda
    this.htmlElement = document.createElement("article");
    this.htmlElement.classList.add("agenda");

    // Voegt de article toe aan de body en zet de header en maanden er in
    this.renderer = new Renderer();
    this.renderer.render("body", this.htmlElement);
    this.header = new Header(this, this.data.name, this.agendaApp);
    this.month = new Month(this, this.data.days);
  }

  // Renderer voor andere classes die geen toegang hebben tot de renderer
  render(placeToRender, whatToRender) {
    this.renderer.render(placeToRender, whatToRender);
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

    // Maakt header class=agenda__header aan
    this.htmlElement = document.createElement("header");
    this.htmlElement.classList.add("agenda__header");

    // Maakt h2 class=agenda__title aan met de huidige maand als innerText
    this.monthNameText = document.createElement("h2");
    this.monthNameText.classList.add("agenda__title");
    this.monthNameText.innerText = this.nameOfMonth;

    // Maakt de left and right button aan met de < of >
    this.agenda.render(".agenda", this.htmlElement);
    this.leftButton = new Button(
      "previous",
      "<",
      "agenda__button--left",
      this,
      this.agendaApp
    );
    this.agenda.render(".agenda__header", this.monthNameText);
    this.rightButton = new Button(
      "next",
      ">",
      "agenda__button--right",
      this,
      this.agendaApp
    );
  }

  // Dient weer als toegang voor classes die geen directe access hebben
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
  type;

  constructor(type, innerText, extraClass, header, agendaApp) {
    this.type = type;
    this.innerText = innerText;
    this.extraClass = extraClass;
    this.header = header;
    this.agendaApp = agendaApp;

    // Maak button element aan
    this.htmlElement = document.createElement("button");

    // Voegt klasse agenda__button toe + De klasse die wordt meegegeven uit de Header
    this.htmlElement.className += " agenda__button";
    this.htmlElement.className += " " + this.extraClass;

    // De button < of > die wordt meegegeven uit de Header
    this.htmlElement.innerText = this.innerText;

    // Maakt een nieuwe switcher aan en geeft de left of right button klasse mee
    this.switcher = new Switcher(this.extraClass);

    this.render();

    // Als de left of right button wordt geclicked runt de functie buttonClicked
    this.htmlElement.onclick = this.buttonClicked;
  }

  buttonClicked = () => {
    // Checkt het type en geeft een + of - mee aan de AgendaApp zodat de buttons
    // de maand omhoog of omlaag toevoegd
    if (this.type === "previous") {
      this.agendaApp.switchMonths("-");
      return;
    }

    this.agendaApp.switchMonths("+");
  };

  render() {
    this.header.render("header", this.htmlElement);
  }
}

class Switcher {
  agendaApp;
  agenda;
  cleaner;

  constructor(agendaApp) {
    this.agendaApp = agendaApp;
    this.cleaner = new Cleaner();
  }

  loadAgenda = (data) => {
    // Maakt de body leeg wanneer de maand wordt geswitched en maakt
    // de nieuwe agenda met de juiste maand aan
    this.cleaner.clean("body");
    this.agenda = new Agenda(data, this.agendaApp);
  };
}

class Month {
  days = [];
  agenda;
  numberOfDays;
  htmlElement;

  constructor(agenda, numberOfDays) {
    this.agenda = agenda;

    // Maakt een ul class=agenda__month aan en voegt hem toe aan de agenda
    this.htmlElement = document.createElement("ul");
    this.htmlElement.classList.add("agenda__month");
    this.agenda.render(".agenda", this.htmlElement);

    // Haalt de hoeveelheid dagen uit de maand (bijv february 28)
    this.numberOfDays = numberOfDays;
    for (let i = 1; i <= this.numberOfDays; i++) {
      this.days.push(new Day(this, i));
    }
  }

  // Dient weer als gateway voor classes zonder toegang to de renderer
  renderDays(placeToRender, whatToRender) {
    this.agenda.render(placeToRender, whatToRender);
  }
}

class Day {
  month;
  htmlElement;
  dayNumber;

  // Verandered de hoeveelheid dagen in de agenda
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
